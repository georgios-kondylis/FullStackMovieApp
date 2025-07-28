// api.ts
import type { MovieDetails, SeriesDetails, Credits } from "../constants/types";

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
// i uptated it with extra api call to fetch the credits like actors etc and Trailer key to add to <a href
export const fetchMovieDetails = async ( movieId: string): Promise<MovieDetails & { credits: Credits; trailerKey?: string }> => {
  try {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
      fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }),
      fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }),
      fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }),
    ]);

    if (!detailsRes.ok || !creditsRes.ok || !videosRes.ok) {
      throw new Error('Failed to fetch movie details, credits, or videos');
    }

    const data = await detailsRes.json();
    const creditsData = await creditsRes.json();
    const videosData = await videosRes.json();

    const trailer = videosData.results.find(
      (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );

    return {
      ...data,
      credits: creditsData,
      trailerKey: trailer?.key ?? null,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const fetchMovieTrailerKey = async (movieId: number | string): Promise<string | null> => {
  try {
    const res = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_CONFIG.API_KEY}`, {
      method: 'GET',
      headers: TMDB_CONFIG.headers, // 👈 Add headers here to be consistent
    });
    if (!res.ok) {
      console.warn(`Failed to fetch videos for movie ${movieId}, status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    // Log data to debug missing trailers
   // console.log(`Video results for movie ${movieId}:`, data.results);
    const trailer = data.results.find(
      (video: any) => video.type.toLowerCase() === 'trailer' && video.site === 'YouTube'
    );
    return trailer?.key || null;
  } catch (err) {
    console.error('Failed to fetch trailer:', err);
    return null;
  }
};


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
// i uptated it with extra api call to fetch the credits like actors etc and Trailer key to add to <a href
export const fetchSeriesDetails = async (seriesId: string): Promise<SeriesDetails & { credits: Credits; trailerKey?: string }> => {
  try {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
      fetch(`${TMDB_CONFIG.BASE_URL}/tv/${seriesId}?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }),
      fetch(`${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/credits?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }),
      fetch(`${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/videos?api_key=${TMDB_CONFIG.API_KEY}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
      }),
    ]);

    if (!detailsRes.ok || !creditsRes.ok || !videosRes.ok) {
      throw new Error('Failed to fetch series details, credits, or videos');
    }

    const data = await detailsRes.json();
    const creditsData = await creditsRes.json();
    const videosData = await videosRes.json();

    const trailer = videosData.results.find(
      (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );

    return {
      ...data,
      credits: creditsData,
      trailerKey: trailer?.key ?? null,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Not used Yet
export const fetchSeriesTrailerKey = async (seriesId: number | string): Promise<string | null> => {
  try {
    const res = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${seriesId}/videos?api_key=${TMDB_CONFIG.API_KEY}`, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });
    if (!res.ok) {
      console.warn(`Failed to fetch videos for series ${seriesId}, status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    console.log(`Video results for series ${seriesId}:`, data.results);
    const trailer = data.results.find(
      (video: any) => video.type.toLowerCase() === 'trailer' && video.site === 'YouTube'
    );
    return trailer?.key || null;
  } catch (err) {
    console.error('Failed to fetch series trailer:', err);
    return null;
  }
};




// OLD AND SIMPLIFIED
// export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
//   try {
//       const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
//           method: 'GET',
//           headers: TMDB_CONFIG.headers,
//       })
//       const data = await response.json();
//       return data;
//   } catch (err) {
//       console.log(err);
//       throw err;
//   }
// }

// export const fetchSeriesDetails = async (seriesId: string): Promise<MovieDetails> => {
//   try {
//       const response = await fetch(`${TMDB_CONFIG.BASE_URL}/tv/${seriesId}?api_key=${TMDB_CONFIG.API_KEY}`, {
//           method: 'GET',
//           headers: TMDB_CONFIG.headers,
//       })
//       const data = await response.json();
//       return data;
//   } catch (err) {
//       console.log(err);
//       throw err;
//   }
// }