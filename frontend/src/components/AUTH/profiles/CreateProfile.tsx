import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalProps, Logo, ProfileIconsShowcase } from '../../exports';
import {
  defaultProfileIcons,
  lionKingProfileIcons,
  spidermanProfileIcons,
  kungFuPandaProfileIcons,
} from './profilesUi/costants';

const CreateProfile = () => {
  const { user, customStyles } = useGlobalProps();
  const navigate = useNavigate();

  const [selectedIcon, setSelectedIcon] = useState(defaultProfileIcons[1].img);
  const [iconIsHovered, setIconIsHovered] = useState(false);
  const [iconsAvailableIsOpen, setIconsAvailableIsOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    avatar: defaultProfileIcons[1].img,
    forKids: false,
  });

  // Update avatar in newUser when icon is selected
  useEffect(() => {
    setNewUser((prev) => ({ ...prev, avatar: selectedIcon }));
  }, [selectedIcon]);

  return (
    <section className={`flex justify-center min-h-screen ${customStyles?.mainBgDark} text-white mainPX`}>
      <main className={`relative MAX_W flex flex-col`}>
        <div className='w-full'>
          <Logo />
        </div>

        <div className='relative flex flex-col items-center mt-[5%] mb-[50px] gap-[40px] transition1'>
          <h1 className={`text-gradient text-[3rem] font-semibold transition1 mx-auto`}>
            Create Profile
          </h1>

          <div className='flex max-md:flex-col'>
            {/* IMAGE SELECTOR */}
            <div id='IMAGE'
              className='relative w-[300px] aspect-square cursor-pointer'
              onMouseEnter={() => setIconIsHovered(true)}
              onMouseLeave={() => setIconIsHovered(false)}
              onClick={() => setIconsAvailableIsOpen(true)}
            >
              <img src={selectedIcon} alt="Selected Avatar" className='w-full h-full object-cover rounded-[8px]' />

              {iconIsHovered && (
                <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full bg-[#ffffff8f] pointer-events-none rounded-[8px]'>
                  <i className="fa-solid fa-pencil text-[#282828] text-[4rem]"></i>
                </div>
              )}
            </div>

            {/* INPUTS */}
            <div id='INPUTS' className='flex flex-col ml-[20px] gap-5 justify-center'>
              {/* Profile Name */}
              <div id='UserName' className='flex items-center gap-3'>
                <i className="fa-solid fa-user-pen"></i>
                <input
                  type="text"
                  className='border px-2 py-1 outline-none bg-transparent text-white border-gray-500 rounded'
                  placeholder="Profile Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Kids Mode Radio */}
              <div id='KidsMode' className='flex items-center gap-3'>
                <input type="checkbox"  id="forKids"
                  checked={newUser.forKids}
                  onChange={() => setNewUser((prev) => ({ ...prev, forKids: !prev.forKids }))}
                />
                <label htmlFor="forKids" className='select-none'>For Kids</label>
              </div>
            </div>
          </div>
        </div>

        {/* ICON SELECTION MODAL */}
        {iconsAvailableIsOpen && (
          <ProfileIconsShowcase
            setSelectedIcon={setSelectedIcon}
            setIconsAvailableIsOpen={setIconsAvailableIsOpen}
          />
        )}
      </main>
    </section>
  );
};

export default CreateProfile;
