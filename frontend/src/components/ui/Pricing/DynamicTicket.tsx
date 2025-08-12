import { useGlobalProps } from '../../../GlobalContext'
import { useMediaQuery } from 'react-responsive';

type Props = {
  months: string, 
  price: string,
  title: string,
  handleClickPurchase: any,
}

const DynamicTicket = ({months, price, title, handleClickPurchase} : Props) => {

  const {customStyles, isDarkMode} = useGlobalProps();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const pricingTextDynamic = isDarkMode? 'text-black': 'text-white'

  return (
    <div id='1ST_TICKET' className='relative'>
    <img src={`/imgs/${isDarkMode? 'whiteTicket.png' : 'blackTicket.png'}`} className={`object-contain w-full 
       ${isDarkMode && 'pl-[13px] max-md:pl-[10px] max-sm:pl-[5px]'}`} alt="" />

    <div className={`absolute flex-col items-center text-center top-[20%] left-1/2 -translate-1/2 ${isDarkMode && '' } ${pricingTextDynamic}`}>
      <p className='font-semibold text-[14px]  text-shadow-2xs text-nowrap
         md:text-[1.6rem] sm:text-[1.3rem]'>{title}</p>
      <p className='font-semibold text-[12px]  text-shadow-2xs text-nowrap
         md:text-[1.5rem] sm:text-[1.2rem]' >{months} Months</p>
    </div>

    <div id='PRICE_N_PUNCHACE' className='absolute flex-col items-center text-center top-[65%] max-sm:top-[67%] left-1/2 -translate-1/2'>
        
      <p className={`font-semibold ${pricingTextDynamic} text-[12px] text-shadow-2xs text-nowrap
         md:text-[1.5rem] sm:text-[1.2rem]`} >{price} SEK
      </p>
      <p className={`${pricingTextDynamic} text-[8px] text-shadow-2xs text-nowrap font-light mb-[20px] max-md:mb-[5px]
         md:text-[1.3rem] sm:text-[1rem]`} >Cancel Anytime
      </p>

      <button id='PURCHASE' className={`relative ${customStyles?.mainBgDark} min-w-fit overflow-hidden group rounded-full px-[18px] py-[10px] flex items-center gap-3 max-md:gap-2 text-white border ${isDarkMode? 'border-[#ffffff22]' : 'border-white'}  hover:border-white font-semibold transition2 cursor-pointer text-nowrap mx-auto
        max-md:px-[12px] max-md:py-[5px] max-md:text-[10px] max-sm:text-[6px]`} onClick={handleClickPurchase}>
          <i className="z-10 fa-solid fa-credit-card transition1 group-hover:text-black" />
          
          <p className='z-10 transition1 group-hover:text-black'>
          Purchase
          </p>
          {/* Fill animation layer */}
          <span  className="absolute inset-0 w-full h-full -z-0 left-[-100%] bg-gradient-to-r from-[#ffffff] to-[#b3b3b3] group-hover:left-0 transition-all duration-500 ease-out" />
      </button>
    </div>
  </div>
  )
}

export default DynamicTicket