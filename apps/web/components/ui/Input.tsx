"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, icon: Icon, fullWidth = true, ...props }, ref) => {
        return (
            <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
                {label && (
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {Icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Icon className="w-4 h-4" />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            w-full bg-white dark:bg-[#1a1a1a] 
                            border border-gray-200 dark:border-gray-800 
                            rounded-lg px-3 py-2.5 text-sm 
                            outline-none transition-all
                            placeholder:text-gray-400
                            focus:border-black dark:focus:border-white 
                            focus:ring-1 focus:ring-black dark:focus:ring-white
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${Icon ? 'pl-9' : ''}
                            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                        `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
