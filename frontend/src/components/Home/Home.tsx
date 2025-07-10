import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import { useEffect, useState } from "react";
import type { Movie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { fallbackImages } from "../../constants";

const Home = () => {
  const { query, setQuery, customStyles } = useGlobalProps();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [currentFallback, setCurrentFallback] = useState<string>(() => {  // State for the current fallback image
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  });

  const { data: popularMovies, loading, refetch, } = useFetch(() => fetchMovies({ query }), false);

  useEffect(() => { // Refetch when query changes
    const delay = setTimeout(() => {
      refetch();
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {  // Rotate fallback image every 5s (only when no movie is selected)
    if (selectedMovie) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * fallbackImages.length);
      setCurrentFallback(fallbackImages[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedMovie]);

  return (
    <section className="pt-[100px] min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
             style={{ backgroundImage: `url(${selectedMovie ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}` : currentFallback })`, }}
    >
      <div className="px-4">
        <input type="text" placeholder="Search movies..."
          onChange={(e) => setQuery!(e.target.value)}
          className="border p-2 rounded-md w-full max-w-md"
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-white px-4 mt-4">Loading...</p>}

      {/* Movie Cards */}
      {popularMovies && (
        <div className="flex gap-4 overflow-x-auto px-4 py-6 scrollbar-hide">
          {popularMovies.map((movie: Movie) => (
            <div key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="min-w-[200px] cursor-pointer bg-[#2a2a2a] rounded-lg overflow-hidden shadow-md hover:scale-[1.03] transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-2 text-white text-sm font-medium">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
