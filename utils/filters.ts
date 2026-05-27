import { Product } from '@/data/products';

export interface FilterOptions {
  brands: string[];
  sizes: string[];
  priceRange: [number, number];
  sortBy: 'newest' | 'price-asc' | 'price-desc';
  selectedBrands: string[];
  selectedSizes: string[];
}

export function filterAndSortProducts(
  products: Product[],
  filters: FilterOptions
): Product[] {
  let filtered = [...products];

  if (filters.selectedBrands.length > 0) {
    filtered = filtered.filter((p) => filters.selectedBrands.includes(p.brand));
  }

  if (filters.selectedSizes.length > 0) {
    filtered = filtered.filter((p) =>
      p.sizes.some((s) => filters.selectedSizes.includes(s))
    );
  }

  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => b.featured ? 1 : 0 - (a.featured ? 1 : 0));
      break;
  }

  return filtered;
}
