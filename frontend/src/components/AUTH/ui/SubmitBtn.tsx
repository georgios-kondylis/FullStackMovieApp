import React from 'react'
import { useGlobalProps } from '../../exports'

type Props = {
  isLoading : boolean
  text: string
  loadingText: string
}

const SubmitBtn = ({isLoading, text, loadingText}: Props) => {
  const {customStyles} = useGlobalProps();
  return (
    <button type="submit"  disabled={isLoading}
      className={`${customStyles?.btnColor} text-white font-semibold rounded p-3 transition-all duration-300 flex justify-center items-center gap-2 
        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
    >
      {isLoading && (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {isLoading ? loadingText : text}
    </button>
  )
}

export default SubmitBtn