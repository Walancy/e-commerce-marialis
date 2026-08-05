"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ShoppingBag, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProducts, type StoreProduct } from '../services/productsService';

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

const normalizeImageUrl = (url?: string): string => {
    if (!url) return '/loiro-recem-descolorido.png';
    const imageMap: Record<string, string> = {
        '/Loiro recém descolorido..png': '/loiro-recem-descolorido.png',
        '/Pós alisamento.png': '/pos-alisamento.png',
        '/Afro fios crespos.png': '/afro-fios-crespos.png',
        '/Ondulado tipo 2.png': '/ondulado-tipo-2.png',
        '/Couro Cabeludo Oleoso.jfif': '/couro-cabeludo-oleoso.jfif',
        '/Grisalho ou Branco.jfif': '/grisalho-ou-branco.jfif',
        '/Liso Natural.png': '/liso-natural.png',
        '/Quebradiço e Elástico.jfif': '/quebradico-e-elastico.jfif',
    };
    if (imageMap[url]) return imageMap[url]!;
    return url;
};

const baseRecommendations = [
    {
        id: 1,
        image: '/loiro-recem-descolorido.png',
        title: "Loiro recém descolorido",
        description: "Cuidados especiais para manter o tom vibrante e a saúde dos fios descoloridos.",
        procedures: [
            "Hidratação profunda semanal",
            "Uso de matizador a cada 15 dias",
            "Evitar água muito quente",
            "Protetor térmico antes de secar"
        ],
        productIndexes: [0, 1, 2],
    },
    {
        id: 2,
        image: '/pos-alisamento.png',
        title: "Pós alisamento",
        description: "Hidratação intensa e proteção para prolongar o efeito liso e o brilho.",
        procedures: [
            "Cronograma capilar focado em nutrição",
            "Uso de shampoos sem sal",
            "Touca de cetim para dormir",
            "Reparação de pontas diária"
        ],
        productIndexes: [3, 4],
    },
    {
        id: 3,
        image: '/afro-fios-crespos.png',
        title: "Afro fios crespos",
        description: "Nutrição profunda para definição, maciez e força dos seus cachos.",
        procedures: [
            "Fitagem para definição",
            "Umectação noturna com óleos vegetais",
            "Co-wash intercalado",
            "Secagem com difusor"
        ],
        productIndexes: [5, 6, 7],
    },
    {
        id: 4,
        image: '/ondulado-tipo-2.png',
        title: "Ondulado tipo 2",
        description: "Leveza e controle do frizz para ondas definidas e com movimento natural.",
        procedures: [
            "Finalização leve (amassar os fios)",
            "Uso de produtos com textura fluida",
            "Evitar pentear o cabelo seco",
            "Hidratação leve para não pesar"
        ],
        productIndexes: [8, 9],
    },
    {
        id: 5,
        image: '/colorido.jfif',
        title: "Cabelos Coloridos",
        description: "Manutenção da cor e brilho intenso para cabelos tingidos com tons vibrantes.",
        procedures: [
            "Shampoo e condicionador com proteção de cor",
            "Banho de brilho mensal",
            "Evitar cloro e água do mar",
            "Hidratação rica em antioxidantes"
        ],
        productIndexes: [10, 11, 12],
    },
    {
        id: 6,
        image: '/couro-cabeludo-oleoso.jfif',
        title: "Couro Cabeludo Oleoso",
        description: "Equilíbrio e refrescância para raízes oleosas mantendo as pontas extremamente hidratadas.",
        procedures: [
            "Shampoo purificante ou detox",
            "Esfoliação capilar quinzenal",
            "Uso de tônico adstringente diário",
            "Condicionar apenas comprimento e pontas"
        ],
        productIndexes: [13, 14, 15],
    },
    {
        id: 7,
        image: '/liso-natural.png',
        title: "Liso Natural",
        description: "Controle de frizz e alinhamento perfeito sem perder o movimento leve do fio.",
        procedures: [
            "Shampoo e condicionador disciplinantes",
            "Uso de leave-in fluido",
            "Secagem natural ou com jato frio",
            "Sérum reparador nas pontas"
        ],
        productIndexes: [0, 4, 8],
    },
    {
        id: 8,
        image: '/grisalho-ou-branco.jfif',
        title: "Grisalho ou Branco",
        description: "Prevenção do amarelamento e nutrição intensa para fios que perderam melanina.",
        procedures: [
            "Uso de shampoo desamarelador (silver)",
            "Nutrição profunda quinzenal",
            "Proteção solar capilar diária",
            "Evitar chapinha em alta temperatura"
        ],
        productIndexes: [2, 7, 11],
    },
    {
        id: 9,
        image: '/quebradico-e-elastico.jfif',
        title: "Quebradiço e Elástico",
        description: "Reconstrução profunda para devolver massa e resistência aos fios danificados.",
        procedures: [
            "Reconstrução com queratina pura",
            "Pausa total em químicas",
            "Uso de produtos ricos em aminoácidos",
            "Corte bordado preventivo"
        ],
        productIndexes: [1, 5, 14],
    }
];

export const Recommendations = () => {
    const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
    const [dbProducts, setDbProducts] = useState<StoreProduct[]>([]);
    const [recList, setRecList] = useState<typeof baseRecommendations>(baseRecommendations);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollState = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        checkScrollState();
        el.addEventListener('scroll', checkScrollState, { passive: true });
        window.addEventListener('resize', checkScrollState);
        return () => {
            el.removeEventListener('scroll', checkScrollState);
            window.removeEventListener('resize', checkScrollState);
        };
    }, [recList]);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const amount = 320;
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        fetchProducts().then(setDbProducts);

        const fetchRecommendations = async () => {
            try {
                const { supabase } = await import('../lib/supabase');
                const { data, error } = await supabase
                    .from('recommendations')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    const dbTitles = new Set(data.map(d => (d.title || '').toLowerCase().trim()));
                    const missingBase = baseRecommendations.filter(
                        b => !dbTitles.has(b.title.toLowerCase().trim())
                    );
                    setRecList([...data, ...missingBase]);
                }
            } catch (err) {
                console.error("Error fetching recommendations:", err);
            }
        };
        fetchRecommendations();
    }, []);

    const recommendations: Recommendation[] = recList.map(rec => ({
        id: rec.id,
        image: normalizeImageUrl(rec.image),
        title: rec.title,
        description: rec.description || '',
        procedures: Array.isArray(rec.procedures) ? rec.procedures : [],
        products: ((rec as any).product_indexes || rec.productIndexes || [0, 1]).map((idx: number) => {
            const p = dbProducts[idx];
            if (p) {
                return { name: p.title, image: p.image, price: p.price };
            }
            return { name: 'Produto Recomendado', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop', price: 'R$ 89,90' };
        }),
    }));

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

    const leftMask = canScrollLeft
        ? 'transparent 0%, rgba(0,0,0,0.2) 8%, black 22%'
        : 'black 0%';
    const rightMask = canScrollRight
        ? 'black 78%, rgba(0,0,0,0.2) 92%, transparent 100%'
        : 'black 100%';
    const maskGradient = `linear-gradient(to right, ${leftMask}, ${rightMask})`;

    return (
        <section className="py-20 bg-white dark:bg-[#1a1a1a] overflow-hidden w-full">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 lg:px-20 text-center mb-12">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">Nossas recomendações.</p>
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Qual o melhor produto para meu cabelo?</h2>
            </div>

            {/* Full-width Carousel with Single Edge Mask */}
            <div className="relative w-full group/carousel">
                {/* Navigation Arrows */}
                <button
                    type="button"
                    onClick={() => handleScroll('left')}
                    className={`absolute left-4 md:left-8 top-1/3 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-sm ${canScrollLeft ? 'opacity-90 hover:opacity-100 cursor-pointer pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Anterior"
                >
                    <ChevronLeft size={22} />
                </button>
                <button
                    type="button"
                    onClick={() => handleScroll('right')}
                    className={`absolute right-4 md:right-8 top-1/3 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-sm ${canScrollRight ? 'opacity-90 hover:opacity-100 cursor-pointer pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Próximo"
                >
                    <ChevronRight size={22} />
                </button>

                {/* Horizontal Carousel Slider with Single Dynamic Edge Mask */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-proximity pb-8 pt-4 gap-5 md:gap-6 scrollbar-hide scroll-smooth px-8 md:px-20 lg:px-28"
                    style={{
                        maskImage: maskGradient,
                        WebkitMaskImage: maskGradient,
                        transition: 'mask-image 0.4s ease, -webkit-mask-image 0.4s ease'
                    }}
                >
                    {recommendations.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedRec(item)}
                            className="flex-shrink-0 w-[240px] sm:w-[270px] md:w-[290px] flex flex-col items-center text-center group cursor-pointer"
                        >
                            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 transition-all relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/png?text=Hair+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="bg-white/90 text-black px-4 py-2 rounded-full text-xs font-semibold transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        Ver detalhes
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1.5">{item.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs max-w-[220px] leading-relaxed">
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
                                <h3 className="text-2xl font-semibold text-white">{selectedRec.title}</h3>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
                            <div className="hidden md:block">
                                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">{selectedRec.title}</h3>
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
                                                <p className="text-gray-900 dark:text-white font-semibold text-sm">{prod.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
