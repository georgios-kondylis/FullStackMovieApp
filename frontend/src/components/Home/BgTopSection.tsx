import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useGlobalProps } from '../exports';

const BgTopSection = ({ bgUrl }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const { isDarkMode } = useGlobalProps();

  return (
    <div
      className={`absolute inset-0 bg-cover bg-no-repeat z-0 ${!isMobile && 'bg-animate-left'}`}
      style={{
        backgroundImage: bgUrl
          ? `linear-gradient(to right, ${
              isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'
            }, ${isDarkMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'} 50%), url(${bgUrl})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center' : '20% center',
      }}
    />
  );
};

export default BgTopSection;
