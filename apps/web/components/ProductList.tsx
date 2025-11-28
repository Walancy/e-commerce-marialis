import { ProductCard } from './ProductCard';

const products = [
    {
        id: 1,
        image: '/product-flat-iron.png',
        title: 'Prancha Extreme',
        brand: 'Lizze',
        price: 'R$ 499,00'
    },
    {
        id: 2,
        image: '/product-shampoo.png',
        title: 'Finalize - 200ml',
        brand: 'Vyz',
        price: 'R$ 89,90'
    },
    {
        id: 3,
        image: '/product-flat-iron.png',
        title: 'Secador Supreme',
        brand: 'Lizze',
        price: 'R$ 599,00'
    },
    {
        id: 4,
        image: '/product-shampoo.png',
        title: 'Kit Repair',
        brand: 'Vyz',
        price: 'R$ 149,90'
    },
    {
        id: 5,
        image: '/product-flat-iron.png',
        title: 'Modelador Cachos',
        brand: 'Lizze',
        price: 'R$ 299,00'
    }
];

export const ProductList = () => {
    return (
        <section className="py-12 max-w-[1400px] mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Destaques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
};
