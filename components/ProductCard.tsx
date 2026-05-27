'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = getLocalStorage<string[]>('keef-favorites', []);
    setIsFavorited(favorites.includes(product.id));
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = getLocalStorage<string[]>('keef-favorites', []);
    let newFavorites;
    if (favorites.includes(product.id)) {
      newFavorites = favorites.filter(id => id !== product.id);
    } else {
      newFavorites = [...favorites, product.id];
    }
    setLocalStorage('keef-favorites', newFavorites);
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/produto/${product.slug}`} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0B0B0B] border border-white/10 rounded-none p-3 md:p-4 hover:border-white/20 transition-colors relative"
      >
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10"
        >
          <motion.div
            animate={{ scale: isFavorited ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={20}
              strokeWidth={1.75}
              fill={isFavorited ? 'white' : 'none'}
              className="text-white"
            />
          </motion.div>
        </button>

        <div className="aspect-square bg-[#050505] mb-4 flex items-center justify-center overflow-hidden">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain"
            />
          </motion.div>
        </div>

        <div>
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{product.brand}</p>
          <h3 className="text-white text-base font-medium mb-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-white text-lg font-semibold">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
            {product.oldPrice > product.price && (
              <p className="text-white/40 text-sm line-through">
                R$ {product.oldPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
