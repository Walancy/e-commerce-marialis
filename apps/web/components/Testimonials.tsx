"use client";

import React, { useRef, useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        image: '/product-flat-iron.png',
        text: "A chapinha Lizze Extreme é simplesmente fantástica! Reduziu meu tempo de alisamento pela metade. O brilho que deixa no cabelo é incomparável. Super recomendo para profissionais.",
        name: "Ana Clara Souza",
        role: "Cabeleireira Profissional"
    },
    {
        id: 2,
        image: '/product-shampoo.png',
        text: "Estou apaixonada por esse kit de hidratação. Meu cabelo estava super ressecado e na primeira aplicação já senti a diferença. Ficou macio e com um cheiro maravilhoso!",
        name: "Mariana Oliveira",
        role: "Cliente"
    },
    {
        id: 3,
        image: '/product-flat-iron.png',
        text: "Melhor investimento que fiz para o meu salão. As clientes notam a diferença na qualidade do alisamento. A temperatura é constante e não agride os fios se usada corretamente.",
        name: "Fernanda Lima",
        role: "Proprietária de Salão"
    },
    {
        id: 4,
        image: '/product-shampoo.png',
        text: "O finalizador da Dejavu é incrível. Tira todo o frizz sem pesar o cabelo. Uso todos os dias antes de sair de casa e o efeito dura o dia todo.",
        name: "Juliana Mendes",
        role: "Influenciadora de Beleza"
    },
    {
        id: 5,
        image: '/product-flat-iron.png',
        text: "Comprei o secador VYZ e me surpreendi com a potência. Seca muito rápido e é super leve, o que ajuda muito quem trabalha o dia todo escovando cabelos.",
        name: "Roberto Carlos",
        role: "Barbeiro"
    },
    {
        id: 6,
        image: '/product-shampoo.png',
        text: "Essa máscara de reconstrução salvou meu loiro! Estava elástico e sem vida, agora está forte e brilhante. Não vivo mais sem.",
        name: "Patrícia Abravanel",
        role: "Cliente"
    },
    {
        id: 7,
        image: '/product-flat-iron.png',
        text: "A entrega foi super rápida e o produto veio muito bem embalado. A prancha é original e tem garantia. Podem comprar sem medo!",
        name: "Camila Queiroz",
        role: "Cliente"
    },
    {
        id: 8,
        image: '/product-shampoo.png',
        text: "Produtos de altíssima qualidade. Uso a linha completa da Nátylla no meu estúdio e as clientes sempre perguntam qual produto usei pelo cheiro maravilhoso.",
        name: "Larissa Manoela",
        role: "Hairstylist"
    },
    {
        id: 9,
        image: '/product-flat-iron.png',
        text: "Modelador perfeito para ondas naturais. Esquenta rápido e mantém o cacho por muito tempo. Excelente custo-benefício.",
        name: "Giovanna Antonelli",
        role: "Atriz"
    },
    {
        id: 10,
        image: '/product-shampoo.png',
        text: "O atendimento da loja foi nota 10. Tive dúvida sobre qual produto escolher para meu tipo de cabelo e me ajudaram muito. O shampoo indicado foi perfeito.",
        name: "Bruna Marquezine",
        role: "Cliente"
    }
];

export const Testimonials = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // 3 sets for seamless infinite scroll in both directions
    const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
    const itemWidth = 400;
    const gap = 24; // gap-6 is 1.5rem = 24px
    const setWidth = testimonials.length * (itemWidth + gap);

    useEffect(() => {
        if (scrollRef.current) {
            // Start in the middle set, shifted to show last item
            scrollRef.current.scrollLeft = (setWidth * 2) - (itemWidth + gap);
        }
    }, [setWidth]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;

            // If scrolled past the second set (into third), jump back to second
            if (scrollLeft >= setWidth * 2) {
                scrollRef.current.scrollLeft = scrollLeft - setWidth;
            }
            // If scrolled into the first set, jump forward to second
            else if (scrollLeft <= 0) { // Adjusted to 0 for simplicity, ideally setWidth - viewWidth but 0 works if we have buffer
                scrollRef.current.scrollLeft = scrollLeft + setWidth;
            }
            // Refine left boundary: if we are in the first set (0 to setWidth), we want to act like we are in the second.
            // Actually, simplest logic:
            // Normalize scrollLeft to be within [setWidth, 2*setWidth]
            // But we can't force it constantly or we break smooth scroll.
            // We only reset when we cross a threshold.

            if (scrollLeft < setWidth - 100) { // Buffer to prevent jitter at exact boundary
                scrollRef.current.scrollLeft = scrollLeft + setWidth;
            }
        }
    };

    return (
        <section className="bg-[#e5e5e5] dark:bg-[#333] py-16 mx-20 rounded-xl my-12">
            <div className="w-full">
                <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 text-center mb-12">O que os clientes dizem?</h2>

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-20 px-20"
                >
                    {allTestimonials.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex-shrink-0 w-[400px] bg-[#222] rounded-lg overflow-hidden flex shadow-lg">
                            <div className="w-1/3 bg-[#333] p-4 flex items-center justify-center">
                                <img src={item.image} alt="Product" className="w-full h-auto object-contain mix-blend-multiply opacity-80" />
                            </div>
                            <div className="w-2/3 p-6 flex flex-col justify-center">
                                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-4">
                                    "{item.text}"
                                </p>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                                    <p className="text-gray-500 text-xs">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
