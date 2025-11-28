import React from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full bg-white dark:bg-[#1a1a1a] px-4 md:px-10 pt-10 pb-0">
            <div className="bg-[#111111] dark:bg-[#000] text-white rounded-t-[40px] px-8 md:px-16 py-12 md:py-16">
                {/* Top Section: Revendedor & Socials (Matching the image style) */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <a href="/encontre-revendedor" className="text-lg font-medium underline underline-offset-4 hover:text-gray-300 transition-colors">
                        Encontre um revendedor.
                    </a>

                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <Phone size={20} />
                        </a>
                        <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-6">
                        <img src="/logo-marialis.svg" alt="Marialis" className="h-12 w-auto object-contain invert" />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Sua parceira em beleza profissional. Produtos de alta performance para salões e cuidados home care.
                        </p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MapPin size={16} />
                            <span>Campo Mourão, Paraná, Brasil</span>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-2 md:col-start-6 space-y-6">
                        <h3 className="font-bold text-lg">Loja</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Cabelos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Elétricos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Kits</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Lançamentos</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h3 className="font-bold text-lg">Institucional</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="/sobre" className="hover:text-white transition-colors">Sobre a Marialis</a></li>
                            <li><a href="/revendedor" className="hover:text-white transition-colors">Seja um Revendedor</a></li>
                            <li><a href="/trabalhe-conosco" className="hover:text-white transition-colors">Trabalhe Conosco</a></li>
                            <li><a href="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <h3 className="font-bold text-lg">Atendimento</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-center gap-3">
                                <Mail size={16} />
                                <span>contato@marialis.com.br</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} />
                                <span>+55 44 8850-0440</span>
                            </li>
                            <li className="pt-2">
                                <span className="block text-xs text-gray-500 mb-1">Horário de atendimento</span>
                                <span>Seg. à Sex. das 9h às 18h</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2025 Marialis Cosméticos. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <a href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="/politica-de-troca" className="hover:text-white transition-colors">Política de Troca</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
