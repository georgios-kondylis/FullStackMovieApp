import React, { type Dispatch } from "react";
import type { Movie } from "../../constants/types";

type Props = {
  movie: Movie;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
}


const HomeMovieCard = ({movie, setSelectedMovie}:Props,) => {
  return (
    <div key={movie.id} onClick={() => setSelectedMovie(movie)}
      className="relative min-w-[150px] w-[140px] h-[230px] cursor-pointer rounded-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition1
                 md:min-w-[200px] md:w-[200px] md:h-[300px]"
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
           className="w-full h-full object-cover"
      />
       
      <div className="flex items-center absolute gap-2 top-0 right-0 p-2 text-[25px] text-white">
        <i className="fa-regular fa-bookmark" />
      </div>
    </div>
  );
};

export default HomeMovieCard;
