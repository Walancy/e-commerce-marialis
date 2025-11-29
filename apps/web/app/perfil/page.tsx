"use client";

import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { User, Package, MapPin, CreditCard, LogOut, ChevronRight, Edit2, Plus, X, Trash2, Check, AlertCircle, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Interfaces
interface UserData {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
}

interface Address {
    id: number;
    label: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
}

interface Card {
    id: number;
    type: 'mastercard' | 'visa' | 'amex';
    last4: string;
    holder: string;
    expiry: string;
    isDefault: boolean;
}

interface Order {
    id: string;
    date: string;
    status: 'Entregue' | 'Em Trânsito' | 'Processando' | 'Cancelado';
    total: number;
    items: number;
    images: string[];
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('dados');

    // State Data
    const [userData, setUserData] = useState<UserData>({
        name: "Maria Silva",
        email: "maria.silva@email.com",
        cpf: "123.456.789-00",
        phone: "(11) 99999-9999",
        birthDate: "1990-05-15"
    });

    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            label: "Casa",
            street: "Rua das Flores",
            number: "123",
            neighborhood: "Jardim Paulista",
            city: "São Paulo",
            state: "SP",
            zip: "01234-567",
            isDefault: true
        },
        {
            id: 2,
            label: "Trabalho",
            street: "Av. Paulista",
            number: "1000",
            complement: "Sala 101",
            neighborhood: "Bela Vista",
            city: "São Paulo",
            state: "SP",
            zip: "01310-100",
            isDefault: false
        }
    ]);

    const [cards, setCards] = useState<Card[]>([
        { id: 1, type: 'mastercard', last4: '4242', holder: 'MARIA SILVA', expiry: '12/28', isDefault: true }
    ]);

    const [orders] = useState<Order[]>([
        { id: "12341", date: "25/11/2024", status: "Entregue", total: 459.80, items: 5, images: ["/product-flat-iron.png", "/product-shampoo.png"] },
        { id: "12342", date: "10/11/2024", status: "Entregue", total: 129.90, items: 1, images: ["/product-shampoo.png"] },
        { id: "12343", date: "05/10/2024", status: "Entregue", total: 890.00, items: 2, images: ["/product-flat-iron.png"] },
        { id: "12344", date: "01/10/2024", status: "Cancelado", total: 50.00, items: 1, images: ["/product-shampoo.png"] },
        { id: "12345", date: "28/11/2024", status: "Em Trânsito", total: 250.00, items: 3, images: ["/product-flat-iron.png"] }
    ]);

    // Orders Filter State
    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatusFilter, setOrderStatusFilter] = useState('Todos');
    const [orderDateFilter, setOrderDateFilter] = useState('Todos');

    // Modals State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [addressForm, setAddressForm] = useState<Partial<Address>>({});

    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [cardForm, setCardForm] = useState({ number: '', holder: '', expiry: '', cvv: '' });

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Handlers - User Data
    const handleSaveUserData = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Dados atualizados com sucesso!");
    };

    // Handlers - Addresses
    const handleOpenAddressModal = (address?: Address) => {
        if (address) {
            setEditingAddress(address);
            setAddressForm(address);
        } else {
            setEditingAddress(null);
            setAddressForm({});
        }
        setIsAddressModalOpen(true);
    };

    const handleSaveAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAddress) {
            setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...addr, ...addressForm } as Address : addr));
        } else {
            const newAddress = {
                ...addressForm,
                id: Math.max(...addresses.map(a => a.id), 0) + 1,
                isDefault: addresses.length === 0
            } as Address;
            setAddresses([...addresses, newAddress]);
        }
        setIsAddressModalOpen(false);
    };

    const handleDeleteAddress = (id: number) => {
        if (confirm("Tem certeza que deseja excluir este endereço?")) {
            setAddresses(addresses.filter(a => a.id !== id));
        }
    };

    const handleSetDefaultAddress = (id: number) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    };

    // Handlers - Cards
    const handleSaveCard = (e: React.FormEvent) => {
        e.preventDefault();
        const newCard: Card = {
            id: Math.max(...cards.map(c => c.id), 0) + 1,
            type: 'mastercard', // Mock detection
            last4: cardForm.number.slice(-4),
            holder: cardForm.holder.toUpperCase(),
            expiry: cardForm.expiry,
            isDefault: cards.length === 0
        };
        setCards([...cards, newCard]);
        setIsCardModalOpen(false);
        setCardForm({ number: '', holder: '', expiry: '', cvv: '' });
    };

    const handleDeleteCard = (id: number) => {
        if (confirm("Tem certeza que deseja remover este cartão?")) {
            setCards(cards.filter(c => c.id !== id));
        }
    };

    const handleSetDefaultCard = (id: number) => {
        setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));
    };

    // Filtered Orders Logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.includes(orderSearch);
        const matchesStatus = orderStatusFilter === 'Todos' || order.status === orderStatusFilter;
        // Date filter logic would go here (simplified for now)
        const matchesDate = orderDateFilter === 'Todos';
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Entregue': return 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30';
            case 'Em Trânsito': return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30';
            case 'Processando': return 'bg-yellow-50 text-yellow-700 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30';
            case 'Cancelado': return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const tabs = [
        { id: 'dados', label: 'Meus Dados', icon: User },
        { id: 'pedidos', label: 'Meus Pedidos', icon: Package },
        { id: 'enderecos', label: 'Endereços', icon: MapPin },
        { id: 'cartoes', label: 'Cartões', icon: CreditCard },
    ];

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#111]">
            <Header />

            <div className="pb-16 lg:px-20 max-w-[1200px] mx-auto">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6 bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border dark:border-white/5">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-400">
                            {userData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-sm">
                            <Edit2 className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                            <span className="px-2.5 py-0.5 bg-black/5 dark:bg-white/10 rounded-full text-[10px] font-medium text-gray-900 dark:text-white border dark:border-white/10">
                                Cliente VIP
                            </span>
                            <span className="px-2.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-[10px] font-medium border border-green-100 dark:border-green-900/30">
                                Conta Verificada
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30 h-9">
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Sair da Conta
                    </Button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto pb-1 mb-6 gap-1 scrollbar-hide border-b dark:border-gray-800">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${isActive
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border dark:border-white/5 min-h-[400px] p-6">

                    {/* MEUS DADOS */}
                    {activeTab === 'dados' && (
                        <form onSubmit={handleSaveUserData} className="max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Dados Pessoais</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-[#222] border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none text-gray-900 dark:text-white focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">E-mail</label>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-[#222] border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none text-gray-900 dark:text-white focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">CPF</label>
                                    <input
                                        type="text"
                                        value={userData.cpf}
                                        onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-[#222] border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none text-gray-900 dark:text-white focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Telefone</label>
                                    <input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-[#222] border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none text-gray-900 dark:text-white focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        value={userData.birthDate}
                                        onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-[#222] border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none text-gray-900 dark:text-white focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <Button size="sm" type="submit">Salvar Alterações</Button>
                            </div>
                        </form>
                    )}

                    {/* MEUS PEDIDOS */}
                    {activeTab === 'pedidos' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Histórico de Pedidos</h2>
                                <div className="flex flex-wrap gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar pedido..."
                                            value={orderSearch}
                                            onChange={(e) => setOrderSearch(e.target.value)}
                                            className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg text-xs outline-none focus:border-black dark:focus:border-white transition-all w-full md:w-48"
                                        />
                                    </div>
                                    <select
                                        value={orderStatusFilter}
                                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                                        className="bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg text-xs px-3 py-2 outline-none cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                                    >
                                        <option value="Todos">Todos os Status</option>
                                        <option value="Entregue">Entregue</option>
                                        <option value="Em Trânsito">Em Trânsito</option>
                                        <option value="Processando">Processando</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
                                    <select
                                        value={orderDateFilter}
                                        onChange={(e) => setOrderDateFilter(e.target.value)}
                                        className="bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg text-xs px-3 py-2 outline-none cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                                    >
                                        <option value="Todos">Qualquer Data</option>
                                        <option value="30d">Últimos 30 dias</option>
                                        <option value="3m">Últimos 3 meses</option>
                                        <option value="2024">2024</option>
                                    </select>
                                </div>
                            </div>

                            {filteredOrders.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-[#222] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Nenhum pedido encontrado</h3>
                                    <p className="text-xs text-gray-500 mt-1">Tente alterar os filtros de busca.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredOrders.map((order) => (
                                        <div key={order.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 hover:border-gray-300 dark:hover:border-gray-600 transition-all group bg-gray-50/50 dark:bg-[#222]/50">
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                                                        <Package className="w-5 h-5 text-gray-900 dark:text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-gray-900 dark:text-white">Pedido #{order.id}</p>
                                                        <p className="text-xs text-gray-500">{order.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setSelectedOrder(order)}>Ver Detalhes</Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 pl-14">
                                                <div className="flex -space-x-2">
                                                    {order.images.map((img, i) => (
                                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1a1a] bg-gray-200 overflow-hidden">
                                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    {order.items > order.images.length && (
                                                        <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1a1a1a] bg-gray-400 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                            +{order.items - order.images.length}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">{order.items} itens • <span className="font-bold text-gray-900 dark:text-white">R$ {order.total.toFixed(2)}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ENDEREÇOS */}
                    {activeTab === 'enderecos' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Meus Endereços</h2>
                                <Button size="sm" onClick={() => handleOpenAddressModal()}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Novo Endereço
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className={`border rounded-xl p-5 relative transition-all ${addr.isDefault ? 'border-black dark:border-white bg-gray-50/50 dark:bg-[#222]/50' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                                        {addr.isDefault && (
                                            <span className="absolute top-4 right-4 px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold rounded">PRINCIPAL</span>
                                        )}
                                        <div className="flex items-start gap-3 mb-4">
                                            <MapPin className={`w-5 h-5 mt-0.5 ${addr.isDefault ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`} />
                                            <div>
                                                <p className="font-bold text-sm text-gray-900 dark:text-white">{addr.label}</p>
                                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                                    {addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}<br />
                                                    {addr.neighborhood}<br />
                                                    {addr.city} - {addr.state}<br />
                                                    CEP: {addr.zip}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4 pl-8">
                                            <button onClick={() => handleOpenAddressModal(addr)} className="text-xs font-medium text-gray-900 dark:text-white hover:underline">Editar</button>
                                            <span className="text-gray-300 text-xs">|</span>
                                            <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs font-medium text-red-500 hover:underline">Excluir</button>
                                            {!addr.isDefault && (
                                                <>
                                                    <span className="text-gray-300 text-xs">|</span>
                                                    <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-xs font-medium text-gray-500 hover:text-black dark:hover:text-white">Definir como principal</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CARTÕES */}
                    {activeTab === 'cartoes' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Meus Cartões</h2>
                                <Button size="sm" onClick={() => setIsCardModalOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Novo Cartão
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {cards.map((card) => (
                                    <div key={card.id} className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-xl relative overflow-hidden shadow-lg group">
                                        <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <CreditCard className="w-6 h-6" />
                                                {card.isDefault && <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">PRINCIPAL</span>}
                                                {!card.isDefault && (
                                                    <button onClick={() => handleDeleteCard(card.id)} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-red-400 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-base font-mono tracking-widest mb-2">•••• •••• •••• {card.last4}</p>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase">Titular</p>
                                                    <p className="text-xs font-medium">{card.holder}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase">Validade</p>
                                                    <p className="text-xs font-medium">{card.expiry}</p>
                                                </div>
                                            </div>
                                            {!card.isDefault && (
                                                <button
                                                    onClick={() => handleSetDefaultCard(card.id)}
                                                    className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    DEFINIR COMO PRINCIPAL
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setIsCardModalOpen(true)}
                                    className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center p-6 text-gray-500 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors cursor-pointer min-h-[180px]"
                                >
                                    <Plus className="w-6 h-6 mb-2" />
                                    <span className="text-sm font-medium">Adicionar novo cartão</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Detalhes do Pedido</h2>
                                <p className="text-xs text-gray-500">#{selectedOrder.id} • Realizado em {selectedOrder.date}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            {/* Status Stepper */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between relative">
                                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>
                                    {['Processando', 'Em Trânsito', 'Entregue'].map((step, index) => {
                                        const isCompleted =
                                            selectedOrder.status === 'Entregue' ||
                                            (selectedOrder.status === 'Em Trânsito' && step !== 'Entregue') ||
                                            (selectedOrder.status === 'Processando' && step === 'Processando');

                                        const isCurrent = selectedOrder.status === step;

                                        return (
                                            <div key={step} className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1a1a] px-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted || isCurrent ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black' : 'bg-white border-gray-300 text-gray-300 dark:bg-[#1a1a1a] dark:border-gray-700 dark:text-gray-700'
                                                    }`}>
                                                    {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase ${isCompleted || isCurrent ? 'text-black dark:text-white' : 'text-gray-400'}`}>{step}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Itens do Pedido</h3>
                                    <div className="space-y-3">
                                        {[...Array(selectedOrder.items)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-4 border-b dark:border-gray-800 pb-3 last:border-0">
                                                <div className="w-12 h-12 bg-gray-100 dark:bg-[#222] rounded-lg"></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Produto Exemplo {i + 1}</p>
                                                    <p className="text-xs text-gray-500">Quantidade: 1</p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">R$ 100,00</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Endereço de Entrega</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Rua das Flores, 123<br />
                                            Jardim Paulista<br />
                                            São Paulo - SP<br />
                                            CEP: 01234-567
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Resumo</h3>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between text-gray-500">
                                                <span>Subtotal</span>
                                                <span>R$ {(selectedOrder.total - 20).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-gray-500">
                                                <span>Frete</span>
                                                <span>R$ 20,00</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-2 border-t dark:border-gray-800 mt-2">
                                                <span>Total</span>
                                                <span>R$ {selectedOrder.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t dark:border-white/10 bg-gray-50 dark:bg-white/5 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setSelectedOrder(null)}>Fechar</Button>
                            <Button>Rastrear Pedido</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Address Modal */}
            {isAddressModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
                            </h2>
                            <button onClick={() => setIsAddressModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveAddress} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Nome do Endereço (ex: Casa, Trabalho)</label>
                                <input required type="text" value={addressForm.label || ''} onChange={e => setAddressForm({ ...addressForm, label: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Rua</label>
                                    <input required type="text" value={addressForm.street || ''} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Número</label>
                                    <input required type="text" value={addressForm.number || ''} onChange={e => setAddressForm({ ...addressForm, number: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Complemento</label>
                                    <input type="text" value={addressForm.complement || ''} onChange={e => setAddressForm({ ...addressForm, complement: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Bairro</label>
                                    <input required type="text" value={addressForm.neighborhood || ''} onChange={e => setAddressForm({ ...addressForm, neighborhood: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Cidade</label>
                                    <input required type="text" value={addressForm.city || ''} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Estado</label>
                                    <input required type="text" value={addressForm.state || ''} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">CEP</label>
                                <input required type="text" value={addressForm.zip || ''} onChange={e => setAddressForm({ ...addressForm, zip: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all" />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" type="button" onClick={() => setIsAddressModalOpen(false)}>Cancelar</Button>
                                <Button type="submit">Salvar Endereço</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Card Modal */}
            {isCardModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-white/5">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Novo Cartão</h2>
                            <button onClick={() => setIsCardModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveCard} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Número do Cartão</label>
                                <input required type="text" placeholder="0000 0000 0000 0000" value={cardForm.number} onChange={e => setCardForm({ ...cardForm, number: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all font-mono" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Nome no Cartão</label>
                                <input required type="text" placeholder="COMO NO CARTAO" value={cardForm.holder} onChange={e => setCardForm({ ...cardForm, holder: e.target.value.toUpperCase() })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all uppercase" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Validade</label>
                                    <input required type="text" placeholder="MM/AA" value={cardForm.expiry} onChange={e => setCardForm({ ...cardForm, expiry: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all text-center" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">CVV</label>
                                    <input required type="text" placeholder="123" value={cardForm.cvv} onChange={e => setCardForm({ ...cardForm, cvv: e.target.value })} className="w-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all text-center" />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" type="button" onClick={() => setIsCardModalOpen(false)}>Cancelar</Button>
                                <Button type="submit">Adicionar Cartão</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
