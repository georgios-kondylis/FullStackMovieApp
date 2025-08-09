// HomeMovieCard.tsx
import type { Movie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { addMovieToFavourites, removeMovieFromFavourites, } from "../../services/apiBackend";

type Props = {
  movie: Movie;
  handleSelectMovie: (movie: Movie) => void;
  dynamicBg?: boolean;
};

const HomeMovieCard = ({ movie, handleSelectMovie, dynamicBg }: Props) => {
  
  const { customStyles, isDarkMode, user, selectedProfile, setSelectedProfile, setUser } = useGlobalProps();

  const bookmarked = selectedProfile?.favourites?.some((fav: any) => fav.id === movie.id);

  const handleAddMovieToFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarked) {
      console.log("🚫 The movie is already in favourites");
      return;
    }
  
    try {
      const data = await addMovieToFavourites(user.email, selectedProfile, movie);
      if (data && data.user) {
        setUser(data.user);
        const updatedProfile = data.user.profiles.find((p: any) => p._id === selectedProfile._id);
        if (updatedProfile) setSelectedProfile!(updatedProfile);
      }
      console.log("✅ Movie added to favourites:", data);
    } catch (error) {
      console.error("❌ Failed to add movie to favourites:", error);
    }
  };

  const handleRemoveMovieFromFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data = await removeMovieFromFavourites(user.email, selectedProfile, movie);
      if (data && data.user) {
        setUser(data.user);
        const updatedProfile = data.user.profiles.find((p: any) => p._id === selectedProfile._id);
        if (updatedProfile) setSelectedProfile!(updatedProfile);
      }
      console.log("✅ Movie removed from favourites:", data);
    } catch (error) {
      console.error("❌ Failed to remove movie to favourites:", error);
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
      <div className={`flex w-[55px] h-[55px] border-[5px] rounded-[8px] backdrop-blur-[3px] group 
        ${dynamicBg && !isDarkMode ? "border-[#ededed]" : "border-[#030A1B]"} 
        items-center justify-center absolute top-[-6px] left-[-5px] text-[25px] text-white group`}
        onClick={ bookmarked? handleRemoveMovieFromFavourites :  handleAddMovieToFavourites}
      >
        {bookmarked ? (
          <i className="fa-solid fa-bookmark | text-[#00ffee] text-xl group-hover:scale-[1.1] transition1" />
        ) : (
          <i className="fa-regular fa-bookmark | text-[#00ccff] text-xl group-hover:scale-[1.1] transition1" />
        )}
      </div>
    </div>
  );
};

export default HomeMovieCard;


















 {/* <div className="flex items-center absolute gap-2 top-0 right-0 p-2 text-[25px] text-white">
        <i className="fa-regular fa-bookmark" />
      </div> */}