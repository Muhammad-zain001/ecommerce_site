import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [orderNote, setOrderNote] = useState('');
  const FREE_SHIPPING_THRESHOLD = 5000;
  const STANDARD_SHIPPING_FEE = 250;

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const formatPrice = (p: number) => `Rs. ${p.toLocaleString('en-PK')}`;

  const handleWhatsAppQuickOrder = () => {
    if (items.length === 0) return;
    const itemsText = items
      .map(
        (i) =>
          `• ${i.product.title} (Size: ${i.selectedSize}, Colour: ${i.selectedColor.name}) x ${i.quantity} = Rs. ${(
            i.product.price * i.quantity
          ).toLocaleString('en-PK')}`
      )
      .join('%0A');
    const msg = `Salam Zain Craft,%0A%0AI would like to place an order:%0A${itemsText}%0A%0ASubtotal: Rs. ${subtotal.toLocaleString(
      'en-PK'
    )}%0ADelivery: ${shippingFee === 0 ? 'FREE' : 'Rs. ' + shippingFee}%0ATotal: Rs. ${total.toLocaleString(
      'en-PK'
    )}%0APlease confirm my order via Cash on Delivery.`;
    window.open(`https://wa.me/923244167247?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-[#F6F4EF] h-full shadow-2xl flex flex-col justify-between border-l border-[#D9C9A7]/40 animate-slideLeft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2E4A3B]" />
            <h2 id="cart-title" className="font-serif text-lg font-bold text-[#121212]">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-stone-100/80 border-b border-stone-200 text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-2 text-[#2E4A3B] font-semibold">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Congratulations! You have unlocked FREE Nationwide Delivery.</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-stone-700">
                <span>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for FREE delivery</span>
                <span className="font-mono font-medium">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2E4A3B] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200/60 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#121212]">Your bag is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Discover our artisanal Shalwar Kameez, Kurtas, and tailored shirts crafted in Lahore.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#2E4A3B] rounded-lg hover:bg-[#203529] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${index}`}
                className="flex gap-3.5 p-3 bg-white rounded-xl border border-stone-200/80 shadow-2xs"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-semibold text-[#121212] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <span>Size: <strong className="text-stone-700">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 text-stone-600 hover:text-black font-semibold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-semibold tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:text-black font-semibold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-mono tabular-nums text-sm font-bold text-[#121212]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="pt-2">
              <label className="block text-[11px] font-medium text-stone-600 mb-1">
                Order Notes / Tailor Alteration Instructions (Optional)
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="e.g. Please hem trouser to 39 inches, or special delivery time..."
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white placeholder:text-stone-400 focus:outline-hidden focus:border-[#2E4A3B]"
                rows={2}
              />
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-white/95 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900 font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Delivery (Nationwide Pakistan)</span>
                <span className="font-mono tabular-nums font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-[#2E4A3B]">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-[#121212] pt-2 border-t border-stone-100">
                <span>Total Amount (COD)</span>
                <span className="font-mono tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#2E4A3B] rounded-xl hover:bg-[#203529] transition-all shadow-sm active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppQuickOrder}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#121212] bg-[#FAF8F5] border border-stone-300 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Quick Order via WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E4A3B]" />
              <span>Cash on Delivery • 14-Day Hassle-Free Exchange</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
