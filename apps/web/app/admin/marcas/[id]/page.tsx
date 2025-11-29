"use client";

import React, { useState } from 'react';
import {
    ArrowLeft,
    Save,
    Trash2,
    Upload,
    Image as ImageIcon,
    BarChart3,
    Settings,
    ExternalLink,
    Package,
    Search,
    Filter
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Dropdown } from '../../../../components/ui/Dropdown';
import { DataTable } from '../../../../components/ui/DataTable';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function BrandDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Brand Data
    const [brand, setBrand] = useState({
        id: Number(params.id),
        name: "Lizze",
        logo: "https://placehold.co/100x100/png?text=Lizze",
        description: "Marca líder em equipamentos profissionais para salões de beleza.",
        website: "https://lizze.com.br",
        status: 'Ativo',
        productsCount: 12,
        totalSales: 1540,
        revenue: 450000.00
    });

    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
        { id: 'products', label: 'Produtos', icon: Package },
        { id: 'settings', label: 'Configurações', icon: Settings },
    ];

    // Mock Products for this brand
    const brandProducts = [
        { id: 1, name: "Secador Lizze Extreme", sku: "LIZ-EXT-001", price: 499.90, stock: 45, status: "Ativo", sales: 120 },
        { id: 5, name: "Prancha Nano Titanium", sku: "LIZ-PRA-001", price: 399.90, stock: 15, status: "Ativo", sales: 98 },
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/marcas" className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white dark:bg-white/5 border dark:border-white/10 flex items-center justify-center p-2">
                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{brand.name}</h1>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${brand.status === 'Ativo'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                                    }`}>
                                    {brand.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{brand.productsCount} produtos cadastrados</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visitar Site
                    </Button>
                    <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                    </Button>
                </div>
            </div>

            {/* KPIs Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Vendas Totais</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{brand.totalSales}</h3>
                </div>
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Receita Total</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {brand.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </h3>
                </div>
                <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Produtos Ativos</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{brand.productsCount}</h3>
                </div>
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
            <div className="space-y-6">
                {activeTab === 'overview' && (
                    <div className="animate-in fade-in duration-300">
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Desempenho Geral</h3>
                            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-lg border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-gray-500">Gráfico de vendas será exibido aqui</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar produtos..."
                                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border dark:border-white/10 bg-white dark:bg-white/5 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                />
                            </div>
                            <Button onClick={() => router.push('/admin/produtos/novo')}>
                                <Package className="w-4 h-4 mr-2" />
                                Adicionar Produto
                            </Button>
                        </div>

                        <DataTable
                            data={brandProducts}
                            keyField="id"
                            columns={[
                                { header: 'Produto', accessorKey: 'name', sortable: true },
                                { header: 'SKU', accessorKey: 'sku', sortable: true },
                                {
                                    header: 'Preço',
                                    accessorKey: 'price',
                                    sortable: true,
                                    cell: (item: any) => item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                },
                                { header: 'Estoque', accessorKey: 'stock', sortable: true },
                                {
                                    header: 'Status',
                                    accessorKey: 'status',
                                    sortable: true,
                                    cell: (item: any) => (
                                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                            {item.status}
                                        </span>
                                    )
                                },
                            ]}
                        />
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm animate-in fade-in duration-300">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Informações da Marca</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo da Marca</label>
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-xl bg-gray-50 dark:bg-white/5 border dark:border-white/10 flex items-center justify-center p-2 relative group overflow-hidden">
                                        {brand.logo ? (
                                            <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-gray-300" />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Upload className="w-6 h-6 text-white" />
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const url = URL.createObjectURL(file);
                                                        setBrand({ ...brand, logo: url });
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 mb-2">Clique na imagem para alterar o logo.</p>
                                        <p className="text-xs text-gray-400">Recomendado: 500x500px, PNG ou JPG.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Marca</label>
                                <input
                                    type="text"
                                    value={brand.name}
                                    onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                                <input
                                    type="text"
                                    value={brand.website}
                                    onChange={(e) => setBrand({ ...brand, website: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                                <textarea
                                    rows={4}
                                    value={brand.description}
                                    onChange={(e) => setBrand({ ...brand, description: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
