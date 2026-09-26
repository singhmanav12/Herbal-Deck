export interface Product {
  id: string;
  name: string;
  category: string;
  mrp: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  shortDesc: string;
  benefits?: string[];
  howToUse?: string;
  isBestSeller?: boolean;
  netQty?: string;
  shelfLife?: string;
}

export const products: Product[] = [
  {
    id: "height-veda",
    name: "Height Veda Natural Growth",
    category: "Body Growth",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Herbal supplement to support natural height growth, bone strength & overall body development during growing years.",
    benefits: ["Supports natural height growth", "Strengthens bones & cartilage", "Boosts energy and stamina", "Promotes overall body development"],
    howToUse: "1 Scoop of Height Veda with 200ml milk or water, once a day after dinner.",
    netQty: "150g",
    shelfLife: "24 Months",
    isBestSeller: true
  },
  {
    id: "fauji-360",
    name: "Fauji 360 Joint Pain Formula",
    category: "Healthy Joints",
    mrp: 4500,
    price: 3600,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1628189871131-b6680a6b2979?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Herbal supplement designed to support joint health, manage joint pain, stiffness, and discomfort from daily wear & aging.",
    benefits: ["Relieves joint pain & stiffness", "Improves mobility & flexibility", "Supports cartilage health", "Reduces inflammation"],
    netQty: "150g",
    shelfLife: "24 Months",
    isBestSeller: true
  },
  {
    id: "gut-amrit",
    name: "Gut Amrit Smooth Digestion",
    category: "Healthy Gut",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1584308666744-24d5e74653e1?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Herbal supplement supporting smooth digestion, nutrient absorption, and gut comfort through its Clean, Repair, and Balance approach.",
    benefits: ["Relieves constipation", "Reduces gas & bloating", "Controls acidity", "Supports gut microbiome health"],
    howToUse: "1 spoon (~5g) with 1 glass of lukewarm water.",
    netQty: "150g",
    shelfLife: "24 Months",
    isBestSeller: true
  },
  {
    id: "play-more",
    name: "Play More African Herbs Power",
    category: "Men Wellness",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1579893529367-a077ce71b80c?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Powerful herbal formulation to support male vitality, stamina, and overall performance naturally.",
    benefits: ["Boosts natural stamina", "Enhances vitality", "Supports overall male wellness"],
    netQty: "150g",
    shelfLife: "24 Months",
    isBestSeller: true
  },
  {
    id: "eye-sutra",
    name: "Eye Sutra Complete Eye Support",
    category: "Eye Care",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1589828135269-ce476b701290?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Comprehensive eye care formula to reduce digital eye strain, support visual clarity, and nourish eye health.",
    benefits: ["Reduces digital eye strain", "Supports visual clarity", "Nourishes eye health naturally"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "allergy-saffa",
    name: "Allergy Saffa All-in-One Relief",
    category: "Allergy Care",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Ayurvedic formula to provide comprehensive relief from seasonal allergies and strengthen the respiratory system.",
    benefits: ["Relieves seasonal allergies", "Strengthens respiratory system", "Boosts natural immunity"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "masai-23",
    name: "Masai 23 Premium Ayurvedic Formula",
    category: "Height Growth",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Premium Ayurvedic supplement inspired by traditional tribal formulations to support height growth and energy.",
    benefits: ["Supports height growth potential", "Builds strength & energy", "Traditional Ayurvedic blend"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "bright-veda",
    name: "Bright Veda 100% Ayurvedic Formula",
    category: "Glowing Skin",
    mrp: 3600,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    shortDesc: "100% Ayurvedic skin care formula to promote a naturally radiant complexion and healthy skin from within.",
    benefits: ["Promotes natural skin glow", "Reduces blemishes", "Nourishes skin from within"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "fitness-plus-gold",
    name: "Fitness Plus Gold Weight Gainer",
    category: "Weight Gain",
    mrp: 3699,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Premium weight gainer packed with essential nutrients for healthy mass building and increased stamina.",
    benefits: ["Supports healthy weight gain", "Builds muscle mass", "Increases stamina & strength"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "bajrang-vati",
    name: "Bajrang Vati Weight Growth",
    category: "Weight Growth",
    mrp: 1499,
    price: 799,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1611078768078-d56715d2a842?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Traditional Ayurvedic formulation to support healthy weight and body mass development.",
    benefits: ["Supports body mass development", "Traditional Vati formulation", "Natural plant-based ingredients"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "saar-sugar",
    name: "Saar Sugar Set",
    category: "Healthy Sugar",
    mrp: 3699,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Ayurvedic supplement to support healthy blood sugar balance and metabolic wellness.",
    benefits: ["Helps regulate blood sugar", "Reduces sugar cravings", "Supports metabolic health naturally"],
    netQty: "150g",
    shelfLife: "24 Months"
  },
  {
    id: "u-stone",
    name: "U-Stone Healthy Kidney Function",
    category: "Healthy Kidney",
    mrp: 3699,
    price: 2499,
    rating: 4.8,
    reviews: 58040,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Natural Ayurvedic formula to support healthy kidney function, detoxification, and urinary tract health.",
    benefits: ["Promotes kidney detox", "Supports urinary tract health", "Maintains healthy renal function"],
    netQty: "150g",
    shelfLife: "24 Months"
  }
];
