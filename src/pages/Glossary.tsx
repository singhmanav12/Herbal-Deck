import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const ingredients = [
  {
    name: "Ashwagandha",
    origin: "India (Himalayas)",
    description: "An ancient medicinal herb classified as an adaptogen, meaning it can help your body manage stress. It also provides numerous other benefits for your body and brain.",
    benefits: ["Reduces Stress & Anxiety", "Improves Brain Function", "Increases Muscle Mass"],
    image: "https://images.unsplash.com/photo-1611078749842-8877bc936357?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Brahmi",
    origin: "Wetlands of Southern India",
    description: "A staple in traditional Ayurvedic medicine, Brahmi is best known for its memory-enhancing properties and its ability to reduce inflammation.",
    benefits: ["Enhances Memory", "Reduces Inflammation", "Rich in Antioxidants"],
    image: "https://images.unsplash.com/photo-1540263636901-77884d852026?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Tulsi (Holy Basil)",
    origin: "Tropical Asia",
    description: "Revered as the 'Queen of Herbs', Tulsi is a sacred plant in Hindu belief. It acts as an adaptogen and is packed with vitamin C and zinc.",
    benefits: ["Boosts Immunity", "Reduces Fever & Pain", "Relieves Stress"],
    image: "https://images.unsplash.com/photo-1605220803444-24e548817a3a?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Turmeric",
    origin: "Southeast Asia",
    description: "The spice that gives curry its yellow color. It contains curcumin, a substance with powerful anti-inflammatory and antioxidant properties.",
    benefits: ["Natural Anti-Inflammatory", "Increases Antioxidant Capacity", "Improves Brain Function"],
    image: "https://images.unsplash.com/photo-1615485984852-c2e554d17bdc?auto=format&fit=crop&q=80&w=800"
  }
];

export const Glossary = () => {
  return (
    <div className="bg-[#F7F3E9] min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-20">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            The Source
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary mb-6">Ingredient Glossary</h1>
          <p className="max-w-2xl mx-auto text-text-muted text-lg">
            We source only the most potent, bio-available botanicals from around the world. Discover the science and ancient wisdom behind our formulas.
          </p>
        </div>

        <div className="space-y-24">
          {ingredients.map((ingredient, idx) => (
            <div key={ingredient.name} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative"
              >
                <img src={ingredient.image} alt={ingredient.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#173C2A]/10 mix-blend-overlay" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full md:w-1/2 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-3">
                  <Leaf size={14} /> {ingredient.origin}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">{ingredient.name}</h2>
                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  {ingredient.description}
                </p>
                
                <div>
                  <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Key Benefits</h3>
                  <ul className="space-y-3">
                    {ingredient.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
