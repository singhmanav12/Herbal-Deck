import { motion } from 'framer-motion';

export const FluidBackground = () => {
  return (
    <div className="absolute inset-0 bg-[#06120C] overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0vw, 0vh) scale(1); }
          50% { transform: translate(10vw, 15vh) scale(1.2); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0vw, 0vh) scale(1); }
          50% { transform: translate(-15vw, -10vh) scale(1.4); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0vw, 0vh) scale(1); }
          50% { transform: translate(20vw, 20vh) scale(1.3); }
        }
        .fluid-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          will-change: transform;
        }
      `}</style>
      
      {/* Orb 1: Deep Sage / Gold */}
      <div
        className="fluid-orb -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#4A7C59] opacity-80"
        style={{ animation: 'float1 20s ease-in-out infinite' }}
      />

      {/* Orb 2: Rich Rust / Bronze */}
      <div
        className="fluid-orb top-[20%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#B9673E] opacity-70"
        style={{ animation: 'float2 25s ease-in-out infinite 2s' }}
      />

      {/* Orb 3: Cream / Tan */}
      <div
        className="fluid-orb -bottom-[10%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-[#D4A373] opacity-60"
        style={{ animation: 'float3 30s ease-in-out infinite 5s' }}
      />

      {/* Grain Overlay for Cinematic Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    </div>
  );
};
