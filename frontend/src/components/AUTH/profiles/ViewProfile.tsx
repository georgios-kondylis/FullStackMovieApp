import React from 'react'
import { GoBackBtn, useGlobalProps } from '../../exports'
import { useNavigate } from 'react-router-dom'
import FavouriteCard from './ViewProfileCards/FavouriteCard'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342' // change size if you want

const ViewProfile = () => {
  const { user, selectedProfile, customStyles, isDarkMode } = useGlobalProps()
  const navigate = useNavigate()

  return (
    <section className={`w-full min-h-screen ${customStyles?.mainBg} flex justify-center mainPX`}>
      <main className="w-full MAX_W flex flex-col px-4 my-3 py-1">
        {/* Top bar */}
        <div className="flex justify-between items-center">
          {selectedProfile?.forKids ? (
            <img src="/icons/logoKids.png" className="w-[70px] md:w-[90px] rounded-full" alt="Kids Logo" />
          ) : (
            <div className='flex items-center'>
              <img src="/icons/logo.png" className="w-[35px] md:w-[50px] rounded-full" alt="Main Logo" />
              <img src={`/icons/${isDarkMode ? 'logoWordWhite.png' : 'logoWordBlack.png'}`} className="w-[120px] md:w-[150px] rounded-full" alt="Cinemoon Logo Text" />
            </div>
          )}

          <GoBackBtn />
        </div>

        {/* Profile Content */}
        <div className={`flex-1 flex flex-col items-center ${customStyles?.basicDynamicTxt}`}>
          {/* Profile card */}
          <div className="w-full text-center mt-[30px]">
            {/* Avatar */}
            <img src={user && selectedProfile ? selectedProfile?.profileImage : '/profileAvatars/guestAvatar.png'} alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
            />

            {/* Name & Email */}
            <div>
              <h1 className="text-3xl font-bold mt-4">{user && selectedProfile? selectedProfile?.name : 'Guest'}</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>

            {/* Profile Details */}
            <div className="flex flex-col items-start mt-[40px] w-full">
              <div className='flex flex-col gap-1 mb-[50px] w-full'>

                <div id='RENDERS-FAV-LIKED-DISLIKED' className='flex flex-col gap-3'>
                  {/* Favourites */}
                    <div>
                      <div className="flex items-center gap-2 w-full">
                        <p className='flex items-center gap-3'>
                          <i className={`fa-solid fa-bookmark`} />
                          <div className='flex items-center gap-3'>
                            <span className="font-semibold"> Favourites: </span>
                            {selectedProfile?.favourites?.length < 1 && <span>0</span> }
                          </div>
                        </p>
                      </div>
                      <div className='flex items-center overflow-x-auto py-[10px]'>
                        {selectedProfile?.favourites?.length > 0 &&
                          selectedProfile?.favourites.map((movie: any, i:any) => 
                            <FavouriteCard key={i} movie={movie}/>
                        )}
                      </div>
                    </div>
                    {/* Liked */}
                    <div>
                      <div className="flex items-center gap-2 w-full">
                        <p className='flex items-center gap-3'>
                          <i className={`fa-solid fa-thumbs-up`} />
                          <div className='flex items-center gap-3'>
                            <span className="font-semibold"> Liked : </span>
                            {selectedProfile?.likedMovies?.length < 1 && <span>0</span> }
                          </div>
                        </p>
                      </div>
                      <div className='flex items-center overflow-x-auto py-[10px]'>
                        {selectedProfile?.likedMovies?.length > 0 &&
                          selectedProfile?.likedMovies?.map((movie: any, i:any) => 
                            <FavouriteCard key={i} movie={movie}/>
                        )}
                      </div>
                    </div>
                    {/* Disliked */}
                    <div>                 
                      <div className="flex items-center gap-2 w-full">
                        <p className='flex items-center gap-3'>
                          <i className={`fa-solid fa-thumbs-down`} />
                          <div className='flex items-center gap-3'>
                            <span className="font-semibold"> Disliked : </span>
                            {selectedProfile?.dislikedMovies?.length < 1 && <span>0</span> }
                          </div>
                        
                        </p>
                      </div>
                      <div className='flex items-center overflow-x-auto py-[10px]'>
                        
                        {selectedProfile?.dislikedMovies?.length > 0 &&
                          selectedProfile?.dislikedMovies?.map((movie: any, i:any) => 
                            <FavouriteCard key={i} movie={movie}/>)}
                      </div>
                    </div>
                </div>
               
                {/* Other fields */}
                <p className='flex items-center gap-3'>
                  <span className="font-semibold">For Kids:</span>
                  {selectedProfile?.forKids ? 'Yes' : 'No'}
                </p>

                <p className='flex items-center gap-3'>
                  <span className='font-semibold'> Membership: </span>
                  {!selectedProfile?.membership ? 'None' : selectedProfile.membership}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default ViewProfile
