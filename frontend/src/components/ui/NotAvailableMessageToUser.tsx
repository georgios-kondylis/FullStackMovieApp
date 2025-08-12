import React from 'react'
import { useGlobalProps } from '../exports'

const NotAvailableMessageToUser = () => {
  const {notAvailbaleMessage, setNotAvailbaleMessage, customStyles} = useGlobalProps()


  return (
    <div className={`fixed w-full min-h-[100vh] inset-0 bg-[#000000a1] z-[99] flex items-center justify-center mainPX`}>
      <div className={`${customStyles?.mainBgDark} border border-[#8080803d] w-full max-w-[500px] min-h-[250px] rounded-[10px] relative
                      flex items-center justify-center text-white p-[30px]`}
      >
        <i className='fa-solid fa-circle-xmark | text-[#ffffff9a] hover:text-white cursor-pointer text-[25px] absolute right-[16px] top-[16px]'
        onClick={() => setNotAvailbaleMessage!('')}/>

        <p className='text-center'>{notAvailbaleMessage}</p>

      </div>
    </div>
  )
}

export default NotAvailableMessageToUser