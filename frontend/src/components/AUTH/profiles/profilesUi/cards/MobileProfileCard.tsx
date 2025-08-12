import React from 'react';
import { useGlobalProps } from '../../../../exports';
import { deleteProfile } from '../../../../../services/apiBackend';
import { useNavigate } from 'react-router-dom';

const MobileProfileCard = ({ profile }: any) => {
  const { user, setUser, setSelectedProfile } = useGlobalProps();
  const navigate = useNavigate();

  const handleSelectProfile = () => {
    setSelectedProfile!(profile);
    navigate('/');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProfile!(profile);
    navigate('/profiles/editProfile');
  };
  const handleDelete = () => deleteProfile(user, profile.name.trim(), setUser);

  return (
    <div className="relative group flex flex-col gap-3 items-center">
       {profile.forKids &&
           <div className={`w-[100px]`}>
              <img src="/icons/logoKids.png" className='object-contain' alt="" />
           </div>
        }
      <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-[5px] flex items-center justify-center overflow-hidden hover:brightness-75 cursor-pointer"
      onClick={handleSelectProfile}>
        <img src={profile.profileImage || null} className="w-full h-full object-cover" alt="Guest Avatar" />
      </div>
      <div className='flex items-center justify-between w-full'>
        <p className="text-[1.7rem]">{profile.name}</p>

        <div className="flex gap-[10px]">
          <div className="relative group/edit w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#ffffff37]" 
          onClick={handleEdit}>
            <i className="fa-solid fa-pencil" />
            <span className="txtFadedGray font-light absolute opacity-0 group-hover/edit:opacity-100 transition1 bottom-[-25px] whitespace-nowrap pointer-events-none">
              Edit
            </span>
          </div>

          <div onClick={handleDelete} className="relative group/edit w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#ffffff37]">
            <i className="fa-solid fa-trash" />
            <span className="txtFadedGray font-light absolute opacity-0 group-hover/edit:opacity-100 transition1 bottom-[-25px] whitespace-nowrap pointer-events-none">
              Delete
            </span>
          </div>
        </div>

      </div>
     

     
    </div>
  );
};

export default MobileProfileCard;
