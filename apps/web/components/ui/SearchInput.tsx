"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', containerClassName = '', ...props }, ref) => {
        return (
            <div className={`relative ${containerClassName}`}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                    ref={ref}
                    type="text"
                    className={`w-full bg-white dark:bg-[#121212] border border-transparent dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all shadow-sm placeholder:text-gray-400 ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

SearchInput.displayName = "SearchInput";
