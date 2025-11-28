"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';

export const Header = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            if (window.scrollY <= 50) {
                setShowFilters(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    return (
        <div className="w-full font-sans">
            {/* Fixed Header Container */}
            <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="bg-[#f8f9fa]">
                    {/* Brand Ticker - Hides on Scroll */}
                    <div className={`bg-[#f0f0f0] overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
                        <div className="flex whitespace-nowrap animate-ticker py-3">
                            {/* Duplicated list for seamless infinite scroll */}
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="flex items-center shrink-0">
                                    <span className="text-sm font-medium text-gray-600 mx-12">Lizze</span>
                                    <span className="text-gray-400 text-[10px]">●</span>
                                    <span className="text-sm font-medium text-gray-600 mx-12">Dejavu</span>
                                    <span className="text-gray-400 text-[10px]">●</span>
                                    <span className="text-sm font-medium text-gray-600 mx-12">Nátylla</span>
                                    <span className="text-gray-400 text-[10px]">●</span>
                                    <span className="text-sm font-medium text-gray-600 mx-12">Due</span>
                                    <span className="text-gray-400 text-[10px]">●</span>
                                    <span className="text-sm font-medium text-gray-600 mx-12">VYZ</span>
                                    <span className="text-gray-400 text-[10px]">●</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <header className="flex items-center justify-between px-20 py-4 w-full mx-auto">
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <div className="text-2xl font-black tracking-tighter">MARIALIS.</div>

                            {/* Nav */}
                            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
                                <a href="#" className="hover:text-black transition-colors">Loja</a>
                                <a href="#" className="hover:text-black transition-colors">Equipamentos</a>
                                <a href="#" className="flex items-center gap-1 hover:text-black transition-colors">
                                    Academia
                                    <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-bold">Novo</span>
                                </a>
                                <a href="#" className="hover:text-black transition-colors">Marcas</a>
                                <a href="#" className="hover:text-black transition-colors text-red-600">Ofertas</a>
                            </nav>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-xl mx-8 hidden md:block">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar shampoos, cadeiras, tesouras..."
                                    className="w-full bg-white rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gray-200 outline-none transition-all placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {isScrolled && (
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`p-2 rounded-lg transition-all mr-2 ${showFilters ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                                >
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>
                            )}
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <User className="w-5 h-5 text-gray-700" />
                            </button>
                            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ShoppingBag className="w-5 h-5 text-gray-700" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap ml-2">
                                Área Profissional
                            </button>
                        </div>
                    </header>
                </div>

                {/* Integrated Filter Bar */}
                <div className={`transition-all duration-500 ease-in-out ${!isScrolled || showFilters ? 'max-h-24 opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="mx-20 mb-4 mt-2 bg-white rounded-lg flex items-center justify-between p-2 shadow-sm">
                        <div className="flex items-center gap-2">
                            {Object.entries({
                                'Cabelos': ['Shampoos', 'Condicionadores', 'Máscaras', 'Finalizadores', 'Kits'],
                                'Elétricos': ['Secadores', 'Chapinhas', 'Modeladores', 'Máquinas de Corte'],
                                'Unhas': ['Esmaltes', 'Removedores', 'Alicates', 'Lixas', 'Acessórios'],
                                'Pele': ['Hidratantes', 'Limpeza', 'Protetor Solar', 'Esfoliantes', 'Tratamentos']
                            }).map(([category, options]) => (
                                <div key={category} className="relative group">
                                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 transition-all whitespace-nowrap">
                                        {category}
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180" />
                                    </button>

                                    {/* Dropdown */}
                                    <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="bg-white rounded-xl shadow-xl p-2">
                                            {options.map((option) => {
                                                const isSelected = selectedFilters.includes(option);
                                                return (
                                                    <button
                                                        key={option}
                                                        onClick={() => toggleFilter(option)}
                                                        className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${isSelected
                                                            ? 'bg-black text-white hover:bg-gray-800'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
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
                            ))}
                        </div>

                        {selectedFilters.length > 0 && (
                            <div className="flex items-center gap-3 ml-4 pl-4">
                                <span className="flex items-center justify-center w-6 h-6 bg-[#ff6b00] text-white text-xs font-bold rounded-full shadow-sm">
                                    {selectedFilters.length}
                                </span>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm font-medium text-gray-500 hover:text-black whitespace-nowrap flex items-center gap-3"
                                >
                                    Limpar filtros
                                    <span className="text-xs pr-4">✕</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className={`transition-all duration-300 ${!isScrolled ? 'h-[200px]' : showFilters ? 'h-[160px]' : 'h-[80px]'}`}></div>
        </div>
    );
};
