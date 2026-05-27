'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import FilterPanel from '@/components/FilterPanel';
import FilterDrawer from '@/components/FilterDrawer';
import { products } from '@/data/products';
import { filterAndSortProducts, FilterOptions } from '@/utils/filters';
import { Filter } from 'lucide-react';

export default function MasculinoPage() {
  const baseProducts = products.filter(p => p.gender === 'masculino' || p.gender === 'unissex');
  const allBrands = Array.from(new Set(baseProducts.map((p) => p.brand)));
  const allSizes = Array.from(new Set(baseProducts.flatMap((p) => p.sizes)));
  const minPrice = Math.min(...baseProducts.map((p) => p.price));
  const maxPrice = Math.max(...baseProducts.map((p) => p.price));

  const [filters, setFilters] = useState<FilterOptions>({
    brands: allBrands,
    sizes: allSizes,
    priceRange: [minPrice, maxPrice],
    sortBy: 'newest',
    selectedBrands: [],
    selectedSizes: [],
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = filterAndSortProducts(baseProducts, filters);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-medium">Masculino</h1>
            <p className="mt-2 text-white/60">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
            </p>
          </div>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden h-12 bg-[#0B0B0B] border border-white/10 text-white font-semibold tracking-[0.08em] uppercase px-6 flex items-center gap-2"
          >
            <Filter size={18} />
            Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="hidden lg:block">
            <FilterPanel
              products={baseProducts}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <FilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        products={baseProducts}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </main>
  );
}
