import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalProps, Logo, ProfileIconsShowcase, MessageToUser } from '../../exports';
import { defaultProfileIcons } from './costants';
import CustomCheckBox from './profilesUi/customCheckBox/CustomCheckBox';
import { updateProfileFunk } from '../../../services/apiBackend';

const EditProfile = () => {
  const { user, setUser, customStyles, selectedProfile } = useGlobalProps();
  const navigate = useNavigate();

  // Ensure we start with the current profile's image
  const initialAvatar = selectedProfile?.profileImage || defaultProfileIcons[0]?.img;
  const [selectedIcon, setSelectedIcon] = useState(initialAvatar);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [messageToUser, setMessageToUser] = useState('');

  // Pre-fill with existing profile info
  const [profileToEdit, setProfileToEdit] = useState({
    name: selectedProfile?.name || '',
    profileImage: initialAvatar,
    forKids: selectedProfile?.forKids || false,
  });

  useEffect(() => {
    setProfileToEdit(prev => ({ ...prev, profileImage: selectedIcon }));
  }, [selectedIcon]);

  const handleSaveProfile = async () => {
    if (!profileToEdit.name) return;
    try {
      const updatedUser = await updateProfileFunk( user.email, selectedProfile._id, profileToEdit, setMessageToUser );
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setTimeout(() =>{navigate('/profiles');}, 1500 )
      
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <section className={`flex justify-center min-h-screen ${customStyles?.mainBgDark} text-white mainPX`}>
      <main className="relative MAX_W flex flex-col">
        <Logo />

        <div className="flex flex-col items-center mt-[5%] mb-[50px] gap-10 transition1">
          <h1 className="text-gradient text-4xl font-semibold">Edit Profile</h1>

          <div className="flex gap-6 max-md:flex-col">
            {/* Profile Image */}
            <div className="relative w-[300px] aspect-square cursor-pointer"
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
              onClick={() => setShowIconModal(true)}
            >
              <img src={selectedIcon}
                alt="Selected Avatar"
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
                <input type="text"
                  placeholder="Profile Name"
                  value={profileToEdit.name}
                  onChange={e => setProfileToEdit(prev => ({ ...prev, name: e.target.value }))}
                  className="border-b-[#ffffff6a] hover:border-[#ffffffad] border-b bg-transparent px-1 py-2 outline-none focus:border-b-[white]"
                  onKeyDown={(e) => { if (e.key === 'Enter' && profileToEdit.name.trim()) handleSaveProfile(); }}
                />
              </div>

              {/* Kids Mode Toggle */}
              <CustomCheckBox
                id="forKids"
                checked={profileToEdit.forKids}
                onChange={() => setProfileToEdit(prev => ({ ...prev, forKids: !prev.forKids }))}
                label="For Kids"
              />
            </div>
          </div>

          <div className='relative flex gap-[20px] mt-[30px] text-[2rem]'>
            <button className={`${customStyles?.btnColor} px-3 py-1 rounded-[7px]`}
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button className={`${profileToEdit.name !== '' ? customStyles?.btnColor2 : 'bg-[#80808040] text-[#ffffff50] cursor-not-allowed'} px-3 py-1 rounded-[7px]`}
              onClick={handleSaveProfile}
            >
              Save
            </button>

            <MessageToUser message={messageToUser} />
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

export default EditProfile;
