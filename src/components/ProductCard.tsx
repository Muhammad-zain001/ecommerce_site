import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types/store';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString('en-PK')}`;
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-stone-300">
      {/* Image container */}
      <div 
        className="relative aspect-3/4 w-full overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onSelect(product)}
      >
        {!imageError ? (
          <img
            src={product.images[0]}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-stone-200/50 p-4 text-center">
            <span className="font-serif text-sm font-semibold text-stone-700">{product.title}</span>
            <span className="text-xs text-stone-500 mt-1">Zain Craft Atelier</span>
          </div>
        )}

        {/* Wishlist toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full transition-all duration-200 shadow-xs ${
            isWishlisted
              ? 'bg-[#2E4A3B] text-white hover:bg-[#203529]'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:text-[#121212]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Status badges - clean single tag if best seller or new */}
        {product.isBestSeller && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#121212] text-[#F6F4EF] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-xs">
            Bestseller
          </div>
        )}
        {!product.isBestSeller && product.isNewArrival && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#2E4A3B] text-white text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-xs">
            New
          </div>
        )}

        {/* Quick actions hover overlay */}
        <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-2 sm:px-3 text-xs font-semibold bg-white/95 text-[#121212] rounded-lg shadow-sm hover:bg-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="p-1.5 sm:p-2 text-white bg-[#2E4A3B] rounded-lg shadow-sm hover:bg-[#203529] transition-colors"
            title="Quick add to bag"
            aria-label="Quick add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Metadata: Category and Rating (compact, native app style) */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-stone-600 truncate">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-700 text-[10px] sm:text-[11px] font-mono">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-serif text-xs sm:text-base font-semibold text-[#121212] line-clamp-1 hover:text-[#2E4A3B] cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Color preview swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? 'border-[#2E4A3B] ring-1 ring-[#2E4A3B] ring-offset-1 scale-110'
                      : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Color ${color.name}`}
                />
              ))}
              <span className="text-[10px] sm:text-[11px] text-stone-500 ml-1 truncate">
                {product.colors[selectedColorIdx]?.name}
              </span>
            </div>
          )}
        </div>

        {/* Pricing and Available Sizes */}
        <div className="mt-3 pt-2 sm:mt-4 sm:pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
            <span className="font-mono tabular-nums text-xs sm:text-base font-bold text-[#121212]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono tabular-nums text-[10px] sm:text-xs text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quick Add icon for Mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="sm:hidden p-1.5 bg-[#2E4A3B]/10 hover:bg-[#2E4A3B] text-[#2E4A3B] hover:text-white rounded-lg transition-colors"
            title="Quick add to bag"
            aria-label="Quick add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-400 font-mono">
            <span>{product.sizes.slice(0, 3).join('/')}{product.sizes.length > 3 ? '+' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
