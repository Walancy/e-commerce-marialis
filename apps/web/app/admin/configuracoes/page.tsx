"use client";

import React from 'react';
import { Save, Bell, Globe, CreditCard, Truck } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

export default function SettingsPage() {
    return (
        <div className="p-6 max-w-5xl">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Configurações</h1>
                <p className="text-xs text-gray-500">Preferências da loja</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* General Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#121212] p-5 rounded-xl shadow-sm border dark:border-white/5">
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Informações da Loja
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Nome da Loja</label>
                                <input type="text" defaultValue="Marialis Cosméticos" className="w-full bg-gray-50 dark:bg-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all border border-transparent focus:border-transparent" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">E-mail de Contato</label>
                                <input type="email" defaultValue="contato@marialis.com.br" className="w-full bg-gray-50 dark:bg-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all border border-transparent focus:border-transparent" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Descrição</label>
                                <textarea rows={3} defaultValue="A melhor loja de cosméticos e equipamentos profissionais." className="w-full bg-gray-50 dark:bg-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all border border-transparent focus:border-transparent" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-[#121212] p-5 rounded-xl shadow-sm border dark:border-white/5">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Pagamentos
                            </h2>
                            <div className="space-y-2">
                                <label className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Cartão de Crédito</span>
                                    <Checkbox defaultChecked />
                                </label>
                                <label className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                    <span className="text-xs font-medium text-gray-900 dark:text-white">PIX</span>
                                    <Checkbox defaultChecked />
                                </label>
                                <label className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Boleto</span>
                                    <Checkbox />
                                </label>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#121212] p-5 rounded-xl shadow-sm border dark:border-white/5">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                Frete e Entrega
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Frete Grátis a partir de</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">R$</span>
                                        <input type="number" defaultValue="299.00" className="w-full bg-gray-50 dark:bg-white/5 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all border border-transparent focus:border-transparent" />
                                    </div>
                                </div>
                                <label className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Retirada em Loja</span>
                                    <Checkbox defaultChecked />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#121212] p-5 rounded-xl shadow-sm border dark:border-white/5">
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Notificações
                        </h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Checkbox defaultChecked />
                                <span className="text-xs text-gray-600 dark:text-gray-400">E-mail a cada venda</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Checkbox defaultChecked />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Alerta de estoque baixo</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <Checkbox />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Novidades da plataforma</span>
                            </label>
                        </div>
                    </div>

                    <Button fullWidth>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                    </Button>
                </div>
            </div>
        </div>
    );
}
