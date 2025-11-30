"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Loader2, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const backgroundImages = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516726817505-f5ed8259b4fb?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492106087820-71f171d08375?q=80&w=2595&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop"
];

export default function RecoverPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');
    const [bgImage, setBgImage] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        setBgImage(randomImage || backgroundImages[0]);
    }, []);

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSent(true);
    };

    return (
        <div className="min-h-screen w-full flex bg-white dark:bg-[#0a0a0a]">
            {/* Left Side - Form */}
            <div className="w-full lg:w-[480px] xl:w-[500px] flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-0 relative z-10 shrink-0 border-r dark:border-white/5">
                <div className="w-full max-w-sm mx-auto space-y-8">
                    {/* Logo */}
                    <div className="flex justify-center lg:justify-start mb-8">
                        <img
                            src="/logo-marialis.svg"
                            alt="Marialis"
                            className="h-10 w-auto object-contain dark:invert"
                        />
                    </div>

                    {/* Header */}
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Recuperar Senha
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Digite seu email para receber as instruções de recuperação.
                        </p>
                    </div>

                    {/* Success State */}
                    {isSent ? (
                        <div className="bg-green-50 dark:bg-green-500/10 p-6 rounded-2xl border border-green-100 dark:border-green-500/20 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Enviado!</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Verifique sua caixa de entrada para redefinir sua senha.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => setIsSent(false)}
                            >
                                Tentar outro email
                            </Button>
                        </div>
                    ) : (
                        /* Form */
                        <form onSubmit={handleRecover} className="space-y-5">
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                icon={Mail}
                                required
                            />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                fullWidth
                                className="py-6 text-sm"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Enviar Instruções
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}

                    {/* Footer */}
                    <div className="text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para o login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block flex-1 relative overflow-hidden bg-gray-100 dark:bg-[#121212]">
                {isMounted && (
                    <img
                        src={bgImage || backgroundImages[0]}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent dark:from-black/40" />


            </div>
        </div>
    );
}
