import { motion } from 'framer-motion';

export const FluidBackground = () => {
  return (
    <div className="absolute inset-0 bg-[#06120C] overflow-hidden pointer-events-none z-0">
      {/* 
        Ultra-Premium Fluid Orbs 
        Using pure CSS mix-blend-mode and huge blurs to simulate a 3D organic fluid background.
      */}
      
      {/* Orb 1: Deep Green */}
      <motion.div
        animate={{
          x: ['0vw', '10vw', '-5vw', '0vw'],
          y: ['0vh', '15vh', '-10vh', '0vh'],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#173C2A] rounded-full mix-blend-screen filter blur-[100px] opacity-60"
      />

      {/* Orb 2: Rich Rust / Bronze */}
      <motion.div
        animate={{
          x: ['0vw', '-15vw', '10vw', '0vw'],
          y: ['0vh', '-10vh', '20vh', '0vh'],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[30%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#B9673E] rounded-full mix-blend-screen filter blur-[120px] opacity-40"
      />

      {/* Orb 3: Mid-Tone Sage */}
      <motion.div
        animate={{
          x: ['0vw', '20vw', '-20vw', '0vw'],
          y: ['0vh', '20vh', '-20vh', '0vh'],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-[#28563A] rounded-full mix-blend-screen filter blur-[140px] opacity-50"
      />

      {/* Grain Overlay for Cinematic Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
    </div>
  );
};
