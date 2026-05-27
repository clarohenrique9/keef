'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getLocalStorage<string[]>('keef-favorites', []));
  }, []);

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    setFavorites(newFavorites);
    setLocalStorage('keef-favorites', newFavorites);
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-medium">Favoritos</h1>
        </div>

        {favoriteProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-24"
          >
            <Heart size={64} className="mx-auto text-white/20 mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl font-medium mb-4">Você ainda não possui favoritos</h2>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              Adicione produtos aos favoritos para salvá-los e encontrá-los facilmente depois.
            </p>
            <Link
              href="/shop"
              className="inline-flex h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase px-10 items-center justify-center"
            >
              Explorar Produtos
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
