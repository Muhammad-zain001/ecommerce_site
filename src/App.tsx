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
import { AdminOrdersDrawer } from './components/AdminOrdersDrawer';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const INITIAL_ORDERS: Order[] = [
  {
    orderNumber: 'ZK-2026-8491',
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
    orderNumber: 'ZK-2026-7215',
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

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zk_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
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

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#121212] flex flex-col font-sans selection:bg-[#2E4A3B] selection:text-white">
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
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={scrollToCatalog}
          onCategoryClick={handleSelectCategory}
        />

        {/* Category Tiles */}
        <CategoryShowcase onSelectCategory={handleSelectCategory} />

        {/* Product Catalog with Filtering */}
        <CatalogSection
          products={PRODUCTS}
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
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Customer Care & Policies Modal */}
      <PoliciesModal
        isOpen={policyTab !== null}
        onClose={() => setPolicyTab(null)}
        initialTab={policyTab || 'shipping'}
      />

      {/* Store Operations & Admin Orders Console */}
      <AdminOrdersDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}
