import Home from "./Home/Home";
import Series from "./Series/Series";
import HomeMovieInfo from "./Home/HomeMovieInfo";
import HomeMovieCard from "./Home/HomeMovieCard";
import Loader from "./ui/Loader";
import { scrollToTop } from "../constants/functions";
import SeriesCard from "./Series/SeriesCard";
import Series_Info from "./Series/Series_Info";
import Footer from "./Footer/Footer";
import KidsSectionBg from "./ui/KidsSectionBg";
import CardSkeleton from "./Home/CardSkeleton";
import Pricing from "./ui/Pricing/Pricing";
import { useGlobalProps } from "../GlobalContext";
import Section3_4Kids from "./4kids/Section3_4Kids";
import useFetch from "../services/useFetch";
import StarRating from "./ui/StarRating";
import GoBackBtn from "./ui/GoBackBtn";
import TrailerIframed from "./ui/TrailerIframed";
import CastAndCrew from "./MovieDetails/CastAndCrew";


export {
  Home,
  Series,
  HomeMovieCard,
  HomeMovieInfo,
  Loader,
  scrollToTop,
  SeriesCard,
  Series_Info,
  Footer,
  KidsSectionBg,
  CardSkeleton,
  Pricing,
  useGlobalProps,
  Section3_4Kids,
  useFetch,
  StarRating,
  GoBackBtn,
  TrailerIframed,
  CastAndCrew,
}