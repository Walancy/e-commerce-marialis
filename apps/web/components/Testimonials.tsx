"use client";

import React from 'react';

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

const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => (
    <div className="flex-shrink-0 w-[340px] bg-[#222] rounded-lg overflow-hidden flex">
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
        <div className="w-2/3 p-4 flex flex-col justify-center">
            <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-4">
                &ldquo;{item.text}&rdquo;
            </p>
            <div>
                <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                <p className="text-gray-500 text-xs">{item.role}</p>
            </div>
        </div>
    </div>
);

export const Testimonials = () => {
    const [items, setItems] = React.useState<typeof testimonials>(testimonials);

    React.useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { supabase } = await import('../lib/supabase');
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    setItems(data);
                }
            } catch (err) {
                console.error("Error fetching testimonials:", err);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <section className="bg-[#e5e5e5] dark:bg-[#333] py-12 md:py-16 mx-4 md:mx-20 rounded-xl my-8 md:my-12">
            <style>{`
                @keyframes testimonials-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .testimonials-track {
                    animation: testimonials-scroll 40s linear infinite;
                    display: flex;
                    gap: 1.5rem;
                    width: max-content;
                    will-change: transform;
                }
                .testimonials-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-8 md:mb-12 px-4">
                O que os clientes dizem?
            </h2>

            <div className="-mx-4 md:-mx-20 overflow-hidden">
                <div className="testimonials-track">
                    {items.map((item, idx) => (
                        <TestimonialCard key={`a-${item.id || idx}`} item={item} />
                    ))}
                    {items.map((item, idx) => (
                        <TestimonialCard key={`b-${item.id || idx}`} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};
