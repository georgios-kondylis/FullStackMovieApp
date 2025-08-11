import React from "react";
import { useGlobalProps } from "../../GlobalContext";
import { navLinks } from "../../constants";
import { NavLink } from "react-router-dom";

const MobileMenu = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, customStyles, selectedProfile } = useGlobalProps();

  return (
    <div>
      {isMobileMenuOpen && <div id="DARK_OVERLAY" onClick={() => setIsMobileMenuOpen(false)} className="fixed top-0 left-0 w-full h-full min-h-[100vh] bg-[#00000099]"></div>}

      <div className={`fixed w-[50%] max-w-[350px] h-screen right-0 top-0 z-50 transition1 p-4 bg-gradient-to-l from-[#000000f1] from-[30%] via-[#000000d8] via-[50%] to-transparent to-[100%]
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="flex flex-col items-end gap-2 w-full text-white pb-[20px] ">
          <img src={selectedProfile.profileImage} className="rounded-full w-[70px] h-[70px] object-cover flex-shrink-0" alt="" />
          <p className="text-[14px]  text-wrap truncate">{selectedProfile.name}</p>
        </div>

        <span id="FADED-BORDER" className="block h-[1px] w-full bg-gradient-to-l from-[#656565f1] from-[30%] via-[#6666667a] via-[50%] to-transparent to-[100%]"/>

        <div className="flex flex-col justify-between items-end mt-[30px] h-[75vh]">
          <div className="flex flex-col items-end gap-4">
            {navLinks.map((link, i) => (
                link.title !== 'Pricing' ? (
                  <NavLink  key={i} to={link.href} onClick={() => setIsMobileMenuOpen(false)}
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
          </div>
          
          <div className="w-full flex flex-col items-end text-white text-[30px]">
            <i className="fa-solid fa-arrow-right p-3 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}/>
            <span id="FADED-BORDER" className="block h-[1px] w-full bg-gradient-to-l from-[#656565f1] from-[10%] via-[#6666667a] via-[30%] to-transparent to-[100%]"/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
