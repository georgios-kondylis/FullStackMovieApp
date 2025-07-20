import { useEffect, useState } from "react";
import useFetch from "../../services/useFetch";
import { fetchMovies, fetchMoviesByCategory } from "../../services/api";
import type { Movie } from "../../constants/types";
import { useGlobalProps } from "../../GlobalContext";
import { HomeMovieInfo, HomeMovieCard, } from "../exports";
import { movieCategories } from "../../constants";
import KidsSectionBg from "./KidsSectionBg";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {

  const { query, customStyles, isDarkMode } = useGlobalProps();

  const { data: popularMovies, refetch } = useFetch(() => fetchMovies({ query }), false);
  const { data: categorisedMovies, refetch: refetchCategorisedMovies} = useFetch(() => fetchMoviesByCategory({ genreId: selectedCategory?.id }), true);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{ name: string, id: number } | null>(null);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [bgUrl, setBgUrl] = useState<string>("");

  const firstTen = popularMovies?.slice(0, 10) || [];
  // Always prefer Ballerina as the fallback movie if it exists
  const ballerinaMovie = popularMovies?.find((movie: { title: string; }) =>  movie.title.toLowerCase().includes("ballerina"));
  // const fallbackMovie = firstTen[fallbackIndex]; // this is without ballerina
  const fallbackMovie = ballerinaMovie || firstTen[fallbackIndex];
  const currentMovie = selectedMovie || fallbackMovie;

 // Update background image and preload it
  useEffect(() => {
    if (!currentMovie?.backdrop_path) return;

    const img = new Image();
    const url = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;
    img.src = url;
    img.onload = () => setBgUrl(url); // Only set once it's loaded
  }, [currentMovie]);

  // Rotate fallback movie every 8s
  useEffect(() => {
    if (!popularMovies || selectedMovie ) return;

    const update = () => {
      const random = Math.floor(Math.random() * firstTen.length);
      setFallbackIndex(random);
    };

    update();
    const interval = setInterval(update, 8000);
    return () => clearInterval(interval);
  }, [popularMovies, selectedMovie, ballerinaMovie]);

  // Refetch when query changes
  useEffect(() => {
    const timer = setTimeout(refetch, 200);
    return () => clearTimeout(timer);
  }, [query]);

  // Refetch when category changes
  useEffect(() => {
    if (selectedCategory) {
      refetchCategorisedMovies();
    }
  }, [selectedCategory]);
  

  return (
    <>
    <section id="Setion1" className="pt-[90px] pb-[10px] min-h-screen bg-cover bg-center xl:bg-left bg-no-repeat transition1 flex justify-center mainPX"
       style={{ backgroundImage: bgUrl
          ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 90%), url(${bgUrl})`
          : undefined, backgroundColor: "#000", }}
     >
      <main className="content-container1 flex flex-col mt-[300px] MAX_W">

        {currentMovie && <HomeMovieInfo currentMovie={currentMovie} />}
        <h1 className="text-white txtShadowBlack text-[40px] mt-[80px]">Trends</h1>

        <div className="flex gap-4 overflow-x-auto py-6 scrollbar-hide">
          {popularMovies?.map((movie: Movie) => (
            <HomeMovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
          ))}
        </div>

      </main>
    </section>

    <section id="Section2" className={`relative w-full flex justify-center mainPX ${customStyles?.mainBg}`}>
      <main className="content-container2 MAX_W flex flex-col">
        
        {/* FILTER BAR */}
        <div id="moviesFilters"className="z-1 flex items-center gap-4 overflow-x-auto pt-[30px] pb-[70px] scroll-smooth scroll-bar-hidden"
          style={{  WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',  }}
        >
          <i className={`fa-solid fa-chevron-left ${customStyles?.basicDynamicTxt}`} />
          {movieCategories.map((category, i) => (
            <button key={i} className={`hover:bg-[#008cff] border-[2px] border-[#008cff] ${customStyles?.basicDynamicTxt} px-4 py-2 text-nowrap rounded-full transition1 cursor-pointer
                    ${category.name === selectedCategory?.name && 'bg-[#008cff]'}`}
              onClick={() => setSelectedCategory(prev => prev?.id === category.id ? null : category)}
            >
              {category.name}
            </button>
          ))}
          <i className={`fa-solid fa-chevron-right ${customStyles?.basicDynamicTxt}`} />
        </div>

        {/* SECTION TITLE */}
        <h1 className={`z-1 text-[2.5rem] md:text-[3rem] mb-[15px] ${customStyles?.basicDynamicTxt}`} >
          {selectedCategory?.name || 'Select a category'}
        </h1>

        {/* MOVIE GRID */}
        <div className="z-1 flex gap-4 overflow-x-auto py-6 scrollbar-hide">
          {categorisedMovies?.map((movie: Movie) => (
            <HomeMovieCard key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} dynamicBg={true} />
          ))}
        </div>
      </main>
    </section>

    <section id="Section3_4Kids"  className={`relative w-full flex justify-center mainPX`}>
      <KidsSectionBg/>
      <main className="flex items-center z-1 flex-col min-h-[80vh] text-white">
        <div className="flex flex-col items-center mt-[50px]">
          <h1 className="text-3xl font-bold mb-[20px] text-center txtShadowBlackLight">
            Family Friendly Streaming
          </h1>
          <p className="mt-2 font-semibold tracking-wide text-lg max-sm:text-[16px] text-center txtShadowBlackLight">
            Let your little ones enjoy their favorite heroes in a fun, <br /> safe environment completely free from inappropriate content.
          </p>
        </div>

        <Link to="/4kids" className={`absolute bg-[#17161a] text-[#ffffff] px-[12px] py-[6px] rounded-[7px] bottom-[100px] font-semibold transition1 hover:scale-[1.1] `}>
          Explore the Kids Section
        </Link>
      </main>
    </section>

    <Footer/>

    </>
  );
};

export default Home;
