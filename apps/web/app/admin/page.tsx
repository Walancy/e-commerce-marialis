"use client";

import React from 'react';
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    CreditCard,
    Package,
    FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/Button';

export default function AdminDashboard() {
    const router = useRouter();

    const stats = [
        {
            title: "Vendas Totais",
            value: "R$ 45.231,89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
            gradient: "from-green-500/10 to-green-500/5",
            iconColor: "text-green-600 dark:text-green-400"
        },
        {
            title: "Pedidos",
            value: "356",
            change: "+12.5%",
            trend: "up",
            icon: ShoppingBag,
            gradient: "from-blue-500/10 to-blue-500/5",
            iconColor: "text-blue-600 dark:text-blue-400"
        },
        {
            title: "Novos Clientes",
            value: "2,345",
            change: "-4.3%",
            trend: "down",
            icon: Users,
            gradient: "from-purple-500/10 to-purple-500/5",
            iconColor: "text-purple-600 dark:text-purple-400"
        },
        {
            title: "Taxa de Conversão",
            value: "3.2%",
            change: "+2.4%",
            trend: "up",
            icon: TrendingUp,
            gradient: "from-orange-500/10 to-orange-500/5",
            iconColor: "text-orange-600 dark:text-orange-400"
        }
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Visão geral do desempenho da sua loja</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#121212] px-3 py-2 rounded-lg border dark:border-white/5 shadow-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hoje: 29 Nov</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in duration-300">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.title}</span>
                                    <span className={`p-1.5 rounded-lg ${stat.gradient.replace('from-', 'bg-').replace('/10', '/20').split(' ')[0]} ${stat.iconColor}`}>
                                        <Icon className="w-4 h-4" />
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                    <span className={`text-xs font-medium flex items-center ${stat.trend === 'up'
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Button
                        variant="outline"
                        className="justify-start gap-3 bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                        onClick={() => router.push('/admin/produtos/novo')}
                    >
                        <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Novo Produto
                    </Button>
                    <Button
                        variant="outline"
                        className="justify-start gap-3 bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                        onClick={() => router.push('/admin/clientes/novo')}
                    >
                        <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        Novo Cliente
                    </Button>
                    <Button
                        variant="outline"
                        className="justify-start gap-3 bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                        onClick={() => router.push('/admin/cupons/novo')}
                    >
                        <CreditCard className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                        Criar Cupom
                    </Button>
                    <Button
                        variant="outline"
                        className="justify-start gap-3 bg-white dark:bg-[#121212] border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                        onClick={() => router.push('/admin/relatorios')}
                    >
                        <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        Relatórios
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#121212] rounded-2xl border dark:border-white/5 shadow-sm flex flex-col">
                        <div className="p-6 border-b dark:border-white/5 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pedidos Recentes</h2>
                            <button
                                onClick={() => router.push('/admin/pedidos')}
                                className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                Ver todos
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-white/5 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">ID</th>
                                        <th className="px-4 py-3 font-medium">Cliente</th>
                                        <th className="px-4 py-3 font-medium">Data</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-4 py-3 font-medium text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr
                                            key={i}
                                            onClick={() => router.push(`/admin/pedidos/ORD-00${i}`)}
                                            className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#ORD-00{i}</td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Maria Silva</td>
                                            <td className="px-4 py-3 text-gray-500">Hoje, 14:30</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                                                    Pendente
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">R$ 249,90</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t dark:border-white/5">
                            <Button variant="outline" fullWidth onClick={() => router.push('/admin/pedidos')}>
                                Ver todos os pedidos
                            </Button>
                        </div>
                    </div>

                    {/* Top Customers Ranking */}
                    <div className="bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Melhores Clientes</h2>
                            <button className="text-xs text-blue-600 hover:underline">Ver todos</button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: 'Ana Oliveira', spent: 'R$ 4.250,00', orders: 12, avatar: 'A' },
                                { name: 'Carlos Santos', spent: 'R$ 3.890,00', orders: 8, avatar: 'C' },
                                { name: 'Maria Silva', spent: 'R$ 2.450,00', orders: 15, avatar: 'M' },
                                { name: 'João Souza', spent: 'R$ 1.890,00', orders: 6, avatar: 'J' },
                                { name: 'Pedro Lima', spent: 'R$ 1.200,00', orders: 4, avatar: 'P' }
                            ].map((customer, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-sm">
                                        {customer.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{customer.name}</p>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{customer.spent}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">{customer.orders} pedidos</p>
                                            <div className="w-16 h-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${(parseInt(customer.spent.replace(/\D/g, '')) / 425000) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
