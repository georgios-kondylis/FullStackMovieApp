import { useParams, useLocation } from 'react-router-dom'
import { fetchMovieDetails, fetchSeriesDetails } from '../../services/api'
import useFetch from '../../services/useFetch'
import type {
  MovieDetails as MovieDetailsType,
  SeriesDetails as SeriesDetailsType,
} from '../../constants/types'
import { useGlobalProps } from '../../GlobalContext'

const MovieDetails = () => {
  const { isDarkMode, customStyles } = useGlobalProps()
  const { id } = useParams()
  const location = useLocation()

  const isSeries = location.pathname.startsWith('/series/')
  const isAnime = location.pathname.startsWith('/anime/')
  const isMovie = !isSeries && !isAnime

  const fetcher = isMovie
    ? () => fetchMovieDetails(id!)
    : () => fetchSeriesDetails(id!) // used for both series & anime

  const {
    data: currentMovie,
    loading,
  } = useFetch<MovieDetailsType | SeriesDetailsType>(fetcher, true)

  if (loading || !currentMovie)
    return <p className="text-white p-4">Loading...</p>

  const imgBgUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`

  return (
    <section className={`w-full flex justify-center relative min-h-[100vh] overflow-hidden ${customStyles?.Bg_Txt} `}>
      {/* Background image */}
      <div className="border absolute inset-0 h-[80vh] bg-cover bg-center z-0"
          style={{  backgroundImage: currentMovie.backdrop_path
              ? `linear-gradient(to top, rgba(3,10,27,0.9), rgba(3,10,27,0) 60%), url(${imgBgUrl})`
              : undefined,  backgroundColor: '#030A1B', }}  
      />

      {/* Content */}
      <main className="relative w-full flex justify-center items-center min-h-[100vh] MAX_W">
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
            {'title' in currentMovie
              ? currentMovie.title
              : currentMovie.name}
          </h1>
          <p className="text-lg leading-relaxed drop-shadow-md">
            {currentMovie.overview}
          </p>
        </div>
      </main>
    </section>
  )
}

export default MovieDetails
