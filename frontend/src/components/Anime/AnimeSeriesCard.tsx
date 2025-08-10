import type { Serie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { addMovieToFavourites, removeMovieFromFavourites } from "../../services/apiBackend";

type Props = {
  series: Serie;
  handleSelectSeries: any;
  dynamicBg?: boolean;
};

const AnimeSeriesCard = ({series, handleSelectSeries, dynamicBg,}: Props) => {
  const { customStyles, isDarkMode, selectedProfile, setSelectedProfile, user, setUser } = useGlobalProps();


const bookmarked = selectedProfile?.favourites?.some((fav: any) => fav.id === series.id);

const handleAddMovieToFavourites = async (e: React.MouseEvent) => {
  e.stopPropagation();
  if (bookmarked) {
    console.log("🚫 The movie is already in favourites");
    return;
  }

  try {
    const data = await addMovieToFavourites(user.email, selectedProfile, series);
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
    const data = await removeMovieFromFavourites(user.email, selectedProfile, series);
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
    <div key={series.id}
      onClick={() => {handleSelectSeries(series); console.log(series)}}
      className="relative min-w-[150px] w-[140px] h-[230px] cursor-pointer rounded-lg overflow-hidden transition1
                 md:min-w-[200px] md:w-[200px] md:h-[300px]
                 hover:scale-[1.03] hover:shadow-2xl hover:translate-y-[-5px]"
    >
      <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
        alt={series.name}
        className="w-full h-full object-cover brightness-75 hover:brightness-100"
      />

      <div className={`flex w-[55px] h-[55px] border-[5px] rounded-[8px] backdrop-blur-[3px] 
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

export default AnimeSeriesCard;
