import React, { useState } from 'react';
import { 
  X, 
  Package, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings, 
  MessageCircle, 
  ExternalLink,
  Edit2,
  Check,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { Order, Product, ProductCategory } from '../types/store';
import { ZaynKraftLogo } from './ZaynKraftLogo';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateStatus: (orderNum: string, newStatus: Order['status']) => void;
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateStatus,
  products,
  onUpdateProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'settings'>('overview');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [inventorySearchQuery, setInventorySearchQuery] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState<string>('all');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<Product['stockStatus']>('In Stock');

  if (!isOpen) return null;

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const processingCount = orders.filter((o) => o.status === 'Processing').length;
  const dispatchedCount = orders.filter((o) => o.status === 'Dispatched').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.phone.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customer.city.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(inventorySearchQuery.toLowerCase());
    const matchesCategory = inventoryCategoryFilter === 'all' || p.category === inventoryCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleStartEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setEditPrice(product.price);
    setEditStock(product.stockStatus);
  };

  const handleSaveProduct = (product: Product) => {
    onUpdateProduct({
      ...product,
      price: editPrice,
      stockStatus: editStock,
    });
    setEditingProductId(null);
  };

  const handleContactCustomerWhatsApp = (order: Order) => {
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const pkrPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;
    const text = `Salam ${order.customer.fullName}, this is Muhammad Zain from Zain Craft regarding your order ${order.orderNumber}. Your order is currently ${order.status}. Total bill: Rs. ${order.total.toLocaleString('en-PK')} (Cash on Delivery).`;
    window.open(`https://wa.me/${pkrPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm overflow-hidden p-0 sm:p-4 md:p-6">
      <div 
        className="w-full h-full sm:max-w-6xl sm:h-[92vh] bg-[#F6F4EF] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Navigation Bar */}
        <div className="bg-[#121212] text-[#F6F4EF] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#2E4A3B] rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-white">
                  ZAIN CRAFT ATELIER
                </span>
                <span className="bg-[#2E4A3B] text-[#D9C9A7] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light">
                Store Operations • Orders • Inventory Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'bg-[#2E4A3B] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#121212] hover:bg-stone-100'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-[#2E4A3B] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#121212] hover:bg-stone-100'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
            {processingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center font-mono">
                {processingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'inventory'
                ? 'bg-[#2E4A3B] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#121212] hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-[#2E4A3B] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#121212] hover:bg-stone-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Store Contact & Info</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F6F4EF]">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stat Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Gross COD Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#2E4A3B]" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#121212] tabular-nums">
                    Rs. {totalRevenue.toLocaleString('en-PK')}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">100% Cash on Delivery</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Orders</span>
                    <Package className="w-4 h-4 text-[#2E4A3B]" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#121212] tabular-nums">
                    {orders.length}
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium">{deliveredCount} delivered nationwide</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Active Queue</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-amber-700 tabular-nums">
                    {processingCount + dispatchedCount}
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium">{processingCount} need tailoring / packing</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Avg Order Value</span>
                    <TrendingUp className="w-4 h-4 text-[#2E4A3B]" />
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#121212] tabular-nums">
                    Rs. {avgOrderValue.toLocaleString('en-PK')}
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium">Across Pakistan cities</span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#121212]">Recent Orders</h3>
                    <p className="text-[11px] text-stone-500">Live order queue from store customers</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#2E4A3B] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-stone-100">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.orderNumber} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-stone-100 rounded-lg text-stone-700 shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#121212]">{order.orderNumber}</span>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
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
                          <p className="text-xs text-stone-600 font-medium mt-0.5">
                            {order.customer.fullName} • {order.customer.city} ({order.customer.phone})
                          </p>
                          <p className="text-[11px] text-stone-400">
                            {order.items.map(i => `${i.product.title} (${i.selectedSize})`).join(', ')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-[#121212] tabular-nums">
                          Rs. {order.total.toLocaleString('en-PK')}
                        </span>
                        <button
                          onClick={() => handleContactCustomerWhatsApp(order)}
                          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Message customer on WhatsApp"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Search & Filter Bar */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search order #, customer name, phone, city..."
                    className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#2E4A3B]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {['all', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                        orderStatusFilter === status
                          ? 'bg-[#2E4A3B] text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-600 hover:text-[#121212]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-xl border border-stone-200 text-stone-500 text-xs">
                    No orders found matching "{orderSearchQuery}".
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.orderNumber}
                      className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs space-y-3"
                    >
                      {/* Top Header of Order */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm font-bold text-[#121212]">{order.orderNumber}</span>
                          <span className="text-xs text-stone-400 font-mono">({order.date})</span>
                        </div>

                        {/* Status Updater Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-500 font-medium">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateStatus(order.orderNumber, e.target.value as Order['status'])}
                            className="bg-stone-50 border border-stone-300 text-xs rounded-lg px-2.5 py-1 font-semibold focus:outline-hidden focus:border-[#2E4A3B]"
                          >
                            <option value="Processing">Processing (Tailoring)</option>
                            <option value="Dispatched">Dispatched (Courier)</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Info & Destination */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAF8F5] p-3 rounded-lg border border-stone-200/60">
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">Customer Details:</span>
                          <p className="font-bold text-[#121212] mt-0.5">{order.customer.fullName}</p>
                          <p className="font-mono text-stone-600 mt-0.5">{order.customer.phone}</p>
                          {order.customer.email && <p className="text-stone-500">{order.customer.email}</p>}
                        </div>

                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase font-semibold">Delivery Address:</span>
                          <p className="text-stone-700 mt-0.5">{order.customer.address}</p>
                          <p className="font-semibold text-stone-800">{order.customer.city}, Pakistan</p>
                        </div>
                      </div>

                      {/* Order Items Table */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Order Items:</span>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-stone-50 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[#121212]">{item.product.title}</span>
                              <span className="text-[11px] text-stone-500">
                                ({item.selectedSize} • {item.selectedColor.name})
                              </span>
                              <span className="text-stone-400">x {item.quantity}</span>
                            </div>
                            <span className="font-mono font-bold text-stone-800 tabular-nums">
                              Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total & Action Footer */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
                        <div className="flex items-center gap-4 text-xs">
                          <div>
                            <span className="text-stone-400">Total COD Amount:</span>
                            <span className="font-mono text-base font-bold text-[#2E4A3B] ml-1.5">
                              Rs. {order.total.toLocaleString('en-PK')}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-400">({order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank'})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleContactCustomerWhatsApp(order)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Customer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY MANAGER */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {/* Filter & Search */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inventorySearchQuery}
                    onChange={(e) => setInventorySearchQuery(e.target.value)}
                    placeholder="Search garment title, SKU, or category..."
                    className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#2E4A3B]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {['all', 'shalwar-kameez', 'kurtas', 'shirts', 'outerwear'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setInventoryCategoryFilter(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                        inventoryCategoryFilter === cat
                          ? 'bg-[#2E4A3B] text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-600 hover:text-[#121212]'
                      }`}
                    >
                      {cat.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Inventory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredProducts.map((product) => {
                  const isEditing = editingProductId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200/80 shadow-xs flex gap-3.5"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-20 h-24 object-cover object-top rounded-lg border border-stone-200 shrink-0"
                      />

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#2E4A3B] tracking-wider">
                              {product.categoryLabel}
                            </span>
                            <span className="text-[10px] font-mono text-stone-400">{product.sku}</span>
                          </div>

                          <h4 className="font-serif text-xs sm:text-sm font-bold text-[#121212] line-clamp-1 mt-0.5">
                            {product.title}
                          </h4>

                          {/* Price & Stock Display/Edit */}
                          {isEditing ? (
                            <div className="mt-2 space-y-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs">
                              <div>
                                <label className="block text-[10px] text-stone-500 font-semibold mb-0.5">Price (PKR):</label>
                                <input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(Number(e.target.value))}
                                  className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-stone-500 font-semibold mb-0.5">Stock Status:</label>
                                <select
                                  value={editStock}
                                  onChange={(e) => setEditStock(e.target.value as any)}
                                  className="w-full text-xs p-1.5 bg-white border border-stone-300 rounded"
                                >
                                  <option value="In Stock">In Stock</option>
                                  <option value="Low Stock">Low Stock</option>
                                  <option value="Pre-Order">Pre-Order</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  onClick={() => handleSaveProduct(product)}
                                  className="flex items-center gap-1 px-3 py-1 bg-[#2E4A3B] text-white text-[11px] font-semibold rounded hover:bg-[#203529]"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Save</span>
                                </button>
                                <button
                                  onClick={() => setEditingProductId(null)}
                                  className="px-2 py-1 text-[11px] text-stone-500 hover:text-stone-800"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-1.5 flex items-center justify-between">
                              <div>
                                <span className="font-mono text-xs sm:text-sm font-bold text-[#121212]">
                                  Rs. {product.price.toLocaleString('en-PK')}
                                </span>
                                <span className={`ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  product.stockStatus === 'In Stock'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {product.stockStatus}
                                </span>
                              </div>

                              <button
                                onClick={() => handleStartEditProduct(product)}
                                className="flex items-center gap-1 text-[11px] font-semibold text-[#2E4A3B] hover:underline"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit Price</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Sizes */}
                        <div className="text-[10px] text-stone-400 font-mono mt-1">
                          Sizes: {product.sizes.join(', ')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: STORE SETTINGS & CONTACT */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
                  <Settings className="w-5 h-5 text-[#2E4A3B]" />
                  <h3 className="font-serif text-base font-bold text-[#121212]">Owner & Store Contact Config</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Owner Name:</span>
                    <p className="font-bold text-[#121212] text-sm mt-0.5">Muhammad Zain</p>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">WhatsApp / Phone:</span>
                      <p className="font-mono font-bold text-[#121212] text-sm mt-0.5">+923244167247</p>
                    </div>
                    <a
                      href="https://wa.me/923244167247"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#25D366] text-white font-semibold rounded-lg text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Test Chat</span>
                    </a>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Official Support Email:</span>
                    <p className="font-mono font-bold text-[#121212] text-sm mt-0.5">Zasif826@gmail.com</p>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Store Atelier Address:</span>
                    <p className="font-medium text-[#121212] mt-0.5">
                      Zain Craft Design Atelier, MM Alam Road, Gulberg III, Lahore, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery & Payment Settings */}
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200/80 shadow-xs space-y-3 text-xs">
                <h4 className="font-serif text-sm font-bold text-[#121212]">Shipping & Courier Rates</h4>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-[10px] text-stone-400 block">Free Shipping Threshold:</span>
                    <span className="font-mono text-sm font-bold text-[#2E4A3B]">Orders &gt; Rs. 5,000</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-[10px] text-stone-400 block">Standard COD Delivery:</span>
                    <span className="font-mono text-sm font-bold text-[#121212]">Rs. 250 nationwide</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
