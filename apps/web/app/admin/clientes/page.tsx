"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SearchInput } from '../../../components/ui/SearchInput';
import { DataTable } from '../../../components/ui/DataTable';
import { ConfirmModal } from '../../../components/ui/Modal';

interface OrderHistory {
    id: number;
    date: string;
    total: string;
    status: string;
    items: number;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    zip: string;
    address: string;
    number: string;
    orders: number;
    totalSpent: string;
    status: 'Ativo' | 'Inativo';
    lastAccess: string;
    purchaseHistory: OrderHistory[];
}

export default function CustomersPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isBulkDelete, setIsBulkDelete] = useState(false);

    const [customers, setCustomers] = useState<Customer[]>([
        {
            id: 1,
            name: "Maria Silva",
            email: "maria.silva@email.com",
            phone: "(11) 99999-9999",
            city: "São Paulo",
            state: "SP",
            zip: "01234-567",
            address: "Rua das Flores",
            number: "123",
            orders: 12,
            totalSpent: "R$ 4.520,00",
            status: "Ativo",
            lastAccess: "2024-03-15 14:30",
            purchaseHistory: [
                { id: 101, date: "2024-03-10", total: "R$ 450,00", status: "Entregue", items: 3 },
                { id: 102, date: "2024-02-15", total: "R$ 1.200,00", status: "Entregue", items: 5 }
            ]
        },
        {
            id: 2,
            name: "João Santos",
            email: "joao.santos@email.com",
            phone: "(21) 98888-8888",
            city: "Rio de Janeiro",
            state: "RJ",
            zip: "22000-000",
            address: "Av. Atlântica",
            number: "450",
            orders: 5,
            totalSpent: "R$ 1.250,00",
            status: "Ativo",
            lastAccess: "2024-03-14 09:15",
            purchaseHistory: [
                { id: 103, date: "2024-03-01", total: "R$ 250,00", status: "Entregue", items: 1 }
            ]
        },
        {
            id: 3,
            name: "Ana Oliveira",
            email: "ana.oliveira@email.com",
            phone: "(31) 97777-7777",
            city: "Belo Horizonte",
            state: "MG",
            zip: "30000-000",
            address: "Rua da Bahia",
            number: "1000",
            orders: 1,
            totalSpent: "R$ 159,90",
            status: "Inativo",
            lastAccess: "2024-01-20 18:45",
            purchaseHistory: [
                { id: 104, date: "2024-01-15", total: "R$ 159,90", status: "Devolvido", items: 1 }
            ]
        },
    ]);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (id: number) => {
        setCustomerToDelete(id);
        setIsBulkDelete(false);
        setIsDeleteModalOpen(true);
    };

    const handleBulkDeleteClick = () => {
        setIsBulkDelete(true);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (isBulkDelete) {
            setCustomers(customers.filter(c => !selectedIds.includes(c.id)));
            setSelectedIds([]);
        } else if (customerToDelete) {
            setCustomers(customers.filter(c => c.id !== customerToDelete));
        }
        setIsDeleteModalOpen(false);
        setCustomerToDelete(null);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredCustomers.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredCustomers.map(c => c.id));
        }
    };

    const toggleSelectOne = (id: string | number) => {
        const numId = Number(id);
        if (selectedIds.includes(numId)) {
            setSelectedIds(selectedIds.filter(sid => sid !== numId));
        } else {
            setSelectedIds([...selectedIds, numId]);
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clientes</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie sua base de clientes</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => router.push('/admin/clientes/novo')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Cliente
                    </Button>
                </div>
            </div>

            <div className="mb-6 bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1">
                        <SearchInput
                            placeholder="Buscar por nome ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {selectedIds.length > 0 && (
                <div className="mb-6 p-4 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 shadow-lg">
                    <div className="flex items-center gap-4">
                        <span className="font-medium text-sm">{selectedIds.length} selecionados</span>
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

            <DataTable
                data={filteredCustomers}
                selectedIds={selectedIds}
                onSelectAll={toggleSelectAll}
                onSelectOne={toggleSelectOne}
                onRowClick={(customer) => router.push(`/admin/clientes/${customer.id}`)}
                columns={[
                    {
                        header: 'Cliente',
                        accessorKey: 'name',
                        cell: (customer) => (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-sm">
                                    {customer.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{customer.name}</p>
                                    <p className="text-xs text-gray-500">ID: #{customer.id}</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        header: 'Contato',
                        accessorKey: 'email',
                        cell: (customer) => (
                            <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-3 h-3" />
                                    {customer.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3 h-3" />
                                    {customer.phone}
                                </div>
                            </div>
                        )
                    },
                    {
                        header: 'Localização',
                        accessorKey: 'city',
                        cell: (customer) => (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-3 h-3" />
                                {customer.city}, {customer.state}
                            </div>
                        )
                    },
                    {
                        header: 'Pedidos',
                        accessorKey: 'orders',
                        cell: (customer) => (
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.orders}</span>
                        )
                    },
                    {
                        header: 'Total Gasto',
                        accessorKey: 'totalSpent',
                        cell: (customer) => (
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{customer.totalSpent}</span>
                        )
                    },
                    {
                        header: 'Status',
                        accessorKey: 'status',
                        cell: (customer) => (
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${customer.status === 'Ativo' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-400'
                                }`}>
                                {customer.status}
                            </span>
                        )
                    },
                    {
                        header: '',
                        cell: (customer) => (
                            <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                                <Button size="sm" variant="ghost" onClick={() => router.push(`/admin/clientes/${customer.id}`)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteClick(customer.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        )
                    }
                ]}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={isBulkDelete ? "Excluir Clientes" : "Excluir Cliente"}
                description={isBulkDelete
                    ? `Tem certeza que deseja excluir ${selectedIds.length} clientes selecionados? Esta ação não pode ser desfeita.`
                    : "Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
                }
                confirmText="Excluir"
                variant="danger"
            />
        </div>
    );
}
