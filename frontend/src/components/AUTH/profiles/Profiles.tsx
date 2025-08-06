import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateProfileCard, Logo, ProfileCard, useGlobalProps, scrollToTop } from '../../exports';
import { GreetingTypewriter } from './profilesUi/GreetingTypewritter';
import GuestCard from './profilesUi/cards/GuestCard';
import { useMediaQuery } from 'react-responsive';
import MobileProfileCard from './profilesUi/cards/MobileProfileCard';

const Profiles = () => {
  useEffect(() => {scrollToTop();}, [])
  const { user, customStyles, handleSignOut } = useGlobalProps();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const navigate = useNavigate();

  const handleContinueAsGuest = (profileName: string) => {
    sessionStorage.setItem('activeProfile', profileName);
    navigate('/');
  };

  return (
    <section className={`flex justify-center min-h-screen ${customStyles?.mainBgDark} text-white mainPX`}>
      <main className={`relative MAX_W flex flex-col pb-[80px]`}>

        <div className='w-full flex items-center justify-between'>
         <Logo/>

         <button className='flex items-center gap-2 text-[#ffffffc0] hover:text-[white] hover:underline cursor-pointer'
                 onClick={handleSignOut}>
           <i className="fa-solid fa-door-open"></i>
           <span>Sign Out</span>
         </button>
        </div>
        
        <div className='relative flex max-md:flex-col items-center mt-[5%] max-sm:mt-[15%] mb-[50px] gap-[0px] transition1'>
          <div className='absolute left-1/2 -translate-x-1/2 top-[-60px]'>
            <GreetingTypewriter name={user.firstName || 'Guest'} />
          </div>
        

          <h1 className={`text-gradient mx-auto text-[3rem] max-sm:text-[2rem] font-semibold transition1`}>
           {user.firstName === 'Guest' ? '' : "Who's watching?" } 
          </h1>
        </div>
       
        {user.firstName !== 'Guest' ? 
         <div className={`flex flex-col items-start max-sm:items-center gap-[50px] transition1 overflow-x-auto
                        ${user.profiles.length > 0 && 'md:ml-[70px]'}`}
          >
            {user.profiles.map((profile:any, i:any) => isMobile? 
            <MobileProfileCard  key={i} profile={profile}/> 
            :
             <ProfileCard key={i} profile={profile} />
            )}
            <div className={`${user.profiles.length < 1 && 'mx-auto'}`}>
             <CreateProfileCard text={'Create a profile'} />
            </div>
          
          </div>
          : 
          <div className='flex mx-auto max-sm:flex-col max-sm:items-center gap-[50px] transition1'>
            <GuestCard handleContinueAsGuest={handleContinueAsGuest} />
          </div>
         }
      </main>
    </section>
  );
};

export default Profiles;

