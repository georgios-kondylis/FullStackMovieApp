import React, { useEffect, useRef } from 'react';
import { useGlobalProps } from '../../GlobalContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { isDarkMode, customStyles, setProfileIsOpen } = useGlobalProps();

  return (
    <footer className={`${customStyles?.Bg_Txt}`}  onClick={() => setProfileIsOpen!(false)}>
      <section className="flex flex-col items-center py-10 px-4 text-center">
        {/* Logo */}
        <div id="logo" className="flex items-center gap-3 mt-4 mb-6">
          <img src="/icons/logo.png" className="w-[40px] md:w-[50px] rounded-full" alt="Logo Icon" />
          <img src={isDarkMode ? '/icons/logoWordWhite.png' : '/icons/logoWordBlack.png'} className="w-[130px] md:w-[160px]" alt="Logo Text" />
        </div>

        {/* Newsletter Text */}
        <p className="text-base md:text-lg max-w-[600px] mb-6">
          Stay in the loop! Subscribe to our newsletter and be the first to know about new movie drops, exclusive releases, and exciting content.
        </p>

        {/* Subscription Form */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[500px]">
          <input type="email" placeholder="Your email address"
            className={`w-full px-4 py-2 rounded-md ${isDarkMode ? 'bg-[#131e39]' : 'bg-[#d1d1d1]'} outline-none`}
          />
          <button className={`${customStyles?.btnColor} px-6 py-2 rounded-md font-semibold cursor-pointer hover:scale-[1.06] transition1`}
            onClick={() => {}}
          >
            Subscribe
          </button>
        </div>

        {/* Copyright & Socials */}
        <div className="flex items-center justify-between w-full mt-[40px] 
                        max-sm:flex-col-reverse max-sm: pb-5">
          <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
            &copy; {new Date().getFullYear()} Georgios Kondylis. All rights reserved.
          </p>

          <div id="socialMedia" className="flex text-[24px]">
            <a href="https://www.linkedin.com/in/georgios-kondylis-7b680a1a7/" className="p-2 cursor-pointer hover:text-[#0077b5] transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://github.com/georgios-kondylis" className="p-2 cursor-pointer hover:text-gray-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.instagram.com/georgios.kondylis/" className="p-2 cursor-pointer hover:text-pink-500 transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.facebook.com/Georgios1995Kondylis/" className="p-2 cursor-pointer hover:text-[#1877f2] transition-colors" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook" />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
