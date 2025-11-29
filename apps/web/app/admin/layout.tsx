"use client";

import React from 'react';
import { LayoutDashboard, Package, Tag, Users, Settings, LogOut, Store, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: ShoppingBag, label: 'Pedidos', href: '/admin/pedidos' },
        { icon: Package, label: 'Produtos', href: '/admin/produtos' },
        { icon: Tag, label: 'Cupons', href: '/admin/cupons' },
        { icon: Users, label: 'Clientes', href: '/admin/clientes' },
        { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#09090b]">
            {/* Sidebar */}
            <aside className="w-56 bg-white dark:bg-[#121212] border-r dark:border-white/5 fixed h-full z-40 hidden lg:flex flex-col">
                <div className="h-14 border-b dark:border-white/5 flex items-center justify-center">
                    <img src="/logo-marialis.svg" alt="Marialis" className="h-6 w-auto object-contain dark:invert" />
                </div>

                <nav className="flex-1 p-3 space-y-0.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${isActive
                                    ? 'bg-black text-white dark:bg-white dark:text-black font-medium shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </nav>

                <div className="p-3 border-t dark:border-white/5 space-y-0.5">
                    <a href="/" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-sm">
                        <Store className="w-4 h-4" />
                        <span>Ver Loja</span>
                    </a>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors text-sm">
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-56">
                {children}
            </div>
        </div>
    );
}
