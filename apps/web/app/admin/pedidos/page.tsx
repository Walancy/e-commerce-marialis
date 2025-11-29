"use client";

import React, { useState } from 'react';
import { Eye, Filter, X, Clock, CheckCircle, Truck, AlertCircle, Calendar, CreditCard, User, MapPin } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SearchInput } from '../../../components/ui/SearchInput';
import { Dropdown } from '../../../components/ui/Dropdown';

interface OrderItem {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    date: string;
    status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
    total: number;
    paymentMethod: string;
    items: OrderItem[];
}

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

    // Mock Data
    const [orders, setOrders] = useState<Order[]>([
        {
            id: "ORD-001",
            customer: {
                name: "Maria Silva",
                email: "maria.silva@email.com",
                phone: "(11) 99999-9999",
                address: "Rua das Flores, 123 - São Paulo, SP"
            },
            date: "2024-11-28",
            status: "Pendente",
            total: 499.00,
            paymentMethod: "Cartão de Crédito",
            items: [
                { id: 1, productName: "Prancha Lizze Extreme", quantity: 1, price: 499.00, image: "/product-flat-iron.png" }
            ]
        },
        {
            id: "ORD-002",
            customer: {
                name: "João Santos",
                email: "joao@email.com",
                phone: "(21) 98888-8888",
                address: "Av. Atlântica, 450 - Rio de Janeiro, RJ"
            },
            date: "2024-11-27",
            status: "Enviado",
            total: 299.80,
            paymentMethod: "PIX",
            items: [
                { id: 2, productName: "Kit Repair Vyz", quantity: 2, price: 149.90, image: "/product-shampoo.png" }
            ]
        },
        {
            id: "ORD-003",
            customer: {
                name: "Ana Oliveira",
                email: "ana@email.com",
                phone: "(31) 97777-7777",
                address: "Rua da Bahia, 1000 - Belo Horizonte, MG"
            },
            date: "2024-11-26",
            status: "Entregue",
            total: 1250.00,
            paymentMethod: "Boleto",
            items: [
                { id: 1, productName: "Prancha Lizze Extreme", quantity: 2, price: 499.00, image: "/product-flat-iron.png" },
                { id: 3, productName: "Secador Profissional", quantity: 1, price: 252.00, image: "/product-dryer.png" }
            ]
        }
    ]);

    const handleOpenModal = (order: Order) => {
        setViewingOrder(order);
        setIsModalOpen(true);
    };

    const handleStatusChange = (newStatus: string) => {
        if (viewingOrder) {
            setOrders(orders.map(o => o.id === viewingOrder.id ? { ...o, status: newStatus as any } : o));
            setViewingOrder({ ...viewingOrder, status: newStatus as any });
        }
    };

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

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'Todos' || order.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Pedidos</h1>
                    <p className="text-xs text-gray-500">Gerencie as vendas da loja</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <div className="w-72">
                    <SearchInput
                        placeholder="Buscar por ID ou cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-48">
                    <Dropdown
                        options={['Todos', 'Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado']}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b dark:border-white/5">
                            <tr>
                                <th className="px-4 py-3 font-medium text-gray-500">ID Pedido</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Cliente</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Data</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                                <th className="px-4 py-3 font-medium text-gray-500">Total</th>
                                <th className="px-4 py-3 font-medium text-gray-500 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-white/5">
                            {filteredOrders.map((order) => {
                                const StatusIcon = getStatusIcon(order.status);
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{order.customer.name}</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(order.status)}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                            R$ {order.total.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button size="sm" variant="ghost" onClick={() => handleOpenModal(order)}>
                                                <Eye className="w-4 h-4 mr-1" />
                                                Detalhes
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {isModalOpen && viewingOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#121212] w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    Pedido #{viewingOrder.id}
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(viewingOrder.status)}`}>
                                        {viewingOrder.status}
                                    </span>
                                </h2>
                                <p className="text-xs text-gray-500 mt-1">Realizado em {new Date(viewingOrder.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Customer Info */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Dados do Cliente
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-sm space-y-2">
                                        <p className="font-medium text-gray-900 dark:text-white">{viewingOrder.customer.name}</p>
                                        <p className="text-gray-500">{viewingOrder.customer.email}</p>
                                        <p className="text-gray-500">{viewingOrder.customer.phone}</p>
                                    </div>
                                </div>

                                {/* Shipping Info */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Endereço de Entrega
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-sm">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {viewingOrder.customer.address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Itens do Pedido</h3>
                                <div className="border dark:border-white/10 rounded-xl overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 dark:bg-white/5 text-xs text-gray-500">
                                            <tr>
                                                <th className="px-4 py-2">Produto</th>
                                                <th className="px-4 py-2 text-center">Qtd</th>
                                                <th className="px-4 py-2 text-right">Preço</th>
                                                <th className="px-4 py-2 text-right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y dark:divide-white/5">
                                            {viewingOrder.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded bg-gray-100 dark:bg-white/5 overflow-hidden">
                                                                <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                                                            </div>
                                                            <span className="font-medium text-gray-900 dark:text-white">{item.productName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">R$ {item.price.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">R$ {(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50 dark:bg-white/5">
                                            <tr>
                                                <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">Total do Pedido</td>
                                                <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">R$ {viewingOrder.total.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Payment & Actions */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-white/10 rounded-lg">
                                        <CreditCard className="w-5 h-5 text-gray-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Método de Pagamento</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{viewingOrder.paymentMethod}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Atualizar Status:</span>
                                    <div className="w-48">
                                        <Dropdown
                                            options={['Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado']}
                                            value={viewingOrder.status}
                                            onChange={handleStatusChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-end">
                            <Button onClick={() => setIsModalOpen(false)}>
                                Fechar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
