"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface BrandItem {
    id: string;
    name: string;
    logo?: string;
    status?: string;
}

export const BrandsSection = () => {
    const [brandItems, setBrandItems] = useState<BrandItem[]>([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data, error } = await supabase
                    .from('brands')
                    .select('id, name, logo, status')
                    .order('name', { ascending: true });

                if (!error && data) {
                    // Filter to only include active brands
                    const activeBrands = (data as BrandItem[]).filter(b => b.status === 'Ativo' || !b.status);
                    setBrandItems(activeBrands);
                }
            } catch (err) {
                console.error("Error fetching brands for e-commerce:", err);
            }
        };
        fetchBrands();
    }, []);

    if (brandItems.length === 0) return null;

    return (
        <section className="py-16 md:py-20">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Nossas Marcas Parceiras
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Trabalhamos com as melhores marcas do mercado para garantir a qualidade e excelência que seu salão merece.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 max-w-6xl mx-auto">
                    {brandItems.map((brand) => (
                        <div
                            key={brand.id || brand.name}
                            className="w-40 sm:w-48 lg:w-52 h-28 bg-white dark:bg-[#1a1a1a] rounded-xl transition-all duration-300 flex items-center justify-center p-4 group cursor-pointer"
                        >
                            {brand.logo ? (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 brightness-0 dark:brightness-100"
                                />
                            ) : (
                                <span className="font-semibold text-base text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                                    {brand.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
