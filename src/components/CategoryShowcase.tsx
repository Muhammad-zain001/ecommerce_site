import React from 'react';
import { ProductCategory } from '../types/store';
import { ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories: {
    id: ProductCategory;
    title: string;
    description: string;
    image: string;
    itemCount: string;
  }[] = [
    {
      id: 'shalwar-kameez',
      title: 'Shalwar Kameez',
      description: 'Hand-finished Giza cotton & matching waistcoats',
      image: '/images/category_shalwar_kameez_1791520997987.jpg',
      itemCount: 'Traditional Atelier',
    },
    {
      id: 'kurtas',
      title: 'Kurtas & Ensembles',
      description: 'Notch plackets, organic twill & straight trousers',
      image: '/images/hero_menswear_editorial_1791520981668.jpg',
      itemCount: 'Pure Everyday Class',
    },
    {
      id: 'shirts',
      title: 'Tailored Shirts',
      description: 'Pure Italian linen & crisp oxford weaves',
      image: '/images/category_shirts_casual_1791521010064.jpg',
      itemCount: 'Modern Smart Casual',
    },
    {
      id: 'outerwear',
      title: 'Outerwear & Overshirts',
      description: 'Heavyweight brushed wool & chore silhouettes',
      image: '/images/category_outerwear_jackets_1791521024708.jpg',
      itemCount: 'Winter Tailoring',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2E4A3B] block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
              Explore by Wardrobe Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-[#2E4A3B] hover:text-[#121212] transition-colors underline underline-offset-4 self-start sm:self-auto"
          >
            View Full Catalogue →
          </button>
        </div>

        {/* 4-Tile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-60 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-stone-200/80 transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white flex flex-col justify-end">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#D9C9A7] font-medium mb-1">
                  <span className="truncate">{cat.itemCount}</span>
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1">
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-sm sm:text-xl font-bold text-white group-hover:text-[#D9C9A7] transition-colors line-clamp-1 sm:line-clamp-none">
                  {cat.title}
                </h3>
                <p className="hidden sm:block text-xs text-stone-300 mt-1 line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
