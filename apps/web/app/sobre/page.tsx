"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Diamond, Handshake, Rocket } from 'lucide-react';

export default function SobrePage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1200px] mx-auto">
                <div className="relative mb-16 rounded-2xl overflow-hidden h-[400px] bg-gray-100 dark:bg-[#222]">
                    {/* Placeholder for a hero image of the store or team */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-black/60 to-transparent">
                        <div className="p-12 text-white max-w-2xl">
                            <h1 className="text-5xl font-bold mb-4">Nossa Essência</h1>
                            <p className="text-xl opacity-90">Transformando o mercado da beleza profissional com paixão e excelência.</p>
                        </div>
                    </div>
                </div>

                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Nossa História</h2>
                            <p className="text-lg leading-relaxed mb-6">
                                A Marialis nasceu há 5 anos no coração de Campo Mourão, Paraná, fruto de um sonho audacioso:
                                conectar os profissionais da beleza aos melhores produtos e tecnologias do mundo.
                            </p>
                            <p className="text-lg leading-relaxed">
                                O que começou como uma operação local, focada em atender com excelência os salões da região,
                                rapidamente ganhou corpo e alma. Nossa dedicação em entender as dores e necessidades dos
                                cabeleireiros e esteticistas nos permitiu curar um portfólio de marcas que realmente entregam resultado.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#222] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Raízes em Campo Mourão</h3>
                            <p className="mb-4">
                                Orgulhosamente paranaense, nossa sede em Campo Mourão é o centro de nossas operações.
                                É daqui que enviamos inovação e qualidade para todo o Brasil.
                            </p>
                            <p>
                                Acreditamos que o interior tem uma força empreendedora única, e levamos esse DNA
                                de trabalho sério e compromisso para cada cliente que atendemos.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Mais que uma Distribuidora</h2>
                    <p className="text-lg leading-relaxed mb-6">
                        Não somos apenas vendedores de caixas. Somos consultores de sucesso. Entendemos que por trás de cada
                        tesoura, secador ou coloração, existe um profissional buscando realizar sonhos e transformar a autoestima de seus clientes.
                    </p>
                    <p className="text-lg leading-relaxed mb-12">
                        Por isso, a Marialis investe pesadamente em educação e suporte. Nossa Marialis Academy é a prova viva
                        desse compromisso, oferecendo workshops e treinamentos que elevam o nível técnico do mercado.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 my-16">
                        <div className="bg-white dark:bg-[#222] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transform hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6">
                                <Diamond className="w-6 h-6 text-white dark:text-black" />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">Curadoria Premium</h3>
                            <p className="text-sm leading-relaxed">
                                Não trabalhamos com "tudo". Trabalhamos com o que funciona. Cada marca em nosso portfólio
                                passa por um rigoroso processo de aprovação técnica.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#222] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transform hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6">
                                <Handshake className="w-6 h-6 text-white dark:text-black" />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">Parceria Real</h3>
                            <p className="text-sm leading-relaxed">
                                Crescemos quando nossos clientes crescem. Oferecemos condições comerciais justas e
                                suporte pós-venda que resolve problemas de verdade.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-[#222] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transform hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6">
                                <Rocket className="w-6 h-6 text-white dark:text-black" />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">Visão de Futuro</h3>
                            <p className="text-sm leading-relaxed">
                                Estamos sempre um passo à frente, trazendo tendências internacionais e tecnologias
                                que vão ditar o futuro da beleza nos próximos anos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
