import React, { useState } from 'react';
import { ZaynKraftLogo } from './ZaynKraftLogo';
import { MessageCircle, Mail, MapPin, Check, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenPolicy: (tab: 'shipping' | 'returns' | 'faqs' | 'contact') => void;
  onOpenStory: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPolicy,
  onOpenStory,
  onOpenTracking,
  onOpenAdmin,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#121212] text-[#F6F4EF] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <ZaynKraftLogo variant="full" inverted={true} />
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              Simple. Classy. Timeless. Pakistani menswear crafted with artisanal slow tailoring, premium Egyptian cottons, and disciplined cuts for the modern gentleman.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 text-[#D9C9A7]">
                <MapPin className="w-3.5 h-3.5" /> Lahore Atelier, Pakistan
              </span>
              <span aria-hidden="true">·</span>
              <span>Nationwide COD</span>
            </div>
          </div>

          {/* Quick Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('shalwar-kameez')}
                  className="hover:text-white transition-colors"
                >
                  Shalwar Kameez
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kurtas')}
                  className="hover:text-white transition-colors"
                >
                  Kurtas & Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('shirts')}
                  className="hover:text-white transition-colors"
                >
                  Pure Linen Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('outerwear')}
                  className="hover:text-white transition-colors"
                >
                  Wool Overshirts & Jackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="hover:text-white transition-colors"
                >
                  Handmade Footwear & Shawls
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors"
                >
                  Track Parcel Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery (COD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-white transition-colors"
                >
                  14-Day Size Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('faqs')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStory}
                  className="hover:text-white transition-colors"
                >
                  Brand Story & Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Direct Inquiry */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Atelier Dispatch
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Receive private invitations for limited fabric drops and seasonal Pakistani trunk shows.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full text-xs p-2.5 bg-stone-900 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D9C9A7]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 bg-[#2E4A3B] text-white rounded hover:bg-[#3c5f4c] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#D9C9A7] flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" /> Thank you for joining the Atelier Circle.
                </p>
              )}
            </form>

            <div className="pt-2">
              <a
                href="https://wa.me/923214455888"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#D9C9A7] hover:underline font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp: +92 321 4455888</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © 2026 Zain Craft (ZC). All rights reserved. Registered in Lahore, Pakistan.
          </p>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-white transition-colors"
            >
              Shipping Policy
            </button>
            <button
              onClick={() => onOpenPolicy('returns')}
              className="hover:text-white transition-colors"
            >
              Exchange Policy
            </button>
            <button
              onClick={() => onOpenPolicy('contact')}
              className="hover:text-white transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={onOpenAdmin}
              className="text-stone-600 hover:text-stone-400 transition-colors"
            >
              Store Ops
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
