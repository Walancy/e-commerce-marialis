"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useTheme } from '../../components/ThemeProvider';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('../../components/Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-100 dark:bg-[#222] animate-pulse rounded-2xl flex items-center justify-center">
            <span className="text-gray-400">Carregando mapa...</span>
        </div>
    ),
});

export default function EncontreRevendedorPage() {
    const { theme } = useTheme();

    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1600px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Info Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Encontre um Revendedor</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Visite nossa sede ou encontre o revendedor mais próximo de você. Estamos localizados no coração do Paraná.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-100 dark:bg-[#222] rounded-lg text-black dark:text-white">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Endereço</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Campo Mourão, Paraná<br />
                                        Brasil
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-100 dark:bg-[#222] rounded-lg text-black dark:text-white">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Telefone</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        +55 44 8850-0440
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-100 dark:bg-[#222] rounded-lg text-black dark:text-white">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        contato@marialis.com.br
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-100 dark:bg-[#222] rounded-lg text-black dark:text-white">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Horário de Atendimento</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Segunda a Sexta: 9h às 18h<br />
                                        Sábado: 9h às 13h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="lg:col-span-8 h-[500px] lg:h-[600px] bg-gray-100 dark:bg-[#222] rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                        <Map theme={theme} />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
