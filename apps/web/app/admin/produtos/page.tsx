"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter, X, Upload, Image as ImageIcon, Save } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SearchInput } from '../../../components/ui/SearchInput';
import { Dropdown } from '../../../components/ui/Dropdown';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    promotionalPrice?: number;
    category: string;
    brand: string;
    stock: number;
    sku: string;
    status: 'Ativo' | 'Rascunho' | 'Esgotado';
    images: string[];
}

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Mock initial data
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "Prancha Lizze Extreme",
            description: "A melhor prancha do mercado.",
            price: 499.00,
            category: "Elétricos",
            brand: "Lizze",
            stock: 45,
            sku: "LIZ-EXT-001",
            status: "Ativo",
            images: ["/product-flat-iron.png"]
        },
        {
            id: 2,
            name: "Kit Repair Vyz",
            description: "Reconstrução total.",
            price: 149.90,
            category: "Cabelos",
            brand: "Vyz",
            stock: 120,
            sku: "VYZ-REP-002",
            status: "Ativo",
            images: ["/product-shampoo.png"]
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
        images: []
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
                category: 'Cabelos',
                brand: '',
                stock: 0,
                sku: '',
                status: 'Ativo',
                images: []
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
                images: formData.images?.length ? formData.images : ['https://placehold.co/400x400/png?text=Product']
            } as Product;
            setProducts([...products, newProduct]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Produtos</h1>
                    <p className="text-xs text-gray-500">Gerencie seu catálogo</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex gap-3 mb-4">
                <SearchInput
                    placeholder="Buscar por nome ou SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    containerClassName="flex-1 max-w-sm"
                />
                <Button variant="outline">
                    <Filter className="w-3.5 h-3.5 mr-2" />
                    Filtros
                </Button>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b dark:border-white/5">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Produto</th>
                                <th className="px-4 py-3 font-medium text-gray-500">SKU</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Categoria</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Preço</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Estoque</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                <th className="px-4 py-3 font-medium text-gray-500 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-white/5">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-100 dark:bg-white/5 overflow-hidden flex-shrink-0">
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                <p className="text-[10px] text-gray-500">{product.brand}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{product.sku}</td>
                                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{product.category}</td>
                                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">R$ {product.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{product.stock} un</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${product.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                                product.status === 'Rascunho' ? 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400' :
                                                    'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
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
                                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preço Promocional (R$)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.promotionalPrice || ''}
                                                onChange={(e) => setFormData({ ...formData, promotionalPrice: parseFloat(e.target.value) })}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Images Section */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Imagens do Produto</label>
                                        <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-3">
                                                <Upload className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Clique para fazer upload</p>
                                            <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG ou GIF (max. 2MB)</p>
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
            )}
        </div>
    );
}
