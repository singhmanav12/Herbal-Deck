import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);

  const cursorX = useSpring(-100, { damping: 25, stiffness: 120, mass: 0.5 });
  const cursorY = useSpring(-100, { damping: 25, stiffness: 120, mass: 0.5 });
  const cursorXInner = useSpring(-100, { damping: 40, stiffness: 400, mass: 0.2 });
  const cursorYInner = useSpring(-100, { damping: 40, stiffness: 400, mass: 0.2 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      cursorXInner.set(e.clientX - 4);
      cursorYInner.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#173C2A] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: hovered ? 2.5 : 1,
          backgroundColor: hovered ? 'rgba(23,60,42,0.1)' : 'transparent',
          borderColor: hovered ? 'transparent' : '#F7F3E9'
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#F7F3E9] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorXInner,
          y: cursorYInner,
          scale: hovered ? 0 : 1,
        }}
      />
    </>
  );
};
