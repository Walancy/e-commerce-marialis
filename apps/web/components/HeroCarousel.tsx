"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Truck, Clock, RotateCcw, Heart, Sparkles, Zap, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';

const getIconByName = (name?: string) => {
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

// Free-form element/config types mirror sell-control/lib/types/bannerEditor.ts (BannerElement/BannerConfig).
// The two repos don't share a package, so keep this shape in sync manually.
type HeroElementType = 'button' | 'hotspot' | 'text' | 'coupon' | 'image';

interface HeroBannerElement {
    id: string;
    type: HeroElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    label?: string;
    url?: string;
    bgColor?: string;
    textColor?: string;
    fontSize?: number;
    rotation?: number;
    code?: string;
    val?: string;
    min?: string;
    text?: string;
    fontFamily?: string;
    fontWeight?: number;
    textAlign?: 'left' | 'center' | 'right';
    src?: string;
    zIndex?: number;
    opacity?: number;
    borderRadius?: number;
    borderColor?: string;
    borderOpacity?: number;
    borderWidth?: number;
    borderStyle?: 'dashed' | 'solid' | 'none';
    bgOpacity?: number;
    shadowEnabled?: boolean;
    couponValSize?: number;
    couponMinSize?: number;
    couponCodeSize?: number;
}

interface HeroBannerConfig {
    imagePositionX?: number;
    imagePositionY?: number;
    imageScale?: number;
    imageRotation?: number;
    overlayOpacity?: number;
    bgColor?: string;
    imageFit?: 'cover' | 'contain' | 'fill';
    imageBrightness?: number;
    imageContrast?: number;
    imageSaturation?: number;
    imageGrayscale?: number;
    overlayColor?: string;
    showBenefitsBar?: boolean;
    benefit1?: string;
    benefit2?: string;
    benefit3?: string;
}

function hexToRgba(hex: string, opacityPercent: number): string {
    let clean = (hex || '').replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    if (clean.length !== 6 || isNaN(num)) return `rgba(0, 0, 0, ${opacityPercent / 100})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
}

interface Slide {
    id: number;
    theme: 'mothers-day' | 'brand-dark' | 'brand-orange' | 'brand-light';
    icon_name?: string;
    title: string;
    subtitle: string;
    description: string;
    coupons?: { val: string; min: string; code: string; }[];
    cta?: string;
    image_url?: string;
    config?: HeroBannerConfig;
    elements?: HeroBannerElement[];
}

const slides: Slide[] = [
    {
        id: 0,
        theme: 'mothers-day',
        icon_name: 'Heart',
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
        icon_name: 'Sparkles',
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
        icon_name: 'Zap',
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
        icon_name: 'ShoppingBag',
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
        icon_name: 'Sparkles',
        title: 'FESTIVAL DO CABELO',
        subtitle: 'Cronograma Capilar Completo',
        description: 'Shampoos, máscaras e finalizadores de uso profissional. Trate os fios das suas clientes com qualidade premium.',
        coupons: [
            { val: 'Compre 2', min: 'Leve 3', code: 'CABELO3' },
            { val: '30% OFF', min: 'Em Máscaras', code: 'MASCARA30' },
        ]
    }
];

// Renders free-form elements (button/hotspot/text/image/coupon) placed by % position,
// the same coordinate system used by the sell-control banner editor's canvas.
const HeroFreeElements = ({ theme, elements }: { theme: Slide['theme']; elements?: HeroBannerElement[] }) => {
    if (!elements || elements.length === 0) return null;
    const sorted = [...elements].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    return (
        <>
            {sorted.map((el) => {
                const zIndex = 10 + (el.zIndex ?? 0);
                const opacity = (el.opacity ?? 100) / 100;
                const positionStyle: React.CSSProperties = {
                    position: 'absolute',
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    width: `${el.width}%`,
                    height: `${el.height}%`,
                    zIndex
                };

                if (el.type === 'button') {
                    return (
                        <Link
                            key={el.id}
                            href={el.url || '#'}
                            style={{
                                ...positionStyle,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                backgroundColor: el.bgColor || '#ff6b00',
                                color: el.textColor || '#ffffff',
                                fontWeight: 700,
                                fontSize: el.fontSize ? `${el.fontSize}px` : '12px',
                                opacity,
                                pointerEvents: 'auto',
                                textAlign: 'center'
                            }}
                            className="hover:brightness-110 transition-all"
                        >
                            {el.label || 'Botão'}
                        </Link>
                    );
                }

                if (el.type === 'hotspot') {
                    return (
                        <Link
                            key={el.id}
                            href={el.url || '#'}
                            aria-label={el.label || 'Oferta especial'}
                            style={{ ...positionStyle, pointerEvents: 'auto' }}
                        />
                    );
                }

                if (el.type === 'text') {
                    return (
                        <div
                            key={el.id}
                            style={{
                                ...positionStyle,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: el.textAlign === 'center' ? 'center' : el.textAlign === 'right' ? 'flex-end' : 'flex-start',
                                opacity,
                                pointerEvents: 'none'
                            }}
                        >
                            <span style={{
                                width: '100%',
                                textAlign: el.textAlign || 'left',
                                fontFamily: el.fontFamily || 'inherit',
                                fontWeight: el.fontWeight || 700,
                                fontSize: el.fontSize ? `${el.fontSize}px` : '20px',
                                color: el.textColor || '#ffffff',
                                lineHeight: 1.2,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                {el.text}
                            </span>
                        </div>
                    );
                }

                if (el.type === 'image') {
                    if (!el.src) return null;
                    return (
                        <div
                            key={el.id}
                            style={{
                                ...positionStyle,
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transform: `rotate(${el.rotation ?? 0}deg)`,
                                pointerEvents: 'none'
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={el.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity }} />
                        </div>
                    );
                }

                // coupon
                const borderStyle = el.borderStyle ?? 'dashed';
                const cardBorder = borderStyle === 'none'
                    ? 'none'
                    : `${el.borderWidth ?? 1.5}px ${borderStyle} ${hexToRgba(el.borderColor || '#000000', el.borderOpacity ?? 18)}`;
                const cardShadow = (el.shadowEnabled ?? true) ? '0 8px 24px rgba(0, 0, 0, 0.2)' : 'none';

                return (
                    <div
                        key={el.id}
                        style={{
                            position: 'absolute',
                            left: `${el.x}%`,
                            top: `${el.y}%`,
                            zIndex,
                            transform: `rotate(${el.rotation ?? 0}deg)`,
                            opacity,
                            pointerEvents: 'auto'
                        }}
                    >
                        <div style={{
                            backgroundColor: hexToRgba(el.bgColor || '#ffffff', el.bgOpacity ?? 100),
                            color: el.textColor || (theme === 'mothers-day' ? '#be185d' : '#111827'),
                            padding: '14px 18px',
                            borderRadius: `${el.borderRadius ?? 16}px`,
                            border: cardBorder,
                            boxShadow: cardShadow,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            minWidth: '135px'
                        }}>
                            <div style={{ fontSize: `${el.couponValSize ?? 24}px`, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
                                {el.val || '20% OFF'}
                            </div>
                            <div style={{ fontSize: `${el.couponMinSize ?? 11}px`, fontWeight: 600, opacity: 0.8, marginTop: '4px', color: '#475569' }}>
                                {el.min || ''}
                            </div>
                            <div style={{
                                fontSize: `${el.couponCodeSize ?? 10}px`,
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                padding: '4px 10px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '4px',
                                marginTop: '10px',
                                letterSpacing: '0.08em',
                                color: '#0f172a',
                                border: '1px solid rgba(0,0,0,0.08)'
                            }}>
                                USE: {el.code || 'CUPOM'}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

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
                            id: item.id ?? idx,
                            theme: item.theme || 'brand-dark',
                            icon_name: item.icon_name,
                            title: item.title,
                            subtitle: item.subtitle || '',
                            description: item.description || '',
                            coupons: item.coupons || [],
                            cta: item.cta,
                            image_url: item.image_url || undefined,
                            config: item.config || undefined,
                            elements: item.elements || undefined
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
            {/* Fixed aspect ratio (mobile 4:5, desktop 16:5) — keep in sync with
                sell-control/lib/types/bannerEditor.ts BANNER_ASPECT_RATIO so the
                admin editor's preview matches this 1:1 at both breakpoints. */}
            <div className="relative w-full h-auto aspect-[4/5] md:aspect-[16/5] overflow-hidden group">
                <div
                    className="flex transition-transform duration-700 ease-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {activeSlides.map((slide) => {
                        const theme = getThemeClasses(slide.theme);
                        const BackgroundEffect = theme.Effect;
                        const config = slide.config || {};
                        const hasImage = Boolean(slide.image_url);

                        return (
                            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                                <div
                                    className={`w-full h-full ${theme.bg} flex flex-col justify-center relative overflow-hidden pb-16 md:pb-0 transition-colors duration-500`}
                                    style={config.bgColor ? { backgroundColor: config.bgColor } : undefined}
                                >
                                    {/* Real background image (positioned/scaled/rotated per config) */}
                                    {hasImage && (
                                        <div className="absolute inset-0 overflow-hidden z-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={slide.image_url}
                                                alt={slide.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: config.imageFit || 'cover',
                                                    objectPosition: `${config.imagePositionX ?? 50}% ${config.imagePositionY ?? 50}%`,
                                                    transform: `scale(${(config.imageScale ?? 100) / 100}) rotate(${config.imageRotation ?? 0}deg)`,
                                                    transformOrigin: `${config.imagePositionX ?? 50}% ${config.imagePositionY ?? 50}%`,
                                                    filter: `brightness(${(config.imageBrightness ?? 100) / 100}) contrast(${(config.imageContrast ?? 100) / 100}) saturate(${(config.imageSaturation ?? 100) / 100}) grayscale(${(config.imageGrayscale ?? 0) / 100})`
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0"
                                                style={{ backgroundColor: hexToRgba(config.overlayColor || '#000000', config.overlayOpacity ?? 40) }}
                                            />
                                        </div>
                                    )}

                                    {/* Decorative animated background — only when there's no real photo */}
                                    {!hasImage && (
                                        <div className="absolute inset-0 z-0">
                                            <BackgroundEffect />
                                        </div>
                                    )}

                                    <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row justify-between items-center h-full max-w-7xl pb-8 pt-12 md:pt-0 gap-8">

                                        {/* Left Text Content */}
                                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                                            {getIconByName(slide.icon_name)}
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
                                        {slide.coupons && slide.coupons.length > 0 && (
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

                                    {/* Free-form elements: buttons, hotspots, floating text/images, positioned coupons */}
                                    <HeroFreeElements theme={slide.theme} elements={slide.elements} />

                                    {/* Bottom Benefits Bar (Persistent across slides, toggleable per-slide) */}
                                    {config.showBenefitsBar !== false && (
                                        <div className={`absolute bottom-0 left-0 w-full py-3 px-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs font-semibold shadow-inner z-20 ${slide.theme === 'brand-light' ? 'bg-white text-gray-700 border-t border-gray-100' : 'bg-black/20 text-white backdrop-blur-sm'}`}>
                                            <div className="flex items-center gap-2"><Truck size={15} /> {config.benefit1 || 'Frete grátis acima de R$99'}</div>
                                            <div className="hidden md:block opacity-30">|</div>
                                            <div className="flex items-center gap-2"><Clock size={15} /> {config.benefit2 || 'Entrega rápida'}</div>
                                            <div className="hidden md:block opacity-30">|</div>
                                            <div className="flex items-center gap-2"><RotateCcw size={15} /> {config.benefit3 || 'Devoluções grátis'}</div>
                                        </div>
                                    )}
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
