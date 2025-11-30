"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const backgroundImages = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516726817505-f5ed8259b4fb?q=80&w=2574&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492106087820-71f171d08375?q=80&w=2595&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop"
];

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bgImage, setBgImage] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        setBgImage(randomImage || backgroundImages[0]);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        router.push('/admin');
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
    };

    return (
        <div className="min-h-screen w-full flex bg-white dark:bg-[#0a0a0a]">
            {/* Left Side - Form (Fixed Width/Tight) */}
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
                            Bem-vindo de volta
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Acesse sua conta para gerenciar a loja
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            icon={Mail}
                            required
                        />

                        <div className="space-y-1">
                            <div className="relative">
                                <Input
                                    label="Senha"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    icon={Lock}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <Link
                                    href="/recuperar-senha"
                                    className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline transition-colors"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
                        </div>

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
                                    Entrar
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-[#0a0a0a] px-2 text-gray-500">Ou continue com</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 4.66c1.61 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('apple')}
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.93-.89 1.29.09 2.36.53 3.06 1.34-2.62 1.34-2.11 5.34.41 6.38-.63 1.84-1.55 3.6-2.48 5.4zM12.03 5.32c-.09-2.02 1.96-3.42 1.96-3.42.16 2.27-2.38 3.29-1.96 3.42z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Apple</span>
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            Não tem uma conta?{' '}
                            <Link href="/cadastro" className="font-medium text-gray-900 dark:text-white hover:underline">
                                Criar conta
                            </Link>
                        </p>
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
