import React from 'react';
import type { Credits } from '../../constants/types';
import { useGlobalProps } from '../../GlobalContext';
import { useMediaQuery } from 'react-responsive';

interface CastAndCrewProps {
  credits: Credits;
}

const CastAndCrew: React.FC<CastAndCrewProps> = ({ credits }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const { customStyles } = useGlobalProps();
  const directors = credits.crew.filter((person) => person.job === 'Director');

  return (
    <>
      {/* Top Cast */}
      {credits.cast.length > 0 && (
        <div id='ACTORS' className='flex flex-col gap-3 mt-10'>
          <p className='txtFadedGray font-semibold'>Top Cast</p>
          <div className='flex items-center gap-4 max-sm:gap-[5px] overflow-x-auto scrollbar-hide px-2'>
          {(credits.cast.length > 10 || (isMobile && credits.cast.length > 3)) && (
            <i className={`fa-solid fa-chevron-left ${customStyles?.basicDynamicTxt}`} />
           )}

            {credits.cast.slice(0, 15).map((actor) => (
              <div  key={actor.id}  className='w-[100px] flex flex-col gap-1 items-center text-center'>
                <div className='w-[80px] h-[80px]'>
                  <img src={ actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : '/icons/default_avatar.png'
                    } alt={actor.name}
                    className='w-full h-full object-cover rounded-full mb-2'
                  />
                </div>
                <p className={`text-sm font-semibold truncate w-full ${customStyles?.basicDynamicTxt} `} title={actor.name} >
                  {actor.name}
                </p>
                <p className='text-xs txtFadedGray truncate w-full' title={actor.character} >
                  {actor.character}
                </p>
              </div>
            ))}

          {(credits.cast.length > 10 || (isMobile && credits.cast.length > 3)) && (
            <i className={`fa-solid fa-chevron-right ${customStyles?.basicDynamicTxt}`} />
          )}
          </div>
        </div>
      )}

       {/* Directors */}
       {directors.length > 0 && (
        <div className='mt-3 flex flex-col gap-3'>
          <p className='txtFadedGray font-semibold'>
            Director{directors.length > 1 ? 's' : ''}
          </p>
          <div className='flex items-center gap-4 overflow-x-auto scrollbar-hide px-2'>
          {directors.map((director) => (
            <div key={director.id} className='w-[100px] flex flex-col gap-1 items-center text-center'>
              <div className='w-[80px] h-[80px]'>
                <img src={   director.profile_path
                      ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                      : '/icons/default_avatar.png'
                  } alt={director.name}
                  className='w-full h-full object-cover rounded-full mb-2'
                />
              </div>
              <p className={`text-sm font-semibold truncate w-full ${customStyles?.basicDynamicTxt}`} title={director.name}>
                {director.name}
              </p>
              <p className='text-xs txtFadedGray truncate w-full' title="Director">
                Director
              </p>
            </div>
          ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CastAndCrew;
