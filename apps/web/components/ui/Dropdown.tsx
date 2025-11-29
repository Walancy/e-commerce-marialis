"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    options: (DropdownOption | string)[];
    value?: string | string[];
    onChange: (value: any) => void;
    label?: string; // If provided, button shows this label (Filter mode)
    placeholder?: string;
    className?: string;
    triggerClassName?: string;
    multiSelect?: boolean;
}

export const Dropdown = ({
    options,
    value,
    onChange,
    label,
    placeholder = "Selecione",
    className = "",
    triggerClassName = "",
    multiSelect = false
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalize options
    const normalizedOptions: DropdownOption[] = options.map(opt =>
        typeof opt === 'string' ? { label: opt, value: opt } : opt
    );

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        if (multiSelect) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValue = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];
            onChange(newValue);
        } else {
            onChange(optionValue);
            setIsOpen(false);
        }
    };

    // Determine display text
    let displayText = placeholder;
    let count = 0;

    if (label) {
        displayText = label;
        if (Array.isArray(value)) {
            count = value.length;
        } else if (value) {
            count = 1;
        }
    } else {
        if (multiSelect && Array.isArray(value) && value.length > 0) {
            displayText = `${value.length} selecionados`;
        } else if (!multiSelect && value) {
            const selected = normalizedOptions.find(opt => opt.value === value);
            if (selected) displayText = selected.label;
        }
    }

    const isSelected = (optionValue: string) => {
        if (multiSelect && Array.isArray(value)) {
            return value.includes(optionValue);
        }
        return value === optionValue;
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all whitespace-nowrap w-full justify-between ${isOpen
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    } ${triggerClassName}`}
            >
                <div className="flex items-center gap-2 truncate">
                    <span>{displayText}</span>
                    {count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isOpen
                                ? 'bg-white text-black dark:bg-black dark:text-white'
                                : 'bg-black text-white dark:bg-white dark:text-black'
                            }`}>
                            {count}
                        </span>
                    )}
                </div>
                <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[180px] bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border dark:border-white/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto custom-scrollbar">
                    {normalizedOptions.map((option) => {
                        const selected = isSelected(option.value);
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left ${selected
                                        ? 'bg-gray-100 dark:bg-white/10 text-black dark:text-white font-medium'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                            >
                                <span className="truncate">{option.label}</span>
                                {selected && <Check className="w-3.5 h-3.5 flex-shrink-0 ml-2" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
