import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Truck, User, ShieldCheck, Package } from 'lucide-react';
import { ZaynKraftLogo } from './ZaynKraftLogo';
import { ProductCategory } from '../types/store';

interface HeaderProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  cartCount: number;
  wishlistCount: number;
  myOrdersCount?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  onOpenSearch: () => void;
  onOpenStory: () => void;
  onOpenAdmin: () => void;
  onOpenMyOrders: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  myOrdersCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  onOpenSearch,
  onOpenStory,
  onOpenAdmin,
  onOpenMyOrders,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; cat: ProductCategory }[] = [
    { label: 'Shop All', cat: 'all' },
    { label: 'Shalwar Kameez', cat: 'shalwar-kameez' },
    { label: 'Kurtas', cat: 'kurtas' },
    { label: 'Shirts', cat: 'shirts' },
    { label: 'Outerwear', cat: 'outerwear' },
  ];

  const handleNavClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F4EF]/95 backdrop-blur-md border-b border-stone-200">
      {/* 1. Real Announcement Strip (Always 1 single line on both mobile & desktop) */}
      <div className="bg-[#121212] text-[#F6F4EF] py-1.5 px-3 text-center tracking-wide flex items-center justify-center overflow-hidden">
        {/* Mobile View: Crisp 1-line layout that never breaks */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 text-[10px] font-medium whitespace-nowrap">
          <span>COD Available</span>
          <span className="opacity-50">•</span>
          <span className="text-[#D9C9A7] font-semibold">Free Delivery &gt; Rs. 5,000</span>
        </div>

        {/* Tablet/Desktop View */}
        <div className="hidden sm:flex items-center justify-center gap-2.5 text-xs font-medium whitespace-nowrap">
          <span>Nationwide Express Delivery</span>
          <span className="opacity-50">·</span>
          <span>Cash on Delivery (COD) Available</span>
          <span className="opacity-50">·</span>
          <span className="text-[#D9C9A7] font-semibold">Free Shipping on Orders Over Rs. 5,000</span>
        </div>
      </div>

      {/* 2. Top Bar Contract: 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-8 h-14 sm:h-18 md:h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left focus:outline-hidden"
              aria-label="Zain Craft Home"
            >
              <ZaynKraftLogo variant="full" />
            </button>
          </div>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-stone-700">
            {navLinks.map((link) => (
              <button
                key={link.cat}
                onClick={() => handleNavClick(link.cat)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#121212] ${
                  currentCategory === link.cat
                    ? 'text-[#2E4A3B] underline underline-offset-8 decoration-2'
                    : 'text-stone-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenStory}
              className="text-stone-600 hover:text-[#121212] transition-colors whitespace-nowrap shrink-0"
            >
              The Atelier
            </button>
            <button
              onClick={onOpenTracking}
              className="text-stone-600 hover:text-[#121212] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <Truck className="w-3.5 h-3.5 text-[#2E4A3B]" />
              <span>Track Order</span>
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances / Primary Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-[#121212] rounded-lg transition-colors"
              title="Search collection"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 sm:p-2 text-stone-700 hover:text-[#121212] rounded-lg transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#2E4A3B] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button (Primary Action) */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 py-1.5 px-2.5 sm:py-2 sm:px-4 text-xs font-semibold text-white bg-[#2E4A3B] hover:bg-[#203529] rounded-xl transition-all shadow-xs"
              aria-label="Open cart drawer"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 text-white text-[10px] sm:text-[11px] font-mono flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Customer "My Orders" History Button */}
            <button
              onClick={onOpenMyOrders}
              className="flex items-center gap-1.5 py-1.5 px-2 sm:px-2.5 text-xs font-semibold text-stone-700 hover:text-[#121212] bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shadow-2xs"
              title="My Orders & Purchase History"
              aria-label="My Orders"
            >
              <Package className="w-3.5 h-3.5 text-[#2E4A3B] shrink-0" />
              <span className="hidden sm:inline">My Orders</span>
              {myOrdersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#2E4A3B] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                  {myOrdersCount}
                </span>
              )}
            </button>

            {/* Direct Prominent Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 py-1.5 px-2 sm:px-2.5 text-xs font-semibold text-[#121212] bg-[#D9C9A7]/80 hover:bg-[#D9C9A7] border border-[#C5B490] rounded-xl transition-all shadow-2xs active:scale-95"
              title="Store Owner Admin Panel (Protected)"
              aria-label="Open Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E4A3B] shrink-0" />
              <span>Admin</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-[#121212]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="pb-4 border-b border-stone-100 flex justify-center">
            <ZaynKraftLogo variant="exact" className="max-w-[150px]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">
              Collections
            </span>
            {navLinks.map((link) => (
              <button
                key={link.cat}
                onClick={() => handleNavClick(link.cat)}
                className={`block w-full text-left py-2.5 text-sm font-semibold transition-colors ${
                  currentCategory === link.cat ? 'text-[#2E4A3B]' : 'text-stone-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">
              Atelier Services
            </span>
            <button
              onClick={() => {
                onOpenStory();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-stone-700"
            >
              Our Philosophy & Heritage
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-stone-700 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#2E4A3B]" />
              <span>Track Existing Order</span>
            </button>
            <button
              onClick={() => {
                onOpenMyOrders();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-stone-700 flex items-center gap-2"
            >
              <Package className="w-4 h-4 text-[#2E4A3B]" />
              <span>My Orders & Purchases</span>
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-stone-700 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#2E4A3B]" />
              <span>Store Owner Admin (PIN Protected)</span>
            </button>
          </div>

          <div className="pt-3 border-t border-stone-100 text-xs text-stone-500">
            <p>Zain Craft Atelier • Lahore, Pakistan</p>
            <p className="mt-0.5 font-medium text-[#2E4A3B]">Cash on Delivery Nationwide</p>
          </div>
        </div>
      )}
    </header>
  );
};
