"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    options: Option[] | string[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    triggerClassName?: string;
}

export const Dropdown = ({
    options,
    value,
    onChange,
    placeholder = "Selecione",
    className = "",
    triggerClassName = ""
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize options to Option[]
    const normalizedOptions: Option[] = options.map(opt =>
        typeof opt === 'string' ? { label: opt, value: opt } : opt
    );

    const selectedOption = normalizedOptions.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full bg-white dark:bg-[#121212] border border-transparent dark:border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black dark:focus:border-white transition-all shadow-sm text-gray-700 dark:text-gray-200 ${triggerClassName}`}
            >
                <span className="truncate">
                    {selectedOption ? selectedOption.label : <span className="text-gray-400">{placeholder}</span>}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto py-1 animate-in fade-in zoom-in-95 duration-100">
                    {normalizedOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${value === option.value ? 'text-black dark:text-white font-medium bg-gray-50 dark:bg-white/5' : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            {option.label}
                            {value === option.value && <Check className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
