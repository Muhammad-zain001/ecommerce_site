import { Product, ProductReview } from '../types/store';

export const HERO_IMAGE = '/src/assets/images/hero_menswear_editorial_1791520981668.jpg';
export const CRAFTSMANSHIP_IMAGE = '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'zk-sk-01',
    title: 'The Royal Giza Shalwar Kameez with Waistcoat',
    category: 'shalwar-kameez',
    categoryLabel: 'Shalwar Kameez',
    price: 8950,
    originalPrice: 10500,
    sku: 'ZK-SK-2026-01',
    rating: 4.9,
    reviewCount: 42,
    colors: [
      { name: 'Charcoal & Off-White', hex: '#242424' },
      { name: 'Pure White & Slate', hex: '#EBEBEB' },
      { name: 'Navy & Charcoal', hex: '#1C2833' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockStatus: 'In Stock',
    fabric: '100% Superfine Egyptian Giza Cotton & Structured Tropical Waistcoat',
    fit: 'Tailored Traditional Silhouette with Contemporary Chest Structure',
    care: 'Dry clean recommended for waistcoat; gentle hand wash or gentle machine cycle for Kameez Shalwar.',
    modelInfo: 'Model is 6\'1" (185cm) / 79kg wearing Size Large',
    description: 'A masterpiece of Pakistani sartorial craftsmanship. Crafted from handpicked long-staple Egyptian Giza cotton, complemented by a structured charcoal waistcoat featuring hand-stitched welt pockets and metal-rimmed horn buttons.',
    features: [
      'Pure Egyptian cotton with silky hand-feel and breathable weave',
      'Crisp band collar (Sherwani neckline) with concealed placket',
      'Matching tailored Shalwar with refined cuff gathering',
      'Charcoal tropical waistcoat with internal silk lining',
      'Wrinkle-resistant luxury finish suitable for both events and Jummah attire'
    ],
    images: [
      '/src/assets/images/category_shalwar_kameez_1791520997987.jpg',
      '/src/assets/images/hero_menswear_editorial_1791520981668.jpg',
      '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg'
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'zk-kt-02',
    title: 'The Atelier Olive Kurta & Trouser Ensemble',
    category: 'kurtas',
    categoryLabel: 'Kurtas',
    price: 6850,
    originalPrice: 7800,
    sku: 'ZK-KT-2026-02',
    rating: 5.0,
    reviewCount: 29,
    colors: [
      { name: 'Deep Olive', hex: '#2E4A3B' },
      { name: 'Earthy Sage', hex: '#556B2F' },
      { name: 'Warm Khaki', hex: '#C2B280' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockStatus: 'In Stock',
    fabric: '100% Mercerized Organic Cotton with matte twill weave',
    fit: 'Relaxed Tailored Cut with Tapered Straight Pants',
    care: 'Machine wash cold inside out with mild detergent. Iron medium heat with light steam.',
    modelInfo: 'Model is 6\'0" (183cm) wearing Size Medium',
    description: 'A modern tribute to understated Pakistani minimalism. Dyed in Zain Craft signature deep olive, this kurta ensemble features a subtle notch placket, horn buttons, and tailored trousers.',
    features: [
      'Zain Craft signature deep olive hue',
      'Subtle loop-and-button notch placket',
      'Twin side inseam pockets with reinforced bartacks',
      'Includes tailored straight-leg matching trousers with elasticated waistband and drawstring',
      'Breathable all-season cotton fabric engineered for Pakistani climates'
    ],
    images: [
      '/src/assets/images/hero_menswear_editorial_1791520981668.jpg',
      '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg'
    ],
    isBestSeller: true,
    isNewArrival: true,
  },
  {
    id: 'zk-sh-03',
    title: 'Bespoke Pure Linen Button-Down Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    price: 4950,
    originalPrice: 5800,
    sku: 'ZK-SH-2026-03',
    rating: 4.8,
    reviewCount: 34,
    colors: [
      { name: 'Off-White Ivory', hex: '#F6F4EF' },
      { name: 'Raw Sand', hex: '#D9C9A7' },
      { name: 'Midnight Charcoal', hex: '#1C1C1C' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockStatus: 'In Stock',
    fabric: '100% European Flax Pure Linen (Pre-washed)',
    fit: 'Contemporary Sartorial Fit with Spread Collar',
    care: 'Hand wash or delicate machine wash cold. Hang dry in shade. Warm iron slightly damp.',
    modelInfo: 'Model is 6\'0" (183cm) wearing Size Medium',
    description: 'The definitive summer and smart-casual staple. Spun from natural linen that softens with every wear, featuring clean single-needle stitching and mother-of-pearl finish buttons.',
    features: [
      'Breathable pre-washed pure linen for breezy comfort',
      'Semi-spread collar with removable collar stays',
      'Convertible rounded single-button cuffs',
      'Side gussets reinforced with signature ZK green stitching',
      'Pairs seamlessly with pleated Gurkha trousers or raw denim'
    ],
    images: [
      '/src/assets/images/category_shirts_casual_1791521010064.jpg',
      '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg'
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'zk-ow-04',
    title: 'The Sartorial Charcoal Wool Overshirt Jacket',
    category: 'outerwear',
    categoryLabel: 'Outerwear & Jackets',
    price: 7450,
    originalPrice: 8900,
    sku: 'ZK-OW-2026-04',
    rating: 4.9,
    reviewCount: 19,
    colors: [
      { name: 'Charcoal Mélange', hex: '#2A2C2E' },
      { name: 'Dark Olive Wool', hex: '#243329' },
      { name: 'Camel Tan', hex: '#8B6B4A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockStatus: 'In Stock',
    fabric: 'Heavyweight Brushed Wool & Cotton Twill Blend (380 GSM)',
    fit: 'Structured Overshirt Silhouette designed for layering',
    care: 'Dry clean only to maintain fabric loft and garment architecture.',
    modelInfo: 'Model is 6\'2" (188cm) wearing Size Large',
    description: 'An architectural outerwear piece designed for cooler evenings and winter layering. Crafted with twin flap utility chest pockets, sturdy horn buttons, and clean internal finishing.',
    features: [
      'Substantial 380 GSM textured wool-cotton blend',
      'Dual chest patch pockets with button flaps',
      'Reinforced shoulder yoke for enduring drape',
      'Internal chest pocket for phone and passport',
      'Ideal over a crewneck sweater or an off-white cotton kurta'
    ],
    images: [
      '/src/assets/images/category_outerwear_jackets_1791521024708.jpg',
      '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg'
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'zk-tr-05',
    title: 'Sartorial Pleated Olive Chino Trousers',
    category: 'pants',
    categoryLabel: 'Pants & Trousers',
    price: 4650,
    sku: 'ZK-TR-2026-05',
    rating: 4.8,
    reviewCount: 22,
    colors: [
      { name: 'Tailored Olive', hex: '#2E4A3B' },
      { name: 'Charcoal Black', hex: '#181818' },
      { name: 'Warm Khaki Stone', hex: '#C7B99A' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockStatus: 'In Stock',
    fabric: '100% Crisp Cotton Twill with 2% elastane for comfort',
    fit: 'High-Rise Relaxed Taper with Double Forward Pleats and 2-inch Cuffs',
    care: 'Machine wash warm with similar colours. Press along crease with steam.',
    modelInfo: 'Model is 6\'0" (183cm) wearing Size 32 / Medium',
    description: 'Inspired by classic Savile Row tailoring adapted for modern wear. Features double forward pleats, extended side adjuster tab closure, and turned-up trouser cuffs.',
    features: [
      'Side waist adjusters eliminating the need for a belt',
      'Deep tailored double forward pleats',
      'Tailored 2-inch turn-up cuffs',
      'Slanted front pockets and rear button-through jetted pockets'
    ],
    images: [
      '/src/assets/images/category_shirts_casual_1791521010064.jpg'
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'zk-sk-06',
    title: 'Minimalist Ivory Cotton Kurta with Hand-Finished Collar',
    category: 'kurtas',
    categoryLabel: 'Kurtas',
    price: 5250,
    originalPrice: 6200,
    sku: 'ZK-SK-2026-06',
    rating: 4.9,
    reviewCount: 31,
    colors: [
      { name: 'Ivory Off-White', hex: '#FAF8F5' },
      { name: 'Pebble Grey', hex: '#CFCFCF' },
      { name: 'Dusty Olive', hex: '#6E7C6E' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockStatus: 'In Stock',
    fabric: '100% Combed Cotton Cambric with silky mercerized handle',
    fit: 'Classic Pakistani Straight Cut with Medium Length',
    care: 'Machine wash 30°C. Starch lightly if preferred for traditional crisp drape.',
    modelInfo: 'Model is 6\'1" (185cm) wearing Size Large',
    description: 'The quintessential everyday luxury kurta. Meticulously finished by master craftsmen with tone-on-tone pick stitching along the placket and cuffs.',
    features: [
      'Featherlight combed cotton cambric',
      'Hand-finished pick-stitched band collar',
      'Concealed placket with genuine shell buttons',
      'Side vents with reinforced triangle bar-tacks'
    ],
    images: [
      '/src/assets/images/category_shalwar_kameez_1791520997987.jpg',
      '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg'
    ],
    isBestSeller: true,
    isNewArrival: false,
  },
  {
    id: 'zk-ac-07',
    title: 'Atelier Handmade Matte Calfskin Peshawari Chappal',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 5400,
    sku: 'ZK-AC-2026-07',
    rating: 5.0,
    reviewCount: 18,
    colors: [
      { name: 'Matte Obsidian Black', hex: '#151515' },
      { name: 'Vintage Chestnut Brown', hex: '#4A2E18' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stockStatus: 'In Stock',
    fabric: '100% Genuine Full-Grain Calfskin Leather with Tyre-Sole Grip',
    fit: 'Ergonomic traditional silhouette with padded insole',
    care: 'Wipe with soft damp cloth. Condition leather periodically with natural balm.',
    modelInfo: 'Handmade by generational master cobblers in Khyber Pakhtunkhwa',
    description: 'An iconic Pakistani footwear classic elevated with bespoke luxury finishing. Features vegetable-tanned full-grain leather, cushioned footbed, and hand-stitched welt.',
    features: [
      'Full-grain calf leather straps with rounded burnished edges',
      'Supple memory-cushioned footbed for day-long Jummah and wedding comfort',
      'Traditional lightweight durable rubber outsole',
      'Solid brass buckle closure'
    ],
    images: [
      '/src/assets/images/category_shalwar_kameez_1791520997987.jpg'
    ],
    isBestSeller: false,
    isNewArrival: true,
  },
  {
    id: 'zk-ac-08',
    title: 'Woven Pashmina Blend Heritage Winter Shawl',
    category: 'accessories',
    categoryLabel: 'Accessories',
    price: 6500,
    originalPrice: 7900,
    sku: 'ZK-AC-2026-08',
    rating: 4.9,
    reviewCount: 27,
    colors: [
      { name: 'Charcoal & Sand Selvedge', hex: '#2C2B29' },
      { name: 'Natural Camel', hex: '#B5946B' },
      { name: 'Deep Forest Green', hex: '#1E3326' },
    ],
    sizes: ['M', 'L'],
    stockStatus: 'In Stock',
    fabric: 'Fine Wool & Soft Cashmere-touch Blend',
    fit: 'Generous 2.5m x 1.25m traditional wrap dimension',
    care: 'Dry clean only. Store wrapped in cotton cloth with natural cedar balls.',
    modelInfo: 'Traditional 2.5 meter length',
    description: 'An emblem of distinguished grace. Featherweight yet wonderfully warm, finished with raw selvedge edges and subtle border twill pattern.',
    features: [
      'Luxurious hand feel with natural thermal insulation',
      'Subtle tonal four-sided selvedge border',
      'Generous length for effortless traditional draping'
    ],
    images: [
      '/src/assets/images/craftsmanship_fabric_detail_1791521042891.jpg'
    ],
    isBestSeller: false,
    isNewArrival: false,
  }
];

export const REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Hamza Farooq',
    city: 'Lahore (Gulberg)',
    rating: 5,
    date: '14 September 2026',
    comment: 'The stitching quality on the Royal Giza Shalwar Kameez is unlike anything from regular high-street brands in Pakistan. The band collar sits flawlessly without stiffness, and the fabric breathes exceptionally well even in warm weather. Received in 24 hours in Lahore via COD!',
    verified: true,
    sizePurchased: 'Large'
  },
  {
    id: 'rev-2',
    author: 'Taimoor Shah',
    city: 'Islamabad (F-7)',
    rating: 5,
    date: '28 September 2026',
    comment: 'Ordered the Olive Kurta ensemble and the linen shirt. The color is deep and mature — not flashy at all. The clothes-hanger monogram packaging with the garment bag was a pleasant luxury touch.',
    verified: true,
    sizePurchased: 'Medium'
  },
  {
    id: 'rev-3',
    author: 'Bilal Siddiqui',
    city: 'Karachi (DHA Phase 6)',
    rating: 5,
    date: '3 October 2026',
    comment: 'Cash on delivery was smooth with Trax courier. Tested the sizing chart before ordering and the chest measurement matched the size chart to the half-inch. Really impressed by Zain Craft.',
    verified: true,
    sizePurchased: 'X-Large'
  }
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Gujrat',
  'Mardan',
  'Sukkur',
  'Mirpur (AJK)',
  'Muzaffarabad'
];
