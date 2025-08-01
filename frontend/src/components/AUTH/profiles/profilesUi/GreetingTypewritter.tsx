import React, { useEffect, useState } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export const GreetingTypewriter = ({ name }: { name: string }) => {
  const [text, helper] = useTypewriter({
    words: [`Welcome ${name}`, ''],
    loop: 1,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (helper.isDone) {
      const timer = setTimeout(() => setHide(true), 100); // optional delay before hiding
      return () => clearTimeout(timer);
    }
  }, [helper.isDone]);

  if (hide) return null; // 🧨 removes from DOM — 0 space used

  return (
    <span className="text-gradient text-[2.5rem] md:text-[2.6rem] font-semibold mr-4 text-nowrap">
      {text}
      <Cursor cursorStyle="|" />
    </span>
  );
};
