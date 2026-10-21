import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  onHomeClick: () => void;
  onShopClick: () => void;
  onSearchClick: () => void;
  onWishlistClick: () => void;
  onCartClick: () => void;
  wishlistCount: number;
  cartCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onHomeClick,
  onShopClick,
  onSearchClick,
  onWishlistClick,
  onCartClick,
  wishlistCount,
  cartCount,
}) => {
  return (
    <nav 
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-2 pb-safe"
      aria-label="Mobile Navigation Bar"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={onHomeClick}
          className="flex flex-col items-center justify-center py-1 text-stone-600 hover:text-[#121212] active:scale-95 transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Atelier</span>
        </button>

        {/* Shop */}
        <button
          onClick={onShopClick}
          className="flex flex-col items-center justify-center py-1 text-stone-600 hover:text-[#121212] active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center py-1 text-stone-600 hover:text-[#121212] active:scale-95 transition-all"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onWishlistClick}
          className="relative flex flex-col items-center justify-center py-1 text-stone-600 hover:text-[#121212] active:scale-95 transition-all"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#2E4A3B] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Wishlist</span>
        </button>

        {/* Bag */}
        <button
          onClick={onCartClick}
          className="relative flex flex-col items-center justify-center py-1 text-[#2E4A3B] active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#2E4A3B] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight mt-0.5">Bag</span>
        </button>
      </div>
    </nav>
  );
};
