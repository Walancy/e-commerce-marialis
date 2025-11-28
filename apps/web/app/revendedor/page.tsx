"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function RevendedorPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1200px] mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Seja um Revendedor Marialis</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Expanda seus negócios oferecendo os melhores produtos do mercado.
                            Tenha acesso a preços exclusivos, suporte dedicado e material de marketing.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                'Margens de lucro atrativas',
                                'Catálogo completo de produtos profissionais',
                                'Treinamento técnico e comercial',
                                'Suporte logístico para todo o Brasil'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                                    <span className="w-2 h-2 bg-[#ff6b00] rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button className="bg-black dark:bg-white text-white dark:text-black font-bold py-4 px-8 rounded-lg hover:opacity-90 transition-opacity">
                            Quero ser Revendedor
                        </button>
                    </div>

                    <div className="bg-gray-100 dark:bg-[#222] rounded-2xl h-[500px] flex items-center justify-center">
                        <span className="text-gray-400">Imagem Ilustrativa</span>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
