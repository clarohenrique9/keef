'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { products } from '@/data/products';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find(p => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [toast, setToast] = useState(false);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  useEffect(() => {
    if (product) {
      const favorites = getLocalStorage<string[]>('keef-favorites', []);
      setIsFavorited(favorites.includes(product.id));
    }
  }, [product]);

  const toggleFavorite = () => {
    if (!product) return;
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

  const addToCart = () => {
    if (!product) return;
    if (product.sizes.length > 0 && !selectedSize) {
      setShowSizeWarning(true);
      setTimeout(() => setShowSizeWarning(false), 3000);
      return;
    }
    const cart = getLocalStorage<any[]>('keef-cart', []);
    const sizeToAdd = selectedSize || 'Único';
    const existingItem = cart.find(
      item => item.id === product.id && item.size === sizeToAdd
    );
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id && item.size === sizeToAdd
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [
        ...cart,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          size: sizeToAdd,
          quantity: 1,
        },
      ];
    }
    setLocalStorage('keef-cart', newCart);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-[#050505] text-white pt-28">
        <Navbar />
        <div className="max-w-7xl mx-auto px-5 py-20">
          <h1 className="text-4xl font-medium">Produto não encontrado</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#0B0B0B] border border-white/10 aspect-square flex items-center justify-center overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-2">{product.brand}</p>
            <h1 className="text-4xl font-medium mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-3xl font-semibold">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              {product.oldPrice > product.price && (
                <p className="text-white/40 text-xl line-through">
                  R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                </p>
              )}
            </div>

            <p className="text-white/60 mb-8">{product.description}</p>

            {product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-white text-sm uppercase tracking-wider mb-4">Tamanhos</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setShowSizeWarning(false);
                      }}
                      className={`w-12 h-12 border text-white hover:border-white transition-colors ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-[#0B0B0B] border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {showSizeWarning && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-4"
                  >
                    Por favor, selecione um tamanho.
                  </motion.p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                onClick={addToCart}
                className="h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase flex items-center justify-center gap-2 hover:opacity-92 transition-opacity"
              >
                <ShoppingBag size={18} strokeWidth={1.75} />
                Adicionar ao Carrinho
              </button>
              <button
                onClick={toggleFavorite}
                className="h-16 bg-[#0B0B0B] border border-white/10 text-white font-semibold tracking-[0.08em] uppercase flex items-center justify-center gap-2 hover:border-white transition-colors"
              >
                <Heart
                  size={18}
                  strokeWidth={1.75}
                  fill={isFavorited ? 'white' : 'none'}
                />
                {isFavorited ? 'Favoritado' : 'Favoritar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-4 z-50"
        >
          Produto adicionado ao carrinho!
        </motion.div>
      )}
    </main>
  );
}
