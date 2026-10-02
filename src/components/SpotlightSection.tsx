import { useRef, type MouseEvent } from 'react';
import { motion, useSpring } from 'framer-motion';

export const SpotlightSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use springs for smooth spotlight trailing
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#06120C] overflow-hidden flex items-center justify-center group"
    >
      {/* Hidden layer revealed by spotlight */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          WebkitMaskImage: `radial-gradient(circle 300px at var(--x) var(--y), black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 300px at var(--x) var(--y), black 0%, transparent 100%)`,
          // @ts-ignore
          '--x': mouseX.get() + 'px',
          '--y': mouseY.get() + 'px',
        }}
        onUpdate={() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty('--x', `${mouseX.get()}px`);
            containerRef.current.style.setProperty('--y', `${mouseY.get()}px`);
          }
        }}
      >
        <div className="w-full h-full bg-[#173C2A] flex flex-col items-center justify-center relative">
          <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80" alt="Botanical" className="absolute top-[10%] left-[10%] w-[30vw] max-w-[400px] h-auto object-cover rounded-full mix-blend-luminosity opacity-40 animate-[spin_60s_linear_infinite]" />
          <img src="https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80" alt="Botanical" className="absolute bottom-[10%] right-[10%] w-[40vw] max-w-[500px] h-auto object-cover rounded-full mix-blend-luminosity opacity-40 animate-[spin_40s_linear_infinite_reverse]" />
          
          <h2 className="text-[12vw] font-serif text-[#F7F3E9] text-center leading-[0.8] mix-blend-overlay drop-shadow-[0_0_30px_rgba(247,243,233,0.5)]">
            ANCIENT <br/><span className="italic">WISDOM</span>
          </h2>
        </div>
      </motion.div>

      {/* Top layer (visible normally) */}
      <div className="z-0 pointer-events-none text-center">
        <h2 className="text-4xl md:text-7xl font-serif text-[#F7F3E9]/10 tracking-widest uppercase transition-opacity duration-500 group-hover:opacity-0">
          Seek The Truth
        </h2>
        <p className="text-[#F7F3E9]/20 mt-4 text-xs tracking-[0.5em] uppercase transition-opacity duration-500 group-hover:opacity-0">Hover to illuminate</p>
      </div>
    </div>
  );
};
