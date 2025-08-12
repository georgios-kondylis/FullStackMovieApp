// MovieDetails.tsx
import { useEffect, useState } from 'react'
import { useParams, useLocation, } from 'react-router-dom'
import { fetchMovieDetails, fetchSeriesDetails } from '../../services/apiTMDB'
import { useGlobalProps, scrollToTop, useFetch, StarRating, TrailerIframed, GoBackBtn, CastAndCrew, NotAvailableMessageToUser } from "../exports";
import { addMovieToLiked, addMovieToDisliked, addMovieToFavourites, removeMovieFromFavourites } from "../../services/apiBackend";

import type {
  MovieDetails as MovieDetailsType,
  SeriesDetails as SeriesDetailsType,
  Credits
} from '../../constants/types'

type WithCredits = (MovieDetailsType | SeriesDetailsType) & { credits: Credits; trailerKey?: string };

const MovieDetails = () => {
  useEffect(() => {scrollToTop();}, [])
  
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  // -------------------------------------------- //

  const { customStyles, setProfileIsOpen, user, setUser, selectedProfile, setSelectedProfile, setNotAvailbaleMessage, notAvailbaleMessage } = useGlobalProps()
  const { id } = useParams()
  const location = useLocation()

  const isSeries = location.pathname.startsWith('/series/')
  const isAnime = location.pathname.startsWith('/anime/')
  const isMovie = !isSeries && !isAnime

  const fetcher = isMovie
    ? () => fetchMovieDetails(id!)
    : () => fetchSeriesDetails(id!) // used for both series & anime

  const { data: currentMovie, loading } = useFetch<WithCredits>(fetcher, true);

  if (loading || !currentMovie)
    return <p className="text-white p-4">Loading...</p>

  const imgBgUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`

  const bookmarked = selectedProfile?.favourites?.some((fav: any) => fav.id === currentMovie.id);
  const liked = selectedProfile?.likedMovies?.some((fav: any) => fav.id === currentMovie.id);
  const disliked = selectedProfile?.dislikedMovies?.some((fav: any) => fav.id === currentMovie.id);

    //------------------- Like / Dislike Handlers ------------------- //

  const handleLikeMovie = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data = await addMovieToLiked(user.email, selectedProfile, currentMovie);
      if (data && data.user) {
        setUser(data.user);
        const updatedProfile = data.user.profiles.find((p: any) => p._id === selectedProfile._id);
        if (updatedProfile) setSelectedProfile!(updatedProfile);
      }
      console.log("opperation successfully executed ✅:", data);
    } catch (error) {
      console.error("❌ Failed to like Movie:", error);
    }
  };
  const handleDislikeLikeMovie = async (e: React.MouseEvent) => {
    e.stopPropagation();
      
    try {
      const data = await addMovieToDisliked(user.email, selectedProfile, currentMovie);
      if (data && data.user) {
        setUser(data.user);
        const updatedProfile = data.user.profiles.find((p: any) => p._id === selectedProfile._id);
        if (updatedProfile) setSelectedProfile!(updatedProfile);
      }
      console.log("opperation successfully executed ✅:", data);
    } catch (error) {
      console.error("❌ Failed to dislike Movie:", error);
    }
  };

  //------------------- Fav / UnFav Handlers ------------------- //

  const handleAddMovieToFavourites = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const data = await addMovieToFavourites(user.email, selectedProfile, currentMovie);
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
      const data = await removeMovieFromFavourites(user.email, selectedProfile, currentMovie);
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

  const handleClickWatchMovie = () => {
    setNotAvailbaleMessage!('This project is currently under development therefore full movies are not yet available. Feel free to browse, watch trailers, bookmark, like, and dislike movies as a movie library.')
    setTimeout(() => {setNotAvailbaleMessage!('')}, 8000)
  }

  return (
    <section className={`w-full flex justify-center relative min-h-[100vh] overflow-hidden ${customStyles?.mainBg}`} onClick={() => setProfileIsOpen!(false)}>
      {/* Background image */}
      <div className="absolute inset-0 h-[80vh] bg-cover bg-center z-0"
          style={{  backgroundImage: currentMovie.backdrop_path
              ? `linear-gradient(to top, rgba(3,10,27,0.9), rgba(3,10,27,0) 60%), url(${imgBgUrl})`
              : undefined,  backgroundColor: '#030A1B', }}  
      />

      {/* Content */}
      <main id='CONTENT' className="relative w-full flex flex-col min-h-[100vh] MAX_W mainPX pb-[70px]">
        {showTrailerModal && (
           <TrailerIframed currentMovie={currentMovie} setShowTrailerModal={setShowTrailerModal} />
        )}

        <div id='' className="text-white w-full flex flex-col gap-7 mt-[55vh]">

          <div id='Info_&_Buttons_TOP' className='flex justify-between md:items-center gap-8
                max-md:flex-col'>
            <div className='flex flex-col gap-4'>
              <h1 id='TITLE' className="text-4xl font-bold mb-4 drop-shadow-md text-gradient">
                {'title' in currentMovie ? currentMovie.title : currentMovie.name}
              </h1>
              <div id='RUNTIME' className="flex gap-2 txtFadedGray text-[14px]">
                <p className='text-nowrap'>
                  {'release_date' in currentMovie
                    ? new Date(currentMovie.release_date).getFullYear()
                    : 'first_air_date' in currentMovie
                      ? new Date(currentMovie.first_air_date).getFullYear()
                      : 'N/A'}
                </p>

                <p className='text-nowrap'>
                  {'runtime' in currentMovie
                    ? `${currentMovie.runtime} min`
                    : ``}
                </p>
              </div>
              <div id='RATING' className='w-fit flex gap-2 rounded-[5px] txtFadedGray'>
                <StarRating rating={currentMovie.vote_average / 2} />
                <span className="text-[15px] text-[#e1e1e1cd] flex items-center gap-3">
                  {(currentMovie.vote_average / 2).toFixed(1)} / 5  
                  <img src="/icons/imdb.png" alt="" />
                  ({currentMovie.vote_count.toLocaleString()} votes )
                </span>
              </div>
              <div id='INTERACTIONS' className='flex gap-3 items-center text-[#ffffffb0]'>
                <div className={`w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer transition1 border p-2 ${customStyles?.mainBgDark} hover:text-[#ffffff]`}
                    onClick={ handleLikeMovie }>
                  <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`} />
                </div>

                <div className={`w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer transition1 border p-2 ${customStyles?.mainBgDark} hover:text-[#ffffff]`}
                    onClick={ handleDislikeLikeMovie }>
                  <i className={`${disliked ? 'fa-solid' : 'fa-regular'} fa-thumbs-down`} />
                </div>

                <div className={`w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer transition1 border p-2 ${customStyles?.mainBgDark} hover:text-[#ffffff]`}
                     onClick={ !bookmarked ?  handleAddMovieToFavourites : handleRemoveMovieFromFavourites }>
                  <i className={`${bookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark`} />
                </div>
              </div>
            </div>

            <div id='BUTTONS' className=' flex gap-4 h-fit w-fit flex-nowrap'>
              <button id='WATCH_MOVIE_BUTTON' className={`relative ${customStyles?.mainBgDark} min-w-fit overflow-hidden group rounded-[5px] px-[18px] py-[10px] flex items-center gap-3 text-white border border-[#ffffff22] hover:border-white font-semibold transition2 cursor-pointer text-nowrap
                      max-md:px-[14px] max-md:py-[7px] max-md:text-[14px]`}
                      onClick={handleClickWatchMovie}>
                <img src={isMovie? "/icons/playMovie.png" : '/icons/episodesIcon.png'} className='w-[30px]  max-md:w-[26px] z-10' alt="Play Icon" />
                <p className='z-10 transition1 group-hover:text-black'>
                  {isMovie? ' Watch full movie' : 'View Episodes' }
                </p>
                {/* Fill animation layer */}
                <span  className="absolute inset-0 w-full h-full -z-0 left-[-100%] bg-gradient-to-r from-[#ffffff] to-[#b3b3b3] group-hover:left-0 transition-all duration-500 ease-out" />
              </button>

              {currentMovie.trailerKey ? (
                <button onClick={() => setShowTrailerModal(true)}
                  className={`flex gap-2 items-center px-[18px] py-[10px] text-white rounded-[5px] ${customStyles?.btnColor} transition1 cursor-pointer text-nowrap font-semibold`}
                >
                  <i className="fa-solid fa-play text-white"/>
                  <p>Watch Trailer</p>
                </button>
              ) : (
                <button disabled className={`flex gap-2 items-center px-[18px] py-[10px] text-white/50 bg-gray-600/50 rounded-[5px] cursor-not-allowed text-nowrap font-semibold`} >
                  <i className="fa-solid fa-ban text-white/50" />
                  <p>No Trailer Available</p>
                </button>
              )}

            </div>
          </div>

          <p id='OVERVIEW' className={`flex flex-col gap-3 leading-relaxed drop-shadow-md md:max-w-[65vw] mt-[60px] ${customStyles?.basicDynamicTxt}`}>
            <span className='txtFadedGray text-lg font-semibold'>Overview</span>
            <span>{currentMovie.overview!.replace(/–/g, "")}</span>
          </p>
          <div id='GENRES' className='flex items-center gap-4'>
           {currentMovie.genres && currentMovie.genres.length > 0
             ? currentMovie.genres.map((genre, i) => <p key={i}
             className={`${customStyles?.basicDynamicTxt} ${customStyles?.btnColor2} px-4 py-2 text-nowrap rounded-full`}> {genre.name}</p>)
             : 'No genres available'}
          </div>

          {isMovie && (
          <div id='BUDGET_&_REVENUE' className='flex items-center gap-10'>
            <div className='flex flex-col gap-2'>
              <p className='font-semibold txtFadedGray'>Budget</p>
              <p className={`${customStyles?.basicDynamicTxt}`}>
                {currentMovie?.budget
                  ? `$${(currentMovie?.budget / 1_000_000).toFixed(1)}M`
                  : 'N/A'}
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='font-semibold txtFadedGray'>Revenue</p>
              <p  className={`${customStyles?.basicDynamicTxt}`}>
                {currentMovie?.revenue
                  ? `$${(currentMovie?.revenue / 1_000_000).toFixed(1)}M`
                  : 'N/A'}
              </p>
            </div>
          </div>
            )}
          <div id='PRODUCTION COMPANIES' className='flex flex-col gap-2'>
            <p className='txtFadedGray font-semibold'> Production Companies:</p>
            <p className={`${customStyles?.basicDynamicTxt}`}>
              {currentMovie.production_companies.map((c) => c.name).join(', ')}
            </p>
          </div>
          {/* CAST AND CREW */}
          {currentMovie.credits && (
            <CastAndCrew credits={currentMovie.credits} />
          )}
           <div className='w-full flex justify-end'>
            <GoBackBtn/>
           </div>
        </div>

      </main>

      {notAvailbaleMessage !== '' && <NotAvailableMessageToUser />}
    </section>
  )
}

export default MovieDetails
