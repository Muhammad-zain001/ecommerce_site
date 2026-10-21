import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Banknote, 
  Phone, 
  MapPin, 
  User, 
  Mail, 
  MessageCircle,
  Copy,
  Check,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { CartItem, Order, PaymentMethod } from '../types/store';
import { PAKISTAN_CITIES } from '../data/products';
import { ZaynKraftLogo } from './ZaynKraftLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
  onClearCart,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const STANDARD_SHIPPING_FEE = 250;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  const formatPrice = (p: number) => `Rs. ${p.toLocaleString('en-PK')}`;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    
    // Clean phone number validation for Pakistan
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid mobile number (e.g. 03244167247)';
    }

    if (!address.trim() || address.trim().length < 5) {
      errors.address = 'Please provide complete street or house delivery address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderNum = `ZC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      orderNumber: orderNum,
      items: [...items],
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        address: address.trim(),
        city,
        notes: deliveryNotes.trim() || undefined,
      },
      paymentMethod,
      subtotal,
      deliveryFee: shippingFee,
      total,
      status: 'Confirmed',
      date: new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      estimatedDelivery: city === 'Lahore' ? '1–2 business days' : '2–3 business days',
    };

    // Save this order ID into the customer's personal device history
    try {
      const savedIds = JSON.parse(localStorage.getItem('zk_my_order_ids') || '[]');
      if (!savedIds.includes(orderNum)) {
        savedIds.unshift(orderNum);
        localStorage.setItem('zk_my_order_ids', JSON.stringify(savedIds));
      }
    } catch {
      // Ignore
    }

    onOrderPlaced(newOrder);
    setPlacedOrder(newOrder);
    onClearCart();
  };

  const copyBankDetails = () => {
    navigator.clipboard.writeText('Bank: Meezan Bank Ltd\nTitle: ZAIN CRAFT ATELIER\nIBAN: PK64MEZN0001020304050607');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs overflow-hidden">
      <div 
        className="relative w-full max-w-3xl bg-[#F6F4EF] rounded-t-3xl sm:rounded-2xl shadow-2xl border border-[#D9C9A7]/50 flex flex-col overflow-y-auto max-h-[94vh] sm:max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-white/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2E4A3B]/10 rounded-lg text-[#2E4A3B]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="checkout-title" className="font-serif text-xl font-bold text-[#121212]">
                {placedOrder ? 'Order Confirmation' : 'Express Checkout (Cash on Delivery)'}
              </h2>
              <p className="text-xs text-stone-500">
                {placedOrder ? 'Your parcel is being tailored & prepared' : 'Nationwide delivery across all cities in Pakistan'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order is Placed: Confirmation View */}
        {placedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3 py-6 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6">
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-white rounded-xl shadow-xs border border-stone-200 inline-block">
                  <ZaynKraftLogo variant="exact" className="max-w-[170px]" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#121212]">
                Shukriya, {placedOrder.customer.fullName}!
              </h3>
              <p className="text-sm text-stone-700">
                Your order has been placed successfully under reference:
              </p>
              <div className="inline-block px-4 py-1.5 bg-white border border-stone-300 rounded-lg font-mono text-base font-bold text-[#2E4A3B]">
                {placedOrder.orderNumber}
              </div>
              <p className="text-xs text-stone-500 max-w-md mx-auto pt-1">
                Estimated Delivery to <strong>{placedOrder.customer.city}</strong>: {placedOrder.estimatedDelivery}. Our team will contact you via WhatsApp/SMS before dispatch.
              </p>
            </div>

            {/* Order Summary Receipt */}
            <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#121212] border-b border-stone-100 pb-2">
                Order Summary ({placedOrder.items.length} items)
              </h4>
              <div className="divide-y divide-stone-100 text-xs">
                {placedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-stone-900">{item.product.title}</p>
                      <p className="text-stone-500 text-[11px]">
                        Size: {item.selectedSize} · Colour: {item.selectedColor.name} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-stone-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(placedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charges</span>
                  <span className="font-mono tabular-nums text-[#2E4A3B]">
                    {placedOrder.deliveryFee === 0 ? 'FREE' : formatPrice(placedOrder.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#121212] pt-2 border-t border-stone-100">
                  <span>Payable on Delivery (COD)</span>
                  <span className="font-mono tabular-nums text-[#2E4A3B]">{formatPrice(placedOrder.total)}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600">
                <p><strong>Delivery Address:</strong> {placedOrder.customer.address}, {placedOrder.customer.city}</p>
                <p><strong>Contact Phone:</strong> {placedOrder.customer.phone}</p>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/923244167247?text=Salam%20Zain%20Craft,%20I%20have%20placed%20order%20${placedOrder.orderNumber}.%20Please%20confirm%20dispatch.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 text-xs font-semibold text-[#121212] bg-[#FAF8F5] border border-stone-300 rounded-xl hover:bg-stone-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#121212] uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-[#2E4A3B]" />
                <span>1. Contact & Customer Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Zain ul Abideen"
                    className={`w-full text-xs p-2.5 rounded-lg border bg-white ${
                      formErrors.fullName ? 'border-rose-500' : 'border-stone-300'
                    } focus:outline-hidden focus:border-[#2E4A3B]`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03244167247"
                      className={`w-full text-xs p-2.5 rounded-lg border bg-white ${
                        formErrors.phone ? 'border-rose-500' : 'border-stone-300'
                      } focus:outline-hidden focus:border-[#2E4A3B]`}
                    />
                  </div>
                  {formErrors.phone ? (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                  ) : (
                    <p className="text-[11px] text-stone-400 mt-0.5">Required for courier SMS and delivery rider calls</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Zasif826@gmail.com (for PDF order receipt)"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:border-[#2E4A3B]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address in Pakistan */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="font-serif text-sm font-bold text-[#121212] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2E4A3B]" />
                <span>2. Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:border-[#2E4A3B]"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 54000"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:border-[#2E4A3B]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Street Address / House / Flat Number <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Apartment #, Street #, Sector / Phase / Colony, Landmark..."
                    className={`w-full text-xs p-2.5 rounded-lg border bg-white ${
                      formErrors.address ? 'border-rose-500' : 'border-stone-300'
                    } focus:outline-hidden focus:border-[#2E4A3B]`}
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.address}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Deliver between 2 PM - 6 PM, or call before arriving"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:border-[#2E4A3B]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h3 className="font-serif text-sm font-bold text-[#121212] uppercase tracking-wider flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#2E4A3B]" />
                <span>3. Payment Method</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label 
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#2E4A3B] bg-white ring-1 ring-[#2E4A3B]'
                      : 'border-stone-200 bg-white/60 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 text-[#2E4A3B] focus:ring-[#2E4A3B]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#121212] block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Pay cash to the courier rider when you receive your parcel.
                    </span>
                  </div>
                </label>

                <label 
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#2E4A3B] bg-white ring-1 ring-[#2E4A3B]'
                      : 'border-stone-200 bg-white/60 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-0.5 text-[#2E4A3B] focus:ring-[#2E4A3B]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#121212] block">Direct Bank Transfer</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Meezan Bank / Nayapay / Raast instant transfer.
                    </span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800">Atelier Bank Account (Meezan Bank):</span>
                    <button
                      type="button"
                      onClick={copyBankDetails}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2E4A3B] hover:underline"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank ? 'Copied' : 'Copy IBAN'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-stone-700 space-y-0.5">
                    <p>Account Title: <strong>ZAIN CRAFT ATELIER</strong></p>
                    <p>Account Number: <strong>01020304050607</strong></p>
                    <p>IBAN: <strong>PK64MEZN0001020304050607</strong></p>
                  </div>
                  <p className="text-[11px] text-stone-500 pt-1">
                    *After placing order, please share payment receipt screenshot to our WhatsApp at +923244167247.
                  </p>
                </div>
              )}
            </div>

            {/* Total Review */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charges ({city})</span>
                  <span className="font-mono tabular-nums text-[#2E4A3B]">
                    {shippingFee === 0 ? 'FREE (Order > Rs. 5,000)' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#121212] pt-2 border-t border-stone-100">
                  <span>Final Total Payable</span>
                  <span className="font-mono tabular-nums text-[#2E4A3B]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Validation warning if required fields are missing */}
            {Object.keys(formErrors).length > 0 && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-medium">
                  {Object.values(formErrors)[0]}
                </span>
              </div>
            )}

            {/* Sticky Mobile & Desktop Submit Button */}
            <div className="sticky bottom-0 bg-[#F6F4EF]/95 backdrop-blur-md pt-2 pb-1">
              <button
                type="submit"
                className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#2E4A3B] rounded-xl hover:bg-[#203529] transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Confirm & Place Order ({formatPrice(total)})</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
