export type GlobalContextType = {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;

  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
  
  query: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;

  customStyles?: {
    mainBgDark: string;
    mainBg: string;
    mainGrayBg: string;
    mainTxtHover: string;
    Bg_Txt: string;
    btnColor: string;
    btnColor2: string;
    basicDynamicTxt: string,
  }
};

export type Movie = {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  trailerKey?: string | null;
}

export type Serie = {
  id: number;
  name: string;                    // series title is "name"
  adult?: boolean;                 // usually movies have this, but series can have it too (optional)
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_name: string;           // original series title
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;          // release date equivalent
  vote_average: number;
  vote_count: number;
  trailerKey?: string | null;
};

export type TrendingMovie = {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
}



export type SeriesDetails = {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  } | null;
  name: string;
  next_episode_to_air: null | {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  budget?: number;
  revenue?: number;
};

export type TrendingCardProps = {
  movie: TrendingMovie;
  index: number;
}
