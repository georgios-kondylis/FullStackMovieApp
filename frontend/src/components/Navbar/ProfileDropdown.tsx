import React, { useState } from 'react';
import { useGlobalProps } from '../exports';

const ProfileDropdown = () => {
  const { user, selectedProfile, handleSignOut, handleChangeUser } = useGlobalProps();
  const [viewProfileModalIsOpen, setViewProfileModalIsOpen] = useState(false);

  const handleOpenModal = () => setViewProfileModalIsOpen(true);
  const handleCloseModal = () => setViewProfileModalIsOpen(false);

  return (
    <div className="absolute top-[60px] right-0 bg-[#0000009e] p-3 rounded-[10px] text-white border border-[#80808056] z-50">
      <div className="flex items-center gap-2 border-b border-[#80808056] pb-3">
        <img
          src={selectedProfile?.profileImage}
          className="w-[50px] h-[50px] rounded-full"
          alt="Profile"
        />

        <div className="flex flex-col gap-0">
          <p className="text-[18px] font-bold">{selectedProfile?.name}</p>
          <p className="text-[12px]">{user?.email}</p>
        </div>
      </div>

      <div className="flex flex-col pt-3">
        <div className="profileSettings cursor-pointer" onClick={handleOpenModal}>
          <i className="fa-solid fa-user" />
          <span>View Profile</span>
        </div>
        <div className="profileSettings cursor-pointer" onClick={handleChangeUser}>
          <i className="fa-solid fa-user-group" />
          <span>Change Profile</span>
        </div>
        <div className="profileSettings cursor-pointer" onClick={handleSignOut}>
          <i className="fa-solid fa-arrow-right-from-bracket" />
          <span>Sign Out</span>
        </div>
      </div>

      {viewProfileModalIsOpen && ( // will move itin a seperate route
        <div className="fixed inset-0 w-screen h-screen bg-[black] z-50 flex flex-col"
          onClick={handleCloseModal}
        >
          {/* Top bar with close */}
          <div className="flex justify-end p-4">
            <button
              className="text-white text-lg bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              onClick={handleCloseModal}
            >
              Close ✕
            </button>
          </div>

          {/* Fullscreen content */}
          <div
            className="flex-1 flex flex-col items-center justify-center gap-6 text-white px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Profile header */}
            <div className="flex flex-col items-center gap-3">
              <img
                src={selectedProfile?.profileImage}
                alt="Profile"
                className="w-[120px] h-[120px] rounded-full object-cover"
              />
              <div className="text-center">
                <p className="text-2xl font-bold">{selectedProfile?.name}</p>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>

            {/* Profile details */}
            <div className="flex flex-col gap-2 text-lg text-gray-300">
              <p>Favourites: {selectedProfile?.favourites?.length || 0}</p>
              <p>Liked Movies: {selectedProfile?.likedMovies?.length || 0}</p>
              <p>Disliked Movies: {selectedProfile?.dislikedMovies?.length || 0}</p>
              <p>For Kids: {selectedProfile?.forKids ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileDropdown;
