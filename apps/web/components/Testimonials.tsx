"use client";

import React, { useRef, useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face',
        text: "A chapinha Lizze Extreme é simplesmente fantástica! Reduziu meu tempo de alisamento pela metade. O brilho que deixa no cabelo é incomparável.",
        name: "Isabela Rocha",
        role: "Cabeleireira Profissional",
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=200&h=200&fit=crop&crop=face',
        text: "Estou apaixonada por esse kit de hidratação. Meu cabelo estava super ressecado e na primeira aplicação já senti a diferença. Ficou macio e com cheiro maravilhoso!",
        name: "Aline Ferreira",
        role: "Cliente",
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
        text: "Melhor investimento que fiz para o meu salão. As clientes notam a diferença na qualidade do alisamento. Temperatura constante e não agride os fios.",
        name: "Renata Souza",
        role: "Proprietária de Salão",
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
        text: "O finalizador da Dejavu é incrível. Tira todo o frizz sem pesar o cabelo. Uso todos os dias antes de sair de casa e o efeito dura o dia todo.",
        name: "Camila Torres",
        role: "Influenciadora de Beleza",
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face',
        text: "Comprei o secador VYZ e me surpreendi com a potência. Seca muito rápido e é super leve, o que ajuda muito quem trabalha o dia todo escovando cabelos.",
        name: "Diego Almeida",
        role: "Barbeiro",
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&h=200&fit=crop&crop=face',
        text: "Essa máscara de reconstrução salvou meu loiro! Estava elástico e sem vida, agora está forte e brilhante. Não vivo mais sem esse produto.",
        name: "Vitória Lins",
        role: "Cliente",
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
        text: "A entrega foi super rápida e o produto veio muito bem embalado. A prancha é original e tem garantia. Podem comprar sem medo!",
        name: "Priscila Nunes",
        role: "Cliente",
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
        text: "Produtos de altíssima qualidade. Uso a linha completa da Nátylla no meu estúdio e as clientes sempre perguntam pelo cheiro maravilhoso.",
        name: "Rafael Monteiro",
        role: "Hairstylist",
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
        text: "Modelador perfeito para ondas naturais. Esquenta rápido e mantém o cacho por muito tempo. Excelente custo-benefício para o dia a dia.",
        name: "Tainá Carvalho",
        role: "Atriz",
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        text: "O atendimento da loja foi nota 10. Tive dúvida sobre qual produto escolher e me ajudaram muito. O shampoo indicado foi perfeito para o meu tipo de cabelo.",
        name: "Lucas Pimentel",
        role: "Cliente",
    }
];

// 3 copies to create a seamless infinite loop in both directions
const track = [...testimonials, ...testimonials, ...testimonials];

export const Testimonials = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);
    const rafRef = useRef<number | null>(null);
    const scrollAccumulator = useRef(0);

    // Calculates the exact pixel width of one complete set of 10 items
    const getSetWidth = () => {
        if (!scrollRef.current) return 0;
        const children = scrollRef.current.children;
        if (children.length < 11) return 0;
        const first = children[0] as HTMLElement;
        const eleventh = children[10] as HTMLElement; // start of the second set
        return eleventh.offsetLeft - first.offsetLeft;
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Initialize to middle set so we can scroll left immediately
        const initScroll = () => {
            const setWidth = getSetWidth();
            if (setWidth > 0 && el.scrollLeft < setWidth) {
                el.scrollLeft = setWidth;
                scrollAccumulator.current = setWidth;
            }
        };
        setTimeout(initScroll, 100);

        let lastTime = performance.now();
        const speed = 0.05; // pixels per ms (~3px per frame at 60fps)

        const scrollLoop = (time: number) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            // Only auto-scroll if not hovered or dragging
            if (!isHovered && !isDragging && el) {
                scrollAccumulator.current += speed * deltaTime;

                const setWidth = getSetWidth();
                if (setWidth > 0) {
                    // Loop back
                    if (scrollAccumulator.current >= setWidth * 2) {
                        scrollAccumulator.current -= setWidth;
                    } 
                    // Loop forward (if someone forcefully flicked it left)
                    else if (scrollAccumulator.current <= 0) {
                        scrollAccumulator.current += setWidth;
                    }
                }
                el.scrollLeft = scrollAccumulator.current;
            } else {
                // Sync the accumulator with manual user scroll
                scrollAccumulator.current = el.scrollLeft;
            }

            rafRef.current = requestAnimationFrame(scrollLoop);
        };

        rafRef.current = requestAnimationFrame(scrollLoop);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isHovered, isDragging]);

    // Handle native manual scrolling loop
    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const setWidth = getSetWidth();
        if (setWidth === 0) return;

        if (el.scrollLeft >= setWidth * 2) {
            el.scrollLeft -= setWidth;
            scrollAccumulator.current = el.scrollLeft;
        } else if (el.scrollLeft <= 0) {
            el.scrollLeft += setWidth;
            scrollAccumulator.current = el.scrollLeft;
        }
    };

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollStart(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current.offsetLeft || 0);
        const walk = (x - startX) * 1.5; // Drag sensitivity
        scrollRef.current.scrollLeft = scrollStart - walk;
    };

    const handleMouseUp = () => setIsDragging(false);
    
    const handleMouseLeave = () => {
        setIsDragging(false);
        setIsHovered(false);
    };

    return (
        <section className="bg-[#e5e5e5] dark:bg-[#333] py-12 md:py-16 mx-4 md:mx-20 rounded-xl my-8 md:my-12 overflow-visible">
            <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-8 md:mb-12 px-4">
                    O que os clientes dizem?
                </h2>

                <div className="overflow-hidden -mx-4 md:-mx-20">
                    <div 
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 px-4 md:px-20 overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={() => setIsHovered(true)}
                        onTouchEnd={() => setIsHovered(false)}
                        onScroll={handleScroll}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {track.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className="flex-shrink-0 w-[85vw] md:w-[400px] bg-[#222] rounded-lg overflow-hidden flex shadow-lg"
                                style={{ WebkitUserDrag: 'none' }}
                            >
                                {/* Photo — left 1/3 */}
                                <div className="w-1/3 bg-[#2e2e2e] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover pointer-events-none"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=333&color=fff&size=200`;
                                        }}
                                    />
                                </div>

                                {/* Text — right 2/3 */}
                                <div className="w-2/3 p-4 md:p-6 flex flex-col justify-center">
                                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-4">
                                        &ldquo;{item.text}&rdquo;
                                    </p>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                                        <p className="text-gray-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
