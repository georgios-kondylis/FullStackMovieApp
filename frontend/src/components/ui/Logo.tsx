import React from 'react'

const Logo = () => {
  return (
    <div className="w-fit flex items-center my-[20px]">
      <img src="/icons/logo.png" className="w-[35px] md:w-[50px] rounded-full" alt="Main Logo" />
      <img src="/icons/logoWordWhite.png" className="w-[120px] md:w-[150px]" alt="Cinemoon Logo Text" />
    </div>
  )
}

export default Logo