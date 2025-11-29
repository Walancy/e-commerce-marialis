"use client";

import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <div className="relative flex items-center justify-center w-4 h-4">
                <input
                    type="checkbox"
                    className={`peer appearance-none w-4 h-4 border border-gray-300 dark:border-white rounded-[3px] bg-transparent cursor-pointer transition-all checked:bg-transparent checked:border-gray-900 dark:checked:border-white ${className}`}
                    ref={ref}
                    {...props}
                />
                <Check className="absolute w-3 h-3 text-black dark:text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";
