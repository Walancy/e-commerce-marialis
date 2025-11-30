"use client";

import React, { useState } from 'react';
import { Save, Bell, Globe, CreditCard, Truck, Store, Settings, Shield, Smartphone, Mail, MapPin, Upload, Image as ImageIcon, Barcode, FileText, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Switch } from '../../../components/ui/Switch';
import { Dropdown } from '../../../components/ui/Dropdown';
import { SearchInput } from '../../../components/ui/SearchInput';
import { Input } from '../../../components/ui/Input';
import { Modal } from '../../../components/ui/Modal';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('store');

    const [storeSettings, setStoreSettings] = useState({
        name: 'Marialis Cosméticos',
        slogan: 'Beleza Profissional',
        description: 'A melhor loja de cosméticos e equipamentos profissionais.',
        email: 'contato@marialis.com.br',
        phone: '(11) 99999-9999',
        address: 'Rua Exemplo, 123 - São Paulo, SP',
        logo: null as string | null
    });

    const [systemSettings, setSystemSettings] = useState({
        maintenanceMode: false,
        language: 'Português (BR)',
        timezone: '(GMT-03:00) Brasília',
        seoTitleSuffix: '| Marialis Cosméticos',
        seoMetaDescription: ''
    });

    const [paymentSettings, setPaymentSettings] = useState({
        creditCard: true,
        pix: true,
        boleto: false,
        googlePay: false
    });

    const [shippingSettings, setShippingSettings] = useState({
        freeShippingThreshold: 299.00,
        pickupInStore: true,
        correios: true
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailOnSale: true,
        lowStockAlert: true,
        newCustomers: false,
        weeklyReports: true
    });

    const [logFilters, setLogFilters] = useState({
        search: '',
        status: 'all',
        date: ''
    });

    const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
    const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false);

    const [sessions, setSessions] = useState([
        { id: 1, device: 'Chrome on Windows', location: 'São Paulo, BR', ip: '192.168.1.1', lastActive: 'Agora', current: true },
        { id: 2, device: 'Safari on iPhone', location: 'Rio de Janeiro, BR', ip: '200.100.50.25', lastActive: 'Há 2 dias', current: false },
        { id: 3, device: 'Firefox on MacOS', location: 'Curitiba, BR', ip: '172.16.0.1', lastActive: 'Há 1 semana', current: false },
    ]);

    const handleRevokeSession = (id: number) => {
        setSessions(prev => prev.filter(session => session.id !== id));
    };

    const logs = [
        { id: 1, action: 'Login realizado', user: 'Admin', ip: '192.168.1.1', date: '29/11/2025', time: '14:30', status: 'success', details: 'Login via navegador Chrome' },
        { id: 2, action: 'Alteração de produto', user: 'Gerente', ip: '192.168.1.2', date: '29/11/2025', time: '14:15', status: 'success', details: 'Atualizou preço do produto #123' },
        { id: 3, action: 'Tentativa de login falha', user: 'Desconhecido', ip: '200.100.50.25', date: '29/11/2025', time: '13:00', status: 'error', details: 'Senha incorreta (3 tentativas)' },
        { id: 4, action: 'Backup do sistema', user: 'Sistema', ip: 'Localhost', date: '29/11/2025', time: '12:00', status: 'success', details: 'Backup automático diário' },
        { id: 5, action: 'Novo pedido', user: 'Cliente #456', ip: '172.16.0.1', date: '28/11/2025', time: '18:45', status: 'success', details: 'Pedido #999 criado' },
        { id: 6, action: 'Configurações alteradas', user: 'Admin', ip: '192.168.1.1', date: '28/11/2025', time: '10:20', status: 'success', details: 'Alterou configurações de frete' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(logFilters.search.toLowerCase()) ||
            log.user.toLowerCase().includes(logFilters.search.toLowerCase()) ||
            log.details.toLowerCase().includes(logFilters.search.toLowerCase());
        const matchesStatus = logFilters.status === 'all' || log.status === logFilters.status;
        const matchesDate = !logFilters.date || log.date === new Date(logFilters.date).toLocaleDateString('pt-BR'); // Simple date match approximation

        return matchesSearch && matchesStatus;
    });

    const handleStoreChange = (field: string, value: string) => {
        setStoreSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleLogoUpload = () => {
        // Simulate file upload
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    handleStoreChange('logo', e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleSystemChange = (field: string, value: any) => {
        setSystemSettings(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentChange = (field: string, value: boolean) => {
        setPaymentSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleShippingChange = (field: string, value: any) => {
        setShippingSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleNotificationChange = (field: string, value: boolean) => {
        setNotificationSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving settings:', {
            store: storeSettings,
            system: systemSettings,
            payments: paymentSettings,
            shipping: shippingSettings,
            notifications: notificationSettings
        });
        // Here you would typically call an API to save the settings
        alert('Configurações salvas com sucesso!');
    };

    const tabs = [
        { id: 'store', label: 'Loja', icon: Store },
        { id: 'system', label: 'Sistema', icon: Settings },
        { id: 'payments', label: 'Pagamentos', icon: CreditCard },
        { id: 'shipping', label: 'Envio', icon: Truck },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'security', label: 'Segurança', icon: Shield },
        { id: 'logs', label: 'Logs', icon: FileText },
    ];

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie as preferências da sua loja e do sistema</p>
                </div>
                <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                </Button>
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
            <div className="w-full">
                {/* Main Content */}
                <div className="space-y-6">
                    {activeTab === 'store' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            {/* Basic Info */}
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    Informações Básicas
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo da Loja</label>
                                        <div className="flex items-center gap-6">
                                            <div
                                                className="w-24 h-24 rounded-xl bg-gray-50 dark:bg-white/5 border dark:border-white/10 flex items-center justify-center p-2 relative group overflow-hidden cursor-pointer"
                                                onClick={handleLogoUpload}
                                            >
                                                {storeSettings.logo ? (
                                                    <img src={storeSettings.logo} alt="Logo" className="w-full h-full object-contain" />
                                                ) : (
                                                    <ImageIcon className="w-8 h-8 text-gray-300" />
                                                )}
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Upload className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <Button variant="outline" size="sm" className="mb-2" onClick={handleLogoUpload}>Carregar Logo</Button>
                                                <p className="text-xs text-gray-500">Recomendado: 500x500px, PNG ou JPG.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Loja</label>
                                        <input
                                            type="text"
                                            value={storeSettings.name}
                                            onChange={(e) => handleStoreChange('name', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slogan</label>
                                        <input
                                            type="text"
                                            value={storeSettings.slogan}
                                            onChange={(e) => handleStoreChange('slogan', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                                        <textarea
                                            rows={3}
                                            value={storeSettings.description}
                                            onChange={(e) => handleStoreChange('description', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Smartphone className="w-5 h-5" />
                                    Contato e Endereço
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail de Contato</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="email"
                                                value={storeSettings.email}
                                                onChange={(e) => handleStoreChange('email', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefone / WhatsApp</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={storeSettings.phone}
                                                onChange={(e) => handleStoreChange('phone', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Endereço Completo</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                            <textarea
                                                rows={2}
                                                value={storeSettings.address}
                                                onChange={(e) => handleStoreChange('address', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            {/* General System Settings */}
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Preferências do Sistema
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Modo de Manutenção</h3>
                                            <p className="text-xs text-gray-500">Desativar a loja temporariamente para visitantes</p>
                                        </div>
                                        <Switch
                                            checked={systemSettings.maintenanceMode}
                                            onChange={(checked) => handleSystemChange('maintenanceMode', checked)}
                                        />
                                    </div>
                                    <div className="h-px bg-gray-100 dark:bg-white/5" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idioma Padrão</label>
                                            <Dropdown
                                                options={['Português (BR)', 'English (US)', 'Español']}
                                                value={systemSettings.language}
                                                onChange={(val) => handleSystemChange('language', val)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fuso Horário</label>
                                            <Dropdown
                                                options={['(GMT-03:00) Brasília', '(GMT-04:00) Manaus']}
                                                value={systemSettings.timezone}
                                                onChange={(val) => handleSystemChange('timezone', val)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    SEO Padrão
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Página (Sufixo)</label>
                                        <input
                                            type="text"
                                            value={systemSettings.seoTitleSuffix}
                                            onChange={(e) => handleSystemChange('seoTitleSuffix', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Descrição Padrão</label>
                                        <textarea
                                            rows={3}
                                            value={systemSettings.seoMetaDescription}
                                            onChange={(e) => handleSystemChange('seoMetaDescription', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Métodos de Pagamento
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center">
                                                <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Cartão de Crédito</h3>
                                                <p className="text-xs text-gray-500">Stripe / Pagar.me</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={paymentSettings.creditCard}
                                            onChange={(checked) => handlePaymentChange('creditCard', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center p-2">
                                                <img src="/icons/Pix.svg" alt="PIX" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">PIX</h3>
                                                <p className="text-xs text-gray-500">Pagamento instantâneo</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={paymentSettings.pix}
                                            onChange={(checked) => handlePaymentChange('pix', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center">
                                                <Barcode className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Boleto Bancário</h3>
                                                <p className="text-xs text-gray-500">Vencimento em 3 dias</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={paymentSettings.boleto}
                                            onChange={(checked) => handlePaymentChange('boleto', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white dark:bg-black/20 flex items-center justify-center p-2">
                                                <img src="/icons/Google pay.svg" alt="Google Pay" className="w-full h-full object-contain invert dark:invert-0" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Google Pay</h3>
                                                <p className="text-xs text-gray-500">Carteira digital</p>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={paymentSettings.googlePay}
                                            onChange={(checked) => handlePaymentChange('googlePay', checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shipping' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    Opções de Entrega
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frete Grátis a partir de (R$)</label>
                                        <input
                                            type="number"
                                            value={shippingSettings.freeShippingThreshold}
                                            onChange={(e) => handleShippingChange('freeShippingThreshold', parseFloat(e.target.value))}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                    <div className="h-px bg-gray-100 dark:bg-white/5" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Retirada em Loja</h3>
                                            <p className="text-xs text-gray-500">Permitir que clientes retirem produtos na loja física</p>
                                        </div>
                                        <Switch
                                            checked={shippingSettings.pickupInStore}
                                            onChange={(checked) => handleShippingChange('pickupInStore', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Correios (PAC/Sedex)</h3>
                                            <p className="text-xs text-gray-500">Integração automática com Correios</p>
                                        </div>
                                        <Switch
                                            checked={shippingSettings.correios}
                                            onChange={(checked) => handleShippingChange('correios', checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Bell className="w-5 h-5" />
                                    Preferências de Notificação
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">E-mail a cada venda</h3>
                                            <p className="text-xs text-gray-500">Receba um e-mail sempre que uma nova venda for realizada</p>
                                        </div>
                                        <Switch
                                            checked={notificationSettings.emailOnSale}
                                            onChange={(checked) => handleNotificationChange('emailOnSale', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Alerta de estoque baixo</h3>
                                            <p className="text-xs text-gray-500">Seja notificado quando produtos estiverem acabando</p>
                                        </div>
                                        <Switch
                                            checked={notificationSettings.lowStockAlert}
                                            onChange={(checked) => handleNotificationChange('lowStockAlert', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Novos clientes</h3>
                                            <p className="text-xs text-gray-500">Notificação ao cadastrar novos clientes</p>
                                        </div>
                                        <Switch
                                            checked={notificationSettings.newCustomers}
                                            onChange={(checked) => handleNotificationChange('newCustomers', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Relatórios semanais</h3>
                                            <p className="text-xs text-gray-500">Resumo semanal de vendas e performance</p>
                                        </div>
                                        <Switch
                                            checked={notificationSettings.weeklyReports}
                                            onChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Segurança da Loja
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-blue-50 dark:bg-blue-500/10 p-6 rounded-xl border border-blue-100 dark:border-blue-500/20">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                                                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Certificado SSL Ativo</h3>
                                                <p className="text-sm text-blue-700 dark:text-blue-400">
                                                    Sua loja está protegida com criptografia de ponta a ponta. Seus dados e os de seus clientes estão seguros.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 border dark:border-white/10 rounded-xl">
                                            <h3 className="font-medium mb-2">Autenticação de Dois Fatores</h3>
                                            <p className="text-sm text-gray-500 mb-4">Adicione uma camada extra de segurança à sua conta.</p>
                                            <Button variant="outline" size="sm" onClick={() => setIs2FAModalOpen(true)}>Configurar 2FA</Button>
                                        </div>
                                        <div className="p-4 border dark:border-white/10 rounded-xl">
                                            <h3 className="font-medium mb-2">Sessões Ativas</h3>
                                            <p className="text-sm text-gray-500 mb-4">Gerencie os dispositivos conectados à sua conta.</p>
                                            <Button variant="outline" size="sm" onClick={() => setIsSessionsModalOpen(true)}>Gerenciar Sessões</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'logs' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Logs de Atividade
                                    </h2>
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <SearchInput
                                            placeholder="Buscar logs..."
                                            value={logFilters.search}
                                            onChange={(e) => setLogFilters(prev => ({ ...prev, search: e.target.value }))}
                                            containerClassName="w-full md:w-64"
                                        />
                                        <Input
                                            type="date"
                                            value={logFilters.date}
                                            onChange={(e) => setLogFilters(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full md:w-auto"
                                        />
                                        <Dropdown
                                            options={[
                                                { label: 'Todos os Status', value: 'all' },
                                                { label: 'Sucesso', value: 'success' },
                                                { label: 'Erro', value: 'error' }
                                            ]}
                                            value={logFilters.status}
                                            onChange={(val) => setLogFilters(prev => ({ ...prev, status: val }))}
                                            className="w-full md:w-40"
                                        />
                                    </div>
                                </div>


                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b dark:border-white/5 text-xs text-gray-500 uppercase tracking-wider">
                                                <th className="px-4 py-3 font-medium">Status</th>
                                                <th className="px-4 py-3 font-medium">Ação</th>
                                                <th className="px-4 py-3 font-medium">Usuário / IP</th>
                                                <th className="px-4 py-3 font-medium">Detalhes</th>
                                                <th className="px-4 py-3 font-medium text-right">Data / Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y dark:divide-white/5">
                                            {filteredLogs.map((log) => (
                                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{log.action}</span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{log.user}</span>
                                                            <span className="text-xs text-gray-500">{log.ip}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">{log.details}</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{log.date}</span>
                                                            <span className="text-xs text-gray-500">{log.time}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredLogs.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                                        Nenhum log encontrado com os filtros atuais.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* 2FA Modal */}
            <Modal
                isOpen={is2FAModalOpen}
                onClose={() => setIs2FAModalOpen(false)}
                title="Configurar Autenticação de Dois Fatores"
            >
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Escaneie o QR Code abaixo com seu aplicativo autenticador (Google Authenticator, Authy, etc).
                        </p>
                        <div className="w-48 h-48 bg-white p-2 mx-auto border rounded-lg mb-4 flex items-center justify-center">
                            <Barcode className="w-32 h-32 text-gray-900" />
                        </div>
                        <p className="text-xs text-gray-500 mb-6">
                            Código manual: <span className="font-mono font-bold text-gray-900 dark:text-white">ABCD 1234 EFGH 5678</span>
                        </p>
                    </div>

                    <div>
                        <Input
                            label="Código de Verificação"
                            placeholder="Digite o código de 6 dígitos"
                            className="text-center text-lg tracking-widest"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setIs2FAModalOpen(false)}>Cancelar</Button>
                        <Button onClick={() => setIs2FAModalOpen(false)}>Ativar 2FA</Button>
                    </div>
                </div>
            </Modal>

            {/* Sessions Modal */}
            <Modal
                isOpen={isSessionsModalOpen}
                onClose={() => setIsSessionsModalOpen(false)}
                title="Gerenciar Sessões Ativas"
                className="max-w-2xl"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Abaixo estão listados os dispositivos que acessaram sua conta recentemente.
                    </p>

                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white dark:bg-black/20 rounded-lg">
                                        {session.device.toLowerCase().includes('phone') ? (
                                            <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        ) : (
                                            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{session.device}</h3>
                                            {session.current && (
                                                <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                                                    Atual
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">{session.location} • {session.ip}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Última atividade: {session.lastActive}</p>
                                    </div>
                                </div>
                                {!session.current && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 border-red-200 dark:border-red-500/30"
                                        onClick={() => handleRevokeSession(session.id)}
                                    >
                                        Revogar
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    {sessions.length > 1 && (
                        <div className="pt-4 border-t dark:border-white/10 flex justify-end">
                            <Button
                                variant="outline"
                                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 border-red-200 dark:border-red-500/30"
                                onClick={() => setSessions(prev => prev.filter(s => s.current))}
                            >
                                Sair de todas as outras sessões
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}
