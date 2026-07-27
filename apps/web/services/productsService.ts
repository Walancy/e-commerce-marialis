import { supabase } from '../lib/supabase';

export interface ProductDB {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    active?: boolean;
    show_in_ecommerce?: boolean;
}

export interface StoreProduct {
    id: string;
    image: string;
    title: string;
    brand: string;
    price: string;
    rating: number;
    category: string;
}

function formatPrice(price: number): string {
    if (!price || price === 0) return 'Consulte';
    return `R$ ${price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export async function fetchProducts(): Promise<StoreProduct[]> {
    const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, category, price, image, active, show_in_ecommerce')
        .not('image', 'is', null)
        .neq('image', '');

    if (error || !data) return [];

    // Only include products that are active AND enabled for e-commerce
    const enabledProducts = (data as ProductDB[]).filter(p => p.show_in_ecommerce !== false && p.active !== false);

    // Deduplicate by name — keep the first occurrence of each product name
    const seen = new Set<string>();
    const unique: ProductDB[] = [];

    for (const p of enabledProducts) {
        const key = p.name.trim().toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(p);
        }
    }

    return unique.map((p) => ({
        id: p.id,
        image: p.image,
        title: p.name,
        brand: p.brand || 'Nátylla',
        price: formatPrice(p.price),
        rating: 4,
        category: p.category || 'Cabelos',
    }));
}

export async function fetchProductsByCategory(category: string): Promise<StoreProduct[]> {
    const products = await fetchProducts();
    return products.filter(p => p.category === category);
}
