import React, { type Dispatch } from "react";
import type { Movie } from "../../constants/types";

type Props = {
  movie: Movie;
  setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  bookmarked?: boolean;
}


const HomeMovieCard = ({movie, setSelectedMovie, bookmarked = false }:Props,) => {
  return (
    <div key={movie.id} onClick={() => setSelectedMovie(movie)}
      className="relative min-w-[150px] w-[140px] h-[230px] cursor-pointer rounded-lg overflow-hidden transition1
                 md:min-w-[200px] md:w-[200px] md:h-[300px]
                 hover:scale-[1.03] hover:shadow-2xl hover:translate-y-[-5px] brightness-75 hover:brightness-100"
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" />
       
      <div className="flex w-[52px] h-[52px] border-[4px] rounded-[8px] backdrop-blur-[3px] border-[#111111] items-center justify-center absolute top-[-4px] left-[-4px] text-[25px] text-white group">
        {bookmarked? 
          <i className="text-[#008cff] fa-solid fa-bookmark text-xl" /> 
         : <p className="group-hover:scale-[1.3] group-hover:text-[#008cff] transition1">+</p>
        }
      </div>
    </div>
  );
};

export default HomeMovieCard;



















 {/* <div className="flex items-center absolute gap-2 top-0 right-0 p-2 text-[25px] text-white">
        <i className="fa-regular fa-bookmark" />
      </div> */}