import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/store';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  const formatPrice = (p: number) => `Rs. ${p.toLocaleString('en-PK')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#F6F4EF] rounded-2xl shadow-2xl border border-[#D9C9A7]/50 overflow-hidden my-auto max-h-[85vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#2E4A3B] fill-current" />
            <h2 id="wishlist-title" className="font-serif text-lg font-bold text-[#121212]">
              Saved Garments ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {wishlistedProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-200/60 mx-auto flex items-center justify-center text-stone-400">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#121212]">Your wishlist is currently empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any Shalwar Kameez, Kurta, or shirt to save it for later.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs"
              >
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                    {p.categoryLabel}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-[#121212] line-clamp-1">
                    {p.title}
                  </h4>
                  <p className="font-mono tabular-nums text-xs font-bold text-[#121212] mt-0.5">
                    {formatPrice(p.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMoveToCart(p)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#2E4A3B] rounded-lg hover:bg-[#203529] transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
