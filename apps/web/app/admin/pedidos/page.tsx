"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Eye,
    Filter,
    X,
    Clock,
    CheckCircle,
    Truck,
    AlertCircle,
    Calendar,
    CreditCard,
    User,
    MapPin,
    DollarSign,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SearchInput } from '../../../components/ui/SearchInput';
import { Dropdown } from '../../../components/ui/Dropdown';
import { DataTable } from '../../../components/ui/DataTable';

interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
    };
    date: string;
    status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
    total: number;
    paymentMethod: string;
    itemsCount: number;
}

export default function OrdersPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Mock Data
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "ORD-001-2024",
            customer: { name: "Maria Silva", email: "maria.silva@email.com" },
            date: "2024-11-28",
            status: "Pendente",
            total: 499.00,
            paymentMethod: "Cartão de Crédito",
            itemsCount: 1
        },
        {
            id: "ORD-002-2024",
            customer: { name: "João Santos", email: "joao@email.com" },
            date: "2024-11-27",
            status: "Enviado",
            total: 299.80,
            paymentMethod: "PIX",
            itemsCount: 2
        },
        {
            id: "ORD-003-2024",
            customer: { name: "Ana Oliveira", email: "ana@email.com" },
            date: "2024-11-26",
            status: "Entregue",
            total: 1250.00,
            paymentMethod: "Boleto",
            itemsCount: 3
        },
        {
            id: "ORD-004-2024",
            customer: { name: "Pedro Costa", email: "pedro@email.com" },
            date: "2024-11-25",
            status: "Processando",
            total: 89.90,
            paymentMethod: "PIX",
            itemsCount: 1
        },
        {
            id: "ORD-005-2024",
            customer: { name: "Carla Souza", email: "carla@email.com" },
            date: "2024-11-24",
            status: "Cancelado",
            total: 450.00,
            paymentMethod: "Cartão de Crédito",
            itemsCount: 1
        }
    ]);

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'Todos' || order.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendente': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
            case 'Processando': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
            case 'Enviado': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
            case 'Entregue': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
            case 'Cancelado': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pendente': return Clock;
            case 'Processando': return Clock;
            case 'Enviado': return Truck;
            case 'Entregue': return CheckCircle;
            case 'Cancelado': return AlertCircle;
            default: return Clock;
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredOrders.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredOrders.map(o => o.id));
        }
    };

    const toggleSelectOne = (id: string | number) => {
        const strId = String(id);
        if (selectedIds.includes(strId)) {
            setSelectedIds(selectedIds.filter(sid => sid !== strId));
        } else {
            setSelectedIds([...selectedIds, strId]);
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pedidos</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie e acompanhe todas as vendas</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros Avançados
                    </Button>
                    <Button>
                        Exportar Relatório
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Vendas Hoje</span>
                        <span className="p-1.5 bg-green-100 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                            <DollarSign className="w-4 h-4" />
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">R$ 1.250,00</h3>
                        <span className="text-xs font-medium text-green-600 flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                            +12%
                        </span>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Pedidos Pendentes</span>
                        <span className="p-1.5 bg-yellow-100 dark:bg-yellow-500/10 rounded-lg text-yellow-600 dark:text-yellow-400">
                            <Clock className="w-4 h-4" />
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                        <span className="text-xs font-medium text-gray-500">Aguardando envio</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Ticket Médio</span>
                        <span className="p-1.5 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                            <ShoppingBag className="w-4 h-4" />
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">R$ 345,00</h3>
                        <span className="text-xs font-medium text-green-600 flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                            +5%
                        </span>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">Cancelamentos</span>
                        <span className="p-1.5 bg-red-100 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-400">
                            <AlertCircle className="w-4 h-4" />
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
                        <span className="text-xs font-medium text-red-600 flex items-center">
                            <ArrowDownRight className="w-3 h-3 mr-0.5" />
                            +1%
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1">
                        <SearchInput
                            placeholder="Buscar por ID, cliente ou email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="h-px w-full lg:h-10 lg:w-px bg-gray-200 dark:bg-white/10" />
                    <div className="w-48">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                        <Dropdown
                            options={['Todos', 'Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado']}
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                        />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <DataTable
                data={filteredOrders}
                selectedIds={selectedIds}
                onSelectAll={toggleSelectAll}
                onSelectOne={toggleSelectOne}
                onRowClick={(order) => router.push(`/admin/pedidos/${order.id}`)}
                columns={[
                    {
                        header: 'Pedido',
                        accessorKey: 'id',
                        cell: (order) => (
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white font-mono">{order.id}</p>
                                <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                        )
                    },
                    {
                        header: 'Cliente',
                        accessorKey: 'customer',
                        cell: (order) => (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xs">
                                    {order.customer.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{order.customer.name}</p>
                                    <p className="text-xs text-gray-500">{order.customer.email}</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        header: 'Status',
                        accessorKey: 'status',
                        cell: (order) => {
                            const StatusIcon = getStatusIcon(order.status);
                            return (
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                    <StatusIcon className="w-3 h-3" />
                                    {order.status}
                                </span>
                            );
                        }
                    },
                    {
                        header: 'Pagamento',
                        accessorKey: 'paymentMethod',
                        cell: (order) => (
                            <span className="text-sm text-gray-600 dark:text-gray-400">{order.paymentMethod}</span>
                        )
                    },
                    {
                        header: 'Total',
                        accessorKey: 'total',
                        cell: (order) => (
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white">R$ {order.total.toFixed(2)}</p>
                                <p className="text-xs text-gray-500">{order.itemsCount} itens</p>
                            </div>
                        )
                    },
                    {
                        header: '',
                        cell: (order) => (
                            <div className="flex justify-end" onClick={e => e.stopPropagation()}>
                                <Button size="sm" variant="ghost" onClick={() => router.push(`/admin/pedidos/${order.id}`)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Detalhes
                                </Button>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
}
