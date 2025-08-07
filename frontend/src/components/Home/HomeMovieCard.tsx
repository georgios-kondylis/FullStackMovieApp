// HomeMovieCard.tsx
import type { Movie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { addMovieToFavourites } from "../../services/apiBackend";

type Props = {
  movie: Movie;
  handleSelectMovie: (movie: Movie) => void;
  bookmarked?: boolean;
  dynamicBg?: boolean;
};

const HomeMovieCard = ({ movie, handleSelectMovie, bookmarked = false, dynamicBg }: Props) => {
  const { customStyles, isDarkMode, user, selectedProfile } = useGlobalProps();

  const handleAddMovieToFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation(); // ⛔ Prevents triggering handleSelectMovie
    try {
      const updatedUser = await addMovieToFavourites( user.email, selectedProfile._id, movie );
      console.log("✅ Movie added to favourites:", updatedUser);
    } catch (error) {
      console.error("❌ Failed to add movie to favourites:", error);
    }
  };
  

  return (
    <div key={movie.id} onClick={() => {handleSelectMovie(movie);}}
      className="relative min-w-[150px] w-[140px] h-[230px] cursor-pointer rounded-lg overflow-hidden transition1
                 md:min-w-[200px] md:w-[200px] md:h-[300px]
                 hover:scale-[1.03] hover:shadow-2xl hover:translate-y-[-5px]"
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
           className="w-full h-full object-cover brightness-75 hover:brightness-100"
      />

      {/* Bookmark / Add Button */}
      <div className={`flex w-[55px] h-[55px] border-[5px] rounded-[8px] backdrop-blur-[3px] 
        ${dynamicBg && !isDarkMode ? "border-[#ededed]" : "border-[#030A1B]"} 
        items-center justify-center absolute top-[-6px] left-[-5px] text-[25px] text-white group`}
        onClick={handleAddMovieToFavourites}
      >
        {bookmarked ? (
          <i className="text-[#008cff] fa-solid fa-bookmark text-xl" />
        ) : (
          <p className="group-hover:scale-[1.3] group-hover:text-[#008cff] transition1">+</p>
        )}
      </div>
    </div>
  );
};

export default HomeMovieCard;


















 {/* <div className="flex items-center absolute gap-2 top-0 right-0 p-2 text-[25px] text-white">
        <i className="fa-regular fa-bookmark" />
      </div> */}