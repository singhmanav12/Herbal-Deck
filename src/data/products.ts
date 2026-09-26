export interface Product {
  id: string;
  name: string;
  category: string;
  mrp: number;
  price: number;
  rating?: number;
  reviews?: number;
  image: string;
  shortDesc: string;
  benefits?: string[];
  ingredients?: string[];
  howToUse?: string;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "height-veda",
    name: "Height Veda",
    category: "Body Growth",
    mrp: 1299,
    price: 899,
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1584308666744-24d5e74653e1?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Natural height growth support formulated with traditional Ayurvedic herbs.",
    benefits: ["Supports natural height growth", "Strengthens bones", "Boosts energy levels"],
    ingredients: ["Ashwagandha", "Shatavari", "Amla"],
    howToUse: "Take 1 capsule twice a day with warm milk or water.",
    isBestSeller: true
  },
  {
    id: "eye-sutra",
    name: "Eye Sutra",
    category: "Better Vision",
    mrp: 999,
    price: 749,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1629198725622-c356e792e3a8?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Comprehensive vision support to reduce eye strain and improve focus.",
    benefits: ["Reduces digital eye strain", "Supports visual clarity", "Nourishes eye health"],
    isBestSeller: true
  },
  {
    id: "allergy-saffa",
    name: "Allergy Saffa",
    category: "Allergy Relief",
    mrp: 1299,
    price: 899,
    rating: 4.8,
    reviews: 75,
    image: "https://images.unsplash.com/photo-1611078768078-d56715d2a842?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Ayurvedic formula to combat seasonal allergies and boost immunity.",
    benefits: ["Provides relief from seasonal allergies", "Strengthens respiratory system"],
    isBestSeller: true
  },
  {
    id: "gut-amrit",
    name: "Gut Amrit",
    category: "Healthy Gut",
    mrp: 999,
    price: 799,
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Supports smooth digestion and promotes a healthy gut microbiome.",
    benefits: ["Improves digestion", "Reduces bloating", "Enhances nutrient absorption"],
    isBestSeller: true
  },
  {
    id: "bright-veda",
    name: "Bright Veda",
    category: "Glowing Skin",
    mrp: 999,
    price: 749,
    rating: 4.5,
    reviews: 50,
    image: "https://images.unsplash.com/photo-1556228578-8314bbfa06fb?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Natural skincare blend for a radiant and glowing complexion.",
    benefits: ["Promotes natural glow", "Reduces blemishes", "Nourishes skin from within"]
  },
  {
    id: "fitness-plus-gold",
    name: "Fitness Plus Gold",
    category: "Weight Gain",
    mrp: 999,
    price: 799,
    rating: 4.9,
    reviews: 104,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Premium weight gainer packed with essential nutrients for healthy mass building.",
    benefits: ["Supports healthy weight gain", "Builds muscle mass", "Increases stamina"]
  },
  {
    id: "fauji-360",
    name: "Fauji 360",
    category: "Healthy Joints",
    mrp: 1499,
    price: 1199,
    image: "https://images.unsplash.com/photo-1628189871131-b6680a6b2979?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Targeted joint pain formula for improved flexibility and mobility.",
    benefits: ["Relieves joint pain", "Improves flexibility", "Supports cartilage health"]
  },
  {
    id: "play-more-herbs",
    name: "Play More Herbs for Men",
    category: "Better Sex",
    mrp: 1999,
    price: 1499,
    image: "https://images.unsplash.com/photo-1579893529367-a077ce71b80c?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Enhances male vitality, stamina, and performance safely.",
    benefits: ["Boosts stamina", "Enhances vitality", "Improves performance naturally"]
  },
  {
    id: "u-stone",
    name: "U Stone",
    category: "Kidney Health",
    mrp: 899,
    price: 699,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Supports healthy kidney function and detoxification.",
    benefits: ["Promotes kidney detox", "Supports urinary tract health", "Maintains healthy renal function"]
  },
  {
    id: "sugar-saar",
    name: "Sugar Saar",
    category: "Diabetes Control",
    mrp: 1099,
    price: 899,
    image: "https://images.unsplash.com/photo-1584308666744-24d5e74653e1?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Ayurvedic aid for healthy blood sugar management.",
    benefits: ["Helps regulate blood sugar", "Reduces sugar cravings", "Supports metabolic health"]
  }
];
