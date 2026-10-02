import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1611145434382-749e77b4dd49?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608248593859-00f72301f2ed?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80",
];

export const EditorialCollage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  
  // Subtle rotation based on scroll
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <div ref={containerRef} className="py-32 bg-[#F7F3E9] overflow-hidden flex flex-col gap-12 md:gap-24 relative">
      {/* Background massive typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <h2 className="text-[30vw] font-serif leading-none tracking-tighter whitespace-nowrap text-[#173C2A]">
          RAW NATURE
        </h2>
      </div>

      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-8 md:gap-16 px-4 w-[200vw]">
        {[...images, ...images].map((img, i) => (
          <motion.div 
            key={i} 
            style={{ rotate: rotate1 }}
            className="relative w-[60vw] md:w-[30vw] aspect-[3/4] shrink-0 overflow-hidden"
          >
            <img src={img} alt="Botanical" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
          </motion.div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex gap-8 md:gap-16 px-4 w-[200vw] justify-end">
        {[...images, ...images].reverse().map((img, i) => (
          <motion.div 
            key={i} 
            style={{ rotate: rotate2 }}
            className="relative w-[50vw] md:w-[25vw] aspect-[4/5] shrink-0 overflow-hidden"
          >
            <img src={img} alt="Botanical" className="w-full h-full object-cover filter sepia hover:sepia-0 transition-all duration-700 hover:scale-110" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
