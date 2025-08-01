import React from 'react'

type Props = {
  message: string
}

const MessageToUser = ({message}: Props) => {
  return (
    <p className={`absolute bottom-[-50px] left-0 px-5 py-2 text-center text-white bg-black/80 w-full mx-auto pointer-events-none rounded-[5px]
      transition-all duration-500 ease-in-out ${message !== ''? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
  >
    {message}
  </p>
  )
}

export default MessageToUser