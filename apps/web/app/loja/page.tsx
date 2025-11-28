"use client";

import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ProductCard } from '../../components/ProductCard';
import { Filter, ChevronDown, Check, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Mock Data
const brands = ['Lizze', 'Vyz', 'Dejavu', 'Nátylla', 'Due'];
const categories = ['Cabelos', 'Elétricos', 'Unhas', 'Pele', 'Móveis'];
const prices = ['Até R$ 50', 'R$ 50 - R$ 100', 'R$ 100 - R$ 300', 'R$ 300 - R$ 500', 'Acima de R$ 500'];

const allProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    image: i % 2 === 0 ? '/product-flat-iron.png' : '/product-shampoo.png',
    title: i % 2 === 0 ? `Prancha Extreme ${i + 1}` : `Kit Repair ${i + 1}`,
    brand: brands[i % brands.length] || 'Brand',
    price: i % 2 === 0 ? 'R$ 499,00' : 'R$ 149,90',
    rating: Math.floor(Math.random() * 5) + 1,
    category: categories[i % categories.length] || 'Category'
}));

export default function ShopPage() {
    const searchParams = useSearchParams();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<string[]>([]);

    React.useEffect(() => {
        const filters = searchParams.get('filters');
        if (filters) {
            console.log('Filters from URL:', filters);
            const filterList = filters.split(',');
            const validCats = filterList.filter(f => categories.includes(f));
            if (validCats.length) setSelectedCategories(validCats);

            // Also check for brands in the URL filters
            const validBrands = filterList.filter(f => brands.includes(f));
            if (validBrands.length) setSelectedBrands(validBrands);
        }
    }, [searchParams]);

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        'Categorias': true,
        'Preço': true,
        'Marcas': true,
        'Avaliação': true
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const parsePrice = (priceStr: string) => {
        return parseFloat(priceStr.replace('R$ ', '').replace('.', '').replace(',', '.'));
    };

    const filteredProducts = allProducts.filter(product => {
        // Category Filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Brand Filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
        }

        // Price Filter
        if (priceRange.length > 0) {
            const price = parsePrice(product.price);
            const matchesPrice = priceRange.some(range => {
                if (range === 'Até R$ 50') return price <= 50;
                if (range === 'R$ 50 - R$ 100') return price > 50 && price <= 100;
                if (range === 'R$ 100 - R$ 300') return price > 100 && price <= 300;
                if (range === 'R$ 300 - R$ 500') return price > 300 && price <= 500;
                if (range === 'Acima de R$ 500') return price > 500;
                return false;
            });
            if (!matchesPrice) return false;
        }

        return true;
    });

    const [sortBy, setSortBy] = useState('Mais relevantes');
    const sortOptions = ['Mais relevantes', 'Menor preço', 'Maior preço', 'Mais vendidos'];

    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-24 pb-20 px-4 lg:px-20 max-w-[1600px] mx-auto">
                {/* Breadcrumbs / Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Loja Completa</h1>
                    <p className="text-gray-500 text-sm">Home / Loja</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 relative">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 sticky top-32 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
                        <div className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white pb-4 border-b dark:border-gray-800">
                            <Filter size={20} />
                            Filtros
                        </div>

                        {/* Categories */}
                        <div>
                            <h3
                                className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between cursor-pointer select-none"
                                onClick={() => toggleSection('Categorias')}
                            >
                                Categorias
                                <ChevronDown size={16} className={`transition-transform duration-200 ${expandedSections['Categorias'] ? 'rotate-180' : ''}`} />
                            </h3>
                            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSections['Categorias'] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-black border-black dark:bg-white dark:border-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {selectedCategories.includes(cat) && <Check size={12} className="text-white dark:text-black" />}
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white text-sm">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <h3
                                className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between cursor-pointer select-none"
                                onClick={() => toggleSection('Preço')}
                            >
                                Preço
                                <ChevronDown size={16} className={`transition-transform duration-200 ${expandedSections['Preço'] ? 'rotate-180' : ''}`} />
                            </h3>
                            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSections['Preço'] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {prices.map(price => (
                                    <label key={price} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(priceRange, setPriceRange, price)}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${priceRange.includes(price) ? 'bg-black border-black dark:bg-white dark:border-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {priceRange.includes(price) && <Check size={12} className="text-white dark:text-black" />}
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white text-sm">{price}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <h3
                                className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between cursor-pointer select-none"
                                onClick={() => toggleSection('Marcas')}
                            >
                                Marcas
                                <ChevronDown size={16} className={`transition-transform duration-200 ${expandedSections['Marcas'] ? 'rotate-180' : ''}`} />
                            </h3>
                            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSections['Marcas'] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {brands.map(brand => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-black border-black dark:bg-white dark:border-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {selectedBrands.includes(brand) && <Check size={12} className="text-white dark:text-black" />}
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white text-sm">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h3
                                className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between cursor-pointer select-none"
                                onClick={() => toggleSection('Avaliação')}
                            >
                                Avaliação
                                <ChevronDown size={16} className={`transition-transform duration-200 ${expandedSections['Avaliação'] ? 'rotate-180' : ''}`} />
                            </h3>
                            <div className={`space-y-2 overflow-hidden transition-all duration-300 ${expandedSections['Avaliação'] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {[5, 4, 3, 2, 1].map(star => (
                                    <label key={star} className="flex items-center gap-2 cursor-pointer group">
                                        <div className="flex items-center text-yellow-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} size={14} fill={i < star ? "currentColor" : "none"} className={i < star ? "" : "text-gray-300 dark:text-gray-600"} />
                                            ))}
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400 text-sm">& Acima</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Sort and Count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-500 text-sm">Mostrando <span className="font-bold text-black dark:text-white">{filteredProducts.length}</span> produtos</p>

                            <div className="relative group z-20">
                                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#333]">
                                    {sortBy}
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180" />
                                </button>

                                {/* Dropdown */}
                                <div className="absolute top-full right-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl p-2 border border-gray-100 dark:border-gray-800">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSortBy(option)}
                                                className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${sortBy === option
                                                        ? 'bg-black text-white hover:bg-gray-800'
                                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#333] hover:text-black dark:hover:text-white'
                                                    }`}
                                            >
                                                {option}
                                                {sortBy === option && <Check className="w-3 h-3" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-12 gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-300">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-300">3</button>
                            <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-600 dark:text-gray-300">12</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
