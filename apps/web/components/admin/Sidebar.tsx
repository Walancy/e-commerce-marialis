"use client";

import React from 'react';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Tag,
    Users,
    Settings,
    LogOut,
    Store,
    ChevronLeft,
    ChevronRight,
    Moon,
    Sun,
    CreditCard,
    BarChart3,
    Award
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../ThemeProvider';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export const AdminSidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const menuGroups = [
        {
            title: 'Principal',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
            ]
        },
        {
            title: 'Vendas',
            items: [
                { icon: ShoppingBag, label: 'Pedidos', href: '/admin/pedidos' },
                { icon: Users, label: 'Clientes', href: '/admin/clientes' },
                { icon: Tag, label: 'Cupons', href: '/admin/cupons' },
            ]
        },
        {
            title: 'Catálogo',
            items: [
                { icon: Package, label: 'Produtos', href: '/admin/produtos' },
                { icon: Award, label: 'Marcas', href: '/admin/marcas' },
            ]
        },
        {
            title: 'Sistema',
            items: [
                { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
                { icon: Store, label: 'Ver Loja', href: '/' },
            ]
        }
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white dark:bg-[#121212] transition-all duration-300 z-50 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-6 relative">
                <div className={`flex items-center gap-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                    <img src="/logo-marialis.svg" alt="Marialis" className="h-8 w-auto object-contain dark:invert" />
                </div>

                {/* Toggle Button - Floating style like image */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-[#1a1a1a] border dark:border-gray-700 shadow-md rounded-full p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-50"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-3 h-3 text-gray-500" />
                    ) : (
                        <ChevronLeft className="w-3 h-3 text-gray-500" />
                    )}
                </button>

                {isCollapsed && (
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <img src="/logo-marialis.svg" alt="M" className="h-6 w-auto object-contain dark:invert" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className={`flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar ${isCollapsed ? 'scrollbar-hide' : ''}`}>
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {!isCollapsed && (
                            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                {group.title}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.href === '/admin'
                                    ? pathname === '/admin'
                                    : pathname === item.href || pathname.startsWith(item.href + '/');

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${isActive
                                            ? 'bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />

                                        <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                                            }`}>
                                            {item.label}
                                        </span>

                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                                {item.label}
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 space-y-4">
                {/* Dark Mode Toggle */}
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2`}>
                    {!isCollapsed && <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tema</span>}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${isCollapsed ? 'w-full flex justify-center' : ''}`}
                    >
                        {!mounted ? (
                            <div className="w-4 h-4" />
                        ) : theme === "dark" ? (
                            <Sun className="w-4 h-4" />
                        ) : (
                            <Moon className="w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* User Profile */}
                {/* User Profile */}
                <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : 'justify-between'} mt-2`}>
                    <Link
                        href="/admin/perfil"
                        className={`flex items-center gap-3 flex-1 min-w-0 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                            <img src="https://github.com/shadcn.png" alt="User" className="w-full h-full object-cover" />
                        </div>

                        {!isCollapsed && (
                            <div className="flex-1 overflow-hidden text-left">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Admin User</p>
                                <p className="text-xs text-gray-500 truncate">admin@marialis.com</p>
                            </div>
                        )}
                    </Link>

                    {!isCollapsed && (
                        <Link
                            href="/login"
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                            title="Sair"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>
        </aside>
    );
};
