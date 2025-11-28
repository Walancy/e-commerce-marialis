"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const brands = [
    { name: 'Lizze', logo: '/marcas/Vector.svg', height: 'h-8' },
    { name: 'Dejavu', logo: '/marcas/Subtract.svg', height: 'h-8' },
    { name: 'Nátylla', logo: '/marcas/natylla.svg', height: 'h-8' },
    { name: 'Due', logo: '/marcas/due.svg', height: 'h-10' },
    { name: 'VYZ', logo: '/marcas/vyz.svg', height: 'h-10' },
    { name: 'Artbelle', logo: '/marcas/artbelle.svg', height: 'h-8' },
];

export default function MarcasPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-24 pb-20 px-4 lg:px-20 max-w-[1600px] mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nossas Marcas</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Trabalhamos apenas com as melhores marcas do mercado profissional.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {brands.map((brand, idx) => (
                        <div
                            key={idx}
                            className="w-full h-40 bg-gray-50 dark:bg-[#222] rounded-xl flex items-center justify-center p-8 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className={`${brand.height} w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 brightness-0 dark:invert`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
