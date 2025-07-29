// constants/index.ts

export const navLinks = [
  { title: 'Movies', href: '/' },
  { title: 'Series', href: '/series' },
  { title: 'Anime', href: '/anime' },
  { title: 'Pricing', href: '#pricing' },
]
// Local fallback movie objects for the hero section Bg


export const fallbackMovieBallerina = { // Fallback Movie: Ballerina
  adult: false,
  backdrop_path: "/oPgXVSdGR9dGwbmvIToOCMmsdc2.jpg",
  genre_ids: [28, 53, 80],
  id: 541671,
  original_language: "en",
  original_title: "Ballerina",
  overview:
    "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
  popularity: 340.3796,
  poster_path: "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
  release_date: "2025-06-04",
  title: "Ballerina",
  video: false,
  vote_average: 7.481,
  vote_count: 1075,
  trailerKey: "b9Rr9ygb-ac"
};
export const fallbackSeriesYou = { // Fallback Series: You
  adult: false,
  backdrop_path: "/gzOIymABxmetAECXtazEYCpMmfb.jpg",
  genre_ids: [80],
  id: 78191,
  origin_country: ["US"],
  original_language: "en",
  original_name: "You",
  name: "You",
  overview:
    "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.",
  popularity: 95.6066,
  poster_path: "/oANi0vEE92nuijiZQgPZ88FSxqQ.jpg",
  first_air_date: "2018-09-09",
  vote_average: 8.035,
  vote_count: 3585,
  trailerKey: "v99ooSjCVhg"
};
export const fallbackSeriesSquidGame = { // Fallback Series: Squid Game
  adult: false,
  backdrop_path: "/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
  first_air_date: "2021-09-17",
  genre_ids: [10759, 9648, 18], // Action & Adventure, Mystery, Drama
  id: 93405,
  name: "Squid Game",
  origin_country: ["KR"],
  original_language: "ko",
  original_name: "오징어 게임",
  overview:
    "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
  popularity: 382.8292,
  poster_path: "/onV0JoOJeiUHG1rfpB2lFTVw1vN.jpg",
  vote_average: 7.865,
  vote_count: 16464,
  trailerKey: "oqxAJKy0ii4"
};



export const movieCategories = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Horror", id: 27 },
  { name: "Romance", id: 10749 },
  { name: "Sci-Fi", id: 878 },
  { name: "Animation", id: 16 },
  { name: "Fantasy", id: 14 },
  { name: "Thriller", id: 53 },
  { name: "Adventure", id: 12 },
  { name: "Crime", id: 80 },
  { name: "Documentary", id: 99 },
  { name: "Family", id: 10751 },
  { name: "Mystery", id: 9648 },
  { name: "War", id: 10752 },
];
export const seriesCategories = [
  { name: "Action & Adventure", id: 10759 },
  { name: "Animation", id: 16 },
  { name: "Comedy", id: 35 },
  { name: "Crime", id: 80 },
  { name: "Documentary", id: 99 },
  { name: "Drama", id: 18 },
  { name: "Family", id: 10751 },
  { name: "Kids", id: 10762 },
  { name: "Mystery", id: 9648 },
  { name: "News", id: 10763 },
  { name: "Reality", id: 10764 },
  { name: "Sci-Fi & Fantasy", id: 10765 },
  { name: "Soap", id: 10766 },
  { name: "Talk", id: 10767 },
  { name: "War & Politics", id: 10768 },
  { name: "Western", id: 37 },
];



// const mobile = useMediaQuery({ maxWidth: 450 });
// const tablet = useMediaQuery({ minWidth: 451, maxWidth: 768 });
// const laptop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
// const xl = useMediaQuery({ minWidth: 1025 });