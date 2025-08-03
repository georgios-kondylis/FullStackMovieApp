import React from 'react';
import { useMediaQuery } from 'react-responsive';

const BgTopSection = ({ bgUrl }: any) => {
  const isMobile = useMediaQuery({maxWidth: 640})
  return (
    <div className={`absolute inset-0 bg-cover bg-no-repeat z-0 ${!isMobile && 'bg-animate-left'}`}
    style={{ backgroundImage: bgUrl
        ? `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 90%), url(${bgUrl})`
        : undefined,
      backgroundSize: 'cover',
      backgroundPosition: isMobile? 'center' : '20% center',
    }}
  />
  
  );
};

export default BgTopSection;
