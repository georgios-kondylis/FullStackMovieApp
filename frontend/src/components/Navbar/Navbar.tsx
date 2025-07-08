// Navbar.tsx
import { useGlobalProps } from "../../GlobalContext";
import { useMediaQuery } from "react-responsive";

import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import SwichBtn from "../ui/SwichBtn";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { isDarkMode, customBG, isMobileMenuOpen, toggleMobileMenu } = useGlobalProps();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className={`${customBG}`}>
      <div className="w-full flex justify-between items-center mainPX MAX_W">
        <h1 className="">{isDarkMode ? "Dark Mode" : "Light Mode"}</h1>

        <ul className="max-md:hidden flex items-center gap-2">
          {navLinks.map((link, i) => {
            return (
              <NavLink key={i} to={link.href}
                className={({ isActive }) =>`hover:text-blue-400 transition-colors 
                ${ isActive ? "text-blue-600 font-semibold" : "text-inherit" }`
              }>
                {link.title}
              </NavLink>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <SwichBtn />
          {isMobile &&(
           <i className={`${customBG} text-2xl fa-solid fa-bars`}
              onClick={toggleMobileMenu}>
           </i>)}
        </div>

        <MobileMenu  />
      </div>
    </nav>
  );
};

export default Navbar;
