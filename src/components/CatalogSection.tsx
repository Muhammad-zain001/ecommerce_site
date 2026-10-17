import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, ProductColor } from '../types/store';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  currentCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  searchQuery = '',
  onClearSearch,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(12000);

  const categoriesList: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Garments' },
    { id: 'shalwar-kameez', label: 'Shalwar Kameez' },
    { id: 'kurtas', label: 'Kurtas' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'pants', label: 'Trousers' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const sizes = ['all', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filtering & Sorting pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (currentCategory !== 'all' && p.category !== currentCategory) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          const matchCategory = p.categoryLabel.toLowerCase().includes(q);
          if (!matchTitle && !matchFabric && !matchCategory) return false;
        }
        // Size
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize as any)) return false;
        // Price Max
        if (p.price > priceMax) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, currentCategory, searchQuery, selectedSize, priceMax, sortBy]);

  const activeFiltersCount = (currentCategory !== 'all' ? 1 : 0) + (selectedSize !== 'all' ? 1 : 0) + (priceMax < 12000 ? 1 : 0) + (searchQuery ? 1 : 0);

  const resetFilters = () => {
    onSelectCategory('all');
    setSelectedSize('all');
    setPriceMax(12000);
    if (onClearSearch) onClearSearch();
  };

  return (
    <section id="shop-catalog" className="py-12 md:py-16 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Section Title */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>Atelier Store</span>
            <span aria-hidden="true">/</span>
            <span className="capitalize">{currentCategory === 'all' ? 'All Collections' : currentCategory.replace('-', ' ')}</span>
            {searchQuery && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#2E4A3B]">Search: "{searchQuery}"</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#121212]">
                {currentCategory === 'all' ? 'The Complete Catalogue' : categoriesList.find(c => c.id === currentCategory)?.label}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Showing <span className="font-semibold text-stone-800 font-mono tabular-nums">{filteredProducts.length}</span> handcrafted garments
              </p>
            </div>

            {/* Sorting & Filter controls */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-300 text-stone-800 text-xs rounded-lg px-3 py-2 font-medium focus:outline-hidden focus:border-[#2E4A3B]"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-stone-800"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar (Desktop Segmented Control) */}
        <div className="hidden lg:flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-white rounded-xl border border-stone-200/80 mb-8">
          {/* Categories Tab buttons */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  currentCategory === cat.id
                    ? 'bg-[#2E4A3B] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-[#121212] hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Size Filter segmented buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium">Size:</span>
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedSize === s
                      ? 'bg-white text-[#121212] shadow-2xs'
                      : 'text-stone-600 hover:text-[#121212]'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Clear filters if active */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline ml-2 font-medium"
              >
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer / Collapsible */}
        {mobileFilterOpen && (
          <div className="lg:hidden p-5 bg-white rounded-xl border border-stone-200 mb-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-[#121212]">Filter Catalogue</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category selection */}
            <div>
              <span className="text-xs font-semibold text-stone-700 block mb-2">Category:</span>
              <div className="flex flex-wrap gap-1.5">
                {categoriesList.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCategory(c.id)}
                    className={`px-3 py-1 text-xs rounded-md font-medium ${
                      currentCategory === c.id
                        ? 'bg-[#2E4A3B] text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <span className="text-xs font-semibold text-stone-700 block mb-2">Size:</span>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 text-xs rounded-md font-medium ${
                      selectedSize === s
                        ? 'bg-[#2E4A3B] text-white'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Maximum Price:</span>
                <span className="font-mono tabular-nums font-bold">Rs. {priceMax.toLocaleString('en-PK')}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="12000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#2E4A3B]"
              />
            </div>

            {/* Reset */}
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="w-full py-2 text-xs text-rose-600 bg-rose-50 rounded-lg font-medium"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white rounded-2xl border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
              <Filter className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#121212]">No garments match your criteria</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try loosening your filters or resetting the price range to explore our full Pakistani menswear collection.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#2E4A3B] rounded-lg hover:bg-[#203529] transition-colors"
            >
              Reset Filters & View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
