'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { products } from '@/data/products';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { ChevronLeft, ShoppingBag, User, Truck, CheckCircle2, CreditCard } from 'lucide-react';

interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  quantity: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
}

type PaymentMethod = 'pix' | 'card' | 'boleto';
type OrderStatus = 'pending_payment' | 'paid' | 'cancelled' | 'failed';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
  });
  const [deliveryType, setDeliveryType] = useState<'store' | 'home'>('store');
  const [address, setAddress] = useState<Address>({
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, label: 'Carrinho', icon: ShoppingBag },
    { id: 2, label: 'Identificação', icon: User },
    { id: 3, label: 'Entrega', icon: Truck },
    { id: 4, label: 'Pagamento', icon: CreditCard },
    { id: 5, label: 'Revisão', icon: CheckCircle2 },
  ];

  useEffect(() => {
    setCart(getLocalStorage<CartItem[]>('keef-cart', []));
  }, []);

  const validateCustomer = () => {
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!customer.email.trim()) newErrors.email = 'Email é obrigatório';
    if (!customer.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddress = () => {
    if (deliveryType === 'store') return true;
    const newErrors: Record<string, string> = {};
    if (!address.cep.trim()) newErrors.cep = 'CEP é obrigatório';
    if (!address.street.trim()) newErrors.street = 'Rua é obrigatório';
    if (!address.number.trim()) newErrors.number = 'Número é obrigatório';
    if (!address.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
    if (!address.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!address.state.trim()) newErrors.state = 'Estado é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let valid = true;
    if (step === 2) valid = validateCustomer();
    if (step === 3) valid = validateAddress();
    if (valid && step < 5) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalizeOrder = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = deliveryType === 'store' ? 0 : 0;
    const total = subtotal + shipping;
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      deliveryType,
      address: deliveryType === 'home' ? address : undefined,
      paymentMethod,
      paymentStatus: 'pending_payment' as OrderStatus,
      orderStatus: 'pending_payment' as OrderStatus,
      items: cart,
      subtotal,
      shipping,
      total,
    };
    const orders = getLocalStorage<any[]>('keef-orders', []);
    setLocalStorage('keef-orders', [...orders, newOrder]);
    setLocalStorage('keef-cart', []);
    router.push(`/pedido-confirmado/${orderId}`);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white pt-28">
        <Navbar />
        <div className="max-w-7xl mx-auto px-5 py-20 text-center">
          <p className="text-white/60 text-lg mb-8">Seu carrinho está vazio.</p>
          <button
            onClick={() => router.push('/shop')}
            className="h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase px-8"
          >
            Ver Produtos
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-28">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-20">
        <h1 className="text-4xl font-medium mb-12">Checkout</h1>

        <div className="flex flex-wrap gap-3 md:gap-4 mb-12">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 min-h-[48px] ${
                  isActive
                    ? 'bg-white text-black'
                    : isCompleted
                    ? 'bg-[#0B0B0B] border border-white/20 text-white'
                    : 'bg-[#0B0B0B] border border-white/10 text-white/40'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs md:text-sm uppercase tracking-wider">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-[#0B0B0B] border border-white/10 p-8">
                <h2 className="text-2xl font-medium mb-6">Carrinho</h2>
                <div className="space-y-6">
                  {cart.map((item, index) => {
                    const product = products.find(p => p.id === item.id);
                    return (
                      <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 items-center">
                        <div className="w-20 aspect-square bg-[#050505] flex items-center justify-center overflow-hidden">
                          {product && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{item.brand}</p>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-white/60 text-sm mt-1">
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
            )}

            {step === 2 && (
              <div className="bg-[#0B0B0B] border border-white/10 p-8">
                <h2 className="text-2xl font-medium mb-6">Identificação</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">Nome completo</label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-wider mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                      placeholder="(00) 00000-0000"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-[#0B0B0B] border border-white/10 p-8">
                <h2 className="text-2xl font-medium mb-6">Entrega</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDeliveryType('store')}
                      className={`flex-1 h-16 border font-semibold tracking-[0.08em] uppercase transition-colors ${
                        deliveryType === 'store'
                          ? 'bg-white text-black border-white'
                          : 'bg-[#050505] border-white/10 text-white'
                      }`}
                    >
                      Retirar na loja
                    </button>
                    <button
                      onClick={() => setDeliveryType('home')}
                      className={`flex-1 h-16 border font-semibold tracking-[0.08em] uppercase transition-colors ${
                        deliveryType === 'home'
                          ? 'bg-white text-black border-white'
                          : 'bg-[#050505] border-white/10 text-white'
                      }`}
                    >
                      Receber em casa
                    </button>
                  </div>

                  {deliveryType === 'home' && (
                    <div className="space-y-4 mt-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm uppercase tracking-wider mb-2">CEP</label>
                          <input
                            type="text"
                            value={address.cep}
                            onChange={(e) => setAddress({ ...address, cep: e.target.value })}
                            className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                            placeholder="00000-000"
                          />
                          {errors.cep && <p className="text-red-400 text-sm mt-2">{errors.cep}</p>}
                        </div>
                        <div>
                          <label className="block text-sm uppercase tracking-wider mb-2">Número</label>
                          <input
                            type="text"
                            value={address.number}
                            onChange={(e) => setAddress({ ...address, number: e.target.value })}
                            className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                            placeholder="123"
                          />
                          {errors.number && <p className="text-red-400 text-sm mt-2">{errors.number}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Rua</label>
                        <input
                          type="text"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                          placeholder="Nome da rua"
                        />
                        {errors.street && <p className="text-red-400 text-sm mt-2">{errors.street}</p>}
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Bairro</label>
                        <input
                          type="text"
                          value={address.neighborhood}
                          onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                          className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                          placeholder="Bairro"
                        />
                        {errors.neighborhood && <p className="text-red-400 text-sm mt-2">{errors.neighborhood}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm uppercase tracking-wider mb-2">Cidade</label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                            placeholder="Cidade"
                          />
                          {errors.city && <p className="text-red-400 text-sm mt-2">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-sm uppercase tracking-wider mb-2">Estado</label>
                          <input
                            type="text"
                            value={address.state}
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                            placeholder="UF"
                          />
                          {errors.state && <p className="text-red-400 text-sm mt-2">{errors.state}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">Complemento (opcional)</label>
                        <input
                          type="text"
                          value={address.complement}
                          onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                          className="w-full h-12 bg-[#050505] border border-white/10 px-4 text-white"
                          placeholder="Apto, bloco, etc"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-[#0B0B0B] border border-white/10 p-8">
                <h2 className="text-2xl font-medium mb-6">Pagamento</h2>
                <div className="space-y-4">
                  {[
                    { id: 'pix', label: 'Pix' },
                    { id: 'card', label: 'Cartão de crédito' },
                    { id: 'boleto', label: 'Boleto' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={`w-full p-6 text-left border transition-colors ${
                        paymentMethod === method.id
                          ? 'bg-white text-black border-white'
                          : 'bg-[#050505] border-white/10 text-white hover:border-white'
                      }`}
                    >
                      <div>
                        <p className="text-lg font-medium">{method.label}</p>
                        <p className="text-xs opacity-60">Disponível na próxima etapa</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="bg-[#0B0B0B] border border-white/10 p-8">
                <h2 className="text-2xl font-medium mb-6">Revisão</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Cliente</h3>
                    <p>{customer.name}</p>
                    <p className="text-white/60">{customer.email}</p>
                    <p className="text-white/60">{customer.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Entrega</h3>
                    <p>{deliveryType === 'store' ? 'Retirar na loja' : 'Receber em casa'}</p>
                    {deliveryType === 'home' && address && (
                      <div className="text-white/60 mt-2">
                        <p>{address.street}, {address.number}</p>
                        <p>{address.neighborhood}, {address.city} - {address.state}</p>
                        <p>CEP: {address.cep}</p>
                        {address.complement && <p>Complemento: {address.complement}</p>}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Pagamento</h3>
                    <p>{getPaymentMethodLabel(paymentMethod)}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Itens</h3>
                    <div className="space-y-3">
                      {cart.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${index}`} className="flex justify-between">
                          <div>
                            <p>{item.name}</p>
                            <p className="text-white/60 text-sm">
                              Tamanho: {item.size} • Qtd: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step < 5 && (
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 h-16 bg-[#0B0B0B] border border-white/10 text-white font-semibold tracking-[0.08em] uppercase flex items-center gap-2"
                  >
                    <ChevronLeft size={18} />
                    Voltar
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="flex-1 h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase"
                >
                  Continuar
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#0B0B0B] border border-white/10 p-8 h-fit">
            <h3 className="text-xl font-medium mb-6">Resumo</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Entrega</span>
                <span className="text-white">
                  {deliveryType === 'store' ? 'Grátis' : 'A calcular'}
                </span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between">
                <span className="text-white text-lg font-medium">Total</span>
                <span className="text-white text-lg font-semibold">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            {step === 5 && (
              <button
                onClick={handleFinalizeOrder}
                className="w-full h-16 bg-white text-black font-semibold tracking-[0.08em] uppercase hover:opacity-92 transition-opacity"
              >
                Finalizar Pedido
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
