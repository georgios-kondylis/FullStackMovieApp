import React from 'react';

const ListOfAvatats = ({ title, array, setSelectedIcon, setIconsAvailableIsOpen }: any) => {
  return (
    <div className="text-white flex flex-col">
      <h3 className="text-lg mb-2 font-medium">{title}</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin p-1">
        {array.map((icon: any, i: any) => (
          <div key={i} className="w-[150px] h-[150px] rounded-[9px] border-2 border-transparent hover:border-white cursor-pointer transition1 shrink-0"
            onClick={() => {
              setSelectedIcon(icon.img);
              setIconsAvailableIsOpen(false);
            }}
          >
            <img  src={icon.img} alt="avatar"
              className="w-full h-full object-cover rounded-[7px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfAvatats;
