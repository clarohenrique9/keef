'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
  };

  const sizes = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-6 text-xs",
    lg: "h-14 px-8 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
