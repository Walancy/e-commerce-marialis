"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Map, Save, Mail, Phone } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Dropdown } from '../../../../components/ui/Dropdown';

export default function NewCustomerPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'account' | 'address'>('account');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Ativo',
        zip: '',
        address: '',
        number: '',
        city: '',
        state: ''
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the data
        console.log('Saving customer:', formData);
        router.push('/admin/clientes');
    };

    const tabs = [
        { id: 'account', label: 'Dados da Conta', icon: User },
        { id: 'address', label: 'Endereço', icon: Map },
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Novo Cliente
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400">
                                Novo
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Preencha as informações para cadastrar um novo cliente
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Cliente
                    </Button>
                </div>
            </div>

            {/* Top Section: Key Info */}
            <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 mb-8">
                <div className="flex flex-col xl:flex-row gap-6">
                    <div className="flex-1 min-w-[300px]">
                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Nome Completo <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: Maria Silva"
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-black dark:focus:border-white transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-40">
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Status <span className="text-red-500 ml-1">*</span></label>
                            <Dropdown
                                options={['Ativo', 'Inativo']}
                                value={formData.status}
                                onChange={(val) => setFormData({ ...formData, status: val })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b dark:border-white/5 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
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
            <div className="space-y-6">
                {activeTab === 'account' && (
                    <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 animate-in fade-in duration-300">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Informações de Contato
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail <span className="text-red-500 ml-1">*</span></label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        placeholder="Ex: maria@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone <span className="text-red-500 ml-1">*</span></label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        placeholder="Ex: (11) 99999-9999"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'address' && (
                    <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 animate-in fade-in duration-300">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Map className="w-4 h-4" />
                            Endereço Principal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">CEP</label>
                                <input
                                    type="text"
                                    value={formData.zip}
                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="00000-000"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Endereço</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="Rua, Avenida..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Número</label>
                                <input
                                    type="text"
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="123"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cidade</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="Cidade"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="UF"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
