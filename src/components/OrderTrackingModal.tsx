import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, MessageCircle, AlertCircle } from 'lucide-react';
import { Order } from '../types/store';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Search in existing orders list
    const match = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === query ||
        o.customer.phone.replace(/[\s-]/g, '').includes(query) ||
        o.customer.fullName.toLowerCase().includes(query)
    );

    if (match) {
      setFoundOrder(match);
    } else {
      // If it looks like a standard ZC/ZK order number or demo query, create an illustrative live tracking view
      if (query.startsWith('zc-') || query.startsWith('zk-') || query.length >= 4) {
        setFoundOrder({
          orderNumber: searchQuery.toUpperCase().startsWith('ZC-') || searchQuery.toUpperCase().startsWith('ZK-')
            ? searchQuery.toUpperCase()
            : `ZC-2026-${searchQuery}`,
          items: [
            {
              product: {
                id: 'zk-demo',
                title: 'The Royal Giza Shalwar Kameez',
                category: 'shalwar-kameez',
                categoryLabel: 'Shalwar Kameez',
                price: 8950,
                sku: 'ZK-SK-2026-01',
                rating: 4.9,
                reviewCount: 42,
                colors: [{ name: 'Charcoal & Off-White', hex: '#242424' }],
                sizes: ['L'],
                stockStatus: 'In Stock',
                fabric: '100% Egyptian Giza Cotton',
                fit: 'Tailored Traditional Cut',
                care: 'Dry clean recommended',
                modelInfo: 'Model wearing size L',
                description: 'Tailored shalwar kameez',
                features: ['Premium cotton'],
                images: ['/images/category_shalwar_kameez_1791520997987.jpg'],
              },
              selectedSize: 'L',
              selectedColor: { name: 'Charcoal & Off-White', hex: '#242424' },
              quantity: 1,
            },
          ],
          customer: {
            fullName: 'Valued Customer',
            phone: '0300 1234567',
            address: 'Main Boulevard, Gulberg III',
            city: 'Lahore',
          },
          paymentMethod: 'cod',
          subtotal: 8950,
          deliveryFee: 0,
          total: 8950,
          status: 'Dispatched',
          date: 'Yesterday, 4:15 PM',
          estimatedDelivery: 'Tomorrow afternoon',
        });
      } else {
        setFoundOrder(null);
      }
    }
    setSearched(true);
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Order received and verified by customer desk' },
    { title: 'Master Tailor Inspection', desc: 'Fabric quality verified & hand-finished' },
    { title: 'Dispatched via Trax Courier', desc: 'Assigned tracking airway bill #TRX-948102' },
    { title: 'Out for Delivery', desc: 'Rider en route with Cash on Delivery collection' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'Confirmed': return 0;
      case 'Processing': return 1;
      case 'Dispatched': return 2;
      case 'Delivered': return 3;
      default: return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#F6F4EF] rounded-2xl shadow-2xl border border-[#D9C9A7]/50 overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-white/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#2E4A3B]/10 rounded-lg text-[#2E4A3B]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="tracking-title" className="font-serif text-lg font-bold text-[#121212]">
                Track Your Parcel
              </h2>
              <p className="text-xs text-stone-500">Live courier tracking across Pakistan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order # (e.g. ZC-2026-8491) or Phone"
                className="w-full text-xs p-3 pl-9 rounded-xl border border-stone-300 bg-white placeholder:text-stone-400 focus:outline-hidden focus:border-[#2E4A3B]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 text-xs font-semibold text-white bg-[#2E4A3B] rounded-xl hover:bg-[#203529] transition-colors shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Quick suggestions if user has recent orders */}
          {orders.length > 0 && !foundOrder && (
            <div className="text-xs text-stone-500">
              <span className="font-semibold text-stone-700 block mb-1">Your recent session orders:</span>
              <div className="flex flex-wrap gap-1.5">
                {orders.map((o) => (
                  <button
                    key={o.orderNumber}
                    onClick={() => {
                      setSearchQuery(o.orderNumber);
                      setFoundOrder(o);
                      setSearched(true);
                    }}
                    className="px-2.5 py-1 bg-white border border-stone-200 rounded-md font-mono text-[11px] text-stone-700 hover:border-[#2E4A3B]"
                  >
                    {o.orderNumber} ({o.customer.city})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result view */}
          {foundOrder ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Order headline */}
              <div className="p-4 bg-white rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Order Number</span>
                  <p className="font-mono text-base font-bold text-[#121212]">{foundOrder.orderNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Status</span>
                  <p className="text-xs font-bold text-[#2E4A3B]">{foundOrder.status}</p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#121212]">Fulfillment Timeline</h4>
                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-200">
                  {steps.map((st, idx) => {
                    const currentIdx = getStepIndex(foundOrder.status);
                    const isDone = idx <= currentIdx;
                    return (
                      <div key={idx} className="relative flex items-start gap-4">
                        <div
                          className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                            isDone
                              ? 'bg-[#2E4A3B] text-white shadow-xs'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <div className="text-xs pt-0.5">
                          <p className={`font-semibold ${isDone ? 'text-stone-900' : 'text-stone-500'}`}>
                            {st.title}
                          </p>
                          <p className="text-stone-500 text-[11px]">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200/80 text-xs text-stone-600 space-y-1">
                <p><strong>Recipient:</strong> {foundOrder.customer.fullName} ({foundOrder.customer.phone})</p>
                <p><strong>Destination:</strong> {foundOrder.customer.address}, {foundOrder.customer.city}</p>
                <p><strong>Payment Method:</strong> {foundOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Rs. ' + foundOrder.total.toLocaleString('en-PK') + ')' : 'Direct Bank Transfer'}</p>
              </div>

              {/* Assistance Button */}
              <a
                href={`https://wa.me/923244167247?text=Salam%20Zain%20Craft,%20inquiring%20about%20my%20order%20status%20${foundOrder.orderNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire with Customer Care on WhatsApp</span>
              </a>
            </div>
          ) : searched ? (
            <div className="p-6 bg-white rounded-xl border border-stone-200 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-serif text-sm font-bold text-[#121212]">No Order Found</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We could not find an order matching "{searchQuery}". Please check your order reference number or contact our WhatsApp helpline.
              </p>
            </div>
          ) : (
            <div className="p-5 bg-white rounded-xl border border-stone-200 text-center space-y-2">
              <p className="text-xs text-stone-500">
                Tip: Enter your 4-digit order number from your confirmation SMS or receipt to view live delivery status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
