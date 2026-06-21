"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { fetchProducts, type StoreProduct } from '../services/productsService';

export const ProductList = () => {
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then(data => {
            setProducts(data.slice(0, 20));
            setLoading(false);
        });
    }, []);

    return (
        <section className="pt-4 pb-12 max-w-[1400px] mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Destaques</h2>

            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3 animate-pulse">
                            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && (
                <div className="flex flex-col items-center w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full mb-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                    
                    <Link href="/loja">
                        <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md mt-4">
                            Ver loja completa
                        </button>
                    </Link>
                </div>
            )}
        </section>
    );
};
