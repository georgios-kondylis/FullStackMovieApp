import React, { useState } from 'react';
import { useGlobalProps } from '../exports';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({setProfileIsOpen} : any) => {
  const { user, selectedProfile, handleSignOut, handleChangeUser } = useGlobalProps();
  const navigate = useNavigate();


  return (
    <div className="absolute top-[60px] right-0 bg-[#0000009e] p-3 rounded-[10px] text-white border border-[#80808056] z-50">
      <div className="flex items-center gap-2 border-b border-[#80808056] pb-3">
        <img src={selectedProfile?.profileImage}
          className="w-[50px] h-[50px] rounded-full"
          alt="Profile"
        />

        <div className="flex flex-col gap-0">
          <p className="text-[18px] font-bold">{selectedProfile?.name}</p>
          <p className="text-[12px]">{user?.email}</p>
        </div>
      </div>

      <div className="flex flex-col pt-3">
        <div className="profileSettings cursor-pointer" onClick={() => {navigate('/viewProfile'); setProfileIsOpen(false)} }>
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


    </div>
  );
};

export default ProfileDropdown;
