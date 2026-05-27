'use client';

import { Product } from '@/data/products';

interface FilterOptions {
  brands: string[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: 'newest' | 'price-asc' | 'price-desc';
  selectedBrands: string[];
  selectedSizes: string[];
}

interface FilterPanelProps {
  products: Product[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function FilterPanel({ products, filters, onFiltersChange }: FilterPanelProps) {
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  const handleBrandChange = (brand: string) => {
    const newSelectedBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onFiltersChange({ ...filters, selectedBrands: newSelectedBrands });
  };

  const handleSizeChange = (size: string) => {
    const newSelectedSizes = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFiltersChange({ ...filters, selectedSizes: newSelectedSizes });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFiltersChange({
      brands: allBrands,
      sizes: allSizes,
      priceRange: [minPrice, maxPrice],
      sortBy: 'newest',
      selectedBrands: [],
      selectedSizes: [],
    });
  };

  return (
    <div className="bg-[#0B0B0B] border border-white/10 p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-medium">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-white/60 text-sm hover:text-white transition-colors"
        >
          Limpar
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-wider mb-4">Ordenar</p>
          <div className="space-y-2">
            {[
              { value: 'newest', label: 'Novidades' },
              { value: 'price-asc', label: 'Menor preço' },
              { value: 'price-desc', label: 'Maior preço' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value as FilterOptions['sortBy'])}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  filters.sortBy === option.value
                    ? 'bg-white text-black'
                    : 'bg-[#050505] border border-white/10 text-white hover:border-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider mb-4">Marca</p>
          <div className="space-y-2">
            {allBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleBrandChange(brand)}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  filters.selectedBrands.includes(brand)
                    ? 'bg-white text-black'
                    : 'bg-[#050505] border border-white/10 text-white hover:border-white'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider mb-4">Tamanho</p>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`w-12 h-12 transition-colors ${
                  filters.selectedSizes.includes(size)
                    ? 'bg-white text-black border-white'
                    : 'bg-[#050505] border border-white/10 text-white hover:border-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
