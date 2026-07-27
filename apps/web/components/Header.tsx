"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, User, ChevronDown, Check, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { CartDrawer } from './CartDrawer';
import { supabase } from '../lib/supabase';

interface TickerItem {
    id: number;
    text: string;
    bold_text?: string;
    link?: string;
}

const defaultTickerItems: TickerItem[] = [
    { id: 1, text: 'para todo o Brasil', bold_text: 'FRETE GRÁTIS' },
    { id: 2, text: 'CUPOM:', bold_text: 'BEMVINDO10' },
    { id: 3, text: 'no cartão', bold_text: 'ATÉ 12X SEM JUROS' },
    { id: 4, text: 'no PIX', bold_text: '5% OFF' },
    { id: 5, text: 'OFERTAS de', bold_text: 'até 50% OFF' }
];

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const lastScrollY = React.useRef(0);
    const ticking = React.useRef(false);
    const filterBarRef = React.useRef<HTMLDivElement>(null);
    const filterBarShown = React.useRef(true);
    const THRESHOLD = 8;
    const [tickerItems, setTickerItems] = useState<TickerItem[]>(defaultTickerItems);

    useEffect(() => {
        const fetchTicker = async () => {
            try {
                const { data, error } = await supabase
                    .from('header_ticker')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });
                if (!error && data && data.length > 0) {
                    setTickerItems(data);
                }
            } catch (err) {
                console.error("Failed to fetch header ticker:", err);
            }
        };
        fetchTicker();
    }, []);

    const showFilterBar = React.useCallback(() => {
        if (filterBarShown.current) return;
        filterBarShown.current = true;
        const el = filterBarRef.current;
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.pointerEvents = 'auto';
        el.style.maxHeight = '80px';
        el.style.overflow = 'visible';
    }, []);

    const hideFilterBar = React.useCallback(() => {
        if (!filterBarShown.current) return;
        filterBarShown.current = false;
        const el = filterBarRef.current;
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(-6px)';
        el.style.pointerEvents = 'none';
        el.style.maxHeight = '0px';
        el.style.overflow = 'hidden';
    }, []);

    // Apply transition and initial styles once the filter bar mounts
    const setFilterBarRef = React.useCallback((el: HTMLDivElement | null) => {
        (filterBarRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (el) {
            el.style.transition = 'opacity 0.25s ease, transform 0.25s ease, max-height 0.25s ease';
            el.style.overflow = 'visible';
            el.style.maxHeight = '80px';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.pointerEvents = 'auto';
        }
    }, []);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const delta = currentY - lastScrollY.current;
                const atTop = currentY <= 50;

                setIsScrolled(!atTop);

                if (atTop) {
                    showFilterBar();
                } else if (delta < -THRESHOLD) {
                    showFilterBar();
                    lastScrollY.current = currentY;
                } else if (delta > THRESHOLD) {
                    hideFilterBar();
                    lastScrollY.current = currentY;
                }

                ticking.current = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showFilterBar, hideFilterBar]);

    const toggleFilter = (option: string) => {
        if (selectedFilters.includes(option)) {
            setSelectedFilters(selectedFilters.filter(f => f !== option));
        } else {
            setSelectedFilters([...selectedFilters, option]);
        }
    };

    const clearFilters = () => {
        setSelectedFilters([]);
    };

    const pathname = usePathname();
    const isHome = pathname === '/';
    const isShopPage = ['/loja', '/equipamentos', '/ofertas'].includes(pathname);
    const shouldShowFilters = isHome || isShopPage;

    return (
        <div className="w-full font-sans">
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

            {/* Fixed Header Container */}
            <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="bg-white dark:bg-[#1a1a1a]">
                    {/* Brand Ticker - Hides on Scroll */}
                    <div className={`bg-[#f0f0f0] dark:bg-[#2a2a2a] overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
                        <div className="flex whitespace-nowrap animate-ticker py-3">
                            {/* Duplicated list for seamless infinite scroll */}
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center shrink-0 gap-12 mx-6">
                                    {tickerItems.map((item, idx) => (
                                        <React.Fragment key={`${item.id}-${idx}`}>
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                                {item.bold_text && <span className="font-bold text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-1 rounded">{item.bold_text}</span>}
                                                {item.text}
                                            </span>
                                            {idx < tickerItems.length - 1 && <span className="text-gray-300 dark:text-gray-600">•</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <header className="flex items-center justify-between px-4 lg:px-20 py-4 w-full mx-auto relative">
                        <div className="flex items-center gap-4 lg:gap-8">
                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 -ml-2 text-gray-700 dark:text-gray-300"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            {/* Logo */}
                            <a href="/" className="block">
                                <img src="/logo-marialis.svg" alt="Marialis" className="h-8 md:h-10 lg:h-12 w-auto object-contain dark:invert" />
                            </a>

                            {/* Nav Desktop */}
                            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                                <a href="/" className="hover:text-black dark:hover:text-white transition-colors">Início</a>
                                <a href="/loja" className="hover:text-black dark:hover:text-white transition-colors">Loja</a>
                                <a href="/equipamentos" className="hover:text-black dark:hover:text-white transition-colors">Equipamentos</a>
                                <a href="/academy" className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors">
                                    Academy
                                    <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold">Novo</span>
                                </a>
                                <a href="/marcas" className="hover:text-black dark:hover:text-white transition-colors">Marcas</a>
                                <a href="/ofertas" className="hover:text-black transition-colors text-red-600">Ofertas</a>
                            </nav>
                        </div>

                        {/* Search Desktop */}
                        <div className="flex-1 max-w-xl mx-8 hidden lg:block">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar shampoos, cadeiras, tesouras..."
                                    className="w-full bg-gray-100 dark:bg-[#2a2a2a] dark:text-white rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 outline-none transition-all placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 md:gap-2">
                            {isScrolled && shouldShowFilters && selectedFilters.length > 0 && (
                                <span className="w-5 h-5 bg-[#ff6b00] text-white text-[10px] font-bold rounded-full flex items-center justify-center mr-1 hidden md:flex">
                                    {selectedFilters.length}
                                </span>
                            )}
                            <a href="/perfil" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </a>
                            <button
                                onClick={() => setCartOpen(true)}
                                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                {mounted ? (
                                    theme === "dark" ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                )}
                            </button>
                        </div>
                    </header>

                    {/* Mobile Menu Overlay */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#1a1a1a] shadow-lg border-t dark:border-gray-800 p-4 flex flex-col gap-4 z-50 h-[calc(100vh-80px)] overflow-y-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-full bg-gray-100 dark:bg-[#2a2a2a] dark:text-white rounded-lg py-3 pl-10 pr-4 text-sm outline-none"
                                />
                            </div>
                            <nav className="flex flex-col gap-4 text-base font-medium text-gray-600 dark:text-gray-300">
                                <a href="/" className="py-2 border-b dark:border-gray-800">Início</a>
                                <a href="/loja" className="py-2 border-b dark:border-gray-800">Loja</a>
                                <a href="/equipamentos" className="py-2 border-b dark:border-gray-800">Equipamentos</a>
                                <a href="/academy" className="py-2 border-b dark:border-gray-800 flex items-center justify-between">
                                    Academy
                                    <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold">Novo</span>
                                </a>
                                <a href="/marcas" className="py-2 border-b dark:border-gray-800">Marcas</a>
                                <a href="/ofertas" className="py-2 border-b dark:border-gray-800 text-red-600">Ofertas</a>
                            </nav>
                        </div>
                    )}
                </div>

                {/* Integrated Filter Bar */}
                {shouldShowFilters && (
                    <div ref={setFilterBarRef}>
                        <div className="mx-4 lg:mx-20 mb-4 mt-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg flex items-center justify-between p-2">
                            <div className="flex items-center gap-2">
                                {Object.entries({
                                    'Cabelos': ['Shampoos', 'Condicionadores', 'Máscaras', 'Finalizadores', 'Kits'],
                                    'Elétricos': ['Secadores', 'Chapinhas', 'Modeladores', 'Máquinas de Corte'],
                                    'Unhas': ['Esmaltes', 'Removedores', 'Alicates', 'Lixas', 'Acessórios'],
                                    'Pele': ['Hidratantes', 'Limpeza', 'Protetor Solar', 'Esfoliantes', 'Tratamentos'],
                                    'Marcas': ['Lizze', 'Vyz', 'Dejavu', 'Nátylla', 'Due']
                                }).map(([category, options]) => {
                                    const selectedCount = options.filter(opt => selectedFilters.includes(opt)).length;
                                    return (
                                        <div key={category} className="relative group">
                                            <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]">
                                                {category}
                                                {selectedCount > 0 && (
                                                    <span className="ml-1 text-[#ff6b00] text-xs font-bold">
                                                        {selectedCount}
                                                    </span>
                                                )}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180" />
                                            </button>

                                            {/* Dropdown */}
                                            <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                                                <div className="bg-[#f8f9fa] dark:bg-[#2a2a2a] rounded-xl shadow-xl p-2">
                                                    {options.map((option) => {
                                                        const isSelected = selectedFilters.includes(option);
                                                        return (
                                                            <button
                                                                key={option}
                                                                onClick={() => toggleFilter(option)}
                                                                className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${isSelected
                                                                    ? 'bg-black text-white hover:bg-gray-800'
                                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#333] hover:text-black dark:hover:text-white'
                                                                    }`}
                                                            >
                                                                {option}
                                                                {isSelected && <Check className="w-3 h-3" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {selectedFilters.length > 0 && (
                                <div className="flex items-center gap-3 ml-4 pl-4 pr-4">
                                    <span className="flex items-center justify-center w-6 h-6 bg-[#ff6b00] text-white text-xs font-bold rounded-full shadow-sm">
                                        {selectedFilters.length}
                                    </span>
                                    <button
                                        onClick={() => {
                                            const params = new URLSearchParams();
                                            if (selectedFilters.length) params.set('filters', selectedFilters.join(','));
                                            window.location.href = `/loja?${params.toString()}`;
                                        }}
                                        className="bg-black dark:bg-white text-white dark:text-black text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors whitespace-nowrap"
                                    >
                                        APLICAR FILTROS
                                    </button>
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white whitespace-nowrap flex items-center gap-1"
                                    >
                                        Limpar
                                        <span className="text-xs">✕</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Spacer for fixed header */}
            <div className={`transition-all duration-300 ${!isScrolled ? (shouldShowFilters ? 'h-[200px]' : 'h-[128px]') : 'h-[80px]'}`}></div>
        </div>
    );
};
