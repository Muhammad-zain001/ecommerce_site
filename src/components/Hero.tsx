import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface HeroProps {
  onShopClick: () => void;
  onCategoryClick: (cat: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCategoryClick }) => {
  return (
    <div className="relative bg-[#F6F4EF]">
      {/* Hero Showcase Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-14">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-stone-900 min-h-[440px] sm:min-h-[520px] md:min-h-[620px] flex items-center">
          
          {/* Background Editorial Image */}
          <img
            src={HERO_IMAGE}
            alt="Zain Craft Pakistani Luxury Menswear Campaign"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.04]"
          />

          {/* Measured Scrim Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl px-5 sm:px-12 py-10 sm:py-16 md:py-20 text-[#F6F4EF] space-y-4 sm:space-y-6">
            
            {/* Clean unboxed kicker */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#D9C9A7]">
              <span>Autumn / Winter 2026</span>
              <span aria-hidden="true">·</span>
              <span>The Atelier Series</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.1] text-balance">
              Simple. Classy. Timeless.
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-base text-stone-200 leading-relaxed font-light max-w-xl">
              Pakistani menswear stripped of vanity. Crafted from Egyptian long-staple cotton, natural linen, and structured wools for the discerning gentleman.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2E4A3B] hover:bg-[#22372C] rounded-xl transition-all shadow-lg active:scale-98"
              >
                <span>Shop New Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onCategoryClick('shalwar-kameez')}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-[#121212] bg-[#FAF8F5] hover:bg-white rounded-xl transition-all shadow-md active:scale-98"
              >
                <span>Shalwar Kameez</span>
              </button>
            </div>

            {/* Regional trust marker (strictly single-line on mobile) */}
            <div className="pt-2 sm:pt-4 flex items-center gap-3 sm:gap-6 text-[10.5px] sm:text-xs text-stone-300 whitespace-nowrap overflow-x-auto scrollbar-none">
              <span className="inline-flex items-center gap-1 shrink-0">
                <Truck className="w-3.5 h-3.5 text-[#D9C9A7] shrink-0" />
                <span>Free Delivery &gt; Rs. 5,000</span>
              </span>
              <span className="opacity-40 shrink-0">·</span>
              <span className="inline-flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D9C9A7] shrink-0" />
                <span>Cash on Delivery</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Trust Row (Section 7.1) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-stone-200/80 shadow-xs">
          
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#2E4A3B]/10 text-[#2E4A3B] rounded-xl shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#121212]">Nationwide Delivery</h4>
              <p className="text-xs text-stone-500">2-3 days via Trax & CallCourier</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#2E4A3B]/10 text-[#2E4A3B] rounded-xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#121212]">Cash on Delivery</h4>
              <p className="text-xs text-stone-500">Pay rider upon parcel inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#2E4A3B]/10 text-[#2E4A3B] rounded-xl shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#121212]">14-Day Exchanges</h4>
              <p className="text-xs text-stone-500">Zero-hassle size replacements</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#2E4A3B]/10 text-[#2E4A3B] rounded-xl shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#121212]">Artisanal Precision</h4>
              <p className="text-xs text-stone-500">Master-tailored in Lahore</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
