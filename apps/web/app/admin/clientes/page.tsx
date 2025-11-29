"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MoreHorizontal, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SearchInput } from '../../../components/ui/SearchInput';
import { Dropdown } from '../../../components/ui/Dropdown';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    orders: number;
    totalSpent: string;
    status: 'Ativo' | 'Inativo';
}

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    const [customers, setCustomers] = useState<Customer[]>([
        { id: 1, name: "Maria Silva", email: "maria.silva@email.com", phone: "(11) 99999-9999", city: "São Paulo, SP", orders: 12, totalSpent: "R$ 4.520,00", status: "Ativo" },
        { id: 2, name: "João Santos", email: "joao.santos@email.com", phone: "(21) 98888-8888", city: "Rio de Janeiro, RJ", orders: 5, totalSpent: "R$ 1.250,00", status: "Ativo" },
        { id: 3, name: "Ana Oliveira", email: "ana.oliveira@email.com", phone: "(31) 97777-7777", city: "Belo Horizonte, MG", orders: 1, totalSpent: "R$ 159,90", status: "Inativo" },
        { id: 4, name: "Pedro Costa", email: "pedro.costa@email.com", phone: "(41) 96666-6666", city: "Curitiba, PR", orders: 8, totalSpent: "R$ 2.890,00", status: "Ativo" },
        { id: 5, name: "Carla Souza", email: "carla.souza@email.com", phone: "(51) 95555-5555", city: "Porto Alegre, RS", orders: 3, totalSpent: "R$ 890,00", status: "Ativo" },
        { id: 6, name: "Roberto Lima", email: "roberto@email.com", phone: "(61) 94444-4444", city: "Brasília, DF", orders: 2, totalSpent: "R$ 450,00", status: "Ativo" },
        { id: 7, name: "Fernanda Dias", email: "fernanda@email.com", phone: "(71) 93333-3333", city: "Salvador, BA", orders: 6, totalSpent: "R$ 1.890,00", status: "Ativo" },
    ]);

    const [formData, setFormData] = useState<Partial<Customer>>({
        name: '',
        email: '',
        phone: '',
        city: '',
        status: 'Ativo'
    });

    const handleOpenModal = (customer?: Customer) => {
        if (customer) {
            setEditingCustomer(customer);
            setFormData(customer);
        } else {
            setEditingCustomer(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                city: '',
                status: 'Ativo'
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === editingCustomer.id ? { ...c, ...formData } as Customer : c));
        } else {
            const newCustomer = {
                ...formData,
                id: Math.max(...customers.map(c => c.id), 0) + 1,
                orders: 0,
                totalSpent: "R$ 0,00"
            } as Customer;
            setCustomers([...customers, newCustomer]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            setCustomers(customers.filter(c => c.id !== id));
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Clientes</h1>
                    <p className="text-xs text-gray-500">Gerencie sua base</p>
                </div>
                <div className="flex gap-3">
                    <div className="w-72">
                        <SearchInput
                            placeholder="Buscar cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Cliente
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-[#121212] rounded-xl shadow-sm border dark:border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b dark:border-white/5">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">Cliente</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Contato</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Localização</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Pedidos</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Total Gasto</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                <th className="px-4 py-3 font-medium text-gray-500 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-white/5">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xs">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{customer.name}</p>
                                                <p className="text-[10px] text-gray-500">ID: #{customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col gap-0.5 text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5">
                                                <Mail className="w-3 h-3" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone className="w-3 h-3" />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3" />
                                            {customer.city}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{customer.orders}</td>
                                    <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">{customer.totalSpent}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${customer.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                                'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleOpenModal(customer)}>
                                                <Edit className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDelete(customer.id)}>
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
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
                    <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {editingCustomer ? 'Editar Cliente' : 'Novo Cliente'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nome Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    placeholder="Ex: Maria Silva"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        placeholder="Ex: maria@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        placeholder="Ex: (11) 99999-9999"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cidade/Estado</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        placeholder="Ex: São Paulo, SP"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <Dropdown
                                        options={['Ativo', 'Inativo']}
                                        value={formData.status}
                                        onChange={(val) => setFormData({ ...formData, status: val as any })}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit">
                                    Salvar Cliente
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
