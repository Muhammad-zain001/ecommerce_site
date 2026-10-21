import React from 'react';
import { CRAFTSMANSHIP_IMAGE } from '../data/products';
import { Sparkles, Shield, Scissors, Feather } from 'lucide-react';
import { ZaynKraftLogo } from './ZaynKraftLogo';

interface BrandStoryProps {
  onShopClick: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onShopClick }) => {
  return (
    <section className="py-10 sm:py-20 md:py-28 bg-[#121212] text-[#F6F4EF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
              <img
                src={CRAFTSMANSHIP_IMAGE}
                alt="Zain Craft textile and master tailoring detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 bg-[#121212]/80 backdrop-blur-xs rounded-xl border border-stone-700/60 text-[11px] sm:text-xs text-stone-300">
                <span className="font-serif italic text-xs sm:text-sm text-[#D9C9A7] block mb-0.5 sm:mb-1">The Atelier Standard</span>
                Hand-finished plackets, single-needle lockstitching, and authentic horn buttons.
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-block p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-stone-800 backdrop-blur-xs">
                <ZaynKraftLogo variant="exact" inverted={true} className="max-w-[150px] sm:max-w-[210px]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Simple. Classy. Timeless.
              </h2>
            </div>

            <p className="text-xs sm:text-base text-stone-300 leading-relaxed font-light">
              Zain Craft was born in Pakistan with a singular sartorial ambition: to strip away frivolous fashion noise and return to the quiet power of exceptional tailoring, breathable natural textiles, and disciplined cuts.
            </p>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              From our flagship Shalwar Kameez tailored from long-staple Egyptian Giza cotton to contemporary linen shirts and structured wool overshirts, every garment is measured to honor both our rich cultural heritage and the effortless cadence of the modern gentleman's day.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#D9C9A7]">
                  <Scissors className="w-4 h-4" />
                  <h4 className="font-serif text-sm font-bold text-white">Artisanal Stitching</h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Generational master tailors in Lahore inspecting every collar, cuff, and hemline seam.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#D9C9A7]">
                  <Feather className="w-4 h-4" />
                  <h4 className="font-serif text-sm font-bold text-white">Pure Natural Fibres</h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Egyptian combed cottons, pure European linens, and soft wools engineered for Pakistan's climate.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#D9C9A7]">
                  <Shield className="w-4 h-4" />
                  <h4 className="font-serif text-sm font-bold text-white">Transparent Trust</h4>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Cash on Delivery nationwide, transparent pricing, and 14-day hassle-free exchanges.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onShopClick}
                className="px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#121212] bg-[#D9C9A7] rounded-xl hover:bg-white transition-all shadow-md"
              >
                Explore The Atelier
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
