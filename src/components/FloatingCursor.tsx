import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function FloatingCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateCursorType = () => {
      const hoveredElement = document.querySelector(':hover');
      setIsPointer(
        window.getComputedStyle(hoveredElement as Element).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', updateCursorType);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="relative flex h-4 w-4 items-center justify-center"
        animate={{
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="absolute h-full w-full rounded-full bg-white opacity-50" />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
}
