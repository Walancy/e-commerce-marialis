"use client";

import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar, CreditCard } from 'lucide-react';
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
            gradient: "from-green-500/10 to-green-500/5",
            iconColor: "text-green-600 dark:text-green-400",
            chartData: [40, 35, 55, 45, 60, 75, 65]
        },
        {
            title: "Pedidos",
            value: "356",
            change: "+12.5%",
            trend: "up",
            icon: ShoppingBag,
            gradient: "from-blue-500/10 to-blue-500/5",
            iconColor: "text-blue-600 dark:text-blue-400",
            chartData: [20, 25, 35, 30, 45, 40, 50]
        },
        {
            title: "Novos Clientes",
            value: "2,345",
            change: "-4.3%",
            trend: "down",
            icon: Users,
            gradient: "from-purple-500/10 to-purple-500/5",
            iconColor: "text-purple-600 dark:text-purple-400",
            chartData: [60, 55, 45, 50, 40, 35, 30]
        },
        {
            title: "Taxa de Conversão",
            value: "3.2%",
            change: "+2.4%",
            trend: "up",
            icon: TrendingUp,
            gradient: "from-orange-500/10 to-orange-500/5",
            iconColor: "text-orange-600 dark:text-orange-400",
            chartData: [10, 15, 20, 25, 22, 30, 32]
        }
    ];

    // Mock Chart Component (SVG)
    const MiniChart = ({ data, color }: { data: number[], color: string }) => {
        const max = Math.max(...data);
        const points = data.map((val, i) => `${(i / (data.length - 1)) * 100},${100 - (val / max) * 100}`).join(' ');

        return (
            <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                    d={`M 0 100 L ${points} L 100 100 Z`}
                    fill="currentColor"
                    className={`${color.replace('text-', 'text-').replace('600', '100').replace('400', '500/10')} opacity-20`}
                />
                <path
                    d={`M ${points}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    };

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
                    <Button>
                        Baixar Relatório
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />

                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 ${stat.iconColor}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                        }`}>
                                        {stat.change}
                                        {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                </div>

                                <div className="h-12">
                                    <MiniChart data={stat.chartData} color={stat.iconColor} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Section (Placeholder for now) */}
                <div className="lg:col-span-2 bg-white dark:bg-[#121212] p-6 rounded-2xl border dark:border-white/5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Receita</h2>
                            <p className="text-xs text-gray-500">Comparativo com o período anterior</p>
                        </div>
                        <Dropdown
                            options={['Últimos 7 dias', 'Últimos 30 dias', 'Este Ano']}
                            onChange={() => { }}
                            value="Últimos 7 dias"
                        />
                    </div>

                    {/* Visual Placeholder for a big chart */}
                    <div className="h-[300px] w-full flex items-end justify-between gap-2 px-4 pb-4 border-b border-l dark:border-white/5 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-full h-px bg-gray-100 dark:bg-white/5" />
                            ))}
                        </div>

                        {/* Bars */}
                        {[65, 45, 75, 55, 85, 70, 90].map((h, i) => (
                            <div key={i} className="w-full bg-gray-100 dark:bg-white/5 rounded-t-lg relative group h-full flex items-end">
                                <div
                                    className="w-full bg-black dark:bg-white rounded-t-lg transition-all duration-500 hover:opacity-80"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                                        R$ {(h * 150).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500 font-medium">
                        <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-[#121212] rounded-2xl border dark:border-white/5 shadow-sm flex flex-col">
                    <div className="p-6 border-b dark:border-white/5 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pedidos Recentes</h2>
                        <button className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Ver todos</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        <div className="space-y-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xs">
                                        {['M', 'J', 'A', 'P', 'C'][i - 1]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Maria Silva</p>
                                            <span className="text-xs font-medium text-green-600 dark:text-green-400">R$ 249,90</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500 truncate">2 itens • Há 2h</p>
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400">Pendente</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t dark:border-white/5">
                        <Button variant="outline" fullWidth>
                            Ver todos os pedidos
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
