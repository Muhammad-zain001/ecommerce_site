import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearchSubmit: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSearchSubmit,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matches = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.fabric.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
      onClose();
    }
  };

  const handleQuickKeyword = (kw: string) => {
    setQuery(kw);
    onSearchSubmit(kw);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#F6F4EF] rounded-2xl shadow-2xl border border-[#D9C9A7]/50 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Shalwar Kameez, Kurtas, Linen shirts, Giza cotton..."
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-hidden text-[#121212] placeholder:text-stone-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-500 hover:text-[#121212] ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results Area */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2.5">
                Popular Atelier Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Shalwar Kameez', 'Egyptian Cotton', 'Olive Kurta', 'Pure Linen', 'Wool Overshirt', 'Peshawari Chappal'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleQuickKeyword(kw)}
                    className="px-3 py-1.5 text-xs bg-white border border-stone-200 hover:border-[#2E4A3B] text-stone-700 rounded-lg transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : matches.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              No garments found matching "{query}". Try checking your spelling or searching by category.
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                Found {matches.length} Garments
              </span>
              <div className="divide-y divide-stone-100 bg-white rounded-xl border border-stone-200 overflow-hidden">
                {matches.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="p-3 flex items-center justify-between gap-3 hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded-md overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={product.images[0]}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-sm font-semibold text-[#121212]">{product.title}</p>
                        <p className="text-[11px] text-stone-500">{product.fabric}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono tabular-nums text-xs font-bold text-[#121212]">
                        Rs. {product.price.toLocaleString('en-PK')}
                      </p>
                      <span className="text-[10px] text-[#2E4A3B] font-semibold flex items-center justify-end gap-0.5">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
