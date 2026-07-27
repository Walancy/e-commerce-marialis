"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Clock, RotateCcw, Heart, Sparkles, Zap, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';

const getIconByName = (name?: string, theme?: string) => {
    switch (name) {
        case 'Heart': return <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-200 mb-4 animate-pulse" />;
        case 'Zap': return <Zap className="w-12 h-12 md:w-16 md:h-16 text-white mb-4" />;
        case 'ShoppingBag': return <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-800 mb-4" />;
        case 'Sparkles':
        default:
            return <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-[#ff6b00] mb-4" />;
    }
};

// --- React Bits Inspired Animated Backgrounds --- //

const AuroraBackground = ({ color1, color2 }: { color1: string, color2: string }) => (
    <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div 
            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-[spin_20s_linear_infinite]"
            style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${color1} 0%, transparent 40%), radial-gradient(circle at 80% 20%, ${color2} 0%, transparent 40%)`,
                filter: 'blur(40px)'
            }}
        />
    </div>
);

const SquaresBackground = ({ stroke, opacity, direction }: { stroke: string, opacity: number, direction: 'up' | 'diagonal' }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
            className={`absolute w-[200%] h-[200%] ${direction === 'diagonal' ? '-top-[50%] -left-[50%] animate-[slideDiagonal_15s_linear_infinite]' : 'top-0 left-0 animate-[slideUp_15s_linear_infinite]'}`}
            style={{
                backgroundImage: `linear-gradient(${stroke} 1px, transparent 1px), linear-gradient(90deg, ${stroke} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                opacity: opacity,
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
            }}
        />
        <style jsx>{`
            @keyframes slideDiagonal {
                0% { transform: translate(0, 0); }
                100% { transform: translate(-40px, -40px); }
            }
            @keyframes slideUp {
                0% { transform: translateY(0); }
                100% { transform: translateY(-40px); }
            }
        `}</style>
    </div>
);

const FuzzyOverlay = ({ opacity }: { opacity: number }) => (
    <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
    </div>
);

interface Slide {
    id: number;
    theme: 'mothers-day' | 'brand-dark' | 'brand-orange' | 'brand-light';
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    coupons?: { val: string; min: string; code: string; }[];
    cta?: string;
}

