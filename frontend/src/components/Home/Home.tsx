import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import { useEffect, useState } from "react";
import type { Movie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { HomeMovieInfo, HomeMovieCard } from "../exports";

const Home = () => {
  const { data: popularMovies, loading, refetch, } = useFetch(() => fetchMovies({ query }), false);

  const { query, setQuery, customStyles } = useGlobalProps();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);

  const firstFive = popularMovies?.slice(0, 10) || []; // Get the first 10 movies

  const fallbackMovie = firstFive[fallbackIndex];
  const currentMovie = selectedMovie || fallbackMovie;

  const currentBackdrop = currentMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : "";

  // Rotate fallback background every 8 seconds (if no movie is selected)
  useEffect(() => {
    if (!popularMovies || selectedMovie) return;

    const rotate = () => {
      const randomIndex = Math.floor(Math.random() * firstFive.length);
      setFallbackIndex(randomIndex);
    };

    rotate(); // immediately set one
    const interval = setInterval(rotate, 8000);

    return () => clearInterval(interval);
  }, [popularMovies, selectedMovie]);

  useEffect(() => {
    const delay = setTimeout(() => {
      refetch();
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <section className="pt-[100px] min-h-screen bg-cover bg-center md:bg-left bg-no-repeat transition1 flex justify-center mainPX"
      style={{  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 90%), url(${currentBackdrop})`,}}
    >
      <main className="content-container mt-[320px] xl:mt-[400px] MAX_W">
        {currentMovie && <HomeMovieInfo currentMovie={currentMovie} />}

        <h1 className="text-white txtShadowBlack text-[40px] mt-[80px]">
          Popular Movies
        </h1>

        {/* Movie Cards */}
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
