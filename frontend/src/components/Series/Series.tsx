import { useEffect, useState } from "react";
import { fetchSeries, fetchSeriesByCategory, fetchSeriesTrailerKey } from "../../services/apiTMDB";
import type { Serie } from "../../constants/types";
import { fallbackSeriesYou, fallbackSeriesSquidGame, seriesCategories } from "../../constants";
import { useMediaQuery } from "react-responsive";
import {SeriesCard, Series_Info, Pricing, CardSkeleton, Footer, Section3_4Kids, useGlobalProps, scrollToTop, useFetch } from "../exports";

const Series = () => {
  useEffect(()=> {scrollToTop()} ,[])
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { query, customStyles } = useGlobalProps();
  const { data: popularSeries, refetch } = useFetch(() => fetchSeries({ query }), false);   // Fetch popular series based on search query; manual refetch control (false)
  const { data: categorisedSeries, refetch: refetchCategorisedSeries } = useFetch( () => fetchSeriesByCategory({ genreId: selectedCategory?.id }),  true);  // Fetch series filtered by selected category; only fetch when selectedCategory changes (true)
  const [local_loading, setLocal_loading] = useState(true); // i did it loccaly so that the bg behaves smoothly
  useEffect(() => {if (popularSeries?.length > 0) setLocal_loading(false) }, [popularSeries]);

  const [selectedSeries, setSelectedSeries] = useState<Serie | null>(null);
  const handleSelectSeries = async (serie: Serie) => {
    const trailerKey = await fetchSeriesTrailerKey(serie.id);
    // console.log(trailerKey)
    setSelectedSeries({ ...serie, trailerKey });
  };
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; id: number } | null>(null);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [bgUrl, setBgUrl] = useState<string>("");

  // First 10 series from popularSeries, used for fallback and cycling display
  const firstTen = popularSeries?.slice(0, 10) || [];
  const youSeriesOrSquidGame = isMobile? fallbackSeriesSquidGame : fallbackSeriesYou 
  const fallbackSeries = youSeriesOrSquidGame || firstTen[fallbackIndex];
  //const fallbackSeries = firstTen[fallbackIndex];
  const currentSeries = selectedSeries || fallbackSeries;

  // Update background image URL when currentSeries changes
  useEffect(() => {
    if (!currentSeries?.backdrop_path) return;

    const img = new Image();
    const url = `https://image.tmdb.org/t/p/original${currentSeries.backdrop_path}`;

    // Preload image before updating bgUrl to avoid flicker
    img.src = url;
    img.onload = () => setBgUrl(url);
  }, [currentSeries]);
  // Cycle fallbackIndex every 8 seconds to rotate fallback series backdrop
  useEffect(() => {
    if (!popularSeries || selectedSeries) return; // Don't cycle if user has selected a series

    const update = () => {
      const random = Math.floor(Math.random() * firstTen.length);
      setFallbackIndex(random);
    };

    update(); // Initialize immediately
    const interval = setInterval(update, 8000); // Change every 8 seconds

    return () => clearInterval(interval); // Clean up interval on unmount or deps change
  }, [popularSeries, selectedSeries]);
  // Refetch popular series data when search query changes, with slight debounce
  useEffect(() => {
    const timer = setTimeout(refetch, 200);
    return () => clearTimeout(timer);
  }, [query]);
  // When user selects a category, refetch series filtered by that category
  useEffect(() => {
    if (selectedCategory) {
      refetchCategorisedSeries();
    }
  }, [selectedCategory]);

  return (
    <>
      {/* Main hero section with background image */}
      <section  id="Setion1"
        className="pt-[90px] pb-[10px] min-h-screen bg-cover bg-center xl:bg-left bg-no-repeat transition1 flex justify-center mainPX"
        style={{ backgroundImage: bgUrl
            ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 90%), url(${bgUrl})`
            : undefined,
          backgroundColor: "#000",
        }}
      >
        <main className="content-container1 flex flex-col mt-[300px] MAX_W">
          {currentSeries && <Series_Info currentSeries={currentSeries} />}
          <h1 className="text-white txtShadowBlack text-[40px] mt-[80px]">Trending Series</h1>

          {/* Horizontal scroll list of popular series */}
          <div className="flex gap-4 overflow-x-auto py-6 scrollbar-hide">
        {local_loading ? Array.from({ length: 10 }).map((_, i) => ( <CardSkeleton key={i} /> ))
                 : popularSeries?.map((series: Serie) => (
                  <SeriesCard key={series.id} series={series} handleSelectSeries={handleSelectSeries}/>
            ))}
        </div>
        </main>
      </section>

      {/* Series categories filter and categorized series list */}
      <section id="Section2" className={`relative w-full flex justify-center mainPX ${customStyles?.mainBg}`}>
        <main className="content-container2 MAX_W flex flex-col">
          <div
            id="seriesFilters"
            className="z-1 flex items-center gap-4 overflow-x-auto pt-[30px] pb-[70px] scroll-smooth scroll-bar-hidden"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            <i className={`fa-solid fa-chevron-left ${customStyles?.basicDynamicTxt}`} />
            {seriesCategories.map((category, i) => (
              <button key={i} className={`hover:bg-[#008cff] border-[2px] border-[#008cff] ${customStyles?.basicDynamicTxt} px-4 py-2 text-nowrap rounded-full transition1 cursor-pointer
                ${category.name === selectedCategory?.name ? "bg-[#008cff]" : ""}`}
                onClick={() =>  setSelectedCategory((prev) => (prev?.id === category.id ? null : category))  }
              >
                {category.name}
              </button>
            ))}
            <i className={`fa-solid fa-chevron-right ${customStyles?.basicDynamicTxt}`} />
          </div>

          {/* Display selected category name or prompt */}
          <h1 className={`z-1 text-[2.5rem] md:text-[3rem] mb-[15px] ${customStyles?.basicDynamicTxt}`}>
            {selectedCategory?.name || "Select a category"}
          </h1>

          {/* Show series filtered by selected category */}
          <div className="z-1 flex gap-4 overflow-x-auto py-6 scrollbar-hide">
            {categorisedSeries?.map((series: Serie) => (
             <SeriesCard key={series.id} series={series} handleSelectSeries={handleSelectSeries} dynamicBg={true}/>
            ))}
          </div>
        </main>
      </section>

      <Section3_4Kids/>

      <Pricing/>

      <Footer />
    </>
  );
};

export default Series;
