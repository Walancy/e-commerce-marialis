import React from 'react';

interface CardIconProps {
    brand: string;
    className?: string;
}

export const CardIcon = ({ brand, className = "w-8 h-8" }: CardIconProps) => {
    const getIcon = () => {
        switch (brand.toLowerCase()) {
            case 'visa':
                return (
                    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.7305 32.9999H23.9505L27.2105 16.9999H21.9905L18.7305 32.9999Z" fill="#2566AF" />
                        <path d="M12.9105 32.9999L10.0305 18.7899C9.8905 18.2699 9.3805 17.9999 8.8205 17.9699H2.8605L2.9905 18.5799C5.8305 19.6399 9.1705 21.3799 11.4305 22.6199L10.3705 27.9999L12.9105 32.9999Z" fill="#2566AF" />
                        <path d="M37.8305 32.9999H42.7905L46.9605 16.9999H42.3805C41.3305 16.9999 40.4505 17.6099 40.0505 18.5799L34.1905 32.9999H37.8305Z" fill="#2566AF" />
                        <path d="M29.6505 16.9999H25.4305L21.2105 32.9999H25.9905L26.9605 28.1499H33.0205L33.6205 32.9999H38.3105L33.9105 16.9999H29.6505ZM28.1805 24.5899L29.5805 19.9999H31.3305L30.5805 24.5899H28.1805Z" fill="#2566AF" />
                    </svg>
                );
            case 'mastercard':
                return (
                    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4 36C22.1496 36 26 32.1944 26 27.5C26 22.8056 22.1496 19 17.4 19C12.6504 19 8.8 22.8056 8.8 27.5C8.8 32.1944 12.6504 36 17.4 36Z" fill="#EB001B" />
                        <path d="M30.6 36C35.3496 36 39.2 32.1944 39.2 27.5C39.2 22.8056 35.3496 19 30.6 19C25.8504 19 22 22.8056 22 27.5C22 32.1944 25.8504 36 30.6 36Z" fill="#F79E1B" />
                        <path d="M26 27.5C26 31.5422 24.0816 35.0669 21.14 37.1191C23.26 38.3311 25.72 39 28.4 39C34.7513 39 39.9 33.8513 39.9 27.5C39.9 21.1487 34.7513 16 28.4 16C25.72 16 23.26 16.6689 21.14 17.8809C24.0816 19.9331 26 23.4578 26 27.5Z" fill="#FF5F00" />
                    </svg>
                );
            case 'amex':
                return (
                    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 8H44V40H4V8Z" fill="#006FCF" />
                        <path d="M12.5 20L10 28H14L15 24H18L19 28H23L19 16H12L10 18L12.5 20ZM16.5 20H15.5L16 18L16.5 20Z" fill="white" />
                        <path d="M29 16H24L23 28H27L27.5 24H29C30.5 24 31 23 31 22C31 21 30.5 20 29 20H27.5L28 18H29C30 18 30.5 17.5 30.5 17C30.5 16.5 30 16 29 16Z" fill="white" />
                    </svg>
                );
            default:
                return (
                    <div className={`${className} bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center`}>
                        <span className="text-[10px] font-bold text-gray-500">{brand ? brand.slice(0, 2).toUpperCase() : '??'}</span>
                    </div>
                );
        }
    };

    return getIcon();
};
