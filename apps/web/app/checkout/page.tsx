"use client";

import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#111]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1200px] mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Finalizar Compra</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Info */}
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</div>
                                Dados Pessoais
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Nome Completo" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="email" placeholder="E-mail" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="text" placeholder="CPF" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="tel" placeholder="Telefone" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</div>
                                Entrega
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="CEP" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <div className="hidden md:block"></div>
                                <input type="text" placeholder="Endereço" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all md:col-span-2" />
                                <input type="text" placeholder="Número" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="text" placeholder="Complemento" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="text" placeholder="Bairro" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="text" placeholder="Cidade" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</div>
                                Pagamento
                            </h2>

                            <div className="flex gap-4 mb-6">
                                <button className="flex-1 py-3 px-4 rounded-xl border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-medium flex items-center justify-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Cartão
                                </button>
                                <button className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <span className="font-bold">PIX</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <input type="text" placeholder="Número do Cartão" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <input type="text" placeholder="Nome Impresso no Cartão" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Validade (MM/AA)" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                    <input type="text" placeholder="CVV" className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                                </div>
                                <select className="w-full bg-gray-100 dark:bg-[#2a2a2a] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none cursor-pointer">
                                    <option>1x sem juros</option>
                                    <option>2x sem juros</option>
                                    <option>3x sem juros</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm sticky top-32">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Resumo do Pedido</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src="https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=1000" alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">Shampoo Hidratante Premium</h3>
                                        <p className="text-sm text-gray-500 mt-1">1x R$ 89,90</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000" alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">Máscara Capilar Reconstrutora</h3>
                                        <p className="text-sm text-gray-500 mt-1">2x R$ 129,90</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 border-t dark:border-gray-800 pt-6">
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>R$ 349,70</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>Frete</span>
                                    <span className="text-green-600 font-medium">Grátis</span>
                                </div>
                                <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white pt-3 border-t dark:border-gray-700">
                                    <span>Total</span>
                                    <span>R$ 349,70</span>
                                </div>
                            </div>

                            <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-2">
                                <Lock className="w-4 h-4" />
                                PAGAR AGORA
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                                <ShieldCheck className="w-4 h-4" />
                                Compra 100% Segura
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
