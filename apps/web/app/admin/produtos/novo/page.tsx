"use client";

import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Save,
    Trash2,
    Upload,
    Image as ImageIcon,
    DollarSign,
    Settings,
    Truck,
    Search,
    Tag,
    X,
    Package,
    Star,
    Plus,
    Minus,
    Box,
    Filter
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Dropdown } from '../../../../components/ui/Dropdown';
import { Checkbox } from '../../../../components/ui/Checkbox';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock Product Data for Kit Selection
const AVAILABLE_PRODUCTS = [
    { id: 1, name: "Secador Lizze Extreme", price: 499.90, image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=100", brand: "Lizze", category: "Elétricos", subcategory: "Secadores" },
    { id: 2, name: "Shampoo Hidratante", price: 89.90, image: "https://images.unsplash.com/photo-1585232561307-3f83b0ed5778?auto=format&fit=crop&q=80&w=100", brand: "Vyz", category: "Cabelos", subcategory: "Shampoos" },
    { id: 3, name: "Máscara Reconstrutora", price: 129.90, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=100", brand: "Vyz", category: "Cabelos", subcategory: "Máscaras" },
    { id: 4, name: "Prancha Nano Titanium", price: 399.90, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=100", brand: "Lizze", category: "Elétricos", subcategory: "Pranchas" },
    { id: 5, name: "Óleo Reparador", price: 49.90, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100", brand: "Dejavu", category: "Cabelos", subcategory: "Finalizadores" },
];

// Mock Brand Logos
const BRAND_LOGOS: Record<string, string> = {
    'Lizze': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', // Placeholder
    'Vyz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', // Placeholder
    'Dejavu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', // Placeholder
};

export default function NewProductPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isKit = searchParams.get('type') === 'kit';

    const [activeTab, setActiveTab] = useState(isKit ? 'composition' : 'settings');

    const subcategories: Record<string, string[]> = {
        'Elétricos': ['Secadores', 'Pranchas', 'Modeladores', 'Máquinas'],
        'Cabelos': ['Shampoos', 'Condicionadores', 'Máscaras', 'Finalizadores', 'Kits'],
        'Unhas': ['Esmaltes', 'Géis', 'Alicates', 'Acessórios'],
        'Pele': ['Hidratantes', 'Limpeza', 'Protetor Solar'],
        'Móveis': ['Cadeiras', 'Lavatórios', 'Carrinhos'],
        'Kits': ['Capilar', 'Manicure', 'Profissional']
    };

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        costPrice: 0,
        promotionalPrice: 0,
        isPromotionActive: false,
        category: isKit ? "Kits" : "Elétricos",
        subcategory: isKit ? "Capilar" : "Secadores",
        brand: "Lizze",
        stock: 0,
        minStock: 0,
        sku: "",
        status: 'Rascunho',
        images: [] as string[],
        // Kit Specific
        kitItems: [] as { productId: number, quantity: number, name: string, price: number, image: string, brand: string }[],
        // Pricing
        taxIcms: 0,
        taxIpi: 0,
        taxPis: 0,
        taxCofins: 0,
        platformFee: 0,
        additionalCost: 0,
        // Settings
        seoTitle: "",
        seoDescription: "",
        slug: "",
        weight: 0,
        width: 0,
        height: 0,
        depth: 0,
        tags: [] as string[]
    });

    const [newTag, setNewTag] = useState('');

    // Filter States
    const [productSearch, setProductSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [filterSubcategory, setFilterSubcategory] = useState('');

    // Helper for safe number parsing
    const safeNumber = (val: any) => {
        const num = parseFloat(val);
        return isNaN(num) ? 0 : num;
    };

    // Kit Calculations
    const kitTotalValue = product.kitItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Update product price when kit items change (if isKit)
    useEffect(() => {
        if (isKit) {
            setProduct(prev => ({ ...prev, price: kitTotalValue }));
        }
    }, [kitTotalValue, isKit]);

    // Calculations
    const currentPrice = product.isPromotionActive && product.promotionalPrice ? safeNumber(product.promotionalPrice) : safeNumber(product.price);

    const totalTaxRate = safeNumber(product.taxIcms) + safeNumber(product.taxIpi) + safeNumber(product.taxPis) + safeNumber(product.taxCofins);
    const taxAmount = (currentPrice * totalTaxRate) / 100;

    const feeAmount = (currentPrice * safeNumber(product.platformFee)) / 100;
    const totalDeductions = taxAmount + feeAmount + safeNumber(product.additionalCost);
    const netRevenue = currentPrice - totalDeductions;
    const profit = netRevenue - safeNumber(product.costPrice);
    const margin = currentPrice > 0 ? (profit / currentPrice) * 100 : 0;

    const tabs = [
        ...(isKit ? [{ id: 'composition', label: 'Composição do Kit', icon: Box }] : []),
        ...(!isKit ? [{ id: 'settings', label: 'Configurações', icon: Settings }] : []),
        ...(!isKit ? [{ id: 'pricing', label: 'Preços e Lucro', icon: DollarSign }] : []),
        ...(!isKit ? [{ id: 'images', label: 'Imagens', icon: ImageIcon }] : []),
        ...(isKit ? [{ id: 'settings', label: 'Configurações', icon: Settings }] : []),
    ];

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!product.tags.includes(newTag.trim())) {
                setProduct({ ...product, tags: [...product.tags, newTag.trim()] });
            }
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setProduct({ ...product, tags: product.tags.filter(tag => tag !== tagToRemove) });
    };

    const handleCreate = () => {
        console.log('Creating product:', product);
        router.push('/admin/produtos');
    };

    // Kit Functions
    const addToKit = (item: typeof AVAILABLE_PRODUCTS[0]) => {
        const existing = product.kitItems.find(i => i.productId === item.id);
        if (existing) {
            setProduct({
                ...product,
                kitItems: product.kitItems.map(i => i.productId === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            });
        } else {
            setProduct({
                ...product,
                kitItems: [...product.kitItems, { productId: item.id, quantity: 1, name: item.name, price: item.price, image: item.image, brand: item.brand }]
            });
        }
    };

    const removeFromKit = (productId: number) => {
        setProduct({
            ...product,
            kitItems: product.kitItems.filter(i => i.productId !== productId)
        });
    };

    const updateKitQuantity = (productId: number, delta: number) => {
        setProduct({
            ...product,
            kitItems: product.kitItems.map(i => {
                if (i.productId === productId) {
                    const newQty = Math.max(1, i.quantity + delta);
                    return { ...i, quantity: newQty };
                }
                return i;
            })
        });
    };

    const filteredProducts = AVAILABLE_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
        const matchesCategory = (filterCategory && filterCategory !== 'Todos') ? p.category === filterCategory : true;
        const matchesBrand = (filterBrand && filterBrand !== 'Todos') ? p.brand === filterBrand : true;
        const matchesSubcategory = (filterSubcategory && filterSubcategory !== 'Todos') ? p.subcategory === filterSubcategory : true;
        const notInKit = !product.kitItems.some(k => k.productId === p.id);

        return matchesSearch && matchesCategory && matchesBrand && matchesSubcategory && notInKit;
    });

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/produtos" className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isKit ? 'Novo Kit de Produtos' : 'Novo Produto'}
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400">
                                Rascunho
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {isKit ? 'Crie um novo kit combinando produtos existentes' : 'Preencha as informações para criar um novo produto'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={handleCreate}>
                        <Save className="w-4 h-4 mr-2" />
                        {isKit ? 'Salvar Kit' : 'Criar Produto'}
                    </Button>
                </div>
            </div>

            {/* Top Section: Name, Status & Stock */}
            <div className="bg-white dark:bg-[#121212] p-4 rounded-xl border dark:border-white/5 mb-8">
                <div className="flex flex-col xl:flex-row gap-6">
                    {isKit && (
                        <div className="flex-1 min-w-[300px]">
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
                                Nome do Kit <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={product.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                placeholder="Ex: Kit Cronograma Capilar Completo"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>
                    )}

                    {/* Status Group */}
                    <div className="flex items-center gap-4">
                        <div className="w-40">
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Status <span className="text-red-500 ml-1">*</span></label>
                            <Dropdown
                                options={['Ativo', 'Rascunho', 'Esgotado']}
                                value={product.status}
                                onChange={(val) => setProduct({ ...product, status: val as any })}
                            />
                        </div>
                        <div className="h-10 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-2 pt-5">
                            <Checkbox
                                id="promo-active"
                                checked={product.isPromotionActive}
                                onChange={(e) => setProduct({ ...product, isPromotionActive: e.target.checked })}
                            />
                            <label htmlFor="promo-active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                Promoção Ativa
                            </label>
                        </div>
                    </div>

                    {/* Stock Group */}
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">SKU <span className="text-red-500 ml-1">*</span></label>
                            <input
                                type="text"
                                value={product.sku}
                                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                                className="w-32 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Estoque <span className="text-red-500 ml-1">*</span></label>
                            <input
                                type="number"
                                value={product.stock}
                                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) || 0 })}
                                className="w-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Mínimo</label>
                            <input
                                type="number"
                                value={product.minStock}
                                onChange={(e) => setProduct({ ...product, minStock: parseInt(e.target.value) || 0 })}
                                className="w-24 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b dark:border-white/5 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-black dark:border-white text-black dark:text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="space-y-6">
                {activeTab === 'composition' && isKit && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                        {/* Left: Product Selection */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Adicionar Produtos ao Kit</h3>
                                    <div className="relative w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar produtos..."
                                            value={productSearch}
                                            onChange={(e) => setProductSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Categoria</label>
                                        <Dropdown
                                            options={['Todos', ...Object.keys(subcategories).filter(c => c !== 'Kits')]}
                                            value={filterCategory}
                                            onChange={(val) => {
                                                setFilterCategory(val);
                                                setFilterSubcategory('Todos');
                                            }}
                                            placeholder="Todas"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Subcategoria</label>
                                        <Dropdown
                                            options={(filterCategory && filterCategory !== 'Todos') ? ['Todos', ...(subcategories[filterCategory] || [])] : ['Todos']}
                                            value={filterSubcategory}
                                            onChange={setFilterSubcategory}
                                            placeholder="Todas"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Marca</label>
                                        <Dropdown
                                            options={['Todos', 'Lizze', 'Vyz', 'Dejavu']}
                                            value={filterBrand}
                                            onChange={setFilterBrand}
                                            placeholder="Todas"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {filteredProducts.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 overflow-hidden">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10">
                                                            <Package className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span>{item.brand}</span>
                                                        <span>•</span>
                                                        <span>R$ {item.price.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline" onClick={() => addToKit(item)}>
                                                <Plus className="w-4 h-4" />
                                                Adicionar
                                            </Button>
                                        </div>
                                    ))}
                                    {filteredProducts.length === 0 && (
                                        <div className="text-center py-8">
                                            <Filter className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                            <p className="text-gray-500 text-sm">Nenhum produto encontrado com os filtros atuais.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Selected Items */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                                    <span>Itens do Kit</span>
                                    <span className="text-xs font-normal text-gray-500">{product.kitItems.length} itens</span>
                                </h3>

                                {product.kitItems.length === 0 ? (
                                    <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                                        <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">O kit está vazio</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {product.kitItems.map((item) => (
                                            <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                                <div className="relative w-12 h-12 rounded-lg bg-white dark:bg-white/10 overflow-hidden shrink-0 group">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10">
                                                            <Package className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                                                        </div>
                                                    )}
                                                    {/* Brand Logo Overlay */}
                                                    <div className="absolute bottom-0 right-0 bg-white dark:bg-black p-0.5 rounded-tl-md">
                                                        <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden">
                                                            {/* Mock Logo Display */}
                                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-bold bg-black text-white">
                                                                {item.brand[0]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-500">Unit: R$ {item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => updateKitQuantity(item.productId, -1)} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded">
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                        <button onClick={() => updateKitQuantity(item.productId, 1)} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded">
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeFromKit(item.productId)} className="text-red-500 hover:text-red-600">
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 pt-6 border-t dark:border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Valor Total do Kit</span>
                                        <span className="text-lg font-bold text-green-600">R$ {kitTotalValue.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 text-right">Calculado com base na soma dos produtos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pricing' && !isKit && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Definição de Preços</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preço de Venda <span className="text-red-500 ml-1">*</span></label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Preço Promocional</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.promotionalPrice}
                                            onChange={(e) => setProduct({ ...product, promotionalPrice: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Custo do Produto</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.costPrice}
                                            onChange={(e) => setProduct({ ...product, costPrice: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Custos Adicionais & Taxas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">ICMS (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxIcms}
                                        onChange={(e) => setProduct({ ...product, taxIcms: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">IPI (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxIpi}
                                        onChange={(e) => setProduct({ ...product, taxIpi: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">PIS (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxPis}
                                        onChange={(e) => setProduct({ ...product, taxPis: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">COFINS (%)</label>
                                    <input
                                        type="number"
                                        value={product.taxCofins}
                                        onChange={(e) => setProduct({ ...product, taxCofins: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t dark:border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Taxa da Plataforma (%)</label>
                                    <input
                                        type="number"
                                        value={product.platformFee}
                                        onChange={(e) => setProduct({ ...product, platformFee: parseFloat(e.target.value) || 0 })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">R$ {feeAmount.toFixed(2)} por unidade</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Outros Custos (R$)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
                                        <input
                                            type="number"
                                            value={product.additionalCost}
                                            onChange={(e) => setProduct({ ...product, additionalCost: parseFloat(e.target.value) || 0 })}
                                            className="w-full pl-9 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-medium text-gray-500">Total de Impostos</span>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">{totalTaxRate.toFixed(2)}%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium text-gray-500">Valor em R$</span>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">R$ {taxAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Análise de Lucratividade Real</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
                                    <p className="text-xs text-gray-500 font-medium mb-1">Preço Final</p>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">R$ {currentPrice.toFixed(2)}</h4>
                                    <div className="mt-2 text-[10px] text-gray-400 space-y-1">
                                        <div className="flex justify-between"><span>Custo Prod.:</span> <span>- R$ {product.costPrice.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Impostos:</span> <span>- R$ {taxAmount.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Taxas:</span> <span>- R$ {feeAmount.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Outros:</span> <span>- R$ {product.additionalCost.toFixed(2)}</span></div>
                                    </div>
                                </div>
                                <div className={`p-4 rounded-xl border ${profit > 0 ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20' : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20'}`}>
                                    <p className={`text-xs font-medium mb-1 ${profit > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>Lucro Líquido</p>
                                    <h4 className={`text-2xl font-bold ${profit > 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>R$ {profit.toFixed(2)}</h4>
                                    <p className={`text-xs mt-1 ${profit > 0 ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}>
                                        Por unidade vendida
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium mb-1">Margem de Lucro</p>
                                    <h4 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{margin.toFixed(1)}%</h4>
                                    <div className="w-full bg-blue-200 dark:bg-blue-900/30 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(Math.max(margin, 0), 100)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'images' && !isKit && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Image Grid */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Galeria do Produto ({product.images.length})</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {/* Add Image Button */}
                                <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors cursor-pointer flex flex-col items-center justify-center text-center group bg-gray-50 dark:bg-white/5">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors mb-2" />
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">Adicionar</span>
                                </div>

                                {product.images.map((img, i) => (
                                    <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                        <img src={img} alt={`Produto ${i + 1}`} className="w-full h-full object-cover" />

                                        {/* Cover Badge */}
                                        {i === 0 && (
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-white" />
                                                Capa
                                            </div>
                                        )}

                                        {/* Actions Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                                            {i !== 0 && (
                                                <button
                                                    onClick={() => {
                                                        const newImages = [...product.images];
                                                        const [movedImage] = newImages.splice(i, 1);
                                                        if (movedImage) {
                                                            newImages.unshift(movedImage);
                                                            setProduct({ ...product, images: newImages });
                                                        }
                                                    }}
                                                    className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Star className="w-3 h-3" />
                                                    Definir como Capa
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    const newImages = product.images.filter((_, index) => index !== i);
                                                    setProduct({ ...product, images: newImages });
                                                }}
                                                className="w-full py-2 bg-red-500/80 hover:bg-red-500 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* Basic Info - Moved from Details */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Informações Básicas
                            </h3>
                            <div className="space-y-4">
                                {/* Name field */}
                                {!isKit && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Produto <span className="text-red-500 ml-1">*</span></label>
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição <span className="text-red-500 ml-1">*</span></label>
                                    <textarea
                                        rows={6}
                                        value={product.description}
                                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Marca <span className="text-red-500 ml-1">*</span></label>
                                        <Dropdown
                                            options={['Lizze', 'Vyz', 'Dejavu']}
                                            value={product.brand}
                                            onChange={(val) => setProduct({ ...product, brand: val })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria <span className="text-red-500 ml-1">*</span></label>
                                        <Dropdown
                                            options={['Elétricos', 'Cabelos', 'Unhas', 'Pele', 'Móveis', 'Kits']}
                                            value={product.category}
                                            onChange={(val) => setProduct({ ...product, category: val, subcategory: subcategories[val]?.[0] || '' })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategoria <span className="text-red-500 ml-1">*</span></label>
                                        <Dropdown
                                            options={subcategories[product.category] || []}
                                            value={product.subcategory || ''}
                                            onChange={(val) => setProduct({ ...product, subcategory: val })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                SEO (Otimização para Buscas)
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Página (Meta Title)</label>
                                    <input
                                        type="text"
                                        value={product.seoTitle}
                                        onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Recomendado: Até 60 caracteres. Atual: {product.seoTitle.length}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição (Meta Description)</label>
                                    <textarea
                                        rows={3}
                                        value={product.seoDescription}
                                        onChange={(e) => setProduct({ ...product, seoDescription: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all resize-none"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Recomendado: Até 160 caracteres. Atual: {product.seoDescription.length}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">URL Amigável (Slug)</label>
                                    <div className="flex">
                                        <span className="bg-gray-100 dark:bg-white/10 border border-r-0 border-gray-200 dark:border-white/10 rounded-l-lg px-3 py-2.5 text-sm text-gray-500">
                                            loja.com/produto/
                                        </span>
                                        <input
                                            type="text"
                                            value={product.slug}
                                            onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                                            className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-r-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Settings */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                Envio e Dimensões
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Peso (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={product.weight}
                                        onChange={(e) => setProduct({ ...product, weight: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Largura (cm)</label>
                                    <input
                                        type="number"
                                        value={product.width}
                                        onChange={(e) => setProduct({ ...product, width: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Altura (cm)</label>
                                    <input
                                        type="number"
                                        value={product.height}
                                        onChange={(e) => setProduct({ ...product, height: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Profundidade (cm)</label>
                                    <input
                                        type="number"
                                        value={product.depth}
                                        onChange={(e) => setProduct({ ...product, depth: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl border dark:border-white/5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Tags do Produto
                            </h3>
                            <div>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Digite uma tag e pressione Enter..."
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all mb-3"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium text-gray-700 dark:text-gray-300">
                                            {tag}
                                            <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
