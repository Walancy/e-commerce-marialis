"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, RotateCcw } from 'lucide-react';

const slides = [
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
        <div className="relative w-full h-[300px] overflow-hidden group">
            <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                        {slide.type === 'promo' ? (
                            // Black Friday Slide Layout
                            <div className="w-full h-full bg-[#ff0040] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('/banner-bf.png')] bg-cover bg-right bg-no-repeat opacity-50 md:opacity-100 md:bg-contain md:bg-right-bottom"></div>
                                <div className="container mx-auto px-6 z-10 flex flex-col justify-center items-center h-full max-w-7xl pb-8">
                                    <div className="text-white font-bold mb-1 text-sm md:text-base text-center">{slide.subtitle}</div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight max-w-3xl drop-shadow-md text-center">
                                        {slide.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {slide.coupons?.map((coupon, idx) => (
                                            <div key={idx} className="bg-white text-[#ff0040] p-2 rounded-lg shadow-lg text-center min-w-[120px] transform hover:scale-105 transition-transform cursor-pointer border-2 border-dashed border-[#ff0040]">
                                                <div className="text-lg font-black">{coupon.val}</div>
                                                <div className="text-xs font-medium text-gray-600">{coupon.min}</div>
                                                <div className="text-[10px] mt-1 bg-gray-100 py-0.5 px-1 rounded text-gray-500">Code: {coupon.code}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Benefits Bar */}
                                <div className="absolute bottom-0 left-0 w-full bg-white py-2 px-6 flex justify-center gap-6 text-xs font-medium text-gray-700 shadow-inner">
                                    <div className="flex items-center gap-1.5"><Truck size={14} className="text-[#ff0040]" /> Frete grátis acima de R$99</div>
                                    <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#ff0040]" /> Entrega rápida</div>
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
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-16">
                                    <div className="text-white max-w-xl space-y-4 translate-y-4 opacity-0 animate-fade-in-up pl-12">
                                        <h2 className="text-3xl font-bold leading-tight">{slide.title}</h2>
                                        <p className="text-lg text-gray-200">{slide.subtitle}</p>
                                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm">
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
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2 h-2 rounded-full transition-all shadow-sm ${current === i ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 z-20"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 z-20"
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
