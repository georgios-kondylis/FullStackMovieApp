import React from 'react'

const KidsSectionBg = () => {
  return (
    <div id="BG" className="flex overflow-hidden items-center justify-center z-0 absolute h-full bg-[#00d0ff] w-full">
        
        <div id="imgs" className="pl-[100px] max-sm:pl-[40px] flex justify-center w-full gap-2">
        {/* Original Images + Reflections */}
        <div className="relative">
            <img src="imgs/sing.png" className="w-[250px] max-lg:w-[168px] max-sm:w-[80px] sm:mt-[6px] object-contain" alt="sing" />
            <img src="imgs/sing.png" className="w-[250px] max-lg:w-[168px] max-sm:w-[80px] sm:mt-[4px] object-contain absolute top-[95%] left-0 scale-y-[-1] opacity-30 blur-[2px] pointer-events-none" aria-hidden />
        </div>
        <div className="relative">
            <img src="imgs/panda.png" className="w-[365px] max-lg:w-[245px] max-sm:w-[116px] max-sm:mt-[2px] mt-2 object-contain" alt="panda" />
            <img src="imgs/panda.png" className="w-[365px] max-lg:w-[245px] max-sm:w-[116px] max-sm:mt-[2px] mt-2 object-contain absolute top-[93%] left-0 scale-y-[-1] opacity-30 blur-[2px] pointer-events-none" aria-hidden />
        </div>
        <div className="relative">
            <img src="imgs/raya.png" className="w-[455px] lg:pt-1 max-lg:w-[310px] max-sm:w-[145px] max-sm:mt-[5px] mt-4 object-contain" alt="raya" />
            <img src="imgs/raya.png" className="w-[455px] lg:mt-[19px] max-lg:w-[310px] max-sm:w-[145px] max-sm:mt-[5px] mt-4 object-contain absolute top-[91%] left-0 scale-y-[-1] opacity-30 blur-[2px] pointer-events-none" aria-hidden />
        </div>
        </div>

    </div>
  )
}

export default KidsSectionBg