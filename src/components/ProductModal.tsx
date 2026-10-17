import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  Ruler, 
  ShieldCheck, 
  Star, 
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';
import { Product, ProductColor } from '../types/store';
import { PAKISTAN_CITIES } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: (category: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [addedToast, setAddedToast] = useState(false);

  const formatPrice = (p: number) => `Rs. ${p.toLocaleString('en-PK')}`;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  // City-based estimated shipping timeline
  const getDeliveryEstimate = (city: string) => {
    if (city === 'Lahore') return '1–2 business days (Atelier Express)';
    if (city === 'Karachi' || city === 'Islamabad' || city === 'Rawalpindi') return '2–3 business days';
    return '3–4 business days nationwide';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#F6F4EF] rounded-2xl shadow-2xl border border-[#D9C9A7]/40 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-[#121212] transition-colors shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery */}
        <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col gap-4 bg-white/60 md:border-r border-stone-200">
          {/* Main Image */}
          <div className="relative aspect-3/4 w-full rounded-xl overflow-hidden bg-stone-100 shadow-xs">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-[#121212] text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs">
                Signature Collection
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-16 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx
                      ? 'border-[#2E4A3B] ring-2 ring-[#2E4A3B]/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Model info note */}
          <div className="text-xs text-stone-500 bg-[#FAF8F5] p-3 rounded-lg border border-stone-200/60 flex items-center justify-between">
            <span>{product.modelInfo}</span>
            <span className="text-[11px] text-[#2E4A3B] font-medium">True to size</span>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module & Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-1">
              <span className="uppercase tracking-wider font-semibold text-[#2E4A3B]">
                {product.categoryLabel}
              </span>
              <span className="font-mono text-stone-400">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#121212] leading-tight mb-2">
              {product.title}
            </h1>

            {/* Price & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div className="flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl font-bold text-[#121212]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-sm text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-semibold text-[#2E4A3B] bg-[#2E4A3B]/10 px-2 py-0.5 rounded">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-stone-900">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-700">
                  Colour: <strong className="text-[#121212]">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedColor.name === c.name
                        ? 'border-[#2E4A3B] bg-white text-[#121212] shadow-xs ring-1 ring-[#2E4A3B]'
                        : 'border-stone-200 bg-white/70 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Link */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-700">
                  Select Size: <strong className="text-[#121212]">{selectedSize}</strong>
                </span>
                <button
                  onClick={() => onOpenSizeGuide(product.category)}
                  className="inline-flex items-center gap-1 text-[#2E4A3B] hover:text-[#203529] font-semibold underline underline-offset-2 transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedSize === s
                        ? 'bg-[#2E4A3B] border-[#2E4A3B] text-white shadow-xs'
                        : 'bg-white border-stone-200 text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-5 flex items-center gap-4 text-xs">
              <span className="font-medium text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-stone-600 hover:text-black font-bold transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-1 font-mono font-bold text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-stone-600 hover:text-black font-bold transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-stone-500">
                Total: <strong className="text-[#121212] font-mono tabular-nums">{formatPrice(product.price * quantity)}</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-[#2E4A3B] rounded-xl hover:bg-[#203529] transition-all shadow-sm active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-6 text-sm font-semibold text-[#121212] bg-[#D9C9A7] rounded-xl hover:bg-[#cfbd97] transition-all shadow-sm active:scale-[0.99]"
                >
                  Buy Now (COD)
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-[#2E4A3B] bg-[#2E4A3B]/10 text-[#2E4A3B]'
                      : 'border-stone-300 bg-white text-stone-600 hover:text-[#121212]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {addedToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Item added to your shopping bag! Free delivery applied on orders over Rs. 5,000.</span>
                </div>
              )}
            </div>

            {/* Delivery Estimation by Pakistan City */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <Truck className="w-4 h-4 text-[#2E4A3B]" />
                  <span>Delivery Estimate by City</span>
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="text-xs bg-stone-100 border border-stone-300 rounded px-2 py-1 text-stone-800 font-medium cursor-pointer"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-stone-600">
                To <strong>{selectedCity}</strong>: <span className="text-[#2E4A3B] font-semibold">{getDeliveryEstimate(selectedCity)}</span> via Trax / Call Courier with Cash on Delivery.
              </p>
              <div className="flex items-center gap-4 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" /> 14-Day Hassle-Free Exchange
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" /> 100% Guaranteed Fabric
                </span>
              </div>
            </div>

            {/* Specifications Accordion / Details */}
            <div className="mt-6 space-y-4 pt-4 border-t border-stone-200 text-xs">
              <div>
                <h4 className="font-semibold text-[#121212] mb-1">Fabric & Texture</h4>
                <p className="text-stone-600 leading-relaxed">{product.fabric}</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#121212] mb-1">Fit & Tailoring Cut</h4>
                <p className="text-stone-600 leading-relaxed">{product.fit}</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#121212] mb-1">Garment Care Instructions</h4>
                <p className="text-stone-600 leading-relaxed">{product.care}</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#121212] mb-1">Key Artisan Details</h4>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
