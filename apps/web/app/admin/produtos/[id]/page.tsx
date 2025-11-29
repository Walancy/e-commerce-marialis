"use client";

import React, { useState } from 'react';
import {
    ArrowLeft,
    Save,
    Trash2,
    Upload,
    Image as ImageIcon,
    DollarSign,
    BarChart3,
    Settings,
    ExternalLink,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Truck,
    Search,
    Tag,
    X,
    Package,
    Star
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Dropdown } from '../../../../components/ui/Dropdown';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailsPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    const subcategories: Record<string, string[]> = {
        'Elétricos': ['Secadores', 'Pranchas', 'Modeladores', 'Máquinas'],
        'Cabelos': ['Shampoos', 'Condicionadores', 'Máscaras', 'Finalizadores', 'Kits'],
        'Unhas': ['Esmaltes', 'Géis', 'Alicates', 'Acessórios'],
        'Pele': ['Hidratantes', 'Limpeza', 'Protetor Solar'],
        'Móveis': ['Cadeiras', 'Lavatórios', 'Carrinhos']
    };

    // Mock Product Data with extended fields
    const [product, setProduct] = useState({
        id: params.id,
        name: "Secador Lizze Extreme",
        description: "O melhor secador do mercado. Potência extrema para profissionais exigentes.",
        price: 499.90,
        costPrice: 250.00,
        promotionalPrice: 450.00,
        isPromotionActive: true,
        category: "Elétricos",
        subcategory: "Secadores",
        brand: "Lizze",
        stock: 45,
        minStock: 10,
        sku: "LIZ-EXT-001",
        status: 'Ativo',
        images: ["https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=400"],
        sales30d: 120,
        totalSales: 450,
        rating: 4.8,
        reviews: 89,
        // New fields for Pricing
        taxIcms: 18, // %
        taxIpi: 0, // %
        taxPis: 1.65, // %
        taxCofins: 7.6, // %
        platformFee: 12, // %
        additionalCost: 0, // R$
        // New fields for Settings
        seoTitle: "Secador Lizze Extreme - Profissional 2400W",
        seoDescription: "Compre o Secador Lizze Extreme com o melhor preço. Potência e rapidez para seu salão.",
        slug: "secador-lizze-extreme",
        weight: 1.2, // kg
        width: 25, // cm
        height: 25, // cm
        depth: 10, // cm
        tags: ["Secador", "Profissional", "Lizze", "2400W", "Cabelo"]
    });

    const [newTag, setNewTag] = useState('');

    // Helper for safe number parsing
    const safeNumber = (val: any) => {
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
    };

    // Calculations
    const currentPrice = product.isPromotionActive && product.promotionalPrice ? safeNumber(product.promotionalPrice) : safeNumber(product.price);

    const totalTaxRate = safeNumber(product.taxIcms) + safeNumber(product.taxIpi) + safeNumber(product.taxPis) + safeNumber(product.taxCofins);
    const taxAmount = (currentPrice * totalTaxRate) / 100;

    const feeAmount = (currentPrice * safeNumber(product.platformFee)) / 100;
    const totalDeductions = taxAmount + feeAmount + safeNumber(product.additionalCost);
    const netRevenue = currentPrice - totalDeductions;
    const profit = netRevenue - safeNumber(product.costPrice);
    const margin = currentPrice > 0 ? (profit / currentPrice) * 100 : 0;

    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
        { id: 'pricing', label: 'Preços e Lucro', icon: DollarSign },
        { id: 'images', label: 'Imagens', icon: ImageIcon },
        { id: 'settings', label: 'Configurações', icon: Settings },
    ];

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!product.tags.includes(newTag.trim())) {
                setProduct({ ...product, tags: [...product.tags, newTag.trim()] });
            }
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setProduct({ ...product, tags: product.tags.filter(tag => tag !== tagToRemove) });
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/produtos" className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${product.status === 'Ativo'
                                ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                                }`}>
                                {product.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">SKU: {product.sku} • {product.category}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver na Loja
                    </Button>
                    <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                    </Button>
                </div>
            </div>

            {/* Simplified Top Section: Status & Stock */}
            <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Status Group */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-40">
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Status</label>
                            <Dropdown
                                options={['Ativo', 'Rascunho', 'Esgotado']}
                                value={product.status}
                                onChange={(val) => setProduct({ ...product, status: val as any })}
                            />
                        </div>
                        <div className="h-10 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-2 pt-5">
                            <Checkbox
                                id="promo-active"
                                checked={product.isPromotionActive}
                                onChange={(e) => setProduct({ ...product, isPromotionActive: e.target.checked })}
                            />
                            <label htmlFor="promo-active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                Promoção Ativa
                            </label>
                        </div>
                    </div>

                    {/* Stock Group */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">SKU</label>
                            <input
                                type="text"
                                value={product.sku}
                                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                                className="w-32 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Estoque</label>
                            <input
                                type="number"
                                value={product.stock}
                                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) || 0 })}
                                className="w-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Mínimo</label>
                            <input
                                type="number"
                                value={product.minStock}
                                onChange={(e) => setProduct({ ...product, minStock: parseInt(e.target.value) || 0 })}
                                className="w-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
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
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-[#121212] p-5 rounded-xl border dark:border-white/5 shadow-sm">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Vendas Totais</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{product.totalSales}</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="bg-green-100 dark:bg-green-500/10 px-1.5 py-0.5 rounded">+12%</span>
                                    este mês
                                </p>
                            </div>
                            <div className="bg-white dark:bg-[#121212] p-5 rounded-xl border dark:border-white/5 shadow-sm">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Receita Gerada</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">R$ {(product.totalSales * currentPrice).toLocaleString('pt-BR')}</h3>
                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="bg-green-100 dark:bg-green-500/10 px-1.5 py-0.5 rounded">+8%</span>
                                    este mês
                                </p>
                            </div>
                            <div className="bg-white dark:bg-[#121212] p-5 rounded-xl border dark:border-white/5 shadow-sm">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Lucro Total Estimado</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">R$ {(product.totalSales * profit).toLocaleString('pt-BR')}</h3>
                                <p className="text-xs text-gray-500 mt-1">Baseado na margem atual</p>
                            </div>
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Sales Performance Chart */}
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Desempenho de Vendas</h3>
                                    <select className="text-xs bg-gray-50 dark:bg-white/5 border-none rounded-lg px-2 py-1 outline-none">
                                        <option>Últimos 30 dias</option>
                                        <option>Últimos 6 meses</option>
                                        <option>Este ano</option>
                                    </select>
                                </div>
                                <div className="h-64 flex items-end justify-between gap-2">
                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                                        <div key={i} className="w-full bg-gray-100 dark:bg-white/5 rounded-t-lg relative group h-full flex items-end">
                                            <div
                                                className="w-full bg-black dark:bg-white rounded-t-lg transition-all duration-500 hover:opacity-80"
                                                style={{ height: `${h}%` }}
                                            />
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                                {h} vendas
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-gray-500">
                                    <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                                    <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
                                </div>
                            </div>

                            {/* Profit Line Chart */}
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Lucro Mensal (R$)</h3>
                                    <select className="text-xs bg-gray-50 dark:bg-white/5 border-none rounded-lg px-2 py-1 outline-none">
                                        <option>Últimos 12 meses</option>
                                    </select>
                                </div>

                                {/* Chart Container */}
                                <div className="h-64 relative w-full">
                                    {/* Grid Lines (Background) */}
                                    <div className="absolute inset-0 flex flex-col justify-between text-gray-200 dark:text-white/5 pointer-events-none">
                                        <div className="border-t border-current w-full h-0"></div>
                                        <div className="border-t border-current w-full h-0"></div>
                                        <div className="border-t border-current w-full h-0"></div>
                                        <div className="border-t border-current w-full h-0"></div>
                                        <div className="border-t border-current w-full h-0"></div>
                                    </div>

                                    {/* SVG Line */}
                                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M0,80 L9,70 L18,75 L27,60 L36,65 L45,40 L54,45 L63,30 L72,35 L81,20 L90,25 L100,10"
                                            fill="none"
                                            stroke="#22c55e"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        <path
                                            d="M0,80 L9,70 L18,75 L27,60 L36,65 L45,40 L54,45 L63,30 L72,35 L81,20 L90,25 L100,10 L100,100 L0,100 Z"
                                            fill="url(#profitGradient)"
                                            stroke="none"
                                        />
                                    </svg>

                                    {/* Data Points (HTML for better interaction) */}
                                    {[
                                        { x: 0, y: 80, val: 2000 }, { x: 9, y: 70, val: 3000 }, { x: 18, y: 75, val: 2500 },
                                        { x: 27, y: 60, val: 4000 }, { x: 36, y: 65, val: 3500 }, { x: 45, y: 40, val: 6000 },
                                        { x: 54, y: 45, val: 5500 }, { x: 63, y: 30, val: 7000 }, { x: 72, y: 35, val: 6500 },
                                        { x: 81, y: 20, val: 8000 }, { x: 90, y: 25, val: 7500 }, { x: 100, y: 10, val: 9000 }
                                    ].map((point, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-green-500 border-2 border-white dark:border-[#121212] cursor-pointer group hover:scale-125 transition-transform z-10"
                                            style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                                                R$ {point.val}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-gray-500">
                                    <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                                    <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity / Alerts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Alertas e Sugestões</h3>
                                <div className="space-y-3">
                                    {product.stock <= product.minStock && (
                                        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                                            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-red-700 dark:text-red-400">Estoque Baixo</p>
                                                <p className="text-xs text-red-600 dark:text-red-300 mt-0.5">Restam apenas {product.stock} unidades. Considere repor o estoque.</p>
                                            </div>
                                        </div>
                                    )}
                                    {margin < 20 && (
                                        <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
                                            <TrendingDown className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Margem Baixa</p>
                                                <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-0.5">Sua margem de lucro está abaixo de 20%. Revise seus custos ou preço de venda.</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Alta Procura</p>
                                            <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">Este produto teve um aumento de 15% nas visualizações esta semana.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Últimos Pedidos</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b dark:border-white/5 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xs font-bold">
                                                    #{1000 + i}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">João Silva</p>
                                                    <p className="text-xs text-gray-500">Há 2 horas</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">R$ {currentPrice.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pricing' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Definição de Preços</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preço de Venda</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preço Promocional</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.promotionalPrice}
                                            onChange={(e) => setProduct({ ...product, promotionalPrice: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Custo do Produto</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.costPrice}
                                            onChange={(e) => setProduct({ ...product, costPrice: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Custos Adicionais & Taxas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">ICMS (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxIcms}
                                        onChange={(e) => setProduct({ ...product, taxIcms: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">IPI (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxIpi}
                                        onChange={(e) => setProduct({ ...product, taxIpi: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">PIS (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxPis}
                                        onChange={(e) => setProduct({ ...product, taxPis: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">COFINS (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxCofins}
                                        onChange={(e) => setProduct({ ...product, taxCofins: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t dark:border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Taxa da Plataforma (%)</label>
                                    <input
                                        type="number"
                                        value={product.platformFee}
                                        onChange={(e) => setProduct({ ...product, platformFee: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">R$ {feeAmount.toFixed(2)} por unidade</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Outros Custos (R$)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.additionalCost}
                                            onChange={(e) => setProduct({ ...product, additionalCost: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-medium text-gray-500">Total de Impostos</span>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">{totalTaxRate.toFixed(2)}%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium text-gray-500">Valor em R$</span>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">R$ {taxAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Análise de Lucratividade Real</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                    <p className="text-xs text-gray-500 font-medium mb-1">Preço Final</p>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">R$ {currentPrice.toFixed(2)}</h4>
                                    <div className="mt-2 text-[10px] text-gray-400 space-y-1">
                                        <div className="flex justify-between"><span>Custo Prod.:</span> <span>- R$ {product.costPrice.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Impostos:</span> <span>- R$ {taxAmount.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Taxas:</span> <span>- R$ {feeAmount.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Outros:</span> <span>- R$ {product.additionalCost.toFixed(2)}</span></div>
                                    </div>
                                </div>
                                <div className={`p-4 rounded-xl border ${profit > 0 ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20' : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20'}`}>
                                    <p className={`text-xs font-medium mb-1 ${profit > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>Lucro Líquido</p>
                                    <h4 className={`text-2xl font-bold ${profit > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>R$ {profit.toFixed(2)}</h4>
                                    <p className={`text-xs mt-1 ${profit > 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}>
                                        Por unidade vendida
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-1">Margem de Lucro</p>
                                    <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{margin.toFixed(1)}%</h4>
                                    <div className="w-full bg-blue-200 dark:bg-blue-900/30 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(Math.max(margin, 0), 100)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'images' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Image Grid */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Galeria do Produto ({product.images.length})</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {/* Add Image Button */}
                                <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors cursor-pointer flex flex-col items-center justify-center text-center group bg-gray-50 dark:bg-white/5">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors mb-2" />
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">Adicionar</span>
                                </div>

                                {product.images.map((img, i) => (
                                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                        <img src={img} alt={`Produto ${i + 1}`} className="w-full h-full object-cover" />

                                        {/* Cover Badge */}
                                        {i === 0 && (
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-white" />
                                                Capa
                                            </div>
                                        )}

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                                            {i !== 0 && (
                                                <button
                                                    onClick={() => {
                                                        const newImages = [...product.images];
                                                        const [movedImage] = newImages.splice(i, 1);
                                                        if (movedImage) {
                                                            newImages.unshift(movedImage);
                                                            setProduct({ ...product, images: newImages });
                                                        }
                                                    }}
                                                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Star className="w-3 h-3" />
                                                    Definir como Capa
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    const newImages = product.images.filter((_, index) => index !== i);
                                                    setProduct({ ...product, images: newImages });
                                                }}
                                                className="w-full py-2 bg-red-500/80 hover:bg-red-500 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Basic Info - Moved from Details */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Informações Básicas
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Produto</label>
                                    <input
                                        type="text"
                                        value={product.name}
                                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                                    <textarea
                                        rows={6}
                                        value={product.description}
                                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Marca</label>
                                        <Dropdown
                                            options={['Lizze', 'Vyz', 'Dejavu']}
                                            value={product.brand}
                                            onChange={(val) => setProduct({ ...product, brand: val })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                                        <Dropdown
                                            options={['Elétricos', 'Cabelos', 'Unhas']}
                                            value={product.category}
                                            onChange={(val) => setProduct({ ...product, category: val, subcategory: subcategories[val]?.[0] || '' })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategoria</label>
                                        <Dropdown
                                            options={subcategories[product.category] || []}
                                            value={product.subcategory || ''}
                                            onChange={(val) => setProduct({ ...product, subcategory: val })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                SEO (Otimização para Buscas)
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Página (Meta Title)</label>
                                    <input
                                        type="text"
                                        value={product.seoTitle}
                                        onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Recomendado: Até 60 caracteres. Atual: {product.seoTitle.length}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição (Meta Description)</label>
                                    <textarea
                                        rows={3}
                                        value={product.seoDescription}
                                        onChange={(e) => setProduct({ ...product, seoDescription: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Recomendado: Até 160 caracteres. Atual: {product.seoDescription.length}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">URL Amigável (Slug)</label>
                                    <div className="flex">
                                        <span className="bg-gray-100 dark:bg-white/10 border border-r-0 border-gray-200 dark:border-white/10 rounded-l-lg px-3 py-2.5 text-sm text-gray-500">
                                            loja.com/produto/
                                        </span>
                                        <input
                                            type="text"
                                            value={product.slug}
                                            onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                                            className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-r-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Settings */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                Envio e Dimensões
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Peso (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={product.weight}
                                        onChange={(e) => setProduct({ ...product, weight: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Largura (cm)</label>
                                    <input
                                        type="number"
                                        value={product.width}
                                        onChange={(e) => setProduct({ ...product, width: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Altura (cm)</label>
                                    <input
                                        type="number"
                                        value={product.height}
                                        onChange={(e) => setProduct({ ...product, height: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Profundidade (cm)</label>
                                    <input
                                        type="number"
                                        value={product.depth}
                                        onChange={(e) => setProduct({ ...product, depth: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Tags do Produto
                            </h3>
                            <div>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Digite uma tag e pressione Enter..."
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all mb-3"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium text-gray-700 dark:text-gray-300">
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
