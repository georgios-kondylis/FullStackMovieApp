import React from 'react'
import { useGlobalProps } from '../exports'

type Props = {
  whenClickedOnPurchase?: boolean,
  setWhenClickedOnPurchase?: (value: boolean) => void,
  whenClickedOnWatchMovie?: boolean,
  setWhenClickedOnWatchMovie?: (value: boolean) => void,
}

const NotAvailableMessageToUser = ({whenClickedOnPurchase, setWhenClickedOnPurchase, whenClickedOnWatchMovie, setWhenClickedOnWatchMovie}: Props) => {
  const {notAvailbaleMessage, setNotAvailbaleMessage, customStyles, handleSignOut, } = useGlobalProps()


  return (
    <div className={`fixed w-full min-h-[100vh] inset-0 bg-[#000000a1] z-[99] flex items-center justify-center mainPX`}>
      <div className={`${customStyles?.mainBgDark} border border-[#8080803d] w-full max-w-[500px] min-h-[250px] rounded-[10px] relative
                      flex flex-col items-center justify-center text-white p-[30px]  `}
      >
        <i className='fa-solid fa-circle-xmark | text-[#ffffff9a] hover:text-white cursor-pointer text-[25px] absolute right-[16px] top-[16px]'
        onClick={() => setNotAvailbaleMessage!('')}/>

        <p className='text-center mt-[20px]'>{notAvailbaleMessage}</p>

        <button type="submit" className={`${customStyles?.btnColor} text-white font-semibold rounded p-2 mt-[30px] transition1 flex justify-center items-center gap-2 
                w-full hover:opacity-90`}
                onClick={whenClickedOnPurchase 
                ? () => {setNotAvailbaleMessage!(''); setWhenClickedOnPurchase!(false)} :  whenClickedOnWatchMovie
                ? () => {setNotAvailbaleMessage!(''); setWhenClickedOnWatchMovie!(false)} : handleSignOut}
        >

          {whenClickedOnPurchase ? 'Got it!' : whenClickedOnWatchMovie ? 'Got it!' : 'Sign In'}
        </button>
      </div>
    </div>
  )
}

export default NotAvailableMessageToUser