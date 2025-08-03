
const GuestCard = ({ handleContinueAsGuest }: any) => {

  return (
    <div className={`flex flex-col gap-3 items-center `}
         onClick={() => handleContinueAsGuest('guest')}>
      <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-[5px] flex items-center justify-center overflow-hidden hover:brightness-75 cursor-pointer">
        <img src="/profileAvatars/guestAvatar.png" className="w-full h-full object-cover" alt="Guest Avatar" />
      </div>
      <p className='text-[1.7rem]'>Guest</p>
    </div>
  );
};

export default GuestCard;
