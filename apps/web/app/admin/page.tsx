"use client";

import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Dropdown } from '../../components/ui/Dropdown';

export default function AdminDashboard() {
    const stats = [
        {
            title: "Vendas Totais",
            value: "R$ 45.231,89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
            color: "text-green-500"
        },
        {
            title: "Pedidos",
            value: "356",
            change: "+12.5%",
            trend: "up",
            icon: ShoppingBag,
            color: "text-blue-500"
        },
        {
            title: "Novos Clientes",
            value: "2,345",
            change: "-4.3%",
            trend: "down",
            icon: Users,
            color: "text-purple-500"
        },
        {
            title: "Taxa de Conversão",
            value: "3.2%",
            change: "+2.4%",
            trend: "up",
            icon: TrendingUp,
            color: "text-orange-500"
        }
    ];

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-xs text-gray-500">Visão geral da sua loja</p>
                </div>
                <div className="flex gap-2">
                    <Dropdown
                        options={['Hoje', 'Últimos 7 dias', 'Últimos 30 dias']}
                        onChange={() => { }}
                        value="Hoje"
                        className="w-40"
                    />
                    <Button>
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{stat.title}</p>
                                <Icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <div className="flex items-end justify-between">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                <div className={`flex items-center gap-0.5 text-[10px] font-bold ${stat.trend === 'up'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                    }`}>
                                    {stat.change}
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b dark:border-white/5 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">Pedidos Recentes</h2>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded text-gray-500">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 dark:bg-white/5 text-gray-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">ID</th>
                                <th className="px-4 py-3 font-medium">Cliente</th>
                                <th className="px-4 py-3 font-medium">Data</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-white/5">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">#ORD-00{i}</td>
                                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Maria Silva</td>
                                    <td className="px-4 py-2.5 text-gray-500">28 Nov</td>
                                    <td className="px-4 py-2.5">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                            Concluído
                                        </span>
                                    </td>
                                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white text-right">R$ 249,90</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
