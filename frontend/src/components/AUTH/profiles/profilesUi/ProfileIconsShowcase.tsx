import React from 'react'
import { useGlobalProps } from '../../../exports';
import { 
  spidermanProfileIcons, 
  lionKingProfileIcons, 
  herculesProfileIcons, 
  frozenProfileIcons, 
  kungFuPandaProfileIcons, 
  defaultProfileIcons
} from '../costants';
import ListOfAvatats from './ListOfAvatats';

const ProfileIconsShowcase = ({setSelectedIcon, setIconsAvailableIsOpen} : any) => {
  const { customStyles } = useGlobalProps();
  
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#1c1c1c] w-[90vw] max-w-[750px] max-h-[75vh] overflow-scroll px-6 rounded-2xl shadow-xl flex flex-col gap-8">
        
        <h2 className="text-white text-2xl font-semibold text-center mt-[20px]">Choose your avatar</h2>

        <ListOfAvatats 
          title={'Default'} 
          array={defaultProfileIcons} 
          setSelectedIcon={setSelectedIcon} 
          setIconsAvailableIsOpen={setIconsAvailableIsOpen}
        />
        <ListOfAvatats 
          title={'Lion King'} 
          array={lionKingProfileIcons} 
          setSelectedIcon={setSelectedIcon} 
          setIconsAvailableIsOpen={setIconsAvailableIsOpen}
        />
        <ListOfAvatats 
          title={'Hercules'} 
          array={herculesProfileIcons} 
          setSelectedIcon={setSelectedIcon} 
          setIconsAvailableIsOpen={setIconsAvailableIsOpen}
        />
        <ListOfAvatats 
          title={'Kung fu Panda'} 
          array={kungFuPandaProfileIcons} 
          setSelectedIcon={setSelectedIcon} 
          setIconsAvailableIsOpen={setIconsAvailableIsOpen}
        />
        <ListOfAvatats 
          title={'Frozen'} 
          array={frozenProfileIcons} 
          setSelectedIcon={setSelectedIcon} 
          setIconsAvailableIsOpen={setIconsAvailableIsOpen}
        />
        <ListOfAvatats 
          title={'Spiderman'} 
          array={spidermanProfileIcons} 
          setSelectedIcon={setSelectedIcon} 
          setIconsAvailableIsOpen={setIconsAvailableIsOpen}
        />

        {/* Optional Close Button */}
        <div className='w-full bg-[#1c1c1c] pb-[30px] sticky bottom-0'>
          <button onClick={() => setIconsAvailableIsOpen(false)}
            className={`w-full font-semibold py-2 rounded ${customStyles?.btnColor} text-shadow-2xs transition1`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileIconsShowcase