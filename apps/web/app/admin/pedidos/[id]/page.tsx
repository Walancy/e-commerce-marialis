"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Printer,
    FileText,
    Ban,
    CheckCircle,
    Truck,
    Package,
    CreditCard,
    User,
    MapPin,
    Calendar,
    Clock,
    AlertTriangle,
    MessageSquare,
    Save,
    ChevronRight,
    Copy,
    Mail,
    Phone
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Dropdown } from '../../../../components/ui/Dropdown';

// Mock Data for specific order
const MOCK_ORDER = {
    id: "ORD-001-2024",
    date: "2024-11-28T14:30:00",
    status: "Processando",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
    installments: "3x de R$ 166,33",
    transactionId: "TXN-987654321",
    total: 499.00,
    subtotal: 499.00,
    shipping: 0.00,
    discount: 0.00,
    customer: {
        id: 1,
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "(11) 99999-9999",
        document: "123.456.789-00"
    },
    shippingAddress: {
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Jardim Paulista",
        city: "São Paulo",
        state: "SP",
        zip: "01234-567"
    },
    items: [
        {
            id: 1,
            name: "Prancha Lizze Extreme",
            sku: "LIZ-EXT-001",
            quantity: 1,
            price: 499.00,
            image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=100",
            brand: "Lizze"
        }
    ],
    timeline: [
        { date: "2024-11-28 14:30", title: "Pedido Realizado", description: "O pedido foi criado pelo cliente." },
        { date: "2024-11-28 14:35", title: "Pagamento Confirmado", description: "Pagamento via Cartão de Crédito aprovado." },
        { date: "2024-11-28 15:00", title: "Em Processamento", description: "O pedido está sendo separado no estoque." }
    ],
    notes: ""
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [order, setOrder] = useState(MOCK_ORDER);
    const [note, setNote] = useState("");
    const [activeTab, setActiveTab] = useState('items');

    const tabs = [
        { id: 'items', label: 'Itens do Pedido', icon: Package },
        { id: 'shipping', label: 'Entrega e Cliente', icon: Truck },
        { id: 'payment', label: 'Pagamento', icon: CreditCard },
        { id: 'history', label: 'Histórico', icon: Clock },
    ];

    const steps = [
        { label: 'Pedido Realizado', status: 'completed', icon: FileText },
        { label: 'Pagamento', status: 'completed', icon: CreditCard },
        { label: 'Processando', status: 'current', icon: Package },
        { label: 'Enviado', status: 'upcoming', icon: Truck },
        { label: 'Entregue', status: 'upcoming', icon: CheckCircle },
    ];

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

    const handleAddNote = () => {
        if (!note.trim()) return;
        const newTimeline = [
            {
                date: new Date().toLocaleString('pt-BR').slice(0, 16),
                title: "Nota Adicionada",
                description: note
            },
            ...order.timeline
        ];
        setOrder({ ...order, timeline: newTimeline });
        setNote("");
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Pedido #{params.id}
                            </h1>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(order.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir
                    </Button>
                    <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Nota Fiscal
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 dark:border-red-900/30">
                        <Ban className="w-4 h-4 mr-2" />
                        Cancelar
                    </Button>
                    <div className="h-8 w-px bg-gray-200 dark:bg-white/10 mx-2 hidden lg:block" />
                    <Button size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                    </Button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b dark:border-white/5 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-black dark:border-white text-black dark:text-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in duration-300">

                {/* ITEMS TAB */}
                {activeTab === 'items' && (
                    <div className="space-y-6">
                        {/* Order Status & Progress Card */}
                        <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 overflow-hidden">
                            <div className="p-6 border-b dark:border-white/5">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Status do Pedido</h3>
                                        <p className="text-xs text-gray-500 mt-1">Acompanhe e atualize o andamento do pedido</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <div className="w-48">
                                            <Dropdown
                                                options={['Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado']}
                                                value={order.status}
                                                onChange={(val) => setOrder({ ...order, status: val })}
                                            />
                                        </div>
                                        <Button>
                                            <Truck className="w-4 h-4 mr-2" />
                                            Atualizar Rastreio
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 overflow-x-auto">
                                <div className="flex items-center justify-between min-w-[600px]">
                                    {steps.map((step, index) => {
                                        const Icon = step.icon;
                                        const isCompleted = step.status === 'completed';
                                        const isCurrent = step.status === 'current';

                                        return (
                                            <div key={index} className="flex flex-col items-center relative flex-1">
                                                {/* Connector Line */}
                                                {index !== 0 && (
                                                    <div className={`absolute top-5 right-[50%] w-full h-0.5 ${isCompleted || isCurrent ? 'bg-green-500' : 'bg-gray-200 dark:bg-white/10'
                                                        }`} />
                                                )}

                                                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 text-white' :
                                                        isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/30' :
                                                            'bg-gray-100 dark:bg-white/10 text-gray-400'
                                                    }`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className={`mt-3 text-xs font-bold ${isCompleted ? 'text-green-600 dark:text-green-400' :
                                                        isCurrent ? 'text-blue-600 dark:text-blue-400' :
                                                            'text-gray-400'
                                                    }`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 overflow-hidden">
                            <div className="px-6 py-4 border-b dark:border-white/5 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Itens do Pedido
                                </h3>
                                <span className="text-xs text-gray-500">{order.items.length} itens</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 dark:bg-white/5 text-xs text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3">Produto</th>
                                            <th className="px-6 py-3 text-center">SKU</th>
                                            <th className="px-6 py-3 text-center">Qtd</th>
                                            <th className="px-6 py-3 text-right">Preço Unit.</th>
                                            <th className="px-6 py-3 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-white/5">
                                        {order.items.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden border dark:border-white/10">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                                            <p className="text-xs text-gray-500">{item.brand}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center text-xs font-mono text-gray-500">{item.sku}</td>
                                                <td className="px-6 py-4 text-center font-medium">{item.quantity}</td>
                                                <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400">R$ {item.price.toFixed(2)}</td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">R$ {(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-gray-50 dark:bg-white/5 p-6 border-t dark:border-white/5">
                                <div className="flex flex-col gap-2 ml-auto max-w-xs">
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>R$ {order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>Frete</span>
                                        <span>{order.shipping === 0 ? 'Grátis' : `R$ ${order.shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>Desconto</span>
                                        <span>- R$ {order.discount.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-gray-200 dark:bg-white/10 my-1" />
                                    <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>R$ {order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SHIPPING & CUSTOMER TAB */}
                {activeTab === 'shipping' && (
                    <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x dark:divide-white/5">
                            {/* Customer Info */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Dados do Cliente
                                    </h3>
                                    <button className="text-xs text-blue-600 hover:underline">Ver Perfil Completo</button>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 font-bold text-xl">
                                        {order.customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-gray-900 dark:text-white">{order.customer.name}</p>
                                        <p className="text-sm text-gray-500">Cliente desde 2023</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{order.customer.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Telefone</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{order.customer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">CPF/CNPJ</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{order.customer.document}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Endereço de Entrega
                                </h3>

                                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 mb-6 border dark:border-white/5">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                            <p className="font-bold text-gray-900 dark:text-white text-base">
                                                {order.shippingAddress.street}, {order.shippingAddress.number}
                                            </p>
                                            <p>{order.shippingAddress.complement}</p>
                                            <p>{order.shippingAddress.neighborhood}</p>
                                            <p>{order.shippingAddress.city} - {order.shippingAddress.state}</p>
                                            <p className="font-mono text-xs pt-1">{order.shippingAddress.zip}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t dark:border-white/5">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Método de Envio</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">Sedex</p>
                                                <p className="text-xs text-gray-500">2-3 dias úteis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Código de Rastreio</p>
                                        <div className="flex items-center gap-2">
                                            <code className="text-sm font-mono bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 border dark:border-white/5">
                                                BR123456789SP
                                            </code>
                                            <Button size="sm" variant="ghost">
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PAYMENT TAB */}
                {activeTab === 'payment' && (
                    <div className="max-w-2xl">
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Informações de Pagamento
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Status do Pagamento</p>
                                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Método Escolhido</p>
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                            <span className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Parcelamento</p>
                                        <span className="text-sm text-gray-900 dark:text-white">{order.installments}</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">ID da Transação</p>
                                        <div className="flex items-center gap-2">
                                            <code className="text-xs font-mono bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                                                {order.transactionId}
                                            </code>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                <Copy className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Data do Pagamento</p>
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            {new Date(order.date).toLocaleString('pt-BR')}
                                        </span>
                                    </div>
                                    <div className="pt-4 border-t dark:border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900 dark:text-white">Total Pago</span>
                                            <span className="font-bold text-lg text-green-600 dark:text-green-400">
                                                R$ {order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* HISTORY TAB */}
                {activeTab === 'history' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Linha do Tempo
                                </h3>
                                <div className="relative pl-4 border-l-2 border-gray-100 dark:border-white/10 space-y-8">
                                    {order.timeline.map((event, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#121212]" />
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{event.title}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{event.description}</p>
                                                </div>
                                                <span className="text-xs text-gray-400 font-mono whitespace-nowrap">{event.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 sticky top-6">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Anotações Internas
                                </h3>
                                <div className="space-y-4">
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Adicione uma observação sobre este pedido..."
                                        rows={4}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                    />
                                    <Button className="w-full" onClick={handleAddNote}>
                                        Adicionar Nota
                                    </Button>
                                </div>
                                <div className="mt-6 pt-6 border-t dark:border-white/5">
                                    <p className="text-xs text-gray-400 text-center">
                                        As anotações são visíveis apenas para a equipe administrativa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
