import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  movie: any,
  key: any
}
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const FavouriteCard = ({ movie } : Props) => {
  const isMovie = !!movie.title;

  return (
    <Link to={isMovie ? `/${movie.id}` : `/series/${movie.id}`} 
      className="flex rounded-lg shadow hover:scale-105 transition1 min-w-[150px] max-sm:min-w-[80px] max-sm:max-w-[80px] w-[150px] px-[5px]"
    >
      <img
        src={`${IMAGE_BASE}${movie.poster_path}`}
        className="w-full aspect-[2/3] object-cover rounded-md"
        loading="lazy"
        alt={isMovie ? movie.title : movie.name}
      />
    </Link>
  )
}

export default FavouriteCard
