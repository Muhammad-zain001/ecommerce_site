import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, Order, ProductColor } from './types/store';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CatalogSection } from './components/CatalogSection';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistModal } from './components/WishlistModal';
import { SearchModal } from './components/SearchModal';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { PoliciesModal } from './components/PoliciesModal';
import { AdminPanel } from './components/AdminPanel';
import { CustomerOrdersModal } from './components/CustomerOrdersModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Smartphone, Monitor } from 'lucide-react';

const INITIAL_ORDERS: Order[] = [
  {
    orderNumber: 'ZC-2026-8491',
    items: [
      {
        product: PRODUCTS[0],
        selectedSize: 'Large',
        selectedColor: PRODUCTS[0].colors[0],
        quantity: 1,
      },
    ],
    customer: {
      fullName: 'Hamza Farooq',
      phone: '0321 4455888',
      address: 'House 14, Street 3, Sector Y, DHA Phase 3',
      city: 'Lahore',
    },
    paymentMethod: 'cod',
    subtotal: 8950,
    deliveryFee: 0,
    total: 8950,
    status: 'Dispatched',
    date: 'Yesterday, 3:30 PM',
    estimatedDelivery: 'Tomorrow afternoon',
  },
  {
    orderNumber: 'ZC-2026-7215',
    items: [
      {
        product: PRODUCTS[1],
        selectedSize: 'Medium',
        selectedColor: PRODUCTS[1].colors[0],
        quantity: 1,
      },
      {
        product: PRODUCTS[2],
        selectedSize: 'Medium',
        selectedColor: PRODUCTS[2].colors[0],
        quantity: 1,
      },
    ],
    customer: {
      fullName: 'Bilal Siddiqui',
      phone: '0300 9876543',
      address: 'Bungalow 42-B, 18th Street, Khayaban-e-Mujahid, DHA Phase 6',
      city: 'Karachi',
    },
    paymentMethod: 'cod',
    subtotal: 11800,
    deliveryFee: 0,
    total: 11800,
    status: 'Processing',
    date: 'Today, 11:20 AM',
    estimatedDelivery: '2 business days',
  },
];

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sizeGuideCategory, setSizeGuideCategory] = useState<string | null>(null);
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(false);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zk_wishlist');
      return saved ? JSON.parse(saved) : ['zk-sk-01'];
    } catch {
      return ['zk-sk-01'];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals & Drawers
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [policyTab, setPolicyTab] = useState<'shipping' | 'returns' | 'faqs' | 'contact' | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);

  // Count customer's own orders placed on this device
  const myOrdersCount = (() => {
    try {
      const ids = JSON.parse(localStorage.getItem('zk_my_order_ids') || '[]');
      return Array.isArray(ids) ? ids.length : 0;
    } catch {
      return 0;
    }
  })();

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zk_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Products State with localStorage persistence
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zk_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('zk_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('zk_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('zk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zk_products', JSON.stringify(productsList));
  }, [productsList]);

  const handleUpdateProduct = (updated: Product) => {
    setProductsList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Handlers
  const handleAddToCart = (product: Product, size: string, color: ProductColor, quantity: number) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, product.sizes[0], product.colors[0], 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, size: string, color: ProductColor, quantity: number) => {
    handleAddToCart(product, size, color, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderNum: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNum ? { ...o, status: newStatus } : o))
    );
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('atelier-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: ProductCategory) => {
    setCurrentCategory(cat);
    scrollToCatalog();
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    scrollToCatalog();
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const renderAppContent = () => (
    <>
      {/* Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStory={scrollToStory}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenMyOrders={() => setIsMyOrdersOpen(true)}
        myOrdersCount={myOrdersCount}
      />

      {/* Main Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* Hero Section */}
        <Hero
          onShopClick={scrollToCatalog}
          onCategoryClick={handleSelectCategory}
        />

        {/* Category Tiles */}
        <CategoryShowcase onSelectCategory={handleSelectCategory} />

        {/* Product Catalog with Filtering */}
        <CatalogSection
          products={productsList}
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Atelier Brand Story & Craftsmanship */}
        <div id="atelier-story">
          <BrandStory onShopClick={scrollToCatalog} />
        </div>

        {/* Verified Customer Reviews */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenPolicy={(tab) => setPolicyTab(tab)}
        onOpenStory={scrollToStory}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Direct WhatsApp Concierge Bubble */}
      <FloatingWhatsApp />

      {/* Native Thumb-Friendly Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onHomeClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentCategory('all');
        }}
        onShopClick={scrollToCatalog}
        onSearchClick={() => setIsSearchOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#121212] flex flex-col font-sans selection:bg-[#2E4A3B] selection:text-white relative">
      {/* Desktop Device Frame Switcher (Only visible on desktop/laptop displays) */}
      <div className="hidden lg:flex fixed top-2.5 right-4 z-50 items-center gap-1.5 bg-[#121212]/90 backdrop-blur-md text-white p-1 rounded-full shadow-2xl border border-stone-700/60 text-xs">
        <button
          onClick={() => setIsMobileFrameMode(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            !isMobileFrameMode
              ? 'bg-[#2E4A3B] text-white shadow-xs'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Switch to Full Width Desktop"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop View</span>
        </button>
        <button
          onClick={() => setIsMobileFrameMode(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            isMobileFrameMode
              ? 'bg-[#2E4A3B] text-white shadow-xs'
              : 'text-stone-300 hover:text-white'
          }`}
          title="Switch to Smartphone Frame View (390px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Frame</span>
        </button>
      </div>

      {/* When in Desktop Mobile Frame Mode */}
      {isMobileFrameMode ? (
        <div className="hidden lg:flex flex-1 min-h-screen bg-stone-900/95 py-10 px-4 items-center justify-center">
          <div className="relative w-[393px] h-[852px] bg-[#F6F4EF] rounded-[50px] border-[10px] border-stone-800 shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col ring-1 ring-white/10">
            {/* Phone Dynamic Island / Speaker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 pointer-events-none flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
            </div>

            {/* Scrollable Mobile Viewport Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
              {renderAppContent()}
            </div>
          </div>
        </div>
      ) : (
        /* Regular Desktop Full View */
        <div className="hidden lg:flex flex-1 flex-col">
          {renderAppContent()}
        </div>
      )}

      {/* Real Mobile View (Automatic full-screen on actual smartphones & tablets) */}
      <div className="lg:hidden flex flex-1 flex-col">
        {renderAppContent()}
      </div>

      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={(cat) => setSizeGuideCategory(cat)}
      />

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideCategory !== null}
        onClose={() => setSizeGuideCategory(null)}
        category={sizeGuideCategory || undefined}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
        onClearCart={() => setCartItems([])}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(product) => {
          handleQuickAdd(product);
          handleToggleWishlist(product);
        }}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={productsList}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Customer Care & Policies Modal */}
      <PoliciesModal
        isOpen={policyTab !== null}
        onClose={() => setPolicyTab(null)}
        initialTab={policyTab || 'shipping'}
      />

      {/* Store Operations & Owner Admin Panel (Protected) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
        products={productsList}
        onUpdateProduct={handleUpdateProduct}
      />

      {/* Customer's Personal Order History (Only shows their own purchases) */}
      <CustomerOrdersModal
        isOpen={isMyOrdersOpen}
        onClose={() => setIsMyOrdersOpen(false)}
        allOrders={orders}
        onOpenStore={scrollToCatalog}
      />
    </div>
  );
}
