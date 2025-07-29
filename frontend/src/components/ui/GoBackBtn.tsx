import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalProps } from '../../GlobalContext'

const GoBackBtn = () => {
  const {customStyles} = useGlobalProps()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button onClick={() => navigate(-1)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
     className={`${customStyles?.btnColor} flex items-center gap-3 px-[12px] py-[6px] rounded-[5px] group`}
  >
    <i className={`${isHovered? 'fa-solid' : 'fa-regular' }  fa-circle-left`}></i>
    <p>Go Back</p>
  </button>
  )
}

export default GoBackBtn