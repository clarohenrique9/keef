import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <section className="px-5 md:px-20 py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-medium tracking-tight mb-12 md:mb-16 text-white">
          Destaques
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
