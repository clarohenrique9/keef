'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Drawer from './ui/Drawer';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Masculino', href: '/masculino' },
    { label: 'Feminino', href: '/feminino' },
    { label: 'Tênis', href: '/tenis' },
    { label: 'Acessórios', href: '/acessorios' },
  ];

  const mobileMenuItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Masculino', href: '/masculino' },
    { label: 'Feminino', href: '/feminino' },
    { label: 'Tênis', href: '/tenis' },
    { label: 'Acessórios', href: '/acessorios' },
    { label: 'Favoritos', href: '/favoritos' },
    { label: 'Carrinho', href: '/carrinho' },
    { label: 'Perfil', href: '/perfil' },
  ];

  return (
    <>
      <header className="md:absolute fixed top-0 left-0 right-0 md:z-50 z-[999] h-[72px] flex items-center md:px-12 px-5 md:bg-transparent bg-black md:border-b-0 border-b-2 border-white/42 transition-none">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              className="md:hidden text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <button className="hidden md:block text-white min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setMenuOpen(true)}>
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <Link 
              href="/" 
              className="text-white font-[500] tracking-[0.08em] uppercase leading-[1] min-h-[44px] flex items-center"
              style={{ 
                fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif', 
                fontSize: '22px' 
              }}
            >
              KEEF
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-[12px] font-[500] uppercase tracking-[0.10em] hover:opacity-70 transition-opacity min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              className="text-white opacity-1 hover:opacity-70 transition-opacity relative min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            
            <Link 
              href="/favoritos"
              className="text-white opacity-1 hover:opacity-70 transition-opacity relative min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Heart size={20} strokeWidth={1.75} />
            </Link>
            
            <Link 
              href="/carrinho"
              className="text-white opacity-1 hover:opacity-70 transition-opacity relative min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
            </Link>
            
            <Link 
              href="/perfil"
              className="text-white opacity-1 hover:opacity-70 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <User size={20} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </header>

      <Drawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="left"
        width="w-[86vw] md:w-[420px]"
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex-1">
            <nav className="flex flex-col gap-4">
              {mobileMenuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg md:text-xl font-medium tracking-wide text-white hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
          <div className="pt-8 border-t border-white/12">
            <p className="text-sm text-white/42 font-medium tracking-wider">KEEF MULTIMARCAS</p>
            <p className="text-xs text-white/42 mt-1">Ingleses, Florianópolis</p>
          </div>
        </div>
      </Drawer>
      
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
