import type { Serie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";

type Props = {
  series: Serie;
  handleSelectSeries: any;
  bookmarked?: boolean;
  dynamicBg?: boolean;
};

const AnimeSeriesCard = ({series, handleSelectSeries, bookmarked = false, dynamicBg,}: Props) => {
  const { customStyles, isDarkMode } = useGlobalProps();

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

export default AnimeSeriesCard;
