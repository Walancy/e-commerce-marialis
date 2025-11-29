"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { ProductCard } from '../../../components/ProductCard';

export default function ProductPage() {
    const params = useParams();
    const id = params.id;

    // Mock product data
    const product = {
        id: Number(id),
        title: "Prancha Lizze Extreme 250°C",
        price: 499.00,
        description: "A melhor prancha do mundo! Economize 70% do seu tempo com a prancha de titânio mais quente do mercado. O melhor resultado, o melhor brilho e o melhor alisamento em um só produto.",
        images: [
            "/product-flat-iron.png",
            "https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=1000"
        ],
        rating: 4.8,
        reviews: 124,
        brand: "Lizze",
        sku: "LIZ-EXT-001",
        features: [
            "Temperatura máxima de 250°C (480°F)",
            "Amortecimento nas duas lâminas",
            "Placas de Titânio",
            "Cabo giratório de 3 metros",
            "Bivolt automático"
        ]
    };

    // Mock related products
    const relatedProducts = Array.from({ length: 5 }, (_, i) => ({
        id: i + 100,
        image: i % 2 === 0 ? '/product-shampoo.png' : '/product-flat-iron.png',
        title: i % 2 === 0 ? `Kit Repair ${i + 1}` : `Prancha Extreme ${i + 1}`,
        brand: i % 2 === 0 ? 'Vyz' : 'Lizze',
        price: i % 2 === 0 ? 'R$ 149,90' : 'R$ 499,00'
    }));

    const [selectedImage, setSelectedImage] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);

    return (
        <main className="min-h-screen bg-white dark:bg-[#111]">
            <Header />

            <div className="pt-32 pb-20 px-4 lg:px-20 max-w-[1400px] mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <a href="/" className="hover:text-black dark:hover:text-white">Início</a>
                    <span>/</span>
                    <a href="/loja" className="hover:text-black dark:hover:text-white">Loja</a>
                    <span>/</span>
                    <a href="/equipamentos" className="hover:text-black dark:hover:text-white">Equipamentos</a>
                    <span>/</span>
                    <span className="text-black dark:text-white font-medium">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-[#f8f9fa] dark:bg-[#2a2a2a] rounded-2xl p-8 flex items-center justify-center overflow-hidden relative group">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110"
                            />
                            <button className="absolute top-4 right-4 p-2 bg-white dark:bg-[#1a1a1a] rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square bg-[#f8f9fa] dark:bg-[#2a2a2a] rounded-xl p-2 border-2 transition-all ${selectedImage === idx ? 'border-black dark:border-white' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="text-sm font-bold tracking-widest uppercase text-[#ff6b00]">{product.brand}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 text-[#ff6b00]">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-sm text-gray-500">({product.reviews} avaliações)</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ {product.price.toFixed(2)}</span>
                                <span className="text-lg text-gray-400 line-through">R$ {(product.price * 1.4).toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                ou em até 12x de R$ {(product.price / 12).toFixed(2)} sem juros
                            </p>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" />
                                    {feature}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border dark:border-gray-700 rounded-xl h-12 w-fit">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 h-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-xl transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 h-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-xl transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button className="flex-1 bg-black dark:bg-white text-white dark:text-black h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300">
                                <ShoppingCart className="w-5 h-5" />
                                ADICIONAR À SACOLA
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl">
                                <Truck className="w-6 h-6 text-gray-900 dark:text-white" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Frete Grátis</p>
                                    <p className="text-xs text-gray-500">Para todo o Brasil</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-gray-900 dark:text-white" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Garantia</p>
                                    <p className="text-xs text-gray-500">12 meses de fábrica</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="border-t dark:border-gray-800 pt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Produtos Relacionados</h2>
                        <a href="/loja" className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors">
                            Ver todos
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {relatedProducts.map((prod) => (
                            <ProductCard key={prod.id} {...prod} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
