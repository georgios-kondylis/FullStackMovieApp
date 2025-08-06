import React from 'react'
import { Logo, useGlobalProps } from '../../exports'
import { useNavigate } from 'react-router-dom'

const ViewProfile = () => {
  const { user, selectedProfile, customStyles } = useGlobalProps()
  const navigate = useNavigate()


  return (
    <section
      className={`w-full min-h-screen ${customStyles?.mainBg} flex justify-center mainPX`}
    >
      <main className="w-full MAX_W flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          <Logo />

          <button className="text-white px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

        {/* Profile Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-white px-6 py-10">
          {/* Profile card */}
          <div className=" rounded-xl p-8 shadow-lg border border-gray-700 max-w-lg w-full text-center">
            {/* Avatar */}
            <img src={selectedProfile?.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700 shadow-md"
            />

            {/* Name & Email */}
            <h1 className="text-3xl font-bold mt-4">{selectedProfile?.name}</h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>

            {/* Profile Details */}
            <div className="mt-6 space-y-3 text-lg text-gray-300 text-left">
              <p className='flex items-center gap-3'>
                <i className={`fa-solid fa-bookmark`} />
                <span className="font-semibold text-white">Favourites:</span>{' '}
                {selectedProfile?.favourites?.length || 0}
              </p>
              <p className='flex items-center gap-3'>
                <i className={`fa-solid fa-thumbs-up`} />
                <span className="font-semibold text-white">Liked Movies:</span>{' '}
                {selectedProfile?.likedMovies?.length || 0}
              </p>
              <p className='flex items-center gap-3'>
                <i className={`fa-solid fa-thumbs-down`} />
                <span className="font-semibold text-white">Disliked Movies:</span>{' '}
                {selectedProfile?.dislikedMovies?.length || 0}
              </p>
              <p>
                <span className="font-semibold text-white">For Kids:</span>{' '}
                {selectedProfile?.forKids ? 'Yes' : 'No'}
              </p>
            
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default ViewProfile
