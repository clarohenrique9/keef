'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Plus, Minus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  quantity: number;
}

export default function CarrinhoPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getLocalStorage<CartItem[]>('keef-cart', []));
  }, []);

  const updateQuantity = (index: number, change: number) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    setLocalStorage('keef-cart', newCart);
  };

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setLocalStorage('keef-cart', newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-medium">Carrinho</h1>
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-24"
          >
            <p className="text-white/40 text-8xl mb-6">0</p>
            <h2 className="text-2xl font-medium mb-4">Seu carrinho está vazio</h2>
            <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
              Explore nossos produtos e adicione o que você gosta ao carrinho.
            </p>
            <Link
              href="/shop"
              className="inline-flex h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase px-10 items-center justify-center"
            >
              Explorar Produtos
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => {
                const product = products.find(p => p.id === item.id);
                return (
                  <div
                    key={`${item.id}-${item.size}-${index}`}
                    className="bg-[#0B0B0B] border border-white/10 p-6 flex flex-col md:flex-row gap-6"
                  >
                    <div className="w-full md:w-32 aspect-square bg-[#050505] flex items-center justify-center overflow-hidden">
                      {product && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={128}
                          height={128}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{item.brand}</p>
                          <h3 className="text-white text-lg font-medium">{item.name}</h3>
                          <p className="text-white/60 text-sm mt-1">Tamanho: {item.size}</p>
                        </div>
                        <button onClick={() => removeItem(index)} className="text-white/60 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className="w-11 h-11 bg-[#050505] border border-white/10 flex items-center justify-center hover:border-white"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="text-white text-lg font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, 1)}
                            className="w-11 h-11 bg-[#050505] border border-white/10 flex items-center justify-center hover:border-white"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <p className="text-white text-xl font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#0B0B0B] border border-white/10 p-6 h-fit">
              <h3 className="text-xl font-medium mb-6">Resumo</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Entrega</span>
                  <span className="text-white">A calcular</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-white text-lg font-medium">Total</span>
                  <span className="text-white text-lg font-semibold">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase flex items-center justify-center hover:opacity-92 transition-opacity"
              >
                Finalizar Pedido
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
