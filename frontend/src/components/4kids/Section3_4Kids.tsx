import React from 'react';
import { useGlobalProps } from '../../GlobalContext';
import KidsSectionBg from '../ui/KidsSectionBg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Section3_4Kids = () => {
  const {customStyles, setProfileIsOpen, setShowForKidsToggleAnimation, user, selectedProfile, notAvailbaleMessage, setNotAvailbaleMessage} = useGlobalProps();
  const navigate = useNavigate();
  const handleClick = () => {
    const isRealAccount = user && user !== 'guest';
    const isRealProfile = selectedProfile && selectedProfile !== 'guest';
  
    if (isRealAccount && isRealProfile) {
      setShowForKidsToggleAnimation!(true);
      navigate('/profiles/editProfile');
      setTimeout(() => setShowForKidsToggleAnimation!(false), 5000);
      return;
    }
  
    setNotAvailbaleMessage!(
      "While logged in as a guest, you cannot test the 'For Kids' filter because no actual account or profile exists."
    );
    setTimeout(() => setNotAvailbaleMessage!(''), 7000);
  };
  

  return (
    <section id="Section3_4Kids" className={`relative w-full flex justify-center mainPX`}  onClick={() => setProfileIsOpen!(false)}>
        <KidsSectionBg />
        <main className="flex items-center z-1 flex-col min-h-[80vh] text-white">
        <div className="flex flex-col items-center mt-[50px]">
            <h1 className="text-3xl font-bold mb-[20px] text-center txtKids txtShadowBlackLight">
            Family Friendly Streaming
            </h1>
        
            <p className="mt-2 font-semibold tracking-wide text-lg txtKids2 max-sm:text-[16px] text-center txtShadowBlackLight">
            Let your little ones enjoy their favorite heroes in a fun, <br /> safe environment
            completely free from inappropriate content.
            </p>
        </div>

        <button onClick={handleClick} className={`absolute flex items-center ${customStyles?.Bg_Txt} text-[30px] px-[12px] py-[6px] rounded-[7px] bottom-[100px] font-semibold transition1 hover:scale-[1.05] cursor-pointer`}>
            <p className="txtKids">Explore</p>
            <div className={`px-[14px] py-[2px] rounded-[5px]`}>
            <img src="/icons/logoKids.png" className=" w-[100px]" alt="" />
            </div>
        </button>
        </main>
    </section>
  )
}

export default Section3_4Kids