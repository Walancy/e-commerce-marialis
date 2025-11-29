"use client";

import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { CreditCard, Truck, ShieldCheck, Lock, MapPin, Plus, Check, ChevronRight, Edit2, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Dropdown } from '../../components/ui/Dropdown';
import { CardIcon } from '../../components/ui/CardIcon';
import Link from 'next/link';

// Mock Data Interfaces
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
    type: string;
    last4: string;
    holder: string;
    expiry: string;
    isDefault: boolean;
}

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

    // Mock Data
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

    const [selectedAddressId, setSelectedAddressId] = useState<number>(1);
    const [selectedCardId, setSelectedCardId] = useState<number>(1);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
    const [selectedInstallment, setSelectedInstallment] = useState('1x');

    // Add Card State
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [newCard, setNewCard] = useState({
        number: '',
        holder: '',
        expiry: '',
        cvv: '',
        type: ''
    });

    const installmentOptions = [
        { label: '1x de R$ 349,70 sem juros', value: '1x' },
        { label: '2x de R$ 174,85 sem juros', value: '2x' },
        { label: '3x de R$ 116,56 sem juros', value: '3x' },
    ];

    const steps = [
        { id: 1, title: "Carrinho", icon: ShoppingBag },
        { id: 2, title: "Entrega", icon: Truck },
        { id: 3, title: "Pagamento", icon: CreditCard },
        { id: 4, title: "Revisão", icon: ShieldCheck },
    ];

    const detectCardBrand = (number: string) => {
        const patterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
            hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/
        };

        for (const [brand, pattern] of Object.entries(patterns)) {
            if (pattern.test(number)) return brand;
        }
        return '';
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        const brand = detectCardBrand(value);
        setNewCard(prev => ({ ...prev, number: value, type: brand }));
    };

    const handleAddCard = () => {
        if (!newCard.number || !newCard.holder || !newCard.expiry || !newCard.cvv) return;

        const newId = Math.max(...cards.map(c => c.id), 0) + 1;
        const cardToAdd: Card = {
            id: newId,
            type: newCard.type || 'unknown',
            last4: newCard.number.slice(-4),
            holder: newCard.holder.toUpperCase(),
            expiry: newCard.expiry,
            isDefault: false
        };

        setCards([...cards, cardToAdd]);
        setSelectedCardId(newId);
        setIsAddingCard(false);
        setNewCard({ number: '', holder: '', expiry: '', cvv: '', type: '' });
    };

    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
            <Header />

            <div className="py-8 px-4 lg:px-20 max-w-[1200px] mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Finalizar Compra</h1>

                {/* Stepper */}
                <div className="mb-10">
                    <div className="flex items-center justify-between relative max-w-2xl mx-auto">
                        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>
                        {steps.map((step) => {
                            const isCompleted = currentStep > step.id;
                            const isCurrent = currentStep === step.id;
                            const Icon = step.icon;

                            return (
                                <div key={step.id} className="flex flex-col items-center gap-2 bg-white dark:bg-[#1a1a1a] px-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted || isCurrent
                                            ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black'
                                            : 'bg-white border-gray-200 text-gray-300 dark:bg-[#1a1a1a] dark:border-gray-800 dark:text-gray-700'
                                        }`}>
                                        {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isCompleted || isCurrent ? 'text-black dark:text-white' : 'text-gray-400'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {/* STEP 1: CARRINHO */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Seu Carrinho</h2>
                                    <Link href="/" className="text-xs font-bold text-black dark:text-white hover:underline flex items-center gap-1">
                                        <ArrowLeft className="w-3 h-3" />
                                        Continuar Comprando
                                    </Link>
                                </div>

                                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <div className="p-4 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=1000" alt="Product" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">Shampoo Hidratante Premium</h3>
                                                        <p className="text-xs text-gray-500 mt-1">500ml • Hidratação Profunda</p>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
                                                        <button className="text-gray-500 hover:text-black dark:hover:text-white text-lg leading-none">-</button>
                                                        <span className="text-sm font-medium w-4 text-center">1</span>
                                                        <button className="text-gray-500 hover:text-black dark:hover:text-white text-lg leading-none">+</button>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">R$ 89,90</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000" alt="Product" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">Máscara Capilar Reconstrutora</h3>
                                                        <p className="text-xs text-gray-500 mt-1">300g • Reconstrução Total</p>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
                                                        <button className="text-gray-500 hover:text-black dark:hover:text-white text-lg leading-none">-</button>
                                                        <span className="text-sm font-medium w-4 text-center">2</span>
                                                        <button className="text-gray-500 hover:text-black dark:hover:text-white text-lg leading-none">+</button>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">R$ 259,80</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: ENTREGA */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Escolha o endereço de entrega</h2>
                                    <Button variant="outline" size="sm" className="text-xs">
                                        <Plus className="w-3 h-3 mr-1.5" />
                                        Novo Endereço
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {addresses.map((addr) => (
                                        <div
                                            key={addr.id}
                                            onClick={() => setSelectedAddressId(addr.id)}
                                            className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedAddressId === addr.id
                                                    ? 'border-black dark:border-white bg-gray-50 dark:bg-white/5'
                                                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${selectedAddressId === addr.id ? 'border-black dark:border-white' : 'border-gray-300 dark:border-gray-600'
                                                    }`}>
                                                    {selectedAddressId === addr.id && <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                            {addr.label}
                                                            {addr.isDefault && <span className="bg-gray-100 dark:bg-gray-800 text-[10px] px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">Padrão</span>}
                                                        </span>
                                                        <button className="text-gray-400 hover:text-black dark:hover:text-white">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                        {addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}<br />
                                                        {addr.neighborhood}, {addr.city} - {addr.state}<br />
                                                        CEP: {addr.zip}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PAGAMENTO */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Como você prefere pagar?</h2>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${paymentMethod === 'card'
                                                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                                : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6" />
                                        <span className="font-bold text-sm">Cartão de Crédito</span>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('pix')}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${paymentMethod === 'pix'
                                                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                                : 'border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">PIX</span>
                                            <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded font-bold">-5%</span>
                                        </div>
                                        <span className="text-xs opacity-80">Aprovação imediata</span>
                                    </button>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">Seus cartões salvos</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-xs h-8"
                                                    onClick={() => setIsAddingCard(!isAddingCard)}
                                                >
                                                    {isAddingCard ? <X className="w-3 h-3 mr-1.5" /> : <Plus className="w-3 h-3 mr-1.5" />}
                                                    {isAddingCard ? 'Cancelar' : 'Adicionar novo'}
                                                </Button>
                                            </div>

                                            {isAddingCard && (
                                                <div className="bg-gray-50 dark:bg-[#222] p-5 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4 animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-1">
                                                            <Input
                                                                placeholder="Número do Cartão"
                                                                value={newCard.number}
                                                                onChange={handleCardNumberChange}
                                                                maxLength={19}
                                                            />
                                                        </div>
                                                        <div className="w-12 flex items-center justify-center">
                                                            {newCard.type && <CardIcon brand={newCard.type} className="w-8 h-8" />}
                                                        </div>
                                                    </div>
                                                    <Input
                                                        placeholder="Nome Impresso no Cartão"
                                                        value={newCard.holder}
                                                        onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <Input
                                                            placeholder="Validade (MM/AA)"
                                                            value={newCard.expiry}
                                                            onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                                            maxLength={5}
                                                        />
                                                        <Input
                                                            placeholder="CVV"
                                                            value={newCard.cvv}
                                                            onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                                            maxLength={4}
                                                        />
                                                    </div>
                                                    <Button onClick={handleAddCard} className="w-full">
                                                        Salvar Cartão
                                                    </Button>
                                                </div>
                                            )}

                                            {cards.map((card) => (
                                                <div
                                                    key={card.id}
                                                    onClick={() => setSelectedCardId(card.id)}
                                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedCardId === card.id
                                                            ? 'border-black dark:border-white bg-gray-50 dark:bg-white/5'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedCardId === card.id ? 'border-black dark:border-white' : 'border-gray-300 dark:border-gray-600'
                                                            }`}>
                                                            {selectedCardId === card.id && <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />}
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <CardIcon brand={card.type} className="w-10 h-6" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-bold text-gray-900 dark:text-white">•••• •••• •••• {card.last4}</p>
                                                            <p className="text-xs text-gray-500">{card.holder}</p>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Val: {card.expiry}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t dark:border-gray-800">
                                            <label className="block text-xs font-medium text-gray-500 mb-2">Parcelamento</label>
                                            <Dropdown
                                                options={installmentOptions}
                                                value={selectedInstallment}
                                                onChange={setSelectedInstallment}
                                                placeholder="Selecione o parcelamento"
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'pix' && (
                                    <div className="bg-gray-50 dark:bg-[#222] p-8 rounded-xl border border-gray-100 dark:border-gray-800 text-center">
                                        <div className="w-20 h-20 bg-white dark:bg-[#1a1a1a] rounded-xl mx-auto mb-6 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800">
                                            <span className="font-bold text-3xl">QR</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pagamento via PIX</h3>
                                        <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6 leading-relaxed">
                                            O código QR será gerado na próxima etapa. Você terá 30 minutos para realizar o pagamento com segurança.
                                        </p>
                                        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-bold">
                                            <Check className="w-4 h-4" />
                                            Economize R$ 17,49
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* STEP 4: REVISÃO */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revise seu pedido</h2>

                                <div className="bg-gray-50 dark:bg-[#222] rounded-xl p-5 border border-gray-100 dark:border-gray-800 space-y-4">
                                    <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Entregar em</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {addresses.find(a => a.id === selectedAddressId)?.street}, {addresses.find(a => a.id === selectedAddressId)?.number}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {addresses.find(a => a.id === selectedAddressId)?.neighborhood} - {addresses.find(a => a.id === selectedAddressId)?.city}
                                            </p>
                                        </div>
                                        <button onClick={() => setCurrentStep(2)} className="ml-auto text-xs font-bold text-black dark:text-white hover:underline">Alterar</button>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Pagamento</p>
                                            {paymentMethod === 'card' ? (
                                                <>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Cartão final {cards.find(c => c.id === selectedCardId)?.last4}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {installmentOptions.find(opt => opt.value === selectedInstallment)?.label}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">PIX à vista</p>
                                            )}
                                        </div>
                                        <button onClick={() => setCurrentStep(3)} className="ml-auto text-xs font-bold text-black dark:text-white hover:underline">Alterar</button>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <div className="p-4 bg-gray-50 dark:bg-[#222] border-b border-gray-100 dark:border-gray-800">
                                        <h3 className="font-bold text-sm text-gray-900 dark:text-white">Itens do Pedido</h3>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=1000" alt="Product" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">Shampoo Hidratante Premium</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">Quantidade: 1</p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">R$ 89,90</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000" alt="Product" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">Máscara Capilar Reconstrutora</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">Quantidade: 2</p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">R$ 259,80</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-[#222] p-5 rounded-xl border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resumo</h2>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Subtotal</span>
                                    <span>R$ 349,70</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Frete</span>
                                    <span className="text-green-600 font-medium">Grátis</span>
                                </div>
                                {paymentMethod === 'pix' && (
                                    <div className="flex items-center justify-between text-xs text-green-600">
                                        <span>Desconto PIX (5%)</span>
                                        <span>- R$ 17,49</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <span>Total</span>
                                    <span>R$ {paymentMethod === 'pix' ? '332,21' : '349,70'}</span>
                                </div>
                            </div>

                            {currentStep < 4 ? (
                                <Button
                                    onClick={handleNextStep}
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    Continuar
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
                                    <Lock className="w-3.5 h-3.5" />
                                    FINALIZAR PEDIDO
                                </Button>
                            )}

                            {currentStep > 1 && (
                                <Button
                                    variant="ghost"
                                    onClick={handlePrevStep}
                                    className="w-full mt-2 text-xs font-medium text-gray-500 hover:text-black dark:hover:text-white"
                                >
                                    Voltar
                                </Button>
                            )}

                            <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-400">
                                <ShieldCheck className="w-3 h-3" />
                                Compra 100% Segura
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
