"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function AcademyPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-24 pb-20 px-4 lg:px-20 max-w-[1600px] mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Marialis Academy</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Aprimore suas técnicas com os melhores profissionais do mercado. Cursos presenciais e online para cabeleireiros e esteticistas.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 dark:bg-[#222] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-400">Imagem do Curso</span>
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-bold text-[#ff6b00] uppercase tracking-wider">Presencial</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2">Colorimetria Avançada</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Domine as técnicas de coloração e crie loiros perfeitos sem danificar os fios.
                                </p>
                                <button className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                                    Saiba Mais
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
