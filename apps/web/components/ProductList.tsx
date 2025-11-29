import { ProductCard } from './ProductCard';

// Generate 50 products (10 rows * 5 columns)
const allProducts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    image: i % 2 === 0 ? '/product-flat-iron.png' : '/product-shampoo.png',
    title: i % 2 === 0 ? `Prancha Extreme ${i + 1}` : `Kit Repair ${i + 1}`,
    brand: i % 2 === 0 ? 'Lizze' : 'Vyz',
    price: i % 2 === 0 ? 'R$ 499,00' : 'R$ 149,90'
}));

export const ProductList = () => {
    return (
        <section className="pt-4 pb-12 max-w-[1400px] mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Destaques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
                {allProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
};
