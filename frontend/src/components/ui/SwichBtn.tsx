
import { useGlobalProps } from "../../GlobalContext";

const SwichBtn = () => {
  const {isDarkMode, toggleDarkMode} = useGlobalProps()
  return (
    <button onClick={toggleDarkMode}
      className={`flex flex-row-reverse items-center justify-between w-[60px] px-[2px] py-[1.5px] rounded-[50px] h-[30px] cursor-pointer`}
      style={{ background: isDarkMode
          ? "linear-gradient(30deg,  #ffffff30, #282828, #282828, #ffffff20)"
          : "linear-gradient(30deg,  #00000090, #ffffff, #ffffff, #00000090)",
      }}
    >
      {isDarkMode? <img className="translate-x-[-8px] w-[14px] transition1" src="/icons/moon.png" alt="" /> : <img className="translate-x-[-35px] w-[18px] transition1 " src="/icons/sun.png" alt="" /> }
      
      <div id="Circle"
        className="flex items-center justify-end w-[26px] h-[26px] rounded-full transition1"
        style={{ background: isDarkMode
            ? "linear-gradient(150deg, #121212, #ffffff, #ffffff90, #121212)"
            : "linear-gradient(150deg,  #ffffff50, #121212, #121212, #ffffff50)",
          transform: isDarkMode? "translateX(3px) translateY(0.5px)" : "translateX(30px) translateY(1px)" ,
        }}>
      </div>
    </button>
  );
};

export default SwichBtn;
