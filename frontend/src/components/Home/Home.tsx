// Home.tsx
import { useEffect, useState } from "react";
import type { Movie } from "../../constants/types";
import { movieCategories, fallbackMovieBallerina } from "../../constants";
import { fetchMovies, fetchMoviesByCategory, fetchMovieTrailerKey } from "../../services/apiTMDB";
import { HomeMovieInfo, HomeMovieCard, Pricing, CardSkeleton, Footer, Section3_4Kids, useGlobalProps, scrollToTop, useFetch } from "../exports";


const Home = () => {
  useEffect(()=> {scrollToTop()} ,[])

  const { query, customStyles, } = useGlobalProps();
  const { data: popularMovies, refetch, } = useFetch(() => fetchMovies({ query }), false);
  const { data: categorisedMovies, refetch: refetchCategorisedMovies} = useFetch(() => fetchMoviesByCategory({ genreId: selectedCategory?.id }), true);
  const [local_loading, setLocal_loading] = useState(true); // i did it loccaly so that the bg behaves smoothly
  useEffect(() => {if (popularMovies?.length > 0) setLocal_loading(false) }, [popularMovies]);

  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSelectMovie = async (movie: Movie) => {
    const trailerKey = await fetchMovieTrailerKey(movie.id);
    setSelectedMovie({ ...movie, trailerKey });
  };
  const [selectedCategory, setSelectedCategory] = useState<{ name: string, id: number } | null>(null);
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [bgUrl, setBgUrl] = useState<string>("");

  const firstTen = popularMovies?.slice(0, 10) || [];
  const ballerinaMovie = fallbackMovieBallerina;
  const fallbackMovie = fallbackMovieBallerina || firstTen[fallbackIndex]; // Always prefer Ballerina as the fallback movie if it exists
  // const fallbackMovie = firstTen[fallbackIndex]; // this is without ballerina
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
        {local_loading ? Array.from({ length: 10 }).map((_, i) => ( <CardSkeleton key={i} /> ))
                 : popularMovies?.map((movie: Movie) => (
              <HomeMovieCard key={movie.id} movie={movie} handleSelectMovie={handleSelectMovie} />
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
            <HomeMovieCard key={movie.id} movie={movie} handleSelectMovie={handleSelectMovie} dynamicBg={true} />
          ))}
        </div>
      </main>
    </section>

    <Section3_4Kids />

    <Pricing />

    <Footer/>
    </>
  );
};

export default Home;
