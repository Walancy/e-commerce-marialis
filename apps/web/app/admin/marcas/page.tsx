"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Dropdown } from '../../../components/ui/Dropdown';

interface Brand {
    id: number;
    name: string;
    logo: string;
    productsCount: number;
    status: 'Ativo' | 'Inativo';
}

export default function BrandsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

    const [brands, setBrands] = useState<Brand[]>([
        { id: 1, name: "Lizze", logo: "https://placehold.co/100x100/png?text=Lizze", productsCount: 12, status: 'Ativo' },
        { id: 2, name: "Vyz", logo: "https://placehold.co/100x100/png?text=Vyz", productsCount: 8, status: 'Ativo' },
        { id: 3, name: "Dejavu", logo: "https://placehold.co/100x100/png?text=Dejavu", productsCount: 5, status: 'Ativo' },
        { id: 4, name: "Nátylla", logo: "https://placehold.co/100x100/png?text=Natylla", productsCount: 15, status: 'Ativo' },
    ]);

    const [formData, setFormData] = useState<Partial<Brand>>({
        name: '',
        logo: '',
        status: 'Ativo'
    });

    const handleOpenModal = (brand?: Brand) => {
        if (brand) {
            setEditingBrand(brand);
            setFormData(brand);
        } else {
            setEditingBrand(null);
            setFormData({
                name: '',
                logo: '',
                status: 'Ativo'
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBrand) {
            setBrands(brands.map(b => b.id === editingBrand.id ? { ...b, ...formData } as Brand : b));
        } else {
            const newBrand = {
                ...formData,
                id: Math.max(...brands.map(b => b.id), 0) + 1,
                productsCount: 0
            } as Brand;
            setBrands([...brands, newBrand]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir esta marca?')) {
            setBrands(brands.filter(b => b.id !== id));
        }
    };

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Marcas</h1>
                    <p className="text-sm text-gray-500 mt-1">Cadastre e edite as marcas parceiras</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Marca
                </Button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar marcas..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                    />
                </div>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBrands.map((brand) => (
                    <div key={brand.id} className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm hover:shadow-md transition-all group relative">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center p-2 border dark:border-white/5">
                                {brand.logo ? (
                                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-gray-300" />
                                )}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${brand.status === 'Ativo'
                                ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                                }`}>
                                {brand.status}
                            </span>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{brand.name}</h3>
                            <p className="text-sm text-gray-500">{brand.productsCount} produtos cadastrados</p>
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleOpenModal(brand)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(brand.id)}
                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#121212] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {editingBrand ? 'Editar Marca' : 'Nova Marca'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Marca</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="Ex: Lizze"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Logo da Marca</label>
                                <div className="border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative group">
                                    {formData.logo ? (
                                        <div className="relative w-20 h-20">
                                            <img src={formData.logo} alt="Preview" className="w-full h-full object-contain" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-2">
                                                <Upload className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <p className="text-xs text-gray-500">Clique para enviar logo</p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                // Fake upload - in real app would upload to server
                                                const url = URL.createObjectURL(file);
                                                setFormData({ ...formData, logo: url });
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                <Dropdown
                                    options={['Ativo', 'Inativo']}
                                    value={formData.status}
                                    onChange={(val) => setFormData({ ...formData, status: val as any })}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit">
                                    Salvar Marca
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
