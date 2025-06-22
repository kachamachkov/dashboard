import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';
type CategoryOrder = Record<string, number>;

export default function useSorting<T, K extends keyof T>(
    data: T[] | undefined,
    defaultField: K | 'none' = 'none',
    defaultDirection: SortDirection = 'asc',
    categoryOrders: Partial<Record<K, CategoryOrder>> = {}
) {
    const [sortField, setSortField] = useState<K | 'none'>(defaultField);
    const [sortDirection, setSortDirection] = useState<SortDirection>(defaultDirection);

    const sortedData = useMemo(() => {
        if (!data || sortField === 'none') {
            return data;
        }

        return [...data].sort((a, b) => {
            const categoryOrder = categoryOrders[sortField];
            
            if (categoryOrder) {
                const aValue = String(a[sortField]) || '';
                const bValue = String(b[sortField]) || '';
                
                const aOrder = categoryOrder[aValue] ?? Number.MAX_SAFE_INTEGER;
                const bOrder = categoryOrder[bValue] ?? Number.MAX_SAFE_INTEGER;
                
                return sortDirection === 'asc' 
                    ? aOrder - bOrder 
                    : bOrder - aOrder;
            }
            
            const aValue = String(a[sortField])?.toLowerCase() || '';
            const bValue = String(b[sortField])?.toLowerCase() || '';

            if (sortDirection === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    }, [data, sortField, sortDirection, categoryOrders]);

    const handleSort = (field: K | 'none') => {
        if (sortField === field && field !== 'none') {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return {
        sortedData,
        sortField,
        sortDirection,
        handleSort
    };
}