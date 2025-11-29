"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Upload, X, Image as ImageIcon, Filter } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Dropdown } from '../../../components/ui/Dropdown';
import { DataTable } from '../../../components/ui/DataTable';
import { ConfirmModal } from '../../../components/ui/Modal';
import { useRouter } from 'next/navigation';

interface Brand {
    id: number;
    name: string;
    logo: string;
    productsCount: number;
    totalSales: number;
    revenue: number;
    status: 'Ativo' | 'Inativo';
}

export default function BrandsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<number | null>(null);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

    const [brands, setBrands] = useState<Brand[]>([
        { id: 1, name: "Lizze", logo: "https://placehold.co/100x100/png?text=Lizze", productsCount: 12, totalSales: 1540, revenue: 450000.00, status: 'Ativo' },
        { id: 2, name: "Vyz", logo: "https://placehold.co/100x100/png?text=Vyz", productsCount: 8, totalSales: 890, revenue: 120000.00, status: 'Ativo' },
        { id: 3, name: "Dejavu", logo: "https://placehold.co/100x100/png?text=Dejavu", productsCount: 5, totalSales: 450, revenue: 85000.00, status: 'Ativo' },
        { id: 4, name: "Nátylla", logo: "https://placehold.co/100x100/png?text=Natylla", productsCount: 15, totalSales: 2100, revenue: 680000.00, status: 'Ativo' },
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
                productsCount: 0,
                totalSales: 0,
                revenue: 0
            } as Brand;
            setBrands([...brands, newBrand]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setBrandToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (brandToDelete) {
            setBrands(brands.filter(b => b.id !== brandToDelete));
            setBrandToDelete(null);
        }
    };

    const filteredBrands = brands.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'Todos' || b.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

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

            {/* Filters Bar */}
            <div className="mb-6 bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative w-full lg:flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar marcas..."
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                        />
                    </div>

                    <div className="h-px w-full lg:h-10 lg:w-px bg-gray-200 dark:bg-white/10" />

                    <div className="w-48">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                        <Dropdown
                            options={['Todos', 'Ativo', 'Inativo']}
                            value={filterStatus}
                            onChange={setFilterStatus}
                        />
                    </div>
                </div>
            </div>

            {/* Brands Table */}
            <DataTable<Brand>
                data={filteredBrands}
                keyField="id"
                onRowClick={(brand) => router.push(`/admin/marcas/${brand.id}`)}
                columns={[
                    {
                        header: 'Marca',
                        accessorKey: 'name',
                        sortable: true,
                        cell: (brand) => (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center p-1 border dark:border-white/5">
                                    {brand.logo ? (
                                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <ImageIcon className="w-5 h-5 text-gray-300" />
                                    )}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{brand.name}</span>
                            </div>
                        )
                    },
                    {
                        header: 'Produtos',
                        accessorKey: 'productsCount',
                        sortable: true,
                        cell: (brand) => (
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900 dark:text-white">{brand.productsCount}</span>
                                <span className="text-xs text-gray-400">cadastrados</span>
                            </div>
                        )
                    },
                    {
                        header: 'Vendas',
                        accessorKey: 'totalSales',
                        sortable: true,
                        cell: (brand) => (
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white">{brand.totalSales}</span>
                                <span className="text-xs text-gray-400">unidades</span>
                            </div>
                        )
                    },
                    {
                        header: 'Receita',
                        accessorKey: 'revenue',
                        sortable: true,
                        cell: (brand) => (
                            <div className="flex flex-col">
                                <span className="font-bold text-green-600 dark:text-green-400">
                                    {brand.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                        )
                    },
                    {
                        header: 'Status',
                        accessorKey: 'status',
                        sortable: true,
                        cell: (brand) => (
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${brand.status === 'Ativo'
                                ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                                }`}>
                                {brand.status}
                            </span>
                        )
                    },
                    {
                        header: 'Ações',
                        className: 'text-right',
                        cell: (brand) => (
                            <div className="flex items-center justify-end gap-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenModal(brand);
                                    }}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors"
                                    title="Editar"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(brand.id);
                                    }}
                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-500 dark:text-gray-500 transition-colors"
                                    title="Excluir"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    }
                ]}
            />

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
            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Excluir Marca"
                description="Tem certeza que deseja excluir esta marca? Esta ação não pode ser desfeita e removerá a associação com todos os produtos."
                confirmText="Excluir"
                variant="danger"
            />
        </div>
    );
}
