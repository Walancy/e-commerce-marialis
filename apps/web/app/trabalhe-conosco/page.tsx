"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function TrabalheConoscoPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trabalhe Conosco</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Faça parte de uma equipe apaixonada por beleza e inovação.
                        Estamos sempre em busca de talentos que queiram crescer conosco.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 dark:bg-[#222] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Vendedor Interno</h3>
                        <p className="text-sm text-gray-500 mb-4">São Paulo, SP • Presencial</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                            Responsável pelo atendimento a clientes, prospecção de novos negócios e gestão de carteira.
                        </p>
                        <button className="text-[#ff6b00] font-bold text-sm hover:underline">Ver detalhes e aplicar →</button>
                    </div>

                    <div className="bg-gray-50 dark:bg-[#222] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analista de Marketing</h3>
                        <p className="text-sm text-gray-500 mb-4">Remoto • Híbrido</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                            Gestão de redes sociais, criação de campanhas e análise de métricas de performance.
                        </p>
                        <button className="text-[#ff6b00] font-bold text-sm hover:underline">Ver detalhes e aplicar →</button>
                    </div>
                </div>

                <div className="mt-16 text-center bg-gray-50 dark:bg-[#222] p-12 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Não encontrou sua vaga?</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Envie seu currículo para nosso banco de talentos. Entraremos em contato assim que surgir uma oportunidade com o seu perfil.
                    </p>
                    <button className="bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
                        Enviar Currículo
                    </button>
                </div>
            </div>
            <Footer />
        </main>
    );
}
