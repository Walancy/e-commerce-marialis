"use client";

import React from 'react';

const recommendations = [
    {
        id: 1,
        image: '/Loiro recém descolorido..png',
        title: "Loiro recém descolorido.",
        description: "Cuidados especiais para manter o tom vibrante e a saúde dos fios descoloridos."
    },
    {
        id: 2,
        image: '/Pós alisamento.png',
        title: "Pós alisamento",
        description: "Hidratação intensa e proteção para prolongar o efeito liso e o brilho."
    },
    {
        id: 3,
        image: '/Afro fios crespos.png',
        title: "Afro fios crespos",
        description: "Nutrição profunda para definição, maciez e força dos seus cachos."
    },
    {
        id: 4,
        image: '/Ondulado tipo 2.png',
        title: "Ondulado tipo 2",
        description: "Leveza e controle do frizz para ondas definidas e com movimento natural."
    }
];

export const Recommendations = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#1a1a1a]">
            <div className="w-full px-4 lg:px-20">
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Nossas recomendações.</p>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Qual o melhor produto para meu cabelo?</h2>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {recommendations.map((item) => (
                        <div key={item.id} className="min-w-[85vw] md:min-w-0 snap-center flex flex-col items-center text-center group cursor-pointer">
                            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        // Fallback placeholder if image fails
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=Hair+Image';
                                    }}
                                />
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-500 text-[10px] max-w-[200px] leading-tight">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
