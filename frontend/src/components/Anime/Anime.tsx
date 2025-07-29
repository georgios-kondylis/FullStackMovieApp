import { useEffect, useState } from "react";
import type { Serie } from "../../constants/types";
import AnimeSeriesInfo from "./AnimeSeriesInfo";
import AnimeSeriesCard from "./AnimeSeriesCard";
import { JP_fallbackAnimeSeries, US_fallbackAnimeSeries } from "./fallbackAnimeSeries";
import { fetchSeriesTrailerKey, fetchSeries } from "../../services/api";

import {Pricing, CardSkeleton, Footer, Section3_4Kids, useGlobalProps, scrollToTop, useFetch } from "../exports";

const Anime = () => {
  scrollToTop();
  const { query, } = useGlobalProps();
  const { data: popularSeries, refetch } = useFetch(() => fetchSeries({ query }), false); 

  const [local_loading, setLocal_loading] = useState(true);
  useEffect(() => { if (popularSeries?.length > 0) setLocal_loading(false); }, [popularSeries]);

  const [selectedSeries, setSelectedSeries] = useState<Serie | null>(null);
  const handleSelectSeries = async (serie: Serie) => {
    const trailerKey = await fetchSeriesTrailerKey(serie.id);
    console.log(trailerKey)
    setSelectedSeries({ ...serie, trailerKey });
  };
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [bgUrl, setBgUrl] = useState<string>("");
  const [isFromJapan, setIsFromJapan] = useState(true);

  const firstTen = isFromJapan ? JP_fallbackAnimeSeries : US_fallbackAnimeSeries;
  const fallbackSeries = firstTen[fallbackIndex];
  const currentSeries = selectedSeries || fallbackSeries;

  // Preload background image
  useEffect(() => {
    if (!currentSeries?.backdrop_path) return;
    const img = new Image();
    const url = `https://image.tmdb.org/t/p/original${currentSeries.backdrop_path}`;
    img.src = url;
    img.onload = () => setBgUrl(url);
  }, [currentSeries]);

  // Cycle fallbackIndex every 8s
  useEffect(() => {
    if (!popularSeries || selectedSeries) return;

    const update = () => {
      const random = Math.floor(Math.random() * firstTen.length);
      setFallbackIndex(random);
    };

    update();
    const interval = setInterval(update, 8000);
    return () => clearInterval(interval);
  }, [popularSeries, selectedSeries]);

  // Refetch when query changes + reset selected series
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
      setSelectedSeries(null);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      {/* Main hero section */}
      <section  id="Setion1" className="pt-[90px] pb-[10px] min-h-screen bg-cover bg-center xl:bg-left bg-no-repeat transition1 flex justify-center mainPX"
        style={{  backgroundImage: bgUrl
            ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 90%), url(${bgUrl})`
            : undefined, backgroundColor: "#000",
        }}
      >
        <main className="content-container1 flex flex-col mt-[300px] MAX_W">
          {currentSeries && <AnimeSeriesInfo currentSeries={currentSeries} />}

          <div className="flex mt-[80px] mb-[10px]"> {/*coutry Switch button */}
              <button onClick={() => setIsFromJapan(true)} className={`w-[90px] h-[60px] rounded-[5px] overflow-hidden transition1 ${isFromJapan ? 'opacity-100 scale-100' : 'opacity-60 scale-75 brightness-75'} cursor-pointer hover:brightness-125`}>
                <img src="/icons/JPflag.png" className="w-full h-full object-cover" alt="Japan Flag" />
              </button>
              <button onClick={() => setIsFromJapan(false)} className={`w-[90px] h-[60px] rounded-[5px] overflow-hidden transition1 ${!isFromJapan ? 'opacity-100 scale-100' : 'opacity-60 scale-75 brightness-75'} cursor-pointer hover:brightness-125`}>
                <img src="/icons/USAflag.png" className="w-full h-full object-cover" alt="USA Flag" />
              </button>
          </div>

          <h1 className="text-white txtShadowBlack text-[40px] ">Popular Series</h1>

          {/* Trending Section */}
          <div className="flex gap-4 overflow-x-auto py-6 scrollbar-hide">
            {local_loading ? Array.from({ length: 10 }).map((_, i) => (
                  <CardSkeleton key={i} /> ))
              : query && popularSeries?.length > 0
              ? popularSeries.map((series: Serie) => (
                 <AnimeSeriesCard key={series.id} series={series} handleSelectSeries={handleSelectSeries} /> ))
              : firstTen.map((series, i) => (
                  <AnimeSeriesCard key={i} series={series} handleSelectSeries={handleSelectSeries} />
                ))}
          </div>
        </main>
      </section>

      <Section3_4Kids />

      <Pricing />
      <Footer />
    </>
  );
};

export default Anime;
