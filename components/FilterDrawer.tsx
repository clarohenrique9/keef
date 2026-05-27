'use client';

import { Product } from '@/data/products';
import Drawer from './ui/Drawer';
import FilterPanel from './FilterPanel';

interface FilterOptions {
  brands: string[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: 'newest' | 'price-asc' | 'price-desc';
  selectedBrands: string[];
  selectedSizes: string[];
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  products,
  filters,
  onFiltersChange,
}: FilterDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      side="right"
      width="w-full md:w-[420px]"
    >
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Filtros</h2>
          <button onClick={onClose} className="text-white hover:opacity-70">
            X
          </button>
        </div>
        <div className="flex-1">
          <FilterPanel
            products={products}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase"
        >
          Aplicar
        </button>
      </div>
    </Drawer>
  );
}
