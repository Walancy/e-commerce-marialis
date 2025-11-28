"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, RotateCcw } from 'lucide-react';

interface Slide {
    id: number;
    type: string;
    image: string;
    title: string;
    subtitle: string;
    coupons?: { val: string; min: string; code: string; }[];
    cta?: string;
}

const slides: Slide[] = [
    {
        id: 0,
        type: 'promo',
        image: '/banner-bf.png',
        title: 'A BLACK FRIDAY ESTÁ CHEGANDO!',
        subtitle: 'Promo Termina: 3 dez, 23:59 (BRT)',
        coupons: [
            { val: 'R$100 off', min: 'em R$550+', code: 'MARIALIS100' },
            { val: 'R$540 off', min: 'em R$4.200+', code: 'MARIALIS540' },
            { val: 'R$490 off', min: 'em R$3.200+', code: 'MARIALIS490' },
        ]
    }
];

export const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    return (
        <div className="relative w-full h-auto min-h-[600px] md:min-h-[500px] overflow-hidden group">
            <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0 relative min-h-[600px] md:min-h-[500px]">
                        {slide.type === 'promo' ? (
                            // Black Friday Slide Layout
                            <div className="w-full h-full bg-[#ff0040] flex items-center justify-center relative overflow-hidden pb-16 md:pb-0">
                                <div className="absolute inset-0 bg-[url('/banner-bf.png')] bg-cover bg-center md:bg-right bg-no-repeat opacity-30 md:opacity-100 md:bg-contain md:bg-right-bottom"></div>
                                <div className="container mx-auto px-6 z-10 flex flex-col justify-center items-start h-full max-w-7xl pb-8 pt-12 md:pt-0">
                                    <div className="text-white font-bold mb-2 text-sm md:text-base bg-black/20 md:bg-transparent px-4 py-1 rounded-full">{slide.subtitle}</div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight max-w-3xl drop-shadow-md uppercase">
                                        {slide.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-3 justify-start max-w-md md:max-w-none">
                                        {slide.coupons?.map((coupon, idx) => (
                                            <div key={idx} className="bg-[#f8f9fa] text-[#ff0040] p-3 md:p-4 rounded-xl shadow-lg text-center min-w-[140px] transform hover:scale-105 transition-transform cursor-pointer border-2 border-dashed border-[#ff0040]">
                                                <div className="text-xl md:text-2xl font-black">{coupon.val}</div>
                                                <div className="text-xs md:text-sm font-medium text-gray-600">{coupon.min}</div>
                                                <div className="text-[10px] md:text-xs mt-2 bg-gray-100 py-1 px-2 rounded text-gray-500 font-mono">Code: {coupon.code}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Benefits Bar */}
                                <div className="absolute bottom-0 left-0 w-full bg-[#f8f9fa] py-3 md:py-2 px-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs font-medium text-gray-700 shadow-inner z-20">
                                    <div className="flex items-center gap-1.5"><Truck size={14} className="text-[#ff0040]" /> Frete grátis acima de R$99</div>
                                    <div className="hidden md:block text-gray-300">|</div>
                                    <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#ff0040]" /> Entrega rápida</div>
                                    <div className="hidden md:block text-gray-300">|</div>
                                    <div className="flex items-center gap-1.5"><RotateCcw size={14} className="text-[#ff0040]" /> Devoluções grátis</div>
                                </div>
                            </div>
                        ) : (
                            // Standard Slide Layout
                            <>
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 md:from-black/60 to-transparent flex items-end md:items-center px-6 md:px-16 pb-20 md:pb-0">
                                    <div className="text-white max-w-xl space-y-4 translate-y-4 opacity-0 animate-fade-in-up md:pl-12">
                                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">{slide.title}</h2>
                                        <p className="text-base md:text-lg text-gray-200">{slide.subtitle}</p>
                                        <button className="bg-[#f8f9fa] text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm w-full md:w-auto">
                                            {slide.cta}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {slides.length > 1 && (
                <>
                    <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2 h-2 rounded-full transition-all shadow-sm ${current === i ? "bg-[#f8f9fa] w-6" : "bg-[#f8f9fa]/50 hover:bg-[#f8f9fa]/80"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 z-20 hidden md:block"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 z-20 hidden md:block"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.3s;
        }
      `}</style>
        </div>
    );
};
