"use client";

import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    // Mock data
    const cartItems: CartItem[] = [
        {
            id: 1,
            name: "Shampoo Hidratante Premium",
            price: 89.90,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 2,
            name: "Máscara Capilar Reconstrutora",
            price: 129.90,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl z-[70] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sua Sacola</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-24 h-24 bg-[#f8f9fa] dark:bg-[#2a2a2a] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800 p-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{item.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">R$ {item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border dark:border-gray-700 rounded-lg">
                                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <Minus className="w-3 h-3 text-gray-500" />
                                            </button>
                                            <span className="text-xs font-medium w-6 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <Plus className="w-3 h-3 text-gray-500" />
                                            </button>
                                        </div>
                                        <button className="text-red-500 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-[#222]">
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Frete</span>
                                <span className="text-green-600 font-medium">Grátis</span>
                            </div>
                            <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white pt-3 border-t dark:border-gray-700">
                                <span>Total</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            fullWidth
                            size="md"
                            className="flex items-center justify-center gap-2"
                            onClick={() => window.location.href = '/checkout'}
                        >
                            FINALIZAR COMPRA
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
