import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Package, 
  ChevronRight,
  ExternalLink,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { Order } from '../types/store';

interface CustomerOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  allOrders: Order[];
  onOpenStore: () => void;
}

export const CustomerOrdersModal: React.FC<CustomerOrdersModalProps> = ({
  isOpen,
  onClose,
  allOrders,
  onOpenStore,
}) => {
  const [manualQuery, setManualQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchError, setSearchError] = useState(false);

  if (!isOpen) return null;

  // Retrieve only the customer's own order IDs from local storage
  let myOrderNumbers: string[] = [];
  try {
    myOrderNumbers = JSON.parse(localStorage.getItem('zk_my_order_ids') || '[]');
  } catch {
    myOrderNumbers = [];
  }

  // Filter ONLY this customer's orders
  const myOrders = allOrders.filter((o) => myOrderNumbers.includes(o.orderNumber));

  const handleSearchManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;

    const query = manualQuery.trim().toLowerCase();
    const found = allOrders.find(
      (o) =>
        o.orderNumber.toLowerCase() === query ||
        o.orderNumber.toLowerCase().includes(query) ||
        o.customer.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
    );

    if (found) {
      setSearchedOrder(found);
      setSearchError(false);
    } else {
      setSearchedOrder(null);
      setSearchError(true);
    }
  };

  const formatPrice = (p: number) => `Rs. ${p.toLocaleString('en-PK')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs overflow-hidden">
      <div 
        className="relative w-full max-w-2xl bg-[#F6F4EF] rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-300 flex flex-col overflow-y-auto max-h-[94vh] sm:max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#2E4A3B]/10 rounded-xl text-[#2E4A3B]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
                My Orders & Purchase History
              </h2>
              <p className="text-xs text-stone-500">
                Track your personal handcrafted garments & parcel dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#121212] rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Quick Order Lookup Form */}
          <form onSubmit={handleSearchManual} className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              Track Any Order by Number or Mobile Phone:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={manualQuery}
                  onChange={(e) => setManualQuery(e.target.value)}
                  placeholder="e.g. ZC-2026-8491 or 03244167247"
                  className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-[#2E4A3B]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2E4A3B] text-white text-xs font-semibold rounded-lg hover:bg-[#203529] transition-colors shrink-0"
              >
                Track
              </button>
            </div>
            {searchError && (
              <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> No matching order found. Please check reference number.
              </p>
            )}
          </form>

          {/* Searched Order Single View */}
          {searchedOrder && (
            <div className="bg-white p-4 rounded-xl border-2 border-[#2E4A3B] shadow-md space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="font-mono text-xs font-bold text-[#121212]">{searchedOrder.orderNumber}</span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {searchedOrder.status}
                </span>
              </div>
              <div className="text-xs text-stone-600 space-y-1">
                <p><strong>Customer:</strong> {searchedOrder.customer.fullName}</p>
                <p><strong>Destination:</strong> {searchedOrder.customer.city}, Pakistan</p>
                <p><strong>Estimated Delivery:</strong> {searchedOrder.estimatedDelivery}</p>
                <p><strong>Total (COD):</strong> <span className="font-mono font-bold text-[#2E4A3B]">{formatPrice(searchedOrder.total)}</span></p>
              </div>
            </div>
          )}

          {/* Personal Orders List */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#121212] flex items-center justify-between">
              <span>Your Placed Orders ({myOrders.length})</span>
              <span className="text-[11px] font-normal text-stone-400">Only visible on this device</span>
            </h3>

            {myOrders.length === 0 ? (
              <div className="bg-white p-8 sm:p-10 text-center rounded-xl border border-stone-200 space-y-3">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="font-serif text-sm font-bold text-[#121212]">No Orders Placed Yet</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  When you place an order with Cash on Delivery, your tracking history and purchase receipts will appear here automatically.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenStore();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2E4A3B] text-white text-xs font-semibold rounded-lg hover:bg-[#203529] transition-colors"
                >
                  <span>Explore Atelier Collections</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              myOrders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs space-y-3"
                >
                  {/* Order Top Bar */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#121212] block">
                        {order.orderNumber}
                      </span>
                      <span className="text-[10px] text-stone-400">{order.date}</span>
                    </div>

                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Dispatched'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Cancelled'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Garments List */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-12 h-14 object-cover object-top rounded-md border border-stone-200 shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-[#121212] line-clamp-1">{item.product.title}</p>
                          <p className="text-[11px] text-stone-500">
                            Size: {item.selectedSize} • Color: {item.selectedColor.name} • Qty: {item.quantity}
                          </p>
                          <p className="font-mono font-bold text-stone-800 mt-0.5 tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info & Total */}
                  <div className="pt-2.5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="text-stone-500 text-[11px]">
                      <span>Destination: <strong>{order.customer.city}</strong> ({order.estimatedDelivery})</span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="text-stone-400">Total COD:</span>
                      <span className="font-mono text-sm font-bold text-[#2E4A3B]">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Footer Support Assistance */}
        <div className="p-3.5 bg-stone-100 border-t border-stone-200 text-center sticky bottom-0 z-10">
          <a
            href="https://wa.me/923244167247?text=Salam%20Zain%20Craft,%20inquiring%20about%20my%20order"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:underline font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Need Help? Chat with Atelier Support on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
