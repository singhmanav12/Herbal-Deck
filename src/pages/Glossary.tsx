import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ingredients = [
  {
    name: "Ashwagandha",
    origin: "India (Himalayas)",
    description: "An ancient medicinal herb classified as an adaptogen, meaning it can help your body manage stress. It also provides numerous other benefits for your body and brain.",
    benefits: ["Reduces Stress & Anxiety", "Improves Brain Function", "Increases Muscle Mass"],
    image: "https://images.unsplash.com/photo-1611078749842-8877bc936357?auto=format&fit=crop&q=80&w=2000"
  },
  {
    name: "Brahmi",
    origin: "Wetlands of Southern India",
    description: "A staple in traditional Ayurvedic medicine, Brahmi is best known for its memory-enhancing properties and its ability to reduce inflammation.",
    benefits: ["Enhances Memory", "Reduces Inflammation", "Rich in Antioxidants"],
    image: "https://images.unsplash.com/photo-1540263636901-77884d852026?auto=format&fit=crop&q=80&w=2000"
  },
  {
    name: "Tulsi",
    origin: "Tropical Asia",
    description: "Revered as the 'Queen of Herbs', Tulsi is a sacred plant in Hindu belief. It acts as an adaptogen and is packed with vitamin C and zinc.",
    benefits: ["Boosts Immunity", "Reduces Fever & Pain", "Relieves Stress"],
    image: "https://images.unsplash.com/photo-1605220803444-24e548817a3a?auto=format&fit=crop&q=80&w=2000"
  },
  {
    name: "Turmeric",
    origin: "Southeast Asia",
    description: "The spice that gives curry its yellow color. It contains curcumin, a substance with powerful anti-inflammatory and antioxidant properties.",
    benefits: ["Natural Anti-Inflammatory", "Increases Antioxidant Capacity", "Improves Brain Function"],
    image: "https://images.unsplash.com/photo-1615485984852-c2e554d17bdc?auto=format&fit=crop&q=80&w=2000"
  }
];

export const Glossary = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-[120vh] bg-[#06120C] text-[#F7F3E9] py-32 overflow-hidden">
      
      {/* Background Image Layer */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none z-0 fixed"
          >
            <img src={hoveredImage} alt="Botanical Background" className="w-full h-full object-cover filter grayscale mix-blend-luminosity" />
            <div className="absolute inset-0 bg-[#B9673E]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12 flex flex-col pt-10 md:pt-20">
        <h1 className="text-sm md:text-base font-bold mb-20 tracking-[0.5em] uppercase opacity-60 text-center md:text-left">
          The Botanical Index
        </h1>
        
        <ul className="flex flex-col w-full border-t border-[#F7F3E9]/20">
          {ingredients.map((item, idx) => (
            <motion.li 
              key={idx}
              onMouseEnter={() => setHoveredImage(item.image)}
              onMouseLeave={() => setHoveredImage(null)}
              className="group border-b border-[#F7F3E9]/20 py-10 md:py-20 flex flex-col md:flex-row md:items-end justify-between cursor-crosshair transition-colors hover:bg-[#F7F3E9]/5 px-4 md:px-12 -mx-4 md:-mx-12"
            >
              <div className="flex flex-col z-10">
                <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase opacity-50 mb-4">{String(idx + 1).padStart(2, '0')} — {item.origin}</span>
                <h2 className="text-6xl md:text-8xl lg:text-[140px] font-serif leading-[0.8] tracking-tighter group-hover:italic group-hover:translate-x-4 transition-transform duration-500">
                  {item.name}
                </h2>
              </div>
              <div className="max-w-md mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:text-right z-10">
                <p className="text-sm md:text-base leading-relaxed opacity-90 drop-shadow-md">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                  {item.benefits.map(b => (
                    <span key={b} className="text-[10px] tracking-widest uppercase border border-[#F7F3E9]/30 px-3 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};
