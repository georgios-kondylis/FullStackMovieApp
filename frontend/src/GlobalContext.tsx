import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GlobalContextType } from "../constants/types";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const customBG = isDarkMode
    ? "bg-[#171717] text-white"
    : "bg-[beige] text-[#101010]";

  return (
    <GlobalContext.Provider value={{ isDarkMode, toggleDarkMode, customBG, isMobileMenuOpen, toggleMobileMenu }}>
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
