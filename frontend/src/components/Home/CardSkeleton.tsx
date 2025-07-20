import React from "react";

type Props = {
  loading?: boolean
}

const CardSkeleton = () => {
  return (
    <div className={`relative min-w-[150px] w-[140px] h-[230px] rounded-lg overflow-hidden
                 md:min-w-[200px] md:w-[200px] md:h-[300px]
                 bg-gray-700 animate-pulse`}
    >
      {/* Skeleton for poster */}
      <div className="w-full h-full bg-gray-600 rounded-lg"></div>

      {/* Top-left border box */}
      <div className="flex w-[55px] h-[55px] border-[5px] rounded-[8px] backdrop-blur-[3px] border-[#030A1B]
                      items-center justify-center absolute top-[-6px] left-[-5px] text-[25px] text-white">
        {/* empty placeholder */}
      </div>
    </div>
  );
};

export default CardSkeleton;
