import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalProps, Logo } from '../../../exports';
import { profileIcons } from './costants';




const CreateProfile = () => {
  const { user, customStyles } = useGlobalProps();
  const navigate = useNavigate();

  const defaultIcons = profileIcons.slice(0, 3);
  const characterIcons = profileIcons.slice(3, 9);
  const [selectedIcon, setSelectedIcon] = useState(defaultIcons[1].img);
  const [iconIsHovered, setIconIsHovered] = useState(false);
  const [iconsAvailableIsOpen, setIconsAvailableIsOpen] = useState(false);


  return (
    <section className={`flex justify-center min-h-screen ${customStyles?.mainBgDark} text-white mainPX`}>
      
      <main className={`relative MAX_W flex flex-col`}>
        <div className='w-full'>
         <Logo/>
        </div>
        
        <div className='relative flex flex-col items-center mt-[5%] mb-[50px] gap-[0px] transition1'>
          <h1 className={`text-gradient text-[3rem] font-semibold transition1 mx-auto`}>
            Create Profile
          </h1>

          <div className='flex'>
            <div className='relative max-w-[400px] w-full cursor-pointer' 
                onMouseEnter={() => setIconIsHovered((prev) => !prev)}
                onMouseLeave={() => setIconIsHovered((prev) => !prev)}
                onClick={() =>setIconsAvailableIsOpen(true)}>
              <img src={selectedIcon} className='w-full object-cover'  alt="" />
              {iconIsHovered && // overlay
               <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full bg-[#ffffff8f] pointer-events-none'>
                  <i className="fa-solid fa-pencil |  text-[#282828] text-[4rem]"></i>
               </div> }
            </div>
            
            {/* INPUTS */}
            <div id='INPUTS' className='flex flex-col ml-[20px]'>
              <div id='UserName' className='flex items-center gap-3'>
                <i className="fa-solid fa-user-pen"></i>
                <input type="text" className='border w-fit h-fit outline-none' />
              </div>

              {/* <div id='CustomCheckbox'>
               
              </div> */}

            </div>
          </div>
        </div>
       
        {iconsAvailableIsOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-[#1c1c1c] w-[90vw] max-w-[700px] max-h-[90vh] p-6 rounded-2xl shadow-xl flex flex-col gap-8 overflow-hidden">
              
              <h2 className="text-white text-2xl font-semibold text-center">Choose your avatar</h2>

              {/* Default Icons */}
              <div className="text-white flex flex-col">
                <h3 className="text-lg mb-2 font-medium">Default</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-thin p-1">
                  {defaultIcons.map((icon, i) => (
                    <div key={i} className="min-w-[150px] h-[150px] rounded border-2 border-transparent hover:border-white cursor-pointer transition1 hover:scale-105"
                      onClick={() => {setSelectedIcon(icon.img); setIconsAvailableIsOpen(false)}}
                    >
                      <img src={icon.img} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Character Icons */}
              <div className="text-white flex flex-col">
                <h3 className="text-lg mb-2 font-medium">Characters</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-thin p-1">
                  {characterIcons.map((icon, i) => (
                    <div key={i} className="min-w-[150px] h-[150px] rounded border-2 border-transparent hover:border-white cursor-pointer transition duration-200 hover:scale-105"
                         onClick={() => {setSelectedIcon(icon.img); setIconsAvailableIsOpen(false)}}
                    >
                      <img src={icon.img} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Close Button */}
              <button onClick={() => setIconsAvailableIsOpen(false)}
                className={`font-semibold py-2 rounded ${customStyles?.btnColor2} text-shadow-2xs transition1`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default CreateProfile;

