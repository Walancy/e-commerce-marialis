"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function PoliticaPrivacidadePage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1000px] mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Política de Privacidade</h1>

                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                    <p>
                        A sua privacidade é importante para nós. É política da Marialis respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Marialis, e outros sites que possuímos e operamos.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">1. Informações que coletamos</h3>
                    <p>
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">2. Uso de informações</h3>
                    <p>
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">3. Compartilhamento de dados</h3>
                    <p>
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">4. Cookies</h3>
                    <p>
                        O nosso site usa cookies para melhorar a experiência do usuário. Ao continuar navegando, você concorda com o uso de cookies.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Esta política é efetiva a partir de Novembro/2024.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
