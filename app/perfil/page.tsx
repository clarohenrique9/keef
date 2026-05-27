'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { products } from '@/data/products';
import { getLocalStorage } from '@/utils/storage';

interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  quantity: number;
}

type PaymentMethod = 'pix' | 'card' | 'boleto';
type OrderStatus = 'pending_payment' | 'paid' | 'cancelled' | 'failed';

interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryType: 'store' | 'home';
  address?: {
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    complement?: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: OrderStatus;
  orderStatus: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function PerfilPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getLocalStorage<Order[]>('keef-orders', []));
  }, []);

  const getStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      pending_payment: 'Aguardando pagamento',
      paid: 'Pago',
      cancelled: 'Cancelado',
      failed: 'Falhou',
    };
    return labels[status];
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    const labels: Record<PaymentMethod, string> = {
      pix: 'Pix',
      card: 'Cartão de crédito',
      boleto: 'Boleto',
    };
    return labels[method];
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <h1 className="text-4xl font-medium mb-12">Minha Conta</h1>

        <div>
          <h2 className="text-2xl font-medium mb-8">Pedidos</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">Você ainda não possui pedidos.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => {
                const date = new Date(order.createdAt);
                const formattedDate = date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <div key={order.id} className="bg-[#0B0B0B] border border-white/10 p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">Pedido</p>
                        <h3 className="text-2xl font-medium">{order.id}</h3>
                        <p className="text-white/60 text-sm mt-1">{formattedDate}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-white/60 text-xs uppercase tracking-wider">Status</p>
                        <p className="text-lg font-medium">{getStatusLabel(order.orderStatus)}</p>
                        <p className="text-white/60 text-sm mt-1">
                          {getPaymentMethodLabel(order.paymentMethod)}
                        </p>
                        <p className="text-2xl font-semibold mt-2">
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                      <h4 className="text-lg font-medium mb-4">Itens</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => {
                          const product = products.find(p => p.id === item.id);
                          return (
                            <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 items-center">
                              <div className="w-12 aspect-square bg-[#050505] flex items-center justify-center overflow-hidden">
                                {product && (
                                  <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <p>{item.name}</p>
                                <p className="text-white/60 text-sm">
                                  Tamanho: {item.size} • Qtd: {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">
                                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Link
                        href={`/pedido-confirmado/${order.id}`}
                        className="h-12 bg-[#050505] border border-white/10 text-white font-semibold tracking-[0.08em] uppercase px-6"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
