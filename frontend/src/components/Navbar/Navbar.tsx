// Navbar.tsx
import { useGlobalProps } from "../../GlobalContext";
import { useMediaQuery } from "react-responsive";

import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import MobileMenu from "./MobileMenu";
import { useRef, useState } from "react";

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {isDarkMode, customStyles, toggleDarkMode, query, setQuery} = useGlobalProps();

  const [isHoveringSearch, setIsHoveringSearch] = useState(false);
  const searchActive = isHoveringSearch || query.length > 0;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHoveringSearch(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHoveringSearch(false);
    }, 1500); // or however long you want
  };
  

  return (
    <nav className={`fixed z-50 w-full flex items-center justify-center `}>
      <div className="w-full flex justify-between items-center px-4 my-3 py-1 mainMX MAX_W 
              border border-[#71717183] rounded-xl backdrop-blur-[8px] navShadowBlack"
      >
        <div id="LOGO" className="flex items-center gap-[8px]">
           <img src="/icons/logo.png" className="w-[35px] md:w-[50px] rounded-full" alt="" />
           <img src="/icons/logoWordWhite.png" className="w-[120px] md:w-[150px] rounded-full" alt="" />
        </div>

        <ul className="max-md:hidden flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => {
            return (
              <NavLink key={i} to={link.href} 
                       className={({ isActive }) =>`${customStyles?.mainTxtHover} ${isActive && 'text-white'} txtShadowBlack relative` }  
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
         <div className="relative pl-[17px] pr-1 py-[5px] cursor-pointer txtShadowBlack"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <i className={`fa-solid fa-magnifying-glass ${customStyles?.mainTxtHover}`} />
            
            <input type="text" value={query}
              onChange={(e) => setQuery!(e.target.value)}
              className={`absolute right-[35px] text-[14px] bottom-[50%] translate-y-[50%] 
                          rounded-full outline-0 py-1 px-3 pl-[10px] transition1 border border-[#58585887]
                          ${searchActive ? "w-[180px] opacity-100" : "w-0 opacity-0"} 
                          ${customStyles?.Bg_Txt}`}
            />
          </div>
          
          <i className={`fa-solid fa-user ${customStyles?.mainTxtHover} navIcon txtShadowBlack`}></i>
          {isDarkMode
            ? <i className={`fa-solid fa-sun ${customStyles?.mainTxtHover} navIcon txtShadowBlack`} onClick={toggleDarkMode}/>
            : <i className={`fa-solid fa-moon ${customStyles?.mainTxtHover} navIcon txtShadowBlack`} onClick={toggleDarkMode}/>
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