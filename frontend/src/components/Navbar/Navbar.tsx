// Navbar.tsx
import { useGlobalProps } from "../../GlobalContext";
import { useMediaQuery } from "react-responsive";

import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProfileDropdown } from "../exports";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {customStyles, query, setQuery, profileIsOpen, setProfileIsOpen ,toggleProfileIsOpen, selectedProfile} = useGlobalProps();

  // SEARCH
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
  //--------------------------------
  

  return (
    <nav className={`fixed z-50 w-full flex items-center justify-center `} onClick={() => setProfileIsOpen!(false)}>
      <div className="w-full flex justify-between items-center px-4 my-3 py-1 mainMX MAX_W 
              border border-[#71717183] rounded-xl backdrop-blur-[8px] bg-[#00000030] navShadowBlack"
      >
        <div id="LOGO" className="flex items-center gap-[8px]">
            {selectedProfile?.forKids ? (
            <img src="/icons/logoKids.png" className="w-[70px] md:w-[90px] rounded-full" alt="Kids Logo" />
            ) : (
              <div className="flex items-center">
                <img src="/icons/logo.png" className="w-[35px] md:w-[50px] rounded-full" alt="Main Logo" />
                <img src="/icons/logoWordWhite.png" className="w-[120px] md:w-[150px] rounded-full" alt="Cinemoon Logo Text" />
              </div>
            )}
        </div>

        <ul className="max-md:hidden flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link, i) => (
            link.title !== 'Pricing' ? (
              <NavLink  key={i} to={link.href}
                className={({ isActive }) => `${customStyles?.mainTxtHover} ${isActive ? 'text-white' : ''} txtShadowBlack text-shadow-2xs relative` }
              >
                {({ isActive }) => (
                  <>
                    {link.title}
                    <span className={`absolute left-0 bottom-[-3px] h-[3px] rounded-b-full ${customStyles?.btnColor} transition1 pointer-events-none ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0' }`}
                    />
                  </>
                )}
              </NavLink>
            ) : (
              <a key={i}  href={link.href} className={`${customStyles?.mainTxtHover} txtShadowBlack relative`}>
                {link.title}
              </a>
            )
          ))}
        </ul>

        
        <div id="icons" className={`flex items-center`}>
         <div className="relative pl-[17px] pr-1 py-[5px] cursor-pointer txtShadowBlack"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            {selectedProfile?.forKids
            ?  <img src="/icons/glass4kids.png" className="w-[23px] cursor-pointer hover:scale-[1.1] transition1" alt="" />
            :  <i className={`fa-solid fa-magnifying-glass ${customStyles?.mainTxtHover}`} />
            }
            
            <input type="text" value={query}
              onChange={(e) => setQuery!(e.target.value)}
              className={`absolute right-[35px] text-[14px] bottom-[50%] translate-y-[50%] 
                          rounded-full outline-0 py-1 px-3 pl-[10px] transition1 border border-[#58585887]
                          ${searchActive ? "w-[180px] opacity-100" : "w-0 opacity-0"} 
                          ${customStyles?.Bg_Txt}`}
            />
          </div>
          
          {selectedProfile?.forKids
          ? <img src="/icons/user4kids.png" className="w-[25px] cursor-pointer hover:scale-[1.1] transition1" alt="" onClick={(e) =>{ e.stopPropagation(); toggleProfileIsOpen!()}} /> 
          : <i className={`fa-solid fa-user ${customStyles?.mainTxtHover} navIcon txtShadowBlack`} onClick={(e) =>{ e.stopPropagation(); toggleProfileIsOpen!()}} /> }
          
          {profileIsOpen &&
          <ProfileDropdown setProfileIsOpen={setProfileIsOpen}/>}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;