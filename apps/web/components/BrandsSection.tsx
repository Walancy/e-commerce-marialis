import React from 'react';

const brands = [
    { name: 'Lizze', logo: '/marcas/Vector.svg', height: 'h-8' },
    { name: 'Dejavu', logo: '/marcas/Subtract.svg', height: 'h-8' },
    { name: 'Nátylla', logo: '/marcas/natylla.svg', height: 'h-8' },
    { name: 'Due', logo: '/marcas/due.svg', height: 'h-10' },
    { name: 'VYZ', logo: '/marcas/vyz.svg', height: 'h-10' },
    { name: 'Artbelle', logo: '/marcas/artbelle.svg', height: 'h-8' },
];

export const BrandsSection = () => {
    return (
        <section className="py-20">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Nossas Marcas Parceiras
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Trabalhamos com as melhores marcas do mercado para garantir a qualidade e excelência que seu salão merece.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                    {brands.map((brand) => (
                        <div
                            key={brand.name}
                            className="w-full h-32 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center p-6 group cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className={`${brand.height} w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 brightness-0 dark:invert`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
