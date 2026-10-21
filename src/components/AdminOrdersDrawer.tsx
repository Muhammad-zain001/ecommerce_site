import React, { useState } from 'react';
import { X, Package, CheckCircle2, Clock, Truck, ShieldAlert, Search } from 'lucide-react';
import { Order } from '../types/store';

interface AdminOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateStatus: (orderNum: string, newStatus: Order['status']) => void;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateStatus,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(filterQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      o.customer.city.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-[#F6F4EF] h-full shadow-2xl flex flex-col justify-between border-l border-stone-300 animate-slideLeft"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2E4A3B]" />
              <h2 className="font-serif text-lg font-bold text-[#121212]">
                Zain Craft • Store Operations Console
              </h2>
            </div>
            <p className="text-xs text-stone-500">Live order fulfillment & dispatch manager</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#121212] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Operational Metrics Bar */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 grid grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-500 block">Total Orders</span>
            <span className="font-mono text-lg font-bold text-[#121212] tabular-nums">{orders.length}</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-500 block">COD Gross Revenue</span>
            <span className="font-mono text-lg font-bold text-[#2E4A3B] tabular-nums">
              Rs. {totalRevenue.toLocaleString('en-PK')}
            </span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-stone-200">
            <span className="text-stone-500 block">Fulfillment Queue</span>
            <span className="font-mono text-lg font-bold text-amber-700 tabular-nums">
              {orders.filter((o) => o.status !== 'Delivered').length}
            </span>
          </div>
        </div>

        {/* Filter Input */}
        <div className="p-4 border-b border-stone-200 bg-white">
          <div className="relative">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search orders by customer name, city, or order #..."
              className="w-full text-xs p-2.5 pl-8 rounded-lg border border-stone-300 bg-stone-50 placeholder:text-stone-400 focus:outline-hidden focus:border-[#2E4A3B]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-3" />
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-xs text-stone-500">
              No orders found matching "{filterQuery}". Place a test checkout order from the cart to see it here!
            </div>
          ) : (
            filtered.map((order) => (
              <div
                key={order.orderNumber}
                className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#2E4A3B]">
                      {order.orderNumber}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#121212]">
                      {order.customer.fullName} ({order.customer.city})
                    </h4>
                    <p className="text-[11px] text-stone-500">{order.customer.phone} · {order.date}</p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono tabular-nums text-sm font-bold text-[#121212] block">
                      Rs. {order.total.toLocaleString('en-PK')}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-stone-500">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-2.5 bg-stone-50 rounded-lg text-xs space-y-1 text-stone-700">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span>
                        • {item.product.title} ({item.selectedSize}, {item.selectedColor.name}) x {item.quantity}
                      </span>
                      <span className="font-mono text-stone-900 font-medium">
                        Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}
                      </span>
                    </div>
                  ))}
                  <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200/60">
                    Address: {order.customer.address}
                  </p>
                </div>

                {/* Fulfillment Status Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-stone-500 font-medium">Fulfillment Status:</span>
                  <div className="flex items-center gap-1.5">
                    {(['Confirmed', 'Processing', 'Dispatched', 'Delivered'] as Order['status'][]).map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => onUpdateStatus(order.orderNumber, st)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                            order.status === st
                              ? 'bg-[#2E4A3B] text-white shadow-2xs'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
