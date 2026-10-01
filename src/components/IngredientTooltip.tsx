import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const ingredientData: Record<string, string> = {
  "Ashwagandha": "An ancient medicinal herb known to reduce stress and anxiety while boosting brain function.",
  "Brahmi": "A staple in Ayurvedic medicine, Brahmi improves memory and reduces inflammation.",
  "Shatavari": "Traditionally used to support vitality and promote reproductive health.",
  "Tulsi": "Holy Basil is known for its adaptogenic properties, helping the body cope with stress.",
  "Turmeric": "Contains curcumin, a substance with powerful anti-inflammatory and antioxidant properties."
};

interface IngredientTooltipProps {
  name: string;
}

export const IngredientTooltip = ({ name }: IngredientTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const description = ingredientData[name];

  if (!description) {
    return <span>{name}</span>; // Fallback if no data
  }

  return (
    <span 
      className="relative inline-flex items-center gap-1 group cursor-help font-medium text-accent border-b border-dashed border-accent/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
      <Info size={12} className="text-accent/60 group-hover:text-accent transition-colors" />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[#173C2A] text-[#F7F3E9] text-xs p-4 rounded-xl shadow-2xl z-50 pointer-events-none"
          >
            <strong className="block text-accent mb-1 uppercase tracking-wider">{name}</strong>
            {description}
            
            {/* Triangle pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#173C2A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
