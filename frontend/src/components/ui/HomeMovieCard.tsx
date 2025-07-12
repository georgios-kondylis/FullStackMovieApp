import React, { type Dispatch } from "react";
import type { Movie } from "../../constants/types";

type Props = {
  movie: Movie;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
}


const HomeMovieCard = ({movie, setSelectedMovie}:Props) => {
  return (
    <div key={movie.id} onClick={() => setSelectedMovie(movie)}
      className="relative min-w-[200px] cursor-pointer bg-[#2a2a2a] rounded-lg overflow-hidden shadow-md hover:scale-[1.03] transition1"
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
           className="w-full h-[300px] object-cover"
      />
      <div className="flex items-center absolute top-0 right-0 p-2 text-[25px] text-white">
        <i className="fa-regular fa-bookmark" />
      </div>
    </div>
  );
};

export default HomeMovieCard;
