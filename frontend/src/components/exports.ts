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
import MovieDetails from "./MovieDetails/MovieDetails";
import Navbar from "./Navbar/Navbar";
import Anime from "./Anime/Anime";
import SignUp from "./AUTH/SignUp/SignUp";
import SignIn from "./AUTH/SignIn/SignIn";
import MoviesBg from "./AUTH/ui/MoviesBg";
import Logo from "./ui/Logo";
import MessageToUser from "./AUTH/ui/MessageToUser";
import SubmitBtn from "./AUTH/ui/SubmitBtn";
import Profiles from "./AUTH/profiles/Profiles";
import CreateProfileCard from "./AUTH/profiles/profilesUi/cards/CreateProfileCard";
import CreateProfile from "./AUTH/profiles/CreateProfile";
import ProfileIconsShowcase from "./AUTH/profiles/profilesUi/ProfileIconsShowcase";
import ProfileCard from "./AUTH/profiles/profilesUi/cards/ProfileCard";
import BgTopSection from "./Home/BgTopSection";
import ProfileDropdown from "./Navbar/ProfileDropdown";
import ViewProfile from "./AUTH/profiles/ViewProfile";
import EditProfile from "./AUTH/profiles/EditProfile";
import MobileMenu from "./Navbar/MobileMenu";
import NotAvailableMessageToUser from "./ui/NotAvailableMessageToUser";




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
  MovieDetails,
  Navbar,
  Anime,
  SignUp,
  SignIn,
  MoviesBg,
  Logo,
  MessageToUser,
  SubmitBtn,
  Profiles,
  CreateProfileCard,
  ProfileCard,
  CreateProfile,
  ProfileIconsShowcase,
  BgTopSection,
  ProfileDropdown,
  ViewProfile,
  EditProfile,
  MobileMenu,
  NotAvailableMessageToUser,
}