import React from 'react';
import { useGlobalProps } from '../../../../exports';
import { deleteProfile } from '../../../../../services/apiBackend';

const ProfileCard = ({ profile }: any) => {
  const { user, setUser } = useGlobalProps();

  const handleDelete = () => deleteProfile(user, profile.name.trim(), setUser);

  return (
    <div className="relative group flex flex-col gap-3 items-center pr-[70px]">
      <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-[5px] flex items-center justify-center overflow-hidden hover:brightness-75 cursor-pointer">
        <img src={profile.profileImage || null} className="w-full h-full object-cover" alt="Guest Avatar" />
      </div>
      <p className="text-[1.7rem]">{profile.name}</p>

      <div className="absolute right-[20px] top-[42%] -translate-y-1/2 group-hover:flex flex-col gap-[10px] hidden">
        <div className="relative group/edit w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#ffffff37]">
          <i className="fa-solid fa-pencil" />
          <span className="txtFadedGray font-light absolute opacity-0 group-hover/edit:opacity-100 transition1 right-[-35px] whitespace-nowrap pointer-events-none">
            Edit
          </span>
        </div>

        <div onClick={handleDelete} className="relative group/edit w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#ffffff37]">
          <i className="fa-solid fa-trash" />
          <span className="txtFadedGray font-light absolute opacity-0 group-hover/edit:opacity-100 transition1 right-[-55px] whitespace-nowrap pointer-events-none">
            Delete
          </span>
        </div>
      </div>

      {profile.forKids &&
           <div className={`absolute top-0 right-[-47px] w-[100px]`}>
              <img src="/icons/logoKids.png" className='object-contain' alt="" />
           </div>
        }
    </div>
  );
};

export default ProfileCard;
