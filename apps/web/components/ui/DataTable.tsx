"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Checkbox } from './Checkbox';

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
    sortable?: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    selectedIds?: number[];
    onSelectAll?: () => void;
    onSelectOne?: (id: number) => void;
    keyField: keyof T;
}

export function DataTable<T>({
    data,
    columns,
    onRowClick,
    selectedIds = [],
    onSelectAll,
    onSelectOne,
    keyField
}: DataTableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof T | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key!];
            const bValue = b[sortConfig.key!];

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    return (
        <div className="bg-white dark:bg-[#121212] rounded-xl border dark:border-white/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 border-b dark:border-white/5">
                        <tr>
                            {onSelectAll && (
                                <th className="px-6 py-4 w-10">
                                    <Checkbox
                                        checked={data.length > 0 && selectedIds.length === data.length}
                                        onChange={onSelectAll}
                                    />
                                </th>
                            )}
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-4 font-medium ${col.className || ''} ${col.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300' : ''}`}
                                    onClick={() => col.sortable && col.accessorKey && handleSort(col.accessorKey)}
                                >
                                    <div className={`flex items-center gap-1 ${col.className?.includes('text-right') ? 'justify-end' : ''}`}>
                                        {col.header}
                                        {col.sortable && (
                                            <div className="flex flex-col">
                                                {sortConfig.key === col.accessorKey ? (
                                                    sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                                ) : (
                                                    <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-white/5">
                        {sortedData.map((item) => {
                            const id = item[keyField] as number;
                            const isSelected = selectedIds.includes(id);
                            return (
                                <tr
                                    key={id}
                                    className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer ${isSelected ? 'bg-gray-50 dark:bg-white/5' : ''}`}
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('input[type="checkbox"]') || (e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
                                        onRowClick?.(item);
                                    }}
                                >
                                    {onSelectOne && (
                                        <td className="px-6 py-4">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => onSelectOne(id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col, index) => (
                                        <td key={index} className={`px-6 py-4 ${col.className || ''}`}>
                                            {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : '')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
