import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGlobalProps } from "../../GlobalContext";

const Loader = () => {
  const { customStyles } = useGlobalProps();
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      {
        scale: 2,
        opacity: 0,
        y: -100,
        skewX: 10,
      },
      {
        duration: 0.9,
        delay: 0.3,
        opacity: 1,
        scale: 1,
        y: 0,
        skewX: 0,
        ease: "power3.out",
      }
    )
    .to(logoRef.current, {
      delay: 0.3, // shorter wait before exit
      duration: 0.6,
      opacity: 0,
      scale: 0.8,
      y: -60,
      ease: "power2.inOut",
    })
    .to(loaderRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      ease: "power1.out",
    }, "-=0.3"); // fade starts slightly before logo is fully gone
  }, []);

  return (
    <div ref={loaderRef}
      className={`fixed inset-0 z-[9999] ${customStyles?.mainBg} flex items-center justify-center`}
    >
      <div id="LOGO" ref={logoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-[8px]"
      >
        <img src="/icons/logo.png" className="w-[35px] md:w-[50px] rounded-full" alt="" />
        <img src="/icons/logoWordWhite.png" className="w-[120px] md:w-[150px] rounded-full" alt="" />
      </div>
    </div>
  );
};

export default Loader;
