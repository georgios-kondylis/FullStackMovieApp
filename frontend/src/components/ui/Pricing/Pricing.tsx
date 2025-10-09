import React, { useState } from 'react'
import { useGlobalProps } from '../../../GlobalContext'
import { useMediaQuery } from 'react-responsive';
import DynamicTicket from './DynamicTicket';
import NotAvailableMessageToUser from '../NotAvailableMessageToUser';

const Pricing = () => {
  const {customStyles, setProfileIsOpen, notAvailbaleMessage, setNotAvailbaleMessage, whenClickedOnPurchase, setWhenClickedOnPurchase} = useGlobalProps();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  

  const handleClickPurchase = () => {
    setNotAvailbaleMessage!('This project is under development. Memberships and payments are not available at this time.')
    setWhenClickedOnPurchase!(true);
    setTimeout(() => {setNotAvailbaleMessage!(''); setWhenClickedOnPurchase!(false)}, 5000)
  }

  return (
    <section id='pricing' className={`${customStyles?.mainBg} mainPX flex justify-center`}  onClick={() => setProfileIsOpen!(false)}>
      <main className={`MAX_W flex w-full justify-center items-center py-[60px]`}>

        <DynamicTicket price='159.99' months='3' title='Basic' handleClickPurchase={handleClickPurchase}/>

        <div id='BLUE_TICKET' className='relative'>
          <img src="/imgs/blueTicket.png" className={`object-contain w-full`} alt="" />
          {/* Dots */}
          <div className='absolute flex items-center top-[43%] left-[14%] w-[72%]'>
            {Array.from({ length: isMobile? 25 : 40 }).map((_, i) => (   <span key={i} className={`${customStyles?.mainBg} h-[2px] mx-[2px] w-[5px]`}/>))}
          </div>

          <div className='absolute flex-col items-center text-center top-[28%] left-1/2 -translate-1/2'>
            <p className='font-semibold text-white text-[14px]  text-shadow-2xs text-nowrap
               md:text-[1.6rem] sm:text-[1.3rem]'>Suggested</p>
            <p className='font-semibold text-white text-[12px]  text-shadow-2xs text-nowrap
               md:text-[1.5rem] sm:text-[1.2rem]' >6 Months</p>
          </div>

          <div id='PRICE_N_PUNCHACE' className='absolute flex-col items-center text-center top-[60%] max-sm:top-[62%] left-1/2 -translate-1/2'>
            <p className='relative font-semibold text-white text-[10px]  text-shadow-2xs text-nowrap
               md:text-[1.4rem] sm:text-[1.1rem]'>259.99 SEK
              <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[2px] max-sm:h-[1px] w-[110%] max-md:w-[100%] rounded-full bg-[#bb1717]'></span>
            </p>
              
            <p className='font-semibold text-white text-[12px] text-shadow-2xs text-nowrap
               md:text-[1.5rem] sm:text-[1.2rem]' >219.99 SEK
            </p>
            <p className='text-white text-[10px] text-shadow-2xs text-nowrap font-light mb-[20px] max-md:mb-[5px]
               md:text-[1.3rem] sm:text-[1rem]' >Cancel Anytime
            </p>

            <button id='PURCHASE' className={`relative ${customStyles?.mainBgDark} min-w-fit overflow-hidden group rounded-full px-[18px] py-[10px] flex items-center gap-3 max-md:gap-2 text-white border border-[#ffffff22] hover:border-white font-semibold transition2 cursor-pointer text-nowrap mx-auto
              max-md:px-[14px] max-md:py-[7px] max-md:text-[10px] max-sm:text-[8px]`} onClick={handleClickPurchase}>
                <i className="z-10 fa-solid fa-credit-card transition1 group-hover:text-black" />
                
                <p className='z-10 transition1 group-hover:text-black'>
                Purchase
                </p>
                {/* Fill animation layer */}
                <span  className="absolute inset-0 w-full h-full -z-0 left-[-100%] bg-gradient-to-r from-[#ffffff] to-[#b3b3b3] group-hover:left-0 transition-all duration-500 ease-out" />
            </button>
          </div>

        </div>

        <DynamicTicket price='699.99' months='12' title='Premium' handleClickPurchase={handleClickPurchase}/>
       
      </main>    
      {notAvailbaleMessage !== '' && <NotAvailableMessageToUser whenClickedOnPurchase={whenClickedOnPurchase} setWhenClickedOnPurchase={setWhenClickedOnPurchase} />}
    </section>
  )
}

export default Pricing