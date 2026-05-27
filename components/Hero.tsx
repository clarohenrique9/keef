'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const desktopHeroImages = ["/Logo-Keef.png", "/Logo-Dark.png"];
  const mobileHeroImages = ["/Logo-Keef-Mobile.png", "/Logo-Dark-Mobile.png"];
  
  const [currentDesktopIndex, setCurrentDesktopIndex] = useState(0);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  useEffect(() => {
    const desktopInterval = setInterval(() => {
      setCurrentDesktopIndex((prev) => (prev + 1) % desktopHeroImages.length);
    }, 9000);

    const mobileInterval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % mobileHeroImages.length);
    }, 9000);

    return () => {
      clearInterval(desktopInterval);
      clearInterval(mobileInterval);
    };
  }, []);

  return (
    <section className="relative w-full h-[calc(100dvh-72px)] md:h-[100dvh] overflow-hidden md:pt-0 pt-[72px]">
      {/* Desktop Hero (≥ md) - Rotating */}
      <div className="hidden md:block relative w-full h-full overflow-hidden">
        {desktopHeroImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt="KEEF MULTIMARCAS"
            fill
            priority
            unoptimized
            quality={100}
            sizes="100vw"
            fetchPriority="high"
            loading="eager"
            placeholder="empty"
            className="object-cover object-center absolute inset-0"
            style={{
              opacity: index === currentDesktopIndex ? 1 : 0,
              zIndex: index === currentDesktopIndex ? 10 : 0,
              transition: 'opacity 1400ms cubic-bezier(.22,.61,.36,1)',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          />
        ))}
      </div>

      {/* Mobile Hero (< md) - Rotating */}
      <div className="md:hidden relative w-full h-full overflow-hidden">
        {mobileHeroImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt="KEEF MULTIMARCAS"
            width={1080}
            height={1920}
            unoptimized
            priority
            quality={100}
            fetchPriority="high"
            loading="eager"
            placeholder="empty"
            className="absolute left-1/2 top-1/2 block w-full h-auto min-h-[100dvh] object-contain"
            style={{
              transform: 'translate(-50.8%, -57%) scale(1.048)',
              opacity: index === currentMobileIndex ? 1 : 0,
              zIndex: index === currentMobileIndex ? 10 : 0,
              transition: 'opacity 1400ms cubic-bezier(.22,.61,.36,1)',
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
          />
        ))}
      </div>
    </section>
  );
}
