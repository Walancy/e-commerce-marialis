"use client";

import React, { useState } from 'react';
import { Plus, Tag, Copy, Calendar, X, Save, Trash2, Edit, Search, Filter, MoreHorizontal, Check, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Dropdown } from '../../../components/ui/Dropdown';
import { DataTable } from '../../../components/ui/DataTable';
import { ConfirmModal } from '../../../components/ui/Modal';

interface Coupon {
    id: number;
    code: string;
    discount: string;
    type: 'Porcentagem' | 'Valor Fixo' | 'Frete Grátis';
    uses: number;
    status: 'Ativo' | 'Agendado' | 'Expirado';
    expiry: string;
}

export default function CouponsPage() {
    // State
    const [activeTab, setActiveTab] = useState('todos');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('Todos');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [couponToDelete, setCouponToDelete] = useState<number | null>(null);
    const [isBulkDelete, setIsBulkDelete] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);

    // Data
    const [coupons, setCoupons] = useState<Coupon[]>([
        { id: 1, code: "BEMVINDO10", discount: "10%", type: "Porcentagem", uses: 145, status: "Ativo", expiry: "2024-12-31" },
        { id: 2, code: "FRETEGRATIS", discount: "Frete", type: "Frete Grátis", uses: 89, status: "Ativo", expiry: "2024-11-30" },
        { id: 3, code: "BLACKFRIDAY", discount: "50%", type: "Porcentagem", uses: 0, status: "Agendado", expiry: "2024-11-29" },
        { id: 4, code: "NATAL2024", discount: "R$ 50,00", type: "Valor Fixo", uses: 12, status: "Ativo", expiry: "2024-12-25" },
        { id: 5, code: "VERAO2024", discount: "20%", type: "Porcentagem", uses: 340, status: "Expirado", expiry: "2024-03-20" },
    ]);

    const [formData, setFormData] = useState<Partial<Coupon>>({
        code: '',
        discount: '',
        type: 'Porcentagem',
        status: 'Ativo',
        expiry: ''
    });

    // Computed
    const filteredCoupons = coupons.filter(coupon => {
        const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab =
            activeTab === 'todos' ? true :
                activeTab === 'ativos' ? coupon.status === 'Ativo' :
                    activeTab === 'agendados' ? coupon.status === 'Agendado' :
                        activeTab === 'expirados' ? coupon.status === 'Expirado' : true;
        const matchesType = filterType === 'Todos' ? true : coupon.type === filterType;

        return matchesSearch && matchesTab && matchesType;
    });

    // Handlers
    const handleOpenModal = (coupon?: Coupon) => {
        if (coupon) {
            setEditingCoupon(coupon);
            setFormData(coupon);
        } else {
            setEditingCoupon(null);
            setFormData({
                code: '',
                discount: '',
                type: 'Porcentagem',
                status: 'Ativo',
                expiry: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCoupon) {
            setCoupons(coupons.map(c => c.id === editingCoupon.id ? { ...c, ...formData } as Coupon : c));
        } else {
            const newCoupon = {
                ...formData,
                id: Math.max(...coupons.map(c => c.id), 0) + 1,
                uses: 0
            } as Coupon;
            setCoupons([...coupons, newCoupon]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteClick = (id: number) => {
        setCouponToDelete(id);
        setIsBulkDelete(false);
        setIsDeleteModalOpen(true);
    };

    const handleBulkDeleteClick = () => {
        setIsBulkDelete(true);
        setIsDeleteModalOpen(true);
    };

    const handleBulkStatusChange = (newStatus: 'Ativo' | 'Agendado' | 'Expirado') => {
        setCoupons(coupons.map(c => selectedIds.includes(c.id) ? { ...c, status: newStatus } : c));
        setShowStatusMenu(false);
        setSelectedIds([]);
    };

    const confirmDelete = () => {
        if (isBulkDelete) {
            setCoupons(coupons.filter(c => !selectedIds.includes(c.id)));
            setSelectedIds([]);
        } else if (couponToDelete) {
            setCoupons(coupons.filter(c => c.id !== couponToDelete));
        }
        setIsDeleteModalOpen(false);
        setCouponToDelete(null);
    };

    const toggleSelectAll = () => {
        const allFilteredSelected = filteredCoupons.length > 0 && filteredCoupons.every(c => selectedIds.includes(c.id));

        if (allFilteredSelected) {
            // Remove filtered coupons from selection
            setSelectedIds(selectedIds.filter(id => !filteredCoupons.find(c => c.id === id)));
        } else {
            // Add filtered coupons to selection (avoid duplicates)
            const newIds = [...selectedIds];
            filteredCoupons.forEach(c => {
                if (!newIds.includes(c.id)) newIds.push(c.id);
            });
            setSelectedIds(newIds);
        }
    };

    const toggleSelectOne = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const tabs = [
        { id: 'todos', label: 'Todos' },
        { id: 'ativos', label: 'Ativos' },
        { id: 'agendados', label: 'Agendados' },
        { id: 'expirados', label: 'Expirados' },
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cupons de Desconto</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie suas campanhas promocionais</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Exportar
                    </Button>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Cupom
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b dark:border-white/5 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-black dark:border-white text-black dark:text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Filters & Actions */}
            <div className="mb-6 bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por código..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                        />
                    </div>
                    <div className="h-px w-full lg:h-10 lg:w-px bg-gray-200 dark:bg-white/10" />
                    <div className="w-48">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Tipo</label>
                        <Dropdown
                            options={['Todos', 'Porcentagem', 'Valor Fixo', 'Frete Grátis']}
                            value={filterType}
                            onChange={setFilterType}
                        />
                    </div>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedIds.length > 0 && (
                <div className="mb-6 p-4 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 shadow-lg">
                    <div className="flex items-center gap-4">
                        <span className="font-medium text-sm">{selectedIds.length} selecionados</span>
                        <div className="h-4 w-px bg-white/20 dark:bg-black/20" />
                        <div className="relative">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="!text-white dark:!text-black hover:bg-white/10 dark:hover:bg-black/10"
                                onClick={() => setShowStatusMenu(!showStatusMenu)}
                            >
                                Alterar Status
                            </Button>

                            {showStatusMenu && (
                                <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-xl border dark:border-white/10 overflow-hidden z-20 py-1">
                                    {['Ativo', 'Agendado', 'Expirado'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleBulkStatusChange(status as any)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="!text-red-400 hover:!text-red-300 hover:bg-white/10 dark:hover:bg-black/10"
                        onClick={handleBulkDeleteClick}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Selecionados
                    </Button>
                </div>
            )}

            {/* Table */}
            <DataTable
                data={filteredCoupons}
                selectedIds={selectedIds}
                onSelectAll={toggleSelectAll}
                onSelectOne={toggleSelectOne}
                onRowClick={(coupon) => handleOpenModal(coupon)}
                columns={[
                    {
                        header: 'Código',
                        accessorKey: 'code',
                        cell: (coupon) => (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white font-mono">{coupon.code}</p>
                                    <p className="text-xs text-gray-500">{coupon.type}</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        header: 'Desconto',
                        accessorKey: 'discount',
                        cell: (coupon) => (
                            <span className="font-medium text-gray-900 dark:text-white">{coupon.discount}</span>
                        )
                    },
                    {
                        header: 'Usos',
                        accessorKey: 'uses',
                        cell: (coupon) => (
                            <span className="text-sm text-gray-600 dark:text-gray-400">{coupon.uses} vezes</span>
                        )
                    },
                    {
                        header: 'Status',
                        accessorKey: 'status',
                        cell: (coupon) => (
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${coupon.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                    coupon.status === 'Agendado' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                        'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400'
                                }`}>
                                {coupon.status}
                            </span>
                        )
                    },
                    {
                        header: 'Expira em',
                        accessorKey: 'expiry',
                        cell: (coupon) => (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                {formatDate(coupon.expiry)}
                            </div>
                        )
                    },
                    {
                        header: '',
                        accessorKey: 'actions',
                        cell: (coupon) => (
                            <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                                <Button size="sm" variant="ghost" onClick={() => handleOpenModal(coupon)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteClick(coupon.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        )
                    }
                ]}
            />

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#121212] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {editingCoupon ? 'Editar Cupom' : 'Novo Cupom'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Código do Cupom</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all font-mono uppercase"
                                    placeholder="Ex: VERAO2025"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo de Desconto</label>
                                    <Dropdown
                                        options={['Porcentagem', 'Valor Fixo', 'Frete Grátis']}
                                        value={formData.type || 'Porcentagem'}
                                        onChange={(val) => setFormData({ ...formData, type: val as any })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Valor do Desconto</label>
                                    <input
                                        type="text"
                                        required={formData.type !== 'Frete Grátis'}
                                        disabled={formData.type === 'Frete Grátis'}
                                        value={formData.discount}
                                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all disabled:opacity-50"
                                        placeholder={formData.type === 'Porcentagem' ? 'Ex: 10%' : 'Ex: R$ 50,00'}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <Dropdown
                                        options={['Ativo', 'Agendado', 'Expirado']}
                                        value={formData.status || 'Ativo'}
                                        onChange={(val) => setFormData({ ...formData, status: val as any })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Data de Expiração</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.expiry}
                                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit">
                                    Salvar Cupom
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
                title={isBulkDelete ? "Excluir Cupons" : "Excluir Cupom"}
                description={isBulkDelete
                    ? `Tem certeza que deseja excluir ${selectedIds.length} cupons selecionados? Esta ação não pode ser desfeita.`
                    : "Tem certeza que deseja excluir este cupom? Esta ação não pode ser desfeita."
                }
                confirmText="Excluir"
                variant="danger"
            />
        </div>
    );
}
