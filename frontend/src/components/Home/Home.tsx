import { useEffect, useState } from "react";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import type { Movie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { HomeMovieInfo, HomeMovieCard, } from "../exports";

const Home = () => {
  const { data: popularMovies, refetch } = useFetch(() => fetchMovies({ query }), false);
  const { query } = useGlobalProps();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [bgUrl, setBgUrl] = useState<string>("");

  const firstTen = popularMovies?.slice(0, 10) || [];
  const fallbackMovie = firstTen[fallbackIndex];
  const currentMovie = selectedMovie || fallbackMovie;

  // Update background image and preload it
  useEffect(() => {
    if (!currentMovie?.backdrop_path) return;

    const img = new Image();
    const url = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;
    img.src = url;
    img.onload = () => setBgUrl(url); // Only set once it's loaded
  }, [currentMovie]);

  // Rotate fallback movie every 8s
  useEffect(() => {
    if (!popularMovies || selectedMovie) return;

    const update = () => {
      const random = Math.floor(Math.random() * firstTen.length);
      setFallbackIndex(random);
    };

    update();
    const interval = setInterval(update, 8000);
    return () => clearInterval(interval);
  }, [popularMovies, selectedMovie]);

  // Refetch when query changes
  useEffect(() => {
    const timer = setTimeout(refetch, 200);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section className="pt-[100px] min-h-screen bg-cover bg-center xl:bg-left bg-no-repeat transition1 flex justify-center mainPX"
      style={{ backgroundImage: bgUrl
          ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 90%), url(${bgUrl})`
          : undefined, backgroundColor: "#000",
      }}
    >

      <main className="content-container mt-[320px] xl:mt-[400px] MAX_W">
        {currentMovie && <HomeMovieInfo currentMovie={currentMovie} />}
        <h1 className="text-white txtShadowBlack text-[40px] mt-[80px]">Popular Movies</h1>

        {popularMovies && (
          <div className="flex gap-4 overflow-x-auto py-6 scrollbar-hide">
            {popularMovies.map((movie: Movie) => (
              <HomeMovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default Home;
