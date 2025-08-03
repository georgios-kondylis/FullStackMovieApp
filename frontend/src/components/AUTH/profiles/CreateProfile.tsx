import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalProps, Logo, ProfileIconsShowcase, MessageToUser } from '../../exports';
import { defaultProfileIcons } from './costants';
import CustomCheckBox from './profilesUi/customCheckBox/CustomCheckBox';
import { createNewProfileFunk } from '../../../services/apiBackend';

const CreateProfile = () => {
  const { user, setUser, customStyles } = useGlobalProps();
  const navigate = useNavigate();

  const initialAvatar = defaultProfileIcons[1]?.img || defaultProfileIcons[0]?.img || '';

  const [selectedIcon, setSelectedIcon] = useState(initialAvatar);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    profileImage: initialAvatar,
    forKids: false,
  });

  useEffect(() => {
    setNewUser(prev => ({ ...prev, profileImage: selectedIcon }));
  }, [selectedIcon]);

  const handleCreateProfile = async () => {
    if (!newUser.name) return;
    try {
      const updatedUser = await createNewProfileFunk(user.email, newUser, setMessageToUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      navigate('/profiles');
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };
  

  return (
    <section className={`flex justify-center min-h-screen ${customStyles?.mainBgDark} text-white mainPX`}>
      <main className="relative MAX_W flex flex-col">
        <Logo />

        <div className="flex flex-col items-center mt-[5%] mb-[50px] gap-10 transition1">
          <h1 className="text-gradient text-4xl font-semibold">New Profile</h1>

          <div className="flex gap-6 max-md:flex-col">
            {/* Profile Image */}
            <div className="relative w-[300px] aspect-square cursor-pointer"
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
              onClick={() => setShowIconModal(true)}
            >
              <img src={selectedIcon} alt="Selected Avatar"
                className="w-full h-full object-cover rounded-xl"
              />

              {isIconHovered && (
                <div className="absolute inset-0 bg-[#ffffff8f] flex items-center justify-center rounded-xl pointer-events-none">
                  <i className="fa-solid fa-pencil text-[#282828] text-4xl" />
                </div>
              )}
            </div>

            {/* Inputs */}
            <div className="flex flex-col justify-center gap-6">
              {/* Name Input */}
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-user-pen" />
                <input type="text"  placeholder="Profile Name"
                  value={newUser.name}
                  onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="border-b-[#ffffff6a] hover:border-[#ffffffad] border-b bg-transparen px-1 py-2 outline-none focus:border-b-[white]"
                  onKeyDown={(e) => {if (e.key === 'Enter' && newUser.name.trim()) handleCreateProfile()}}
                />
              </div>

              {/* Kids Mode Toggle */}
              <CustomCheckBox id="forKids" checked={newUser.forKids}
                onChange={() => setNewUser((prev) => ({ ...prev, forKids: !prev.forKids }))}
                label="For Kids"
              />
            </div>
          </div>
          
          <div className='relative flex gap-[20px] mt-[30px] text-[2rem]'>
            <button className={`${customStyles?.btnColor} px-3 py-1 rounded-[7px]`} onClick={() => navigate(-1)}>
              Go Back
            </button>
            <button className={`${newUser.name !== '' ? customStyles?.btnColor2 : 'bg-[#80808040] text-[#ffffff50] cursor-not-allowed'} px-3 py-1 rounded-[7px]`}
                    onClick={handleCreateProfile}>
              Create
            </button>
            
            <MessageToUser message={messageToUser}/> 
          </div>
        </div>

        {showIconModal && (
          <ProfileIconsShowcase
            setSelectedIcon={setSelectedIcon}
            setIconsAvailableIsOpen={setShowIconModal}
          />
        )}
      </main>
    </section>
  );
};

export default CreateProfile;
