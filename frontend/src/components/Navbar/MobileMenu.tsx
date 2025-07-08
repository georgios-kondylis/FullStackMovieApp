import React from "react";
import { useGlobalProps } from "../../GlobalContext";
import { navLinks } from "../../constants";
import { NavLink } from "react-router-dom";

const MobileMenu = () => {
  const { isMobileMenuOpen, toggleMobileMenu, isDarkMode, customBG } = useGlobalProps();

  return (
    <>
     
      {isMobileMenuOpen && (  /* Backdrop */
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={toggleMobileMenu}> 
        </div> 
      )}

      {/* Slide-in menu */}
      <div className={`fixed top-0 right-0 h-full w-[50%] max-w-sm z-50 shadow-lg transition1 mainPX
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        ${customBG}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">Menu</h2>
          <i
            className="fa-solid fa-xmark text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          ></i>
        </div>

        <ul className="flex flex-col gap-4 p-4">
          {navLinks.map((link, i) => (
            <NavLink
              key={i}
              to={link.href}
              onClick={toggleMobileMenu}
              className="text-lg hover:opacity-50 transition-opacity"
            >
              {link.title}
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