const slides: Slide[] = [
    {
        id: 0,
        theme: 'mothers-day',
        icon: <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-200 mb-4 animate-pulse" />,
        title: 'ESPECIAL DIA DAS MÃES',
        subtitle: 'Amor que renova e transforma',
        description: 'Presenteie com os melhores produtos de beleza. Kits exclusivos com descontos imperdíveis para ela.',
        coupons: [
            { val: '20% OFF', min: 'Kits Presente', code: 'MAE20' },
            { val: 'R$50 off', min: 'em R$250+', code: 'AMOR50' },
        ]
    },
    {
        id: 1,
        theme: 'brand-dark',
        icon: <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-[#ff6b00] mb-4" />,
        title: 'FESTIVAL DO PROFISSIONAL',
        subtitle: 'Abasteça seu salão agora',
        description: 'Tudo o que seu estúdio precisa com preços de atacado. Renove seu estoque com as melhores marcas.',
        coupons: [
            { val: 'R$150 off', min: 'em R$800+', code: 'PRO150' },
            { val: 'R$300 off', min: 'em R$1500+', code: 'PRO300' },
            { val: 'R$500 off', min: 'em R$2500+', code: 'PRO500' },
        ]
    },
    {
        id: 2,
        theme: 'brand-orange',
        icon: <Zap className="w-12 h-12 md:w-16 md:h-16 text-white mb-4" />,
        title: 'DESCONTO PROGRESSIVO',
        subtitle: 'Quanto mais você compra, mais você ganha',
        description: 'Aproveite a semana progressiva Marialis. Descontos aplicados automaticamente no carrinho.',
        coupons: [
            { val: '10% OFF', min: 'em 2 itens', code: 'AUTO' },
            { val: '15% OFF', min: 'em 3 itens', code: 'AUTO' },
            { val: '25% OFF', min: 'em 5+ itens', code: 'AUTO' },
        ]
    },
    {
        id: 3,
        theme: 'brand-light',
        icon: <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-800 mb-4" />,
        title: 'NOVIDADES DA SEMANA',
        subtitle: 'Lançamentos exclusivos',
        description: 'As ferramentas mais modernas do mercado acabaram de chegar. Garanta a sua antes que acabe.',
        coupons: [
            { val: 'Frete Grátis', min: 'Em lançamentos', code: 'NOVOFR' },
            { val: 'Brinde', min: 'Nas compras R$200+', code: 'BRINDE' },
        ]
    },
    {
        id: 4,
        theme: 'brand-dark',
        icon: <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-[#ff6b00] mb-4" />,
        title: 'FESTIVAL DO CABELO',
        subtitle: 'Cronograma Capilar Completo',
        description: 'Shampoos, máscaras e finalizadores de uso profissional. Trate os fios das suas clientes com qualidade premium.',
        coupons: [
            { val: 'Compre 2', min: 'Leve 3', code: 'CABELO3' },
            { val: '30% OFF', min: 'Em Máscaras', code: 'MASCARA30' },
        ]
    }
];

export const HeroCarousel = () => {
    const [activeSlides, setActiveSlides] = useState<Slide[]>(slides);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const { data, error } = await supabase
                    .from('hero_slides')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    const now = new Date();
                    const filtered = data.filter(item => {
                        if (item.start_date && new Date(item.start_date) > now) return false;
                        if (item.end_date && new Date(item.end_date) < now) return false;
                        return true;
                    });

                    if (filtered.length > 0) {
                        const formatted: Slide[] = filtered.map((item, idx) => ({
                            id: item.id || idx,
                            theme: item.theme || 'brand-dark',
                            icon: getIconByName(item.icon_name, item.theme),
                            title: item.title,
                            subtitle: item.subtitle || '',
                            description: item.description || '',
                            coupons: item.coupons || [],
                            cta: item.cta
                        }));
                        setActiveSlides(formatted);
                    }
                }
            } catch (err) {
                console.error("Error fetching hero slides:", err);
            }
        };
        fetchSlides();
    }, []);

    const prev = () => setCurrent((curr) => (curr === 0 ? activeSlides.length - 1 : curr - 1));
    const next = () => setCurrent((curr) => (curr === activeSlides.length - 1 ? 0 : curr + 1));

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    const getThemeClasses = (theme: Slide['theme']) => {
        switch (theme) {
            case 'mothers-day':
                return {
                    bg: 'bg-gradient-to-br from-pink-500 via-rose-400 to-pink-300',
                    text: 'text-white',
                    accent: 'text-pink-600',
                    couponBg: 'bg-white',
                    couponText: 'text-pink-600',
                    couponBorder: 'border-pink-300',
                    Effect: () => <AuroraBackground color1="rgba(255,182,193,0.8)" color2="rgba(255,105,180,0.6)" />
                };
            case 'brand-dark':
                return {
                    bg: 'bg-gray-900',
                    text: 'text-white',
                    accent: 'text-[#ff6b00]',
                    couponBg: 'bg-[#1a1a1a]',
                    couponText: 'text-[#ff6b00]',
                    couponBorder: 'border-gray-700',
                    Effect: () => <SquaresBackground stroke="#ff6b00" opacity={0.15} direction="diagonal" />
                };
            case 'brand-orange':
                return {
                    bg: 'bg-[#ff6b00]',
                    text: 'text-white',
                    accent: 'text-white',
                    couponBg: 'bg-white/10 backdrop-blur-md',
                    couponText: 'text-white',
                    couponBorder: 'border-white/30',
                    Effect: () => <FuzzyOverlay opacity={0.4} />
                };
            case 'brand-light':
                return {
                    bg: 'bg-gray-50',
                    text: 'text-gray-900',
                    accent: 'text-black',
                    couponBg: 'bg-white',
                    couponText: 'text-gray-900',
                    couponBorder: 'border-gray-300',
                    Effect: () => <SquaresBackground stroke="#000000" opacity={0.05} direction="up" />
                };
        }
    };

    return (
        <div className="w-full flex flex-col mb-8 relative overflow-hidden">
            <div className="relative w-full h-auto min-h-[360px] md:min-h-[420px] overflow-hidden group">
                <div
                    className="flex transition-transform duration-700 ease-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((slide) => {
                        const theme = getThemeClasses(slide.theme);
                        const BackgroundEffect = theme.Effect;

                        return (
                            <div key={slide.id} className="w-full h-full flex-shrink-0 relative min-h-[360px] md:min-h-[420px]">
                                <div className={`w-full h-full ${theme.bg} flex flex-col justify-center relative overflow-hidden pb-16 md:pb-0 transition-colors duration-500`}>
                                    
                                    {/* React Bits Inspired Effect */}
                                    <div className="absolute inset-0 z-0">
                                        <BackgroundEffect />
                                    </div>

                                    <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row justify-between items-center h-full max-w-7xl pb-8 pt-12 md:pt-0 gap-8">
                                        
                                        {/* Left Text Content */}
                                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                                            {slide.icon}
                                            <div className={`font-semibold mb-3 text-xs md:text-sm px-4 py-1.5 rounded-full tracking-wider uppercase ${slide.theme === 'brand-light' ? 'bg-black text-white' : 'bg-black/20 text-white'}`}>
                                                {slide.subtitle}
                                            </div>
                                            <h2 className={`${theme.text} text-4xl md:text-6xl font-semibold mb-4 leading-tight max-w-2xl uppercase tracking-tight`}>
                                                {slide.title}
                                            </h2>
                                            <p className={`${theme.text} opacity-90 text-sm md:text-base max-w-lg mb-8 font-medium`}>
                                                {slide.description}
                                            </p>
                                        </div>

                                        {/* Right Coupons Grid */}
                                        {slide.coupons && (
                                            <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-3 w-full">
                                                {slide.coupons.map((coupon, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className={`${theme.couponBg} ${theme.couponText} p-4 rounded-xl shadow-lg text-center min-w-[140px] md:min-w-[160px] transform hover:-translate-y-2 transition-all cursor-pointer border border-dashed ${theme.couponBorder} flex flex-col justify-center`}
                                                    >
                                                        <div className="text-2xl md:text-3xl font-semibold tracking-tighter">{coupon.val}</div>
                                                        <div className="text-xs md:text-sm font-medium opacity-80 mt-1">{coupon.min}</div>
                                                        <div className={`text-[10px] md:text-xs mt-3 py-1.5 px-3 rounded font-mono font-semibold tracking-widest uppercase ${slide.theme === 'brand-light' ? 'bg-gray-100 text-gray-500' : 'bg-black/10'}`}>
                                                            Use: {coupon.code}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom Benefits Bar (Persistent across slides) */}
                                    <div className={`absolute bottom-0 left-0 w-full py-3 px-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs font-semibold shadow-inner z-20 ${slide.theme === 'brand-light' ? 'bg-white text-gray-700 border-t border-gray-100' : 'bg-black/20 text-white backdrop-blur-sm'}`}>
                                        <div className="flex items-center gap-2"><Truck size={15} /> Frete grátis acima de R$99</div>
                                        <div className="hidden md:block opacity-30">|</div>
                                        <div className="flex items-center gap-2"><Clock size={15} /> Entrega rápida</div>
                                        <div className="hidden md:block opacity-30">|</div>
                                        <div className="flex items-center gap-2"><RotateCcw size={15} /> Devoluções grátis</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Arrows */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 z-20 hidden md:flex items-center justify-center"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all opacity-0 group-hover:opacity-100 z-20 hidden md:flex items-center justify-center"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-between items-center relative z-10 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                    {activeSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${current === index ? 'w-8 bg-[#ff6b00]' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
