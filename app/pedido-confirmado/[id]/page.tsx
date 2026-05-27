'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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

export default function PedidoConfirmadoPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = getLocalStorage<Order[]>('keef-orders', []);
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

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

  if (!order) {
    return (
      <main className="min-h-screen bg-[#050505] text-white pt-28">
        <Navbar />
        <div className="max-w-7xl mx-auto px-5 py-20 text-center">
          <h1 className="text-4xl font-medium mb-4">Pedido não encontrado</h1>
          <button
            onClick={() => router.push('/')}
            className="h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase px-8"
          >
            Voltar para loja
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium mb-2">Pedido recebido</h1>
          <p className="text-white/60">Número do pedido: {order.id}</p>
        </div>

        <div className="bg-[#0B0B0B] border border-white/10 p-8 mb-6">
          <div className="text-center py-6 border border-white/10 mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Aviso</p>
            <p className="text-lg font-medium">Pagamento será ativado em breve.</p>
          </div>
          
          <h2 className="text-2xl font-medium mb-6">Detalhes do pedido</h2>
          
          <div className="mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Cliente</p>
            <p>{order.customer.name}</p>
            <p className="text-white/60">{order.customer.email}</p>
            <p className="text-white/60">{order.customer.phone}</p>
          </div>

          <div className="mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Entrega</p>
            <p>{order.deliveryType === 'store' ? 'Retirar na loja' : 'Receber em casa'}</p>
            {order.deliveryType === 'home' && order.address && (
              <div className="text-white/60 mt-2">
                <p>{order.address.street}, {order.address.number}</p>
                <p>{order.address.neighborhood}, {order.address.city} - {order.address.state}</p>
                <p>CEP: {order.address.cep}</p>
                {order.address.complement && <p>Complemento: {order.address.complement}</p>}
              </div>
            )}
          </div>

          <div className="mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Pagamento</p>
            <p>{getPaymentMethodLabel(order.paymentMethod)}</p>
            <p className="text-white/60 text-sm mt-1">
              Status: {getStatusLabel(order.paymentStatus)}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-4">Itens</p>
            <div className="space-y-4">
              {order.items.map((item, index) => {
                const product = products.find(p => p.id === item.id);
                return (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 items-center">
                    <div className="w-16 aspect-square bg-[#050505] flex items-center justify-center overflow-hidden">
                      {product && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={64}
                          height={64}
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

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-white/60">Subtotal</span>
              <span>R$ {order.subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Entrega</span>
              <span>{order.shipping === 0 ? 'Grátis' : `R$ ${order.shipping.toFixed(2).replace('.', ',')}`}</span>
            </div>
            <div className="pt-4 flex justify-between items-center">
              <p className="text-lg font-medium">Total</p>
              <p className="text-2xl font-semibold">
                R$ {order.total.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <div className="text-right pt-2">
              <p className="text-white/60 text-sm uppercase tracking-wider">Status</p>
              <p className="text-lg font-medium">{getStatusLabel(order.orderStatus)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase px-8"
          >
            Voltar para loja
          </button>
          <button
            onClick={() => router.push('/perfil')}
            className="h-16 bg-[#0B0B0B] border border-white/10 text-white font-semibold tracking-[0.08em] uppercase px-8"
          >
            Ver meus pedidos
          </button>
        </div>
      </div>
    </main>
  );
}
