import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const slideVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen"
      style={{ willChange: 'auto' }} // Force disable will-change to save sticky positioning
    >
      {children}
    </motion.div>
  );
};
