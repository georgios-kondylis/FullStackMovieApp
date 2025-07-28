// HomeMovieInfo.tsx
import type { Movie } from "../../constants/types";
import StarRating from "../ui/StarRating";
import { useGlobalProps } from "../../GlobalContext";
import { Link, } from "react-router-dom";
import { useState } from "react";
import TrailerIframed from "../ui/TrailerIframed";

type Props = { currentMovie: Movie };

const HomeMovieInfo = ({ currentMovie }: Props) => {
  const { customStyles } = useGlobalProps();
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 text-white">
       {showTrailerModal && (
           <TrailerIframed currentMovie={currentMovie} setShowTrailerModal={setShowTrailerModal} />
        )}

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
        {currentMovie.trailerKey ? (
          <button onClick={() => setShowTrailerModal(true)}
          className={`${customStyles?.btnColor} flex gap-2 items-center px-[12px] py-[6px] rounded-[7px]`}
          >
            <i className="fa-solid fa-play text-white"></i>
            <p>Watch Trailer</p>
          </button>
        ) : (
          <button disabled
            className={`flex gap-2 items-center px-[18px] py-[10px] text-white/50 bg-gray-600/50 rounded-[5px] cursor-not-allowed text-nowrap font-semibold`}
          >
            <i className="fa-solid fa-ban text-white/50" />
            <p>No Trailer Available</p>
          </button>
       )}


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
