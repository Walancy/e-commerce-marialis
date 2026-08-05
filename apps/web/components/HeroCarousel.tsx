"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    ChevronRight,
    Truck,
    Clock,
    RotateCcw,
    Heart,
    Sparkles,
    Zap,
    ShoppingBag,
    CreditCard,
    ShieldCheck,
    Gift,
    Tag,
    Percent,
    Package,
    Award,
    Star,
    CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Helper for hex -> rgba conversion
function hexToRgba(hex: string, opacityPercent: number): string {
    if (!hex) return `rgba(0, 0, 0, ${opacityPercent / 100})`;
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    if (clean.length !== 6 || isNaN(num)) return `rgba(0, 0, 0, ${opacityPercent / 100})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
const NOISE_SVG_LIGHT = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`;

// Icon Helper Component for Benefits Bar & Main Hero Icons
export const BenefitIcon = ({ name, size = 15, color = 'currentColor', className }: { name?: string; size?: number; color?: string; className?: string }) => {
    switch (name) {
        case 'Truck': return <Truck size={size} color={color} className={className} />;
        case 'CreditCard': return <CreditCard size={size} color={color} className={className} />;
        case 'Zap': return <Zap size={size} color={color} className={className} />;
        case 'ShieldCheck': return <ShieldCheck size={size} color={color} className={className} />;
        case 'Gift': return <Gift size={size} color={color} className={className} />;
        case 'Tag': return <Tag size={size} color={color} className={className} />;
        case 'Percent': return <Percent size={size} color={color} className={className} />;
        case 'Package': return <Package size={size} color={color} className={className} />;
        case 'Award': return <Award size={size} color={color} className={className} />;
        case 'Heart': return <Heart size={size} color={color} className={className} />;
        case 'Star': return <Star size={size} color={color} className={className} />;
        case 'Clock': return <Clock size={size} color={color} className={className} />;
        case 'Sparkles': return <Sparkles size={size} color={color} className={className} />;
        case 'ShoppingBag': return <ShoppingBag size={size} color={color} className={className} />;
        case 'RotateCcw': return <RotateCcw size={size} color={color} className={className} />;
        default: return <Sparkles size={size} color={color} className={className} />;
    }
};

// --- React Bits Inspired Animated Backgrounds --- //
const AuroraBackground = ({ color1, color2 }: { color1: string; color2: string }) => (
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

const SquaresBackground = ({ stroke, opacity, direction }: { stroke: string; opacity: number; direction: 'up' | 'diagonal' }) => (
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
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
);

export type HeroElementType = 'button' | 'hotspot' | 'text' | 'coupon' | 'image' | 'rectangle' | 'ellipse' | 'line' | 'arrow' | 'polygon' | 'star' | 'pen';

export interface HeroBannerElement {
    id: string;
    type: HeroElementType;
    x: number;
    y: number;
    width?: number;
    height?: number;
    label?: string;
    url?: string;
    bgColor?: string;
    textColor?: string;
    fontSize?: number;
    rotation?: number;
    flipH?: boolean;
    flipV?: boolean;
    code?: string;
    val?: string;
    min?: string;
    text?: string;
    fontFamily?: string;
    fontWeight?: number;
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    letterSpacing?: number;
    lineHeight?: number;
    textBgColor?: string;
    textBgPadding?: number;
    textStrokeColor?: string;
    textStrokeWidth?: number;
    src?: string;
    zIndex?: number;
    opacity?: number;
    borderRadius?: number;
    borderColor?: string;
    borderOpacity?: number;
    borderWidth?: number;
    borderStyle?: 'dashed' | 'solid' | 'none' | 'glow' | 'gradient';
    bgOpacity?: number;
    backdropBlur?: number;
    grainIntensity?: number;
    padding?: number;
    shadowEnabled?: boolean;
    couponValSize?: number;
    couponMinSize?: number;
    couponCodeSize?: number;
}

export interface BenefitItem {
    id: string;
    text: string;
    icon: string;
    enabled: boolean;
}

export interface BenefitsBarConfig {
    enabled: boolean;
    bgColor?: string;
    bgOpacity?: number;
    fontFamily?: string;
    textColor?: string;
    iconColor?: string;
    fontSize?: number;
    fontWeight?: number;
    textTransform?: 'none' | 'uppercase';
    items?: BenefitItem[];
}

export interface HeroBannerConfig {
    type?: 'color' | 'solid' | 'gradient' | 'image' | 'pattern' | 'video';
    solidColor?: string;
    solidOpacity?: number;
    bgColor?: string;
    gradientType?: 'linear' | 'radial' | 'conic';
    gradientAngle?: number;
    gradientStops?: { color: string; position: number }[];
    patternType?: 'dots' | 'lines' | 'checker' | 'geometric' | 'waves' | 'hexagon' | 'noise' | 'grid';
    patternColor?: string;
    patternSize?: number;
    patternOpacity?: number;
    imageUrl?: string;
    imageFit?: 'cover' | 'contain' | 'fill' | 'repeat';
    imagePositionX?: number;
    imagePositionY?: number;
    imageScale?: number;
    imageRotation?: number;
    imageBlur?: number;
    imageOverlay?: number;
    imageBrightness?: number;
    imageContrast?: number;
    imageSaturation?: number;
    imageGrayscale?: number;
    overlayColor?: string;
    overlayOpacity?: number;
    videoUrl?: string;
    videoAutoplay?: boolean;
    videoLoop?: boolean;
    videoOverlay?: number;
    effects?: {
        vignette?: number;
        grain?: number;
        brightness?: number;
        contrast?: number;
        saturation?: number;
        blur?: number;
    };
    showBenefitsBar?: boolean;
    benefit1?: string;
    benefit2?: string;
    benefit3?: string;
    benefitsBar?: BenefitsBarConfig;
}

export interface Slide {
    id: number;
    theme: 'mothers-day' | 'brand-dark' | 'brand-orange' | 'brand-light' | string;
    icon_name?: string;
    title: string;
    subtitle?: string;
    description?: string;
    coupons?: { val: string; min: string; code: string }[];
    cta?: string;
    image_url?: string;
    config?: HeroBannerConfig;
    elements?: HeroBannerElement[];
}

const defaultSlides: Slide[] = [
    {
        id: 0,
        theme: 'mothers-day',
        icon_name: 'Heart',
        title: 'ESPECIAL DIA DAS MÃES',
        subtitle: 'Amor que renova e transforma',
        description: 'Presenteie com os melhores produtos de beleza. Kits exclusivos com descontos imperdíveis para ela.',
        coupons: [
            { val: '20% OFF', min: 'Kits Presente', code: 'MAE20' },
            { val: 'R$50 off', min: 'em R$250+', code: 'AMOR50' }
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
            { val: 'R$500 off', min: 'em R$2500+', code: 'PRO500' }
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
            { val: '25% OFF', min: 'em 5+ itens', code: 'AUTO' }
        ]
    }
];

const getThemeClasses = (theme: string) => {
    switch (theme) {
        case 'mothers-day':
            return {
                bg: 'bg-gradient-to-br from-pink-500 via-rose-400 to-pink-300',
                text: 'text-white',
                couponBg: 'bg-white',
                couponText: 'text-pink-600',
                couponBorder: 'border-pink-300',
                Effect: () => <AuroraBackground color1="rgba(255,182,193,0.8)" color2="rgba(255,105,180,0.6)" />
            };
        case 'brand-orange':
            return {
                bg: 'bg-[#ff6b00]',
                text: 'text-white',
                couponBg: 'bg-white/10 backdrop-blur-md',
                couponText: 'text-white',
                couponBorder: 'border-white/30',
                Effect: () => <FuzzyOverlay opacity={0.4} />
            };
        case 'brand-light':
            return {
                bg: 'bg-gray-50',
                text: 'text-gray-900',
                couponBg: 'bg-white',
                couponText: 'text-gray-900',
                couponBorder: 'border-gray-300',
                Effect: () => <SquaresBackground stroke="#000000" opacity={0.05} direction="up" />
            };
        case 'brand-dark':
        default:
            return {
                bg: 'bg-gray-900',
                text: 'text-white',
                couponBg: 'bg-[#1a1a1a]',
                couponText: 'text-[#ff6b00]',
                couponBorder: 'border-gray-700',
                Effect: () => <SquaresBackground stroke="#ff6b00" opacity={0.15} direction="diagonal" />
            };
    }
};

// Renders full background layer based on Slide Config (solid, gradient, pattern, image, video, effects)
const HeroBackground = ({ slide }: { slide: Slide }) => {
    const config = slide.config || {};
    const theme = getThemeClasses(slide.theme);
    const ThemeEffect = theme.Effect;

    const bgType = config.type || (slide.image_url ? 'image' : 'theme');
    const imageUrl = config.imageUrl || slide.image_url;

    // Pattern background calculator
    const getPatternStyle = (): React.CSSProperties => {
        const sz = config.patternSize || 24;
        const op = (config.patternOpacity ?? 30) / 100;
        const hex = config.patternColor || '#ffffff';
        let patternImg = '';

        if (config.patternType === 'dots') {
            patternImg = `radial-gradient(${hex} 1.5px, transparent 1.5px)`;
        } else if (config.patternType === 'lines') {
            patternImg = `repeating-linear-gradient(45deg, ${hex}, ${hex} 2px, transparent 2px, transparent ${Math.max(6, sz / 2)}px)`;
        } else if (config.patternType === 'checker') {
            patternImg = `repeating-conic-gradient(${hex} 0% 25%, transparent 0% 50%)`;
        } else if (config.patternType === 'geometric') {
            patternImg = `radial-gradient(${hex} 2px, transparent 2px), linear-gradient(to right, ${hex} 1px, transparent 1px)`;
        } else if (config.patternType === 'waves') {
            patternImg = `repeating-radial-gradient(circle at 0 0, transparent 0, ${hex} 4px, transparent 8px)`;
        } else if (config.patternType === 'hexagon') {
            patternImg = `radial-gradient(circle, ${hex} 25%, transparent 26%), radial-gradient(circle, ${hex} 25%, transparent 26%)`;
        } else if (config.patternType === 'noise') {
            patternImg = NOISE_SVG;
        } else {
            patternImg = `linear-gradient(to right, ${hex} 1px, transparent 1px), linear-gradient(to bottom, ${hex} 1px, transparent 1px)`;
        }

        return { backgroundColor: config.bgColor || '#151515', backgroundImage: patternImg, backgroundSize: `${sz}px ${sz}px`, opacity: op };
    };

    // Gradient background calculator
    const getGradientStyle = (): React.CSSProperties => {
        if (!config.gradientStops || config.gradientStops.length === 0) {
            return { background: 'linear-gradient(135deg, #111827 0%, #ff6b00 100%)' };
        }
        const stopsStr = config.gradientStops.map(s => `${s.color} ${s.position}%`).join(', ');
        const gType = config.gradientType || 'linear';
        const angle = config.gradientAngle ?? 135;
        if (gType === 'radial') return { background: `radial-gradient(circle at center, ${stopsStr})` };
        if (gType === 'conic') return { background: `conic-gradient(from ${angle}deg at 50% 50%, ${stopsStr})` };
        return { background: `linear-gradient(${angle}deg, ${stopsStr})` };
    };

    const effects = config.effects;
    const filterStr = effects
        ? `brightness(${effects.brightness ?? 100}%) contrast(${effects.contrast ?? 100}%) saturate(${effects.saturation ?? 100}%) blur(${effects.blur ?? 0}px)`
        : undefined;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ filter: filterStr }}>
            {/* Solid Color */}
            {(bgType === 'solid' || bgType === 'color') && (
                <div className="absolute inset-0" style={{ backgroundColor: config.solidColor || config.bgColor || '#111827', opacity: (config.solidOpacity ?? 100) / 100 }} />
            )}

            {/* Gradient */}
            {bgType === 'gradient' && (
                <div className="absolute inset-0" style={getGradientStyle()} />
            )}

            {/* Pattern */}
            {bgType === 'pattern' && (
                <div className="absolute inset-0" style={getPatternStyle()} />
            )}

            {/* Image */}
            {(bgType === 'image' || (bgType === 'theme' && imageUrl)) && imageUrl && (
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={slide.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: (config.imageFit === 'repeat' ? 'fill' : (config.imageFit || 'cover')) as React.CSSProperties['objectFit'],
                            objectPosition: `${config.imagePositionX ?? 50}% ${config.imagePositionY ?? 50}%`,
                            transform: `scale(${(config.imageScale ?? 100) / 100}) rotate(${config.imageRotation ?? 0}deg)`,
                            filter: `brightness(${(config.imageBrightness ?? 100) / 100}) contrast(${(config.imageContrast ?? 100) / 100}) saturate(${(config.imageSaturation ?? 100) / 100}) grayscale(${(config.imageGrayscale ?? 0) / 100}) blur(${config.imageBlur ?? 0}px)`
                        }}
                    />
                    {((config.imageOverlay ?? config.overlayOpacity ?? 0) > 0) && (
                        <div
                            className="absolute inset-0"
                            style={{ backgroundColor: config.overlayColor || '#000000', opacity: ((config.imageOverlay ?? config.overlayOpacity ?? 40) / 100) }}
                        />
                    )}
                </div>
            )}

            {/* Video */}
            {bgType === 'video' && config.videoUrl && (
                <div className="absolute inset-0 overflow-hidden">
                    <video
                        src={config.videoUrl}
                        autoPlay={config.videoAutoplay ?? true}
                        loop={config.videoLoop ?? true}
                        muted
                        className="w-full h-full object-cover"
                    />
                    {(config.videoOverlay ?? 0) > 0 && (
                        <div className="absolute inset-0" style={{ backgroundColor: '#000000', opacity: (config.videoOverlay ?? 0) / 100 }} />
                    )}
                </div>
            )}

            {/* Fallback Theme Animation if no photo/custom config */}
            {bgType === 'theme' && !imageUrl && (
                <div className="absolute inset-0">
                    <ThemeEffect />
                </div>
            )}

            {/* Vignette Overlay */}
            {(effects?.vignette ?? 0) > 0 && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, ${((effects?.vignette ?? 0) / 100) * 0.95}) 100%)` }}
                />
            )}

            {/* Grain Overlay */}
            {(effects?.grain ?? 0) > 0 && (
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{ opacity: ((effects?.grain ?? 0) / 100) * 0.75, backgroundImage: NOISE_SVG, backgroundRepeat: 'repeat' }}
                />
            )}
        </div>
    );
};

// Renders free-form canvas elements with proportional scaling relative to 900px canvas reference width
const HeroFreeElements = ({ theme, elements, scaleFactor = 1 }: { theme: string; elements?: HeroBannerElement[]; scaleFactor?: number }) => {
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
                    width: `${el.width || (el.type === 'coupon' ? 26 : 15)}%`,
                    height: `${el.height || (el.type === 'coupon' ? 54 : 15)}%`,
                    transform: `rotate(${el.rotation || 0}deg) scaleX(${el.flipH ? -1 : 1}) scaleY(${el.flipV ? -1 : 1})`,
                    opacity,
                    zIndex,
                    boxSizing: 'border-box'
                };

                if (el.type === 'button') {
                    const scaledFontSize = Math.max(7, Math.round((el.fontSize || 12) * scaleFactor));
                    const scaledBorderRadius = Math.max(0, Math.round((el.borderRadius ?? 8) * scaleFactor));

                    return (
                        <Link
                            key={el.id}
                            href={el.url || '#'}
                            style={{
                                ...positionStyle,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: `${scaledBorderRadius}px`,
                                backgroundColor: el.bgColor || '#ff6b00',
                                color: el.textColor || '#ffffff',
                                fontWeight: 700,
                                fontSize: `${scaledFontSize}px`,
                                pointerEvents: 'auto',
                                textAlign: 'center'
                            }}
                            className="hover:brightness-110 transition-all shadow-md"
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
                    const scaledFontSize = Math.max(8, Math.round((el.fontSize || 20) * scaleFactor));
                    const scaledPadding = el.textBgPadding ? Math.round(el.textBgPadding * scaleFactor) : 0;
                    const scaledBorderRadius = Math.max(0, Math.round((el.borderRadius ?? 0) * scaleFactor));
                    const scaledStrokeWidth = el.textStrokeWidth ? Math.max(1, Math.round(el.textStrokeWidth * scaleFactor)) : 0;

                    return (
                        <div
                            key={el.id}
                            style={{
                                ...positionStyle,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: el.textAlign === 'center' ? 'center' : el.textAlign === 'right' ? 'flex-end' : 'flex-start',
                                pointerEvents: 'none'
                            }}
                        >
                            <span style={{
                                width: '100%',
                                textAlign: el.textAlign || 'left',
                                fontFamily: el.fontFamily ? `${el.fontFamily}, sans-serif` : 'inherit',
                                fontWeight: el.fontWeight || 600,
                                fontStyle: el.fontStyle || 'normal',
                                textDecoration: el.textDecoration || 'none',
                                textTransform: el.textTransform || 'none',
                                fontSize: `${scaledFontSize}px`,
                                color: el.textColor || '#ffffff',
                                letterSpacing: el.letterSpacing ? `${el.letterSpacing * scaleFactor}px` : 'normal',
                                lineHeight: el.lineHeight || 1.2,
                                backgroundColor: el.textBgColor || 'transparent',
                                padding: `${scaledPadding}px`,
                                borderRadius: `${scaledBorderRadius}px`,
                                WebkitTextStroke: scaledStrokeWidth > 0 ? `${scaledStrokeWidth}px ${el.textStrokeColor || '#000000'}` : 'none',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                {el.text || 'Novo Texto'}
                            </span>
                        </div>
                    );
                }

                if (el.type === 'image') {
                    if (!el.src) return null;
                    const scaledBorderRadius = Math.max(0, Math.round((el.borderRadius ?? 0) * scaleFactor));
                    return (
                        <div
                            key={el.id}
                            style={{
                                ...positionStyle,
                                borderRadius: `${scaledBorderRadius}px`,
                                overflow: 'hidden',
                                pointerEvents: 'none'
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={el.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    );
                }

                if (el.type === 'rectangle') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 2) * scaleFactor));
                    const scaledBorderRadius = Math.max(0, Math.round((el.borderRadius ?? 0) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <div style={{ width: '100%', height: '100%', backgroundColor: el.bgColor || '#ff6b00', border: `${scaledBorderWidth}px solid ${el.borderColor || '#ffffff'}`, borderRadius: `${scaledBorderRadius}px` }} />
                        </div>
                    );
                }

                if (el.type === 'ellipse') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 2) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <div style={{ width: '100%', height: '100%', backgroundColor: el.bgColor || '#007af5', border: `${scaledBorderWidth}px solid ${el.borderColor || '#ffffff'}`, borderRadius: '50%' }} />
                        </div>
                    );
                }

                if (el.type === 'line') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 3) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                                <line x1="0" y1="50%" x2="100%" y2="50%" stroke={el.borderColor || '#ffffff'} strokeWidth={scaledBorderWidth} />
                            </svg>
                        </div>
                    );
                }

                if (el.type === 'arrow') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 3) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                                <defs>
                                    <marker id={`arr_${el.id}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill={el.borderColor || '#ffffff'} />
                                    </marker>
                                </defs>
                                <line x1="0" y1="50%" x2="90%" y2="50%" stroke={el.borderColor || '#ffffff'} strokeWidth={scaledBorderWidth} markerEnd={`url(#arr_${el.id})`} />
                            </svg>
                        </div>
                    );
                }

                if (el.type === 'polygon') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 2) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <svg viewBox="0 0 100 100" width="100%" height="100%">
                                <polygon points="50,5 95,95 5,95" fill={el.bgColor || '#10b981'} stroke={el.borderColor || '#ffffff'} strokeWidth={scaledBorderWidth} />
                            </svg>
                        </div>
                    );
                }

                if (el.type === 'star') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 1) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <svg viewBox="0 0 24 24" width="100%" height="100%">
                                <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill={el.bgColor || '#eab308'} stroke={el.borderColor || '#ffffff'} strokeWidth={scaledBorderWidth} />
                            </svg>
                        </div>
                    );
                }

                if (el.type === 'pen') {
                    const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 3) * scaleFactor));
                    return (
                        <div key={el.id} style={{ ...positionStyle, pointerEvents: 'none' }}>
                            <svg viewBox="0 0 100 100" width="100%" height="100%">
                                <path d={el.text || 'M 10 80 Q 50 10 90 80'} fill="none" stroke={el.textColor || '#3b82f6'} strokeWidth={scaledBorderWidth} strokeLinecap="round" />
                            </svg>
                        </div>
                    );
                }

                // Coupon element with scaled sizes
                const borderStyle = el.borderStyle ?? 'dashed';
                const scaledBorderWidth = Math.max(1, Math.round((el.borderWidth ?? 1.5) * scaleFactor));
                const scaledBorderRadius = Math.max(4, Math.round((el.borderRadius ?? 16) * scaleFactor));
                const scaledPadding = Math.max(4, Math.round((el.padding ?? 14) * scaleFactor));

                const valSize = Math.max(10, Math.round((el.couponValSize ?? 24) * scaleFactor));
                const minSize = Math.max(8, Math.round((el.couponMinSize ?? 11) * scaleFactor));
                const codeSize = Math.max(7, Math.round((el.couponCodeSize ?? 10) * scaleFactor));

                const cardBorder = borderStyle === 'none'
                    ? 'none'
                    : borderStyle === 'glow'
                        ? `${scaledBorderWidth}px solid ${el.borderColor || '#ff6b00'}`
                        : `${scaledBorderWidth}px ${borderStyle} ${hexToRgba(el.borderColor || '#000000', el.borderOpacity ?? 18)}`;
                const cardShadow = borderStyle === 'glow'
                    ? `0 0 20px ${hexToRgba(el.borderColor || '#ff6b00', 85)}, 0 8px 24px rgba(0, 0, 0, 0.2)`
                    : (el.shadowEnabled ?? true) ? '0 8px 24px rgba(0, 0, 0, 0.15)' : 'none';

                return (
                    <div
                        key={el.id}
                        style={{
                            ...positionStyle,
                            pointerEvents: 'auto'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: hexToRgba(el.bgColor || '#ffffff', el.bgOpacity ?? 100),
                            backdropFilter: (el.backdropBlur ?? 0) > 0 ? `blur(${el.backdropBlur}px)` : 'none',
                            color: el.textColor || (theme === 'mothers-day' ? '#be185d' : '#111827'),
                            padding: `${scaledPadding}px`,
                            borderRadius: `${scaledBorderRadius}px`,
                            border: cardBorder,
                            boxShadow: cardShadow,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            fontFamily: el.fontFamily ? `${el.fontFamily}, sans-serif` : 'inherit',
                            textTransform: el.textTransform || 'none',
                            position: 'relative'
                        }}>
                            {(el.grainIntensity ?? 0) > 0 && (
                                <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', opacity: (el.grainIntensity ?? 0) / 100, pointerEvents: 'none', backgroundImage: NOISE_SVG_LIGHT }} />
                            )}
                            <div style={{ fontSize: `${valSize}px`, fontWeight: el.fontWeight ?? 900, letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap' }}>
                                {el.val || '20% OFF'}
                            </div>
                            <div style={{ fontSize: `${minSize}px`, fontWeight: 500, opacity: 0.8, marginTop: '4px', whiteSpace: 'nowrap' }}>
                                {el.min || ''}
                            </div>
                            <div style={{
                                fontSize: `${codeSize}px`,
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                padding: `${Math.max(2, Math.round(4 * scaleFactor))}px ${Math.max(4, Math.round(10 * scaleFactor))}px`,
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                borderRadius: `${Math.max(2, Math.round(4 * scaleFactor))}px`,
                                marginTop: `${Math.max(4, Math.round(8 * scaleFactor))}px`,
                                letterSpacing: '0.08em',
                                whiteSpace: 'nowrap',
                                border: '1px solid rgba(0, 0, 0, 0.1)'
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
    const [activeSlides, setActiveSlides] = useState<Slide[]>(defaultSlides);
    const [current, setCurrent] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry && entry.contentRect.width > 0) {
                // 900px is the reference width of the admin canvas editor
                setScaleFactor(entry.contentRect.width / 900);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

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
                            title: item.title || '',
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

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    return (
        <div className="w-full flex flex-col mb-8 relative overflow-hidden">
            {/* Fixed aspect ratio (mobile 4:5, desktop 16:5) matching sell-control BANNER_ASPECT_RATIO */}
            <div ref={containerRef} className="relative w-full h-auto aspect-[4/5] md:aspect-[16/5] overflow-hidden group">
                <div
                    className="flex transition-transform duration-700 ease-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {activeSlides.map((slide) => {
                        const theme = getThemeClasses(slide.theme);
                        const config = slide.config || {};
                        const benefitsBar = config.benefitsBar;
                        const showBenefits = benefitsBar?.enabled ?? (config.showBenefitsBar !== false);

                        return (
                            <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                                <div className={`w-full h-full ${theme.bg} flex flex-col justify-center relative overflow-hidden pb-16 md:pb-0 transition-colors duration-500`}>
                                    {/* Full Rich Background (Solid, Gradient, Pattern, Image, Video, Effects) */}
                                    <HeroBackground slide={slide} />

                                    {/* Slide Content: Left Text & Right Coupons (if present) */}
                                    {(slide.title || slide.subtitle || (slide.coupons && slide.coupons.length > 0)) && (
                                        <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row justify-between items-center h-full max-w-7xl pb-8 pt-12 md:pt-0 gap-8 pointer-events-none">
                                            {/* Text Block */}
                                            {(slide.title || slide.subtitle) && (
                                                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto">
                                                    {slide.icon_name && (
                                                        <div className="mb-4">
                                                            <BenefitIcon name={slide.icon_name} size={Math.max(24, Math.round(48 * scaleFactor))} color={slide.theme === 'brand-orange' ? '#ffffff' : '#ff6b00'} />
                                                        </div>
                                                    )}
                                                    {slide.subtitle && (
                                                        <div className={`font-semibold mb-3 text-xs md:text-sm px-4 py-1.5 rounded-full tracking-wider uppercase ${slide.theme === 'brand-light' ? 'bg-black text-white' : 'bg-black/20 text-white'}`}>
                                                            {slide.subtitle}
                                                        </div>
                                                    )}
                                                    {slide.title && (
                                                        <h2 className={`${theme.text} text-4xl md:text-6xl font-semibold mb-4 leading-tight max-w-2xl uppercase tracking-tight`}>
                                                            {slide.title}
                                                        </h2>
                                                    )}
                                                    {slide.description && (
                                                        <p className={`${theme.text} opacity-90 text-sm md:text-base max-w-lg mb-8 font-medium`}>
                                                            {slide.description}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Right Coupons Grid */}
                                            {slide.coupons && slide.coupons.length > 0 && (
                                                <div className="flex-1 flex flex-wrap justify-center md:justify-end gap-3 w-full pointer-events-auto">
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
                                    )}

                                    {/* Free-form Canvas Elements (Buttons, Hotspots, Text, Images, Shapes, Coupons) scaled by scaleFactor */}
                                    <HeroFreeElements theme={slide.theme} elements={slide.elements} scaleFactor={scaleFactor} />

                                    {/* Bottom Benefits Bar (Persistent across slides, configured via DB benefitsBar) */}
                                    {showBenefits && (
                                        <div
                                            className={`absolute bottom-0 left-0 w-full py-3 px-6 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs font-semibold shadow-inner z-20 ${slide.theme === 'brand-light' ? 'bg-white text-gray-700 border-t border-gray-100' : 'bg-black/20 text-white backdrop-blur-sm'}`}
                                            style={benefitsBar ? {
                                                backgroundColor: hexToRgba(benefitsBar.bgColor || '#111114', benefitsBar.bgOpacity ?? 90),
                                                color: benefitsBar.textColor || '#ffffff',
                                                fontSize: benefitsBar.fontSize ? `${Math.max(9, Math.round(benefitsBar.fontSize * scaleFactor))}px` : undefined
                                            } : undefined}
                                        >
                                            {benefitsBar && benefitsBar.items && benefitsBar.items.length > 0 ? (
                                                benefitsBar.items.filter(i => i.enabled).map((item, idx) => (
                                                    <React.Fragment key={item.id}>
                                                        {idx > 0 && <div className="hidden md:block opacity-30">|</div>}
                                                        <div className="flex items-center gap-2">
                                                            <BenefitIcon name={item.icon} size={Math.max(11, Math.round(15 * scaleFactor))} color={benefitsBar.iconColor || '#ff6b00'} />
                                                            <span>{item.text}</span>
                                                        </div>
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-2"><Truck size={Math.max(11, Math.round(15 * scaleFactor))} /> {config.benefit1 || 'Frete grátis acima de R$99'}</div>
                                                    <div className="hidden md:block opacity-30">|</div>
                                                    <div className="flex items-center gap-2"><Clock size={Math.max(11, Math.round(15 * scaleFactor))} /> {config.benefit2 || 'Entrega rápida'}</div>
                                                    <div className="hidden md:block opacity-30">|</div>
                                                    <div className="flex items-center gap-2"><RotateCcw size={Math.max(11, Math.round(15 * scaleFactor))} /> {config.benefit3 || 'Devoluções grátis'}</div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Arrows */}
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

            {/* Progress Dots */}
            <div className="flex justify-center items-center relative z-10 pt-4 border-t border-gray-200 dark:border-white/10">
                <div className="flex gap-2 items-center justify-center">
                    {activeSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'w-8 bg-[#ff6b00]' : 'w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
