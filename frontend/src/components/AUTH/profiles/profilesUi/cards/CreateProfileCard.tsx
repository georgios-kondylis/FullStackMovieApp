import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props =  {
  text: string
}

const CreateProfileCard = ({ text }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col gap-3 items-center`} onClick={() => navigate('/profiles/createProfile')}>
      <div className={`w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-[5px] flex items-center justify-center bg-[#0000007a] hover:bg-[#80808020]
      text-[8rem] text-[gray] hover:text-[#eaeaea] cursor-pointer`}>
        <i className="fa-solid fa-circle-plus"></i>
      </div>
      <p className='text-[1.7rem]'>{text}</p>
    </div>
  )
}

export default CreateProfileCard