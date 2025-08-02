import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateProfileCard, Logo, useGlobalProps } from '../../exports';
import { GreetingTypewriter } from './profilesUi/GreetingTypewritter';
import GuestCard from './profilesUi/GuestCard';

const Profiles = () => {
  const { user, customStyles } = useGlobalProps();
  const navigate = useNavigate();
  const [creatingProfileIsActive, setCreatingProfileIsActive] = useState(false);

  const handleContinueAsGuest = (profileName: string) => {
    sessionStorage.setItem('activeProfile', profileName);
    navigate('/');
  };

  const hasProfiles = user?.profiles?.length > 0;
  console.log(hasProfiles)

  return (
    <section className={`flex justify-center min-h-screen ${customStyles?.mainBgDark} text-white mainPX`}>
      
      <main className={`relative MAX_W flex flex-col items-center`}>
        <div className='w-full'>
         <Logo/>
        </div>
        
        <div className='relative flex max-md:flex-col items-center mt-[15%] mb-[50px] gap-[0px] transition1'>
          <div className='absolute top-[-60px] w-full'>
            <GreetingTypewriter name={user.firstName || 'Guest'} />
          </div>
        

          <h1 className={`text-gradient text-[3rem] font-semibold transition1`}>
            Who's watching?
          </h1>
        </div>
       
        {hasProfiles? 
          <div className={`border w-[300px] h-[300px]`}>
            
          </div> 
          : 
          <div className='flex max-sm:flex-col max-sm:items-center gap-[50px] transition1'>
            <GuestCard 
              handleContinueAsGuest={handleContinueAsGuest} 
              creatingProfileIsActive={creatingProfileIsActive}
            />

            <CreateProfileCard 
                text={'Create a profile'} 
                setCreatingProfileIsActive={setCreatingProfileIsActive} 
            />
          </div>
         }
      </main>
    </section>
  );
};

export default Profiles;

