// api.ts
import type { MovieDetails } from "../constants/types";

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: import.meta.env.VITE_PUBLIC_MOVIE_API_KEY,
  headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_PUBLIC_MOVIE_API_KEY}`
  }
};

export const fetchMovies = async ({query} : {query: string}) =>{
  const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`; // if there is no query aka search then fetch the popular ones

  const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
  })

  const data = await response.json();
  return data.results; // TMDB returns a full response object, but we only need the 'results' array which contains the movies
}

export const fetchMoviesByCategory = async ({ genreId }: { genreId?: number }) => {
  const endpoint = genreId
    ? `${TMDB_CONFIG.BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=1`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=2`; // fallback to popular

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  try {
      const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
          method: 'GET',
          headers: TMDB_CONFIG.headers,
      })
      const data = await response.json();
      return data;
  } catch (err) {
      console.log(err);
      throw err;
  }
}

// ------------ Series ------------ //

export const fetchSeries = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc`; // if no query, fetch popular series

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  const data = await response.json();
  return data.results; // returns the array of series
};

export const fetchSeriesDetails = async (seriesId: string): Promise<MovieDetails> => {
  try {
      const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${seriesId}?api_key=${TMDB_CONFIG.API_KEY}`, {
          method: 'GET',
          headers: TMDB_CONFIG.headers,
      })
      const data = await response.json();
      return data;
  } catch (err) {
      console.log(err);
      throw err;
  }
}

export const fetchSeriesByCategory = async ({ genreId }: { genreId?: number }) => {
  const endpoint = genreId
    ? `${TMDB_CONFIG.BASE_URL}/discover/tv?with_genres=${genreId}&sort_by=popularity.desc&page=1`
    : `${TMDB_CONFIG.BASE_URL}/discover/tv?sort_by=popularity.desc&page=2`; // fallback to popular series

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  const data = await response.json();
  return data.results;
};





















// fetchMovies deleted
// if (!response.ok) {
//     // @ts-ignore
//     throw new Error('Failed to fetch movies', response.statusText);
// }

// fetchMovieDetails deleted
// if (!response.ok) throw new Error('Failed to fetch movie details')