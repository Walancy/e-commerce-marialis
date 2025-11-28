"use client";

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Sparkles } from 'lucide-react';

interface Product {
    name: string;
    image: string;
    price: string;
}

interface Recommendation {
    id: number;
    image: string;
    title: string;
    description: string;
    procedures: string[];
    products: Product[];
}

const recommendations: Recommendation[] = [
    {
        id: 1,
        image: '/Loiro recém descolorido..png',
        title: "Loiro recém descolorido",
        description: "Cuidados especiais para manter o tom vibrante e a saúde dos fios descoloridos.",
        procedures: [
            "Hidratação profunda semanal",
            "Uso de matizador a cada 15 dias",
            "Evitar água muito quente",
            "Protetor térmico antes de secar"
        ],
        products: [
            { name: "Shampoo Matizador", image: "https://placehold.co/200x200/png?text=Shampoo", price: "R$ 89,90" },
            { name: "Máscara Reconstrutora", image: "https://placehold.co/200x200/png?text=Mascara", price: "R$ 129,90" },
            { name: "Óleo Reparador", image: "https://placehold.co/200x200/png?text=Oleo", price: "R$ 59,90" }
        ]
    },
    {
        id: 2,
        image: '/Pós alisamento.png',
        title: "Pós alisamento",
        description: "Hidratação intensa e proteção para prolongar o efeito liso e o brilho.",
        procedures: [
            "Cronograma capilar focado em nutrição",
            "Uso de shampoos sem sal",
            "Touca de cetim para dormir",
            "Reparação de pontas diária"
        ],
        products: [
            { name: "Kit Pós Química", image: "https://placehold.co/200x200/png?text=Kit", price: "R$ 199,90" },
            { name: "Leave-in Protetor", image: "https://placehold.co/200x200/png?text=Leave-in", price: "R$ 79,90" }
        ]
    },
    {
        id: 3,
        image: '/Afro fios crespos.png',
        title: "Afro fios crespos",
        description: "Nutrição profunda para definição, maciez e força dos seus cachos.",
        procedures: [
            "Fitagem para definição",
            "Umectação noturna com óleos vegetais",
            "Co-wash intercalado",
            "Secagem com difusor"
        ],
        products: [
            { name: "Ativador de Cachos", image: "https://placehold.co/200x200/png?text=Ativador", price: "R$ 69,90" },
            { name: "Gelatina Modeladora", image: "https://placehold.co/200x200/png?text=Gelatina", price: "R$ 49,90" },
            { name: "Óleo de Coco", image: "https://placehold.co/200x200/png?text=Oleo", price: "R$ 39,90" }
        ]
    },
    {
        id: 4,
        image: '/Ondulado tipo 2.png',
        title: "Ondulado tipo 2",
        description: "Leveza e controle do frizz para ondas definidas e com movimento natural.",
        procedures: [
            "Finalização leve (amassar os fios)",
            "Uso de produtos com textura fluida",
            "Evitar pentear o cabelo seco",
            "Hidratação leve para não pesar"
        ],
        products: [
            { name: "Mousse Modelador", image: "https://placehold.co/200x200/png?text=Mousse", price: "R$ 55,90" },
            { name: "Spray Texturizador", image: "https://placehold.co/200x200/png?text=Spray", price: "R$ 65,90" }
        ]
    }
];

export const Recommendations = () => {
    const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedRec) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedRec]);

    return (
        <section className="py-20 bg-white dark:bg-[#1a1a1a]">
            <div className="w-full px-4 lg:px-20">
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Nossas recomendações.</p>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Qual o melhor produto para meu cabelo?</h2>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {recommendations.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedRec(item)}
                            className="min-w-[85vw] md:min-w-0 snap-center flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=Hair+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        Ver detalhes
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-500 text-[10px] max-w-[200px] leading-tight">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedRec && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedRec(null)}
                    />
                    <div className="relative bg-white dark:bg-[#222] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedRec(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-800 dark:text-white" />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                            <img
                                src={selectedRec.image}
                                alt={selectedRec.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden flex items-end p-6">
                                <h3 className="text-2xl font-bold text-white">{selectedRec.title}</h3>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
                            <div className="hidden md:block">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedRec.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{selectedRec.description}</p>
                            </div>

                            {/* Mobile description only */}
                            <div className="md:hidden">
                                <p className="text-gray-600 dark:text-gray-300">{selectedRec.description}</p>
                            </div>

                            {/* Procedures */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-gray-900 dark:text-white" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Recomendação de Procedimentos</h4>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {selectedRec.procedures.map((proc, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-2 rounded-lg">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white mt-1.5 shrink-0" />
                                            {proc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Products */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <ShoppingBag className="w-5 h-5 text-gray-900 dark:text-white" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Produtos Recomendados</h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedRec.products.map((prod, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/10 rounded-xl hover:border-gray-300 dark:hover:border-white/30 transition-colors group/product cursor-pointer bg-white dark:bg-white/5">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{prod.name}</p>
                                                <p className="text-gray-900 dark:text-white font-bold text-sm">{prod.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full mt-auto bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                                Agendar Avaliação Gratuita
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
