"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter, X, Upload, Image as ImageIcon, Save, Search, ChevronDown, Check, MoreHorizontal, Download, FileSpreadsheet, Tag, Copy, Eye, Package } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Dropdown } from '../../../components/ui/Dropdown';
import { Checkbox } from '../../../components/ui/Checkbox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock Data Types
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    promotionalPrice?: number;
    isPromotionActive: boolean;
    category: string;
    subcategory?: string;
    brand: string;
    stock: number;
    sku: string;
    status: 'Ativo' | 'Rascunho' | 'Esgotado';
    images: string[];
    sales30d: number;
}

const brandLogos: Record<string, string> = {
    'Lizze': '/marcas/Vector.svg',
    'Vyz': '/marcas/vyz.svg',
    'Dejavu': '/marcas/Subtract.svg',
    'Nátylla': '/marcas/natylla.svg',
    'Due': '/marcas/due.svg',
    'ArtBelle': '/marcas/artbelle.svg'
};

const subcategories: Record<string, string[]> = {
    'Elétricos': ['Secadores', 'Pranchas', 'Modeladores', 'Máquinas'],
    'Cabelos': ['Shampoos', 'Condicionadores', 'Máscaras', 'Finalizadores', 'Kits'],
    'Unhas': ['Esmaltes', 'Géis', 'Alicates', 'Acessórios'],
    'Pele': ['Hidratantes', 'Limpeza', 'Protetor Solar'],
    'Móveis': ['Cadeiras', 'Lavatórios', 'Carrinhos'],
    'Kits': ['Capilar', 'Manicure', 'Profissional']
};

