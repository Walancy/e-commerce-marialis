"use client";

import React, { useState } from 'react';
import {
    User,
    Lock,
    Bell,
    Settings,
    Camera,
    Mail,
    Shield,
    Smartphone,
    Globe,
    Moon
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'Geral', icon: User },
        { id: 'security', label: 'Segurança', icon: Lock },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'settings', label: 'Configurações', icon: Settings },
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
                <p className="text-sm text-gray-500 mt-1">Gerencie suas informações pessoais e preferências</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b dark:border-white/5 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-black dark:border-white text-black dark:text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in duration-300">

                {/* --- TAB: GENERAL --- */}
                {activeTab === 'general' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm flex flex-col items-center text-center">
                                <div className="relative mb-4 group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden border-4 border-white dark:border-[#121212] shadow-lg">
                                        <img src="https://github.com/shadcn.png" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin User</h2>
                                <p className="text-sm text-gray-500 mb-4">Administrador Principal</p>
                                <div className="w-full pt-4 border-t dark:border-white/5 flex justify-between text-sm">
                                    <span className="text-gray-500">Membro desde</span>
                                    <span className="font-medium text-gray-900 dark:text-white">Nov 2023</span>
                                </div>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <div className="lg:col-span-2 bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Informações Pessoais</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                                        <input
                                            type="text"
                                            defaultValue="Admin User"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            defaultValue="admin@marialis.com"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                                    <textarea
                                        rows={4}
                                        defaultValue="Gerente de operações e administrador do sistema."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="pt-4 flex justify-end gap-3">
                                    <Button variant="outline">Cancelar</Button>
                                    <Button>Salvar Alterações</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: SECURITY --- */}
                {activeTab === 'security' && (
                    <div className="max-w-4xl mx-auto bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-500" />
                            Alterar Senha
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Senha Atual</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nova Senha</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Nova Senha</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button>Atualizar Senha</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: NOTIFICATIONS --- */}
                {activeTab === 'notifications' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            { title: 'Notificações por Email', icon: Mail, items: ['Novos pedidos', 'Atualizações de estoque', 'Novos clientes'] },
                            { title: 'Notificações Push', icon: Smartphone, items: ['Mensagens', 'Alertas de segurança', 'Promoções'] }
                        ].map((section, i) => {
                            const Icon = section.icon;
                            return (
                                <div key={i} className="bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Icon className="w-5 h-5 text-purple-500" />
                                        {section.title}
                                    </h3>
                                    <div className="space-y-4">
                                        {section.items.map((item, j) => (
                                            <div key={j} className="flex items-center justify-between py-2">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* --- TAB: SETTINGS --- */}
                {activeTab === 'settings' && (
                    <div className="max-w-4xl mx-auto bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-gray-500" />
                            Preferências do Sistema
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between py-3 border-b dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                                        <Globe className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Idioma</p>
                                        <p className="text-xs text-gray-500">Selecione o idioma da interface</p>
                                    </div>
                                </div>
                                <select className="bg-transparent border border-gray-200 dark:border-white/10 rounded-lg text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Português (BR)</option>
                                    <option>English (US)</option>
                                    <option>Español</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5">
                                        <Moon className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Tema</p>
                                        <p className="text-xs text-gray-500">Aparência do sistema</p>
                                    </div>
                                </div>
                                <select className="bg-transparent border border-gray-200 dark:border-white/10 rounded-lg text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Sistema</option>
                                    <option>Claro</option>
                                    <option>Escuro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
