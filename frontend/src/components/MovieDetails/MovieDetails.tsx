// MovieDetails.tsx
import { useParams, useLocation } from 'react-router-dom'
import { fetchMovieDetails, fetchSeriesDetails } from '../../services/api'
import useFetch from '../../services/useFetch'
import type {
  MovieDetails as MovieDetailsType,
  SeriesDetails as SeriesDetailsType,
} from '../../constants/types'

const MovieDetails = () => {
  const { id } = useParams()
  const location = useLocation()

  // If URL starts with /series, it's a series. Otherwise, it's a movie.
  const isSeries = location.pathname.startsWith('/series/')
  const isMovie = !isSeries

  const { data, loading, } = useFetch<MovieDetailsType | SeriesDetailsType>(
    isMovie ? () => fetchMovieDetails(id!) : () => fetchSeriesDetails(id!), true
)

  if (loading || !data) return <p className="text-white p-4">Loading...</p>

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold">
        {'title' in data ? data.title : data.name}
      </h1>
      <p className="mt-2">{data.overview}</p>
      <img
        className="mt-4 rounded"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={'title' in data ? data.title : data.name}
      />
    </div>
  )
}

export default MovieDetails
