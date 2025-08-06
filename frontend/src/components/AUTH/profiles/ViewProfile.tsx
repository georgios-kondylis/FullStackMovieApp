import React from 'react'
import { GoBackBtn, Logo, useGlobalProps } from '../../exports'
import { useNavigate } from 'react-router-dom'

const ViewProfile = () => {
  const { user, selectedProfile, customStyles, isDarkMode } = useGlobalProps()
  const navigate = useNavigate()


  return (
    <section className={`w-full min-h-screen ${customStyles?.mainBg} flex justify-center mainPX`}>
      <main className="w-full MAX_W flex flex-col px-4 my-3 py-1">
        {/* Top bar */}
        <div className="flex justify-between items-center">
        {selectedProfile.forKids ? (
            <img src="/icons/logoKids.png" className="w-[70px] md:w-[90px] rounded-full" alt="Kids Logo" />
            ) : (
              <div className='flex items-center'>
                <img src="/icons/logo.png" className="w-[35px] md:w-[50px] rounded-full" alt="Main Logo" />
                <img src={`/icons/${isDarkMode? 'logoWordWhite.png':'logoWordBlack.png'}`} className="w-[120px] md:w-[150px] rounded-full" alt="Cinemoon Logo Text" />
              </div>
            )}

         <GoBackBtn/>
        </div>

        {/* Profile Content */}
        <div className={`flex-1 flex flex-col items-center ${customStyles?.basicDynamicTxt}`}>
          {/* Profile card */}
          <div className="w-full text-center mt-[30px]">
            {/* Avatar */}
            <img src={selectedProfile?.profileImage} alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
            />

            {/* Name & Email */}
            <div>
              <h1 className="text-3xl font-bold mt-4">{selectedProfile?.name}</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
           
            {/* Profile Details */}
            <div className="flex flex-col items-start mt-[40px]">
              <p className='flex items-center gap-3'>
                <i className={`fa-solid fa-bookmark`} />
                <span className="font-semibold">Favourites:</span>{' '}
                {selectedProfile?.favourites?.length || 0}
              </p>
              <p className='flex items-center gap-3'>
                <i className={`fa-solid fa-thumbs-up`} />
                <span className="font-semibold">Liked Movies:</span>{' '}
                {selectedProfile?.likedMovies?.length || 0}
              </p>
              <p className='flex items-center gap-3'>
                <i className={`fa-solid fa-thumbs-down`} />
                <span className="font-semibold">Disliked Movies:</span>{' '}
                {selectedProfile?.dislikedMovies?.length || 0}
              </p>
              <p className='flex items-center gap-3'>
                <span className="font-semibold">For Kids:</span>
                {selectedProfile?.forKids ? 'Yes' : 'No'}
              </p>

              <p className='flex items-center gap-3'>
                <span className='font-semibold'> Membership: </span>
               {!selectedProfile.membership ? 'None' : selectedProfile.membership}
              </p>
        
            
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default ViewProfile
