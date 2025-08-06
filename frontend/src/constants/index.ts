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
export const fallbackMovieLiloAndStitch = { // Fallback Movie: Ballerina
  adult: false,
  backdrop_path: "/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
  genre_ids: [10751, 878, 35, 12],
  id: 552524,
  original_language: "en",
  original_title: "Lilo & Stitch",
  overview:
    "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
  popularity: 270.3086,
  poster_path: "/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg",
  release_date: "2025-05-17",
  title: "Lilo & Stitch",
  video: false,
  vote_average: 7.336,
  vote_count: 1251,
  trailerKey: "your-trailer-key-here" // Optional, if you have it
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
export const fallbackSeriesBen10 = {
  adult: false,
  backdrop_path: "/2TLURbcJ8fzkP2OhFTnDIPMaeZr.jpg",
  first_air_date: "2005-12-27",
  genre_ids: [16, 10765, 10759, 35, 10762],
  id: 4686,
  name: "Ben 10",
  origin_country: ["US"],
  original_language: "en",
  original_name: "Ben 10",
  overview:
    "When 10-year-old Ben Tennyson discovers a mysterious device, he gains the power to change into ten different alien heroes, each with uniquely awesome powers. With such abilities at his disposal, Ben realizes a greater responsibility to help others and stop evildoers, but that doesn't mean he's above a little superpowered mischief now and then.",
  popularity: 25.7327,
  poster_path: "/eogRp6oAPK0SEvQmCrQ78LTlSdp.jpg",
  vote_average: 8.165,
  vote_count: 1711,
  trailerKey: "", // Added as it was missing; set to empty string since no trailerKey was provided
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
export const fallbackSeriesScoobyDoo = { // Fallback Series: Scooby-Doo, Where Are You!
  adult: false,
  backdrop_path: "/m8xpVIsZlCVndlDxLrM8AUIg5GG.jpg",
  genre_ids: [16, 9648, 35, 10762, 10751],
  id: 926,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Scooby-Doo, Where Are You!",
  name: "Scooby-Doo, Where Are You!",
  overview: "Fred, Daphne, Velma, Shaggy, and the talking dog, Scooby-Doo, travel on the Mystery Machine van, in search of weird mysteries to solve.",
  popularity: 15.1721,
  poster_path: "/lTzUSCtXR77CmGmEHcaxpxu2b4h.jpg",
  first_air_date: "1969-09-13",
  vote_average: 7.824,
  vote_count: 748,
  trailerKey: "P7idsl0lUjM" // Example YouTube key, you can replace with actual
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
export const forKidsExcludedCategories = [
  'horror', 'thriller', 'adult', 'crime', 'war', 'drama', 'mystery', 
  'romance', 'documentary', 'sci-fi & fantasy', 'war & politics', 'news', 'reality', 'western'
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