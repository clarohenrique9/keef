'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { Product } from '@/data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickSuggestions = [
  'Tênis',
  'Camiseta',
  'Boné',
  'Mizuno',
  'NBA',
  'New Era',
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    });

    setResults(filtered);
  }, [query]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const handleResultClick = () => {
    setQuery('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/94 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="h-full flex flex-col">
            <div className="max-w-4xl mx-auto w-full px-5 pt-28">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={onClose}
                  className="text-white hover:opacity-70 transition-opacity"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="relative mb-8">
                <Search
                  size={24}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquise por produto, marca ou categoria"
                  className="w-full h-20 bg-[#0B0B0B] border border-white/10 text-white text-xl pl-20 pr-6"
                />
              </div>

              {!query.trim() && (
                <div className="mb-8">
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-4">
                    Sugestões rápidas
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {quickSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-6 py-3 bg-[#0B0B0B] border border-white/10 text-white hover:border-white transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.length > 0 && (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/produto/${product.slug}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-6 p-4 bg-[#0B0B0B] border border-white/10 hover:border-white transition-colors"
                    >
                      <div className="w-20 aspect-square bg-[#050505] flex items-center justify-center overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                          {product.brand}
                        </p>
                        <h3 className="text-white text-lg font-medium">{product.name}</h3>
                        <p className="text-white text-lg font-semibold mt-2">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/60 text-lg">
                    Nenhum produto encontrado para "{query}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
