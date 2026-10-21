import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-8 sm:py-16 md:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 mb-6 sm:mb-12">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#2E4A3B]">
            Client Testimonials
          </span>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#121212]">
            Worn with Confidence Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Genuine experiences from gentlemen who value pure fabric, accurate tailoring, and seamless Cash on Delivery.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#F6F4EF] border border-stone-200/80 flex flex-col justify-between space-y-3 sm:space-y-5"
            >
              <div className="space-y-2.5 sm:space-y-3">
                {/* Rating & Verified badge - Refined Delicate Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-emerald-700">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & City info */}
              <div className="pt-2.5 sm:pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-bold text-[#121212] text-xs sm:text-sm">{rev.author}</h4>
                  <span className="text-stone-500 text-[10px] sm:text-[11px]">{rev.city}</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-stone-400 font-mono">Size {rev.sizePurchased}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
