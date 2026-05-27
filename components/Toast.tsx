'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
}

interface ToastProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed z-[9999] top-6 right-6 md:top-8 md:right-8 bottom-6 left-6 md:bottom-auto md:left-auto flex flex-col gap-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0B0B0B] border border-white/12 px-6 py-4 flex items-center justify-between gap-6"
          >
            <p className="text-white">{toast.message}</p>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