export default function ProductsPage() {
    const router = useRouter();

    // Filter States
    const [filterBrand, setFilterBrand] = useState('Todas');
    const [filterCategory, setFilterCategory] = useState('Todas');
    const [filterSubcategory, setFilterSubcategory] = useState('Todas');
    const [searchQuery, setSearchQuery] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

    // Mock initial data
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "Secador Lizze Extreme",
            description: "O melhor secador do mercado.",
            price: 499.90,
            promotionalPrice: 450.00,
            isPromotionActive: true,
            category: "Elétricos",
            subcategory: "Secadores",
            brand: "Lizze",
            stock: 45,
            sku: "LIZ-EXT-001",
            status: 'Ativo',
            images: ["https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=100"],
            sales30d: 120
        },
        {
            id: 2,
            name: "Shampoo Hidratante",
            description: "Hidratação profunda.",
            price: 89.90,
            isPromotionActive: false,
            category: "Cabelos",
            subcategory: "Shampoos",
            brand: "Nátylla",
            stock: 120,
            sku: "NAT-SHA-001",
            status: 'Ativo',
            images: ["https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=100"],
            sales30d: 85
        },
        {
            id: 3,
            name: "Máscara Reconstrutora",
            description: "Reconstrução total dos fios.",
            price: 129.90,
            isPromotionActive: false,
            category: "Cabelos",
            subcategory: "Máscaras",
            brand: "Dejavu",
            stock: 30,
            sku: "DEJ-MAS-001",
            status: 'Ativo',
            images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=100"],
            sales30d: 64
        },
        {
            id: 4,
            name: "Kit Esmaltes Gel",
            description: "Cores vibrantes.",
            price: 159.90,
            isPromotionActive: false,
            category: "Unhas",
            subcategory: "Esmaltes",
            brand: "Vyz",
            stock: 0,
            sku: "VYZ-KIT-001",
            status: 'Esgotado',
            images: ["https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?auto=format&fit=crop&q=80&w=100"],
            sales30d: 42
        },
        {
            id: 5,
            name: "Prancha Nano Titanium",
            description: "Alisamento perfeito.",
            price: 399.90,
            isPromotionActive: false,
            category: "Elétricos",
            subcategory: "Pranchas",
            brand: "Lizze",
            stock: 15,
            sku: "LIZ-PRA-001",
            status: 'Ativo',
            images: ["https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=100"],
            sales30d: 98
        },
        {
            id: 6,
            name: "Óleo Reparador",
            description: "Brilho e maciez.",
            price: 49.90,
            isPromotionActive: false,
            category: "Cabelos",
            subcategory: "Finalizadores",
            brand: "Due",
            stock: 200,
            sku: "DUE-OLE-001",
            status: 'Ativo',
            images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100"],
            sales30d: 156
        },
    ]);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        sku: '',
        status: 'Ativo',
        images: [],
        sales30d: 0,
        isPromotionActive: false,
        promotionalPrice: 0
    });

    const brands = ['Todas', 'Lizze', 'Vyz', 'Dejavu', 'Nátylla', 'Due', 'ArtBelle'];
    const categories = ['Todas', 'Elétricos', 'Cabelos', 'Unhas', 'Pele', 'Móveis', 'Kits'];

    const filteredProducts = products.filter(product => {
        const matchesBrand = filterBrand === 'Todas' || product.brand === filterBrand;
        const matchesCategory = filterCategory === 'Todas' || product.category === filterCategory;
        const matchesSubcategory = filterSubcategory === 'Todas' || product.subcategory === filterSubcategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesBrand && matchesCategory && matchesSubcategory && matchesSearch;
    });

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: 0,
                promotionalPrice: 0,
                isPromotionActive: false,
                category: 'Cabelos',
                brand: '',
                stock: 0,
                sku: '',
                status: 'Ativo',
                images: [],
                sales30d: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            // Update existing
            setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } as Product : p));
        } else {
            // Create new
            const newProduct = {
                ...formData,
                id: Math.max(...products.map(p => p.id), 0) + 1,
                images: formData.images?.length ? formData.images : ['https://placehold.co/400x400/png?text=Product'],
                sales30d: 0
            } as Product;
            setProducts([...products, newProduct]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            setProducts(products.filter(p => p.id !== id));
            setSelectedProductIds(selectedProductIds.filter(pid => pid !== id));
        }
    };

    const toggleSelectProduct = (id: number) => {
        if (selectedProductIds.includes(id)) {
            setSelectedProductIds(selectedProductIds.filter(pid => pid !== id));
        } else {
            setSelectedProductIds([...selectedProductIds, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedProductIds.length === filteredProducts.length) {
            setSelectedProductIds([]);
        } else {
            setSelectedProductIds(filteredProducts.map(p => p.id));
        }
    };

    const handleBulkDelete = () => {
        if (confirm(`Tem certeza que deseja excluir ${selectedProductIds.length} produtos?`)) {
            setProducts(products.filter(p => !selectedProductIds.includes(p.id)));
            setSelectedProductIds([]);
        }
    };

    const handleBulkPromotion = (active: boolean) => {
        setProducts(products.map(p => selectedProductIds.includes(p.id) ? { ...p, isPromotionActive: active } : p));
        setSelectedProductIds([]);
    };

    const handleBulkStatusChange = (status: 'Ativo' | 'Rascunho' | 'Esgotado') => {
        setProducts(products.map(p => selectedProductIds.includes(p.id) ? { ...p, status } : p));
        setSelectedProductIds([]);
    };

    const handleExport = () => {
        // Simple CSV Export
        const headers = ['ID', 'Nome', 'SKU', 'Categoria', 'Preço', 'Preço Promocional', 'Em Promoção', 'Estoque', 'Status'];
        const csvContent = [
            headers.join(','),
            ...products.map(p => [
                p.id,
                `"${p.name}"`,
                p.sku,
                p.category,
                p.price,
                p.promotionalPrice || 0,
                p.isPromotionActive ? 'Sim' : 'Não',
                p.stock,
                p.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'produtos_marialis.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = () => {
        alert('Funcionalidade de importação seria implementada aqui (requer processamento de arquivo).');
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Produtos</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie seu catálogo de produtos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </Button>
                    <Button variant="outline" onClick={handleImport}>
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Importar
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/admin/produtos/novo?type=kit')}>
                        <Package className="w-4 h-4 mr-2" />
                        Criar Kit
                    </Button>
                    <Button onClick={() => router.push('/admin/produtos/novo')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Produto
                    </Button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="mb-6 bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-2 lg:pb-0">
                        <div className="w-48">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Marca</label>
                            <Dropdown
                                options={brands}
                                value={filterBrand}
                                onChange={setFilterBrand}
                            />
                        </div>
                        <div className="w-48">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Categoria</label>
                            <Dropdown
                                options={categories}
                                value={filterCategory}
                                onChange={(val) => {
                                    setFilterCategory(val);
                                    setFilterSubcategory('Todas'); // Reset subcategory when category changes
                                }}
                            />
                        </div>
                        <div className="w-48">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Subcategoria</label>
                            <Dropdown
                                options={['Todas', ...(subcategories[filterCategory] || [])]}
                                value={filterSubcategory}
                                onChange={setFilterSubcategory}
                            />
                        </div>
                    </div>

                    <div className="relative w-full lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedProductIds.length > 0 && (
                <div className="mb-6 bg-black dark:bg-white text-white dark:text-black p-4 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-sm">{selectedProductIds.length} selecionados</span>
                        <div className="h-4 w-px bg-white/20 dark:bg-black/20" />
                        <button onClick={() => handleBulkPromotion(true)} className="text-sm hover:underline flex items-center gap-1">
                            <Check className="w-3 h-3" /> Ativar Promoção
                        </button>
                        <button onClick={() => handleBulkPromotion(false)} className="text-sm hover:underline flex items-center gap-1">
                            <X className="w-3 h-3" /> Desativar Promoção
                        </button>
                        <div className="h-4 w-px bg-white/20 dark:bg-black/20" />
                        <div className="flex items-center gap-2">
                            <span className="text-sm opacity-70">Alterar Status:</span>
                            <div className="flex gap-1">
                                <button onClick={() => handleBulkStatusChange('Ativo')} className="px-2 py-1 bg-white/10 dark:bg-black/10 rounded text-xs hover:bg-white/20 dark:hover:bg-black/20">Ativo</button>
                                <button onClick={() => handleBulkStatusChange('Rascunho')} className="px-2 py-1 bg-white/10 dark:bg-black/10 rounded text-xs hover:bg-white/20 dark:hover:bg-black/20">Rascunho</button>
                                <button onClick={() => handleBulkStatusChange('Esgotado')} className="px-2 py-1 bg-white/10 dark:bg-black/10 rounded text-xs hover:bg-white/20 dark:hover:bg-black/20">Esgotado</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={handleExport} className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 dark:hover:text-gray-600 transition-colors">
                            <Download className="w-4 h-4" />
                            Exportar
                        </button>
                        <button onClick={handleBulkDelete} className="flex items-center gap-2 text-sm font-bold hover:text-red-400 dark:hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                            Excluir
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 border-b dark:border-white/5">
                            <tr>
                                <th className="px-6 py-4 w-10">
                                    <Checkbox
                                        checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4 font-medium">Produto</th>
                                <th className="px-6 py-4 font-medium">Categoria</th>
                                <th className="px-6 py-4 font-medium">Preço</th>
                                <th className="px-6 py-4 font-medium">Estoque</th>
                                <th className="px-6 py-4 font-medium">Vendas (30d)</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-white/5">
                            {filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer ${selectedProductIds.includes(product.id) ? 'bg-gray-50 dark:bg-white/5' : ''}`}
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('input[type="checkbox"]') || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
                                        router.push(`/admin/produtos/${product.id}`);
                                    }}
                                >
                                    <td className="px-6 py-4">
                                        <Checkbox
                                            checked={selectedProductIds.includes(product.id)}
                                            onChange={() => toggleSelectProduct(product.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            {/* Brand Logo - Increased Size */}
                                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 border dark:border-white/10 flex items-center justify-center p-2 shadow-sm shrink-0">
                                                <img
                                                    src={brandLogos[product.brand] || '/icon-marialis.png'}
                                                    alt={product.brand}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 overflow-hidden relative shrink-0">
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                {product.isPromotionActive && (
                                                    <div className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-bl-lg" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white group-hover:underline decoration-1 underline-offset-2">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.brand} • {product.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        <span className="block">{product.category}</span>
                                        <span className="text-xs text-gray-400">{product.subcategory}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {product.isPromotionActive && product.promotionalPrice ? (
                                            <div className="flex flex-col">
                                                <span className="text-red-500 font-bold">{product.promotionalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                                <span className="text-xs text-gray-400 line-through">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                            </div>
                                        ) : (
                                            product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                        {product.stock} un
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gray-900 dark:text-white">{product.sales30d}</span>
                                            <span className="text-xs text-gray-400">vendas</span>
                                        </div>
                                        <div className="w-24 h-1 bg-gray-100 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 rounded-full"
                                                style={{ width: `${Math.min((product.sales30d / 200) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.status === 'Ativo'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                            : product.status === 'Esgotado'
                                                ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Duplicate logic
                                                    const newProduct = { ...product, id: Math.max(...products.map(p => p.id)) + 1, name: `${product.name} (Cópia)`, status: 'Rascunho' as const };
                                                    setProducts([...products, newProduct]);
                                                }}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                                title="Duplicar"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/admin/produtos/${product.id}`);
                                                }}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                                title="Editar"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // View in store logic (mock)
                                                    window.open(`/produto/${product.sku}`, '_blank');
                                                }}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                                title="Ver na Loja"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(product.id);
                                                }}
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                                                title="Excluir"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div >
            </div >

            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white dark:bg-[#121212] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Main Info */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Produto</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                                    placeholder="Ex: Prancha Lizze Extreme"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                                                <textarea
                                                    rows={4}
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                                    placeholder="Descreva o produto detalhadamente..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preço (R$)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Preço Promocional</label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <Checkbox
                                                            checked={formData.isPromotionActive}
                                                            onChange={(e) => setFormData({ ...formData, isPromotionActive: e.target.checked })}
                                                        />
                                                        <span className="text-[10px] text-gray-500">Ativar</span>
                                                    </label>
                                                </div>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    disabled={!formData.isPromotionActive}
                                                    value={formData.promotionalPrice || ''}
                                                    onChange={(e) => setFormData({ ...formData, promotionalPrice: parseFloat(e.target.value) })}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all disabled:opacity-50"
                                                />
                                            </div>
                                        </div>

                                        {/* Images Section */}
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Imagens do Produto</label>
                                            <div className="grid grid-cols-3 gap-4">
                                                {/* Add Image Button */}
                                                <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors cursor-pointer flex flex-col items-center justify-center text-center group bg-gray-50 dark:bg-white/5">
                                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors mb-2" />
                                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">Adicionar</span>
                                                </div>

                                                {/* Image List */}
                                                {formData.images?.map((img, i) => (
                                                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                                        <img src={img} alt={`Produto ${i + 1}`} className="w-full h-full object-cover" />

                                                        {/* Actions Overlay */}
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newImages = formData.images?.filter((_, index) => index !== i);
                                                                    setFormData({ ...formData, images: newImages });
                                                                }}
                                                                className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Details */}
                                    <div className="space-y-6">
                                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                <Save className="w-4 h-4" />
                                                Organização
                                            </h3>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                                <Dropdown
                                                    options={['Ativo', 'Rascunho', 'Esgotado']}
                                                    value={formData.status}
                                                    onChange={(val) => setFormData({ ...formData, status: val as any })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                                                <Dropdown
                                                    options={['Cabelos', 'Elétricos', 'Unhas', 'Pele', 'Móveis']}
                                                    value={formData.category}
                                                    onChange={(val) => setFormData({ ...formData, category: val })}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Marca</label>
                                                <input
                                                    type="text"
                                                    value={formData.brand}
                                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                    className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                                    placeholder="Ex: Lizze"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl space-y-4">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Estoque</h3>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                                                <input
                                                    type="text"
                                                    value={formData.sku}
                                                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                                    className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                                    placeholder="Ex: LIZ-001"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quantidade</label>
                                                <input
                                                    type="number"
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                                    className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleSave}
                                >
                                    Salvar Produto
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
