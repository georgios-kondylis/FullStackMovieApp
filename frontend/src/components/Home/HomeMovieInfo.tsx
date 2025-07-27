import React from "react";
import type { Movie } from "../../constants/types";
import StarRating from "../ui/StarRating";
import { useGlobalProps } from "../../GlobalContext";
import { Link } from "react-router-dom";

type Props = { currentMovie: Movie };

const HomeMovieInfo = ({ currentMovie }: Props) => {
  const { customStyles } = useGlobalProps();

  return (
    <div className="flex flex-col gap-4 text-white">
      <p className="text-[40px]">{currentMovie.title}</p>

      <div className="txtShadowBlack max-w-[600px] w-full rounded-[13px]">
         <p>{currentMovie.overview.replace(/–/g, "")}</p> {/* to remove dashes – */}
      </div>

      <div className="flex w-fit p-2 gap-2 text-[20px] rounded-[10px] bg-[#80808043] backdrop-blur-[3px]">
        <StarRating rating={currentMovie.vote_average / 2} />
        <span className="text-[15px] text-[#e1e1e1cd]">
          {(currentMovie.vote_average / 2).toFixed(1)} / 5 &nbsp; ({" "}
          {currentMovie.vote_count.toLocaleString()} votes )
        </span>
      </div>

      <div className="flex gap-2 items-center">
        <button className={`${customStyles?.btnColor} flex gap-2 items-center px-[12px] py-[6px] rounded-[7px]`} >
          <i className="fa-solid fa-play"></i>
           Watch Trailer
        </button>
        <Link to={`/${currentMovie.id}`} 
        className={`border flex gap-[7px] items-center px-[11px] py-[5px] rounded-[7px] hover:gap-[10px] cursor-pointer transition1`} >
          See more
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default HomeMovieInfo;
