// constants/index.ts

export const navLinks = [
  { title: 'Movies', href: '/' },
  { title: 'Series', href: '/series' },
  { title: 'Anime', href: '/anime' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Contact', href: '/contact' },
]
// Local fallback movie objects for the hero section Bg

export const fallBackMovies = [
  {
    adult: false,
    backdrop_path: "/sItIskd5xpiE64bBWYwZintkGf3.jpg",
    genre_ids: [28, 53, 80],
    id: 541671,
    original_language: "en",
    original_title: "Ballerina",
    overview:
      "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
    popularity: 537.6592,
    poster_path: "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
    release_date: "2025-06-04",
    title: "Ballerina",
    video: false,
    vote_average: 7.426,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: "/w1oD1MzHjnBJc5snKupIQaSBLIh.jpg",
    genre_ids: [28, 12, 878],
    id: 559,
    original_language: "en",
    original_title: "Spider-Man 3",
    overview:
      "The seemingly invincible Spider-Man goes up against an all-new crop of villains—including the shape-shifting Sandman. While Spider-Man’s superpowers are altered by an alien organism, his alter ego, Peter Parker, deals with nemesis Eddie Brock and also gets caught up in a love triangle.",
    popularity: 15.0935,
    poster_path: "/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
    release_date: "2007-05-01",
    title: "Spider-Man 3",
    video: false,
    vote_average: 6.44,
    vote_count: 14528,
  },
  {
    adult: false,
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    genre_ids: [12, 878, 28],
    id: 299534,
    original_language: "en",
    original_title: "Avengers: Endgame",
    overview:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
    popularity: 16.6708,
    poster_path: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    release_date: "2019-04-24",
    title: "Avengers: Endgame",
    video: false,
    vote_average: 8.24,
    vote_count: 26486,
  },
  {
    adult: false,
    backdrop_path: "/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    genre_ids: [28, 35, 878],
    id: 533535,
    original_language: "en",
    original_title: "Deadpool & Wolverine",
    overview:
      "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    popularity: 40.226,
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    release_date: "2024-07-24",
    title: "Deadpool & Wolverine",
    video: false,
    vote_average: 7.6,
    vote_count: 7451,
  },
  {
    adult: false,
    backdrop_path: "/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg",
    genre_ids: [18, 28],
    id: 677179,
    original_language: "en",
    original_title: "Creed III",
    overview:
      "After dominating the boxing world, Adonis Creed has thrived in his career and family life. When a childhood friend and former boxing prodigy, Damian Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damian — a fighter with nothing to lose.",
    popularity: 9.2907,
    poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
    release_date: "2023-03-01",
    title: "Creed III",
    video: false,
    vote_average: 7.104,
    vote_count: 2659,
  },
];

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



// const mobile = useMediaQuery({ maxWidth: 450 });
// const tablet = useMediaQuery({ minWidth: 451, maxWidth: 768 });
// const laptop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
// const xl = useMediaQuery({ minWidth: 1025 });