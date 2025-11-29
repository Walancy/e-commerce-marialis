"use client";

import React, { useState } from 'react';
import { Plus, Tag, Copy, Calendar, X, Save, Trash2, Edit } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Dropdown } from '../../../components/ui/Dropdown';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

    const [coupons, setCoupons] = useState<Coupon[]>([
        { id: 1, code: "BEMVINDO10", discount: "10%", type: "Porcentagem", uses: 145, status: "Ativo", expiry: "2024-12-31" },
        { id: 2, code: "FRETEGRATIS", discount: "Frete", type: "Frete Grátis", uses: 89, status: "Ativo", expiry: "2024-11-30" },
        { id: 3, code: "BLACKFRIDAY", discount: "50%", type: "Porcentagem", uses: 0, status: "Agendado", expiry: "2024-11-29" },
    ]);

    const [formData, setFormData] = useState<Partial<Coupon>>({
        code: '',
        discount: '',
        type: 'Porcentagem',
        status: 'Ativo',
        expiry: ''
    });

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

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este cupom?')) {
            setCoupons(coupons.filter(c => c.id !== id));
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cupons</h1>
                    <p className="text-xs text-gray-500">Gerencie descontos</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Cupom
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                    <div key={coupon.id} className="bg-white dark:bg-[#121212] p-4 rounded-xl shadow-sm border dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-5">
                            <Tag className="w-16 h-16 transform rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-3">
                                <div className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded font-mono font-bold text-sm tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
                                    {coupon.code}
                                    <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                        <Copy className="w-3 h-3" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${coupon.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                            coupon.status === 'Agendado' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                                'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400'
                                        }`}>
                                        {coupon.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{coupon.discount}</span>
                                    <span className="text-xs text-gray-500">OFF</span>
                                </div>
                                <p className="text-xs text-gray-500">{coupon.type}</p>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-gray-500 border-t dark:border-white/5 pt-3">
                                <div className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {coupon.uses} usos
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Expira em {formatDate(coupon.expiry)}
                                </div>
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-white/90 dark:bg-[#121212]/90 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="secondary" onClick={() => handleOpenModal(coupon)}>
                                    <Edit className="w-4 h-4 mr-1" />
                                    Editar
                                </Button>
                                <Button size="sm" variant="danger" onClick={() => handleDelete(coupon.id)}>
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Excluir
                                </Button>
                            </div>
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
                                        value={formData.type}
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
                                        value={formData.status}
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
        </div>
    );
}
