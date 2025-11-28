"use client";

import React from 'react';

const recommendations = [
    {
        id: 1,
        image: '/hair-blonde.png',
        title: "Loiro recém descolorido.",
        description: "Descrição do cabelo ipsum has been the industry's standard dummy text ever since the 1500"
    },
    {
        id: 2,
        image: '/hair-straight.png',
        title: "Pós alisamento",
        description: "Descrição do cabelo ipsum has been the industry's standard dummy text ever since the 1500"
    },
    {
        id: 3,
        image: '/hair-afro.png', // Fallback if generation failed, user can replace
        title: "Afro fios crespos",
        description: "Descrição do cabelo ipsum has been the industry's standard dummy text ever since the 1500"
    },
    {
        id: 4,
        image: '/hair-wavy.png', // Fallback if generation failed
        title: "Ondulado tipo 2",
        description: "Descrição do cabelo ipsum has been the industry's standard dummy text ever since the 1500"
    }
];

export const Recommendations = () => {
    return (
        <section className="py-20 bg-white dark:bg-[#1a1a1a]">
            <div className="w-full px-20">
                <div className="text-center mb-12">
                    <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Nossas recomendações.</p>
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white">Qual o melhor produto para meu cabelo?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendations.map((item) => (
                        <div key={item.id} className="flex flex-col items-center text-center group cursor-pointer">
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
