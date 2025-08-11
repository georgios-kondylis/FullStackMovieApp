import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { GlobalContextType } from "./constants/types";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const toggleProfileIsOpen = () => setProfileIsOpen((prev) => !prev);

  const [showForKidsToggleAnimation, setShowForKidsToggleAnimation] = useState(false);

  const [query, setQuery] = useState("");

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    membership: '', // basic, suggested. premium,
    profiles: [  // later use this to add profiles like Netflix
      {
        name: '',
        profileImage: '',
        likedMovies: [],
        dislikedMovies: [],
        favourites: [],
        forKids: false,
        createdAt: '',  
      },
    ],
    createdAt: ''
  });
  const handleSignOut = () => {
    sessionStorage.clear(); 
    localStorage.clear();
    navigate('/sign-in');
  }
  const handleChangeUser = () => {
    sessionStorage.removeItem('selectedProfile');
    localStorage.removeItem('selectedProfile');
    navigate('/profiles');
  }
  
 
  useEffect(() => {  // ✅ AUTO SIGN-IN with localStorage fallback
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  
  const [selectedProfile, setSelectedProfile] = useState(() => {// ✅ SELECTED PROFILE from localStorage or sessionStorage
    const stored = localStorage.getItem('selectedProfile') || sessionStorage.getItem('selectedProfile');
    return stored ? JSON.parse(stored) : null;
  });
  
  useEffect(() => {   // Save to both just to be safe depending on where it was read from
    localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
    sessionStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
  }, [selectedProfile]);
  
  
  // ------------ CUSTOM STYLES ------------
  const customStyles = {
    mainBgDark: 'bg-[#030A1B]',
    mainGrayBg: 'bg-[#333]',
    mainBg: isDarkMode? 'bg-[#030A1B]' : 'bg-[#ededed]',
    basicDynamicTxt: isDarkMode? 'text-[#fff]' : 'text-[#000000]',
    mainTxtHover: 'text-[#d6d6d6] hover:text-[#ffffff]',
    Bg_Txt: isDarkMode? 'bg-[#030A1B] text-[#ededed]' : 'bg-[#ededed] text-[#17161a]', 
    btnColor: 'bg-[#c92443] text-[#ededed]  hover:bg-[#9b0e07] hover:text-[#c5c5c5] cursor-pointer',
    btnColor2: 'bg-[#145de3] text-[#ededed] hover:bg-[#0077ff] cursor-pointer', 
  }
  // ------------ CUSTOM STYLES ------------
  return (
    <GlobalContext.Provider
      value={{
        isDarkMode, toggleDarkMode,
        isMobileMenuOpen, setIsMobileMenuOpen, toggleMobileMenu,
        query, setQuery,
        customStyles,
        user, setUser,
        selectedProfile, setSelectedProfile,
        handleSignOut, handleChangeUser,
        profileIsOpen, setProfileIsOpen, toggleProfileIsOpen,
        showForKidsToggleAnimation, setShowForKidsToggleAnimation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Optional: custom hook to use context
export const useGlobalProps = () => {
  const props = useContext(GlobalContext);
  if (!props) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return props;
};
