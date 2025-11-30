"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Map, ShoppingBag, Clock, Save, Mail, Phone, Package } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Dropdown } from '../../../../components/ui/Dropdown';

// Mock data for demonstration
const MOCK_CUSTOMER = {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-9999",
    city: "São Paulo",
    state: "SP",
    zip: "01234-567",
    address: "Rua das Flores",
    number: "123",
    status: "Ativo",
    lastAccess: "2024-03-15 14:30",
    purchaseHistory: [
        { id: 101, date: "2024-03-10", total: "R$ 450,00", status: "Entregue", items: 3 },
        { id: 102, date: "2024-02-15", total: "R$ 1.200,00", status: "Entregue", items: 5 }
    ]
};

export default function EditCustomerPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'account' | 'address' | 'history' | 'access'>('account');
    const [formData, setFormData] = useState(MOCK_CUSTOMER);

    // In a real app, fetch customer data here using params.id
    useEffect(() => {
        // Simulate fetch
        console.log('Fetching customer', params.id);
    }, [params.id]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving customer:', formData);
        router.push('/admin/clientes');
    };

    const tabs = [
        { id: 'account', label: 'Dados da Conta', icon: User },
        { id: 'address', label: 'Endereço', icon: Map },
        { id: 'history', label: 'Histórico de Compras', icon: ShoppingBag },
        { id: 'access', label: 'Último Acesso', icon: Clock },
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
                                Editar Cliente
                            </h1>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${formData.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                                }`}>
                                {formData.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Gerencie os dados do cliente #{params.id}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
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

                {activeTab === 'history' && (
                    <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 animate-in fade-in duration-300">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Histórico de Pedidos
                        </h3>
                        <div className="overflow-hidden rounded-lg border dark:border-white/10">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 border-b dark:border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Data</th>
                                        <th className="px-4 py-3 font-medium">Pedido</th>
                                        <th className="px-4 py-3 font-medium">Itens</th>
                                        <th className="px-4 py-3 font-medium">Total</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y dark:divide-white/10">
                                    {formData.purchaseHistory.length > 0 ? (
                                        formData.purchaseHistory.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">{order.date}</td>
                                                <td className="px-4 py-3 text-gray-500">#{order.id}</td>
                                                <td className="px-4 py-3 text-gray-500">{order.items} itens</td>
                                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{order.total}</td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <Package className="w-8 h-8 text-gray-300 mb-2" />
                                                    <p>Nenhum pedido encontrado.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'access' && (
                    <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 animate-in fade-in duration-300">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Detalhes do Último Acesso
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Data e Hora</label>
                                <p className="text-lg font-mono text-gray-900 dark:text-white">{formData.lastAccess}</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Dispositivo</label>
                                <p className="text-lg text-gray-900 dark:text-white">Chrome / Windows</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Endereço IP</label>
                                <p className="text-lg font-mono text-gray-900 dark:text-white">192.168.1.1</p>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Localização Aproximada</label>
                                <p className="text-lg text-gray-900 dark:text-white">{formData.city}, {formData.state}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
