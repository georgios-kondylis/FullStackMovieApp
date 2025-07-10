// Navbar.tsx
import { useGlobalProps } from "../../GlobalContext";
import { useMediaQuery } from "react-responsive";

import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const { 
    isDarkMode, isMobileMenuOpen, toggleMobileMenu, customStyles, toggleDarkMode
  } = useGlobalProps();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className={`fixed z-50 w-full flex items-center justify-center `}>
      <div className="w-full flex justify-between items-center px-2 my-3 py-3 mainMX MAX_W 
              border border-[#71717183] rounded-xl backdrop-blur-[8px] navShadowBlack">
        <h1 className="">Logo</h1>

        <ul className="max-md:hidden flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => {
            return (
              <NavLink key={i} to={link.href} 
                       className={({ isActive }) =>`${customStyles?.mainTxtHover} txtShadowBlack relative` }  
              >
              {({ isActive }) => (
                <>
                  {link.title}
                  <span className={`absolute left-0 bottom-[-3px] h-[3px] rounded-b-full ${customStyles?.btnColor} transition1 pointer-events-none ${isActive? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                </>
              )}
            </NavLink>
            );
          })}
        </ul>
        
        <div id="icons" className={`flex items-center`}>
          <i className={`fa-solid fa-magnifying-glass ${customStyles?.mainTxtHover} navIcon`}></i>
          <i className={`fa-solid fa-user ${customStyles?.mainTxtHover} navIcon`}></i>
          {isDarkMode
            ? <i className={`fa-solid fa-sun ${customStyles?.mainTxtHover} navIcon`} onClick={toggleDarkMode}></i>
            : <i className={`fa-solid fa-moon ${customStyles?.mainTxtHover} navIcon`} onClick={toggleDarkMode}></i>
          }
        </div>

      </div>
    </nav>
  );
};

export default Navbar;















 {/* {isMobile &&( // Hamburger
          <i className={`text-2xl fa-solid fa-bars`}
            onClick={toggleMobileMenu}>
          </i>)} */}