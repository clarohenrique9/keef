'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  side?: 'left' | 'right';
  width?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  title,
  side = 'right',
  width = 'w-full md:w-[480px]',
}: DrawerProps) {
  const slideVariants = {
    closed: { x: side === 'left' ? '-100%' : '100%' },
    open: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/82 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            variants={slideVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full ${width} bg-[rgba(0,0,0,0.94)] backdrop-blur-2xl z-50 flex flex-col border-l border-white/12`}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/12">
              {title && <h2 className="text-lg font-medium text-white">{title}</h2>}
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-6 h-6 text-white" strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
