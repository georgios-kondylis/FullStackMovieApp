import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GlobalContextType } from "./constants/types";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const [query, setQuery] = useState("");
  
  // ------------ CUSTOM STYLES ------------
  const customStyles = {
    mainBgDark: 'bg-[#030A1B]',
    mainGrayBg: 'bg-[#333]',
    mainBg: isDarkMode? 'bg-[#030A1B]' : 'bg-[#ededed]',
    basicDynamicTxt: isDarkMode? 'text-[#fff]' : 'text-[#000000]',
    mainTxtHover: 'text-[#d6d6d6] hover:text-[#ffffff]',
    Bg_Txt: isDarkMode? 'bg-[#030A1B] text-[#ededed]' : 'bg-[#ededed] text-[#17161a]', 
    btnColor: 'bg-[#c92443] text-[#ededed]  hover:bg-[#9b0e07] hover:text-[#c5c5c5] cursor-pointer',
    btnColor2: 'bg-[#145de3] text-[#ededed] cursor-pointer', 
  }
  // ------------ CUSTOM STYLES ------------
  return (
    <GlobalContext.Provider
      value={{
        isDarkMode, toggleDarkMode,
        isMobileMenuOpen, toggleMobileMenu,
        query, setQuery,
        customStyles
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
