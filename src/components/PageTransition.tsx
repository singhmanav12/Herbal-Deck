import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const slideVariants = {
  initial: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    filter: 'blur(20px)',
    scale: 0.95,
    opacity: 0,
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    filter: 'blur(0px)',
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom cinematic easing
    },
  },
  exit: {
    clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)', // Collapses to a thin vertical line
    filter: 'blur(10px)',
    scale: 1.05,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
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
      className="w-full h-full min-h-screen"
    >
      {children}
    </motion.div>
  );
};
