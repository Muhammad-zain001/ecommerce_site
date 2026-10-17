import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#2E4A3B]">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#121212]">
            Worn with Confidence Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Genuine experiences from gentlemen who value pure fabric, accurate tailoring, and seamless Cash on Delivery.
          </p>
        </div>

        {/* 3-Column Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#F6F4EF] border border-stone-200/80 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & City info */}
              <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-bold text-[#121212]">{rev.author}</h4>
                  <span className="text-stone-500 text-[11px]">{rev.city}</span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">Size {rev.sizePurchased}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
