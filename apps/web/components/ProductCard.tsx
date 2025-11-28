import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    image: string;
    title: string;
    brand: string;
    price: string;
}

export const ProductCard = ({ image, title, brand, price }: ProductCardProps) => {
    return (
        <div className="flex flex-col group cursor-pointer">
            {/* Card Image Area */}
            <div className="relative w-full aspect-square bg-[#f8f9fa] dark:bg-[#2a2a2a] rounded-2xl p-6 md:p-12 mb-4 transition-all duration-300 group-hover:shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                />

                {/* Add to Cart Button */}
                <button className="absolute bottom-4 right-4 bg-black text-white rounded-full w-10 h-10 shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group/btn hover:w-32 overflow-hidden">
                    <span className="opacity-0 group-hover/btn:opacity-100 w-0 group-hover/btn:w-auto transition-all duration-300 whitespace-nowrap text-xs font-bold pl-0 group-hover/btn:pl-4">ADICIONAR</span>
                    <ShoppingCart size={16} className="flex-shrink-0 ml-0 group-hover/btn:ml-2 transition-all" />
                </button>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{brand}</p>
                <h3 className="text-gray-700 dark:text-gray-300 font-medium text-sm leading-tight">{title}</h3>
                <p className="text-black dark:text-white font-bold text-base mt-1">{price}</p>
            </div>
        </div>
    );
};
