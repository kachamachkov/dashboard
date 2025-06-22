import { useState, useMemo } from 'react';
import type { FeedbackItem } from '../components/FeedbackList';

type Category = 'Bug Report' | 'Feature Request' | 'General' | 'Complaint';
type Status = 'Pending' | 'Resolved' | 'Closed';

interface FilterableItem extends FeedbackItem { }

interface FilterState {
    category: Category | 'all';
    status: Status | 'all';
    searchTerm: string;
}

export function useFiltering<T extends FilterableItem>(items: T[]) {
    const [filters, setFilters] = useState<FilterState>({
        category: 'all',
        status: 'all',
        searchTerm: ''
    });

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const categoryMatch = filters.category === 'all' ||
                item.category === filters.category;

            const statusMatch = filters.status === 'all' ||
                item.status === filters.status;

            const searchMatch = !filters.searchTerm.trim() ||
                item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                item.content.toLowerCase().includes(filters.searchTerm.toLowerCase());

            return categoryMatch && statusMatch && searchMatch;
        });
    }, [items, filters]);

    const setCategory = (category: Category | 'all') => {
        setFilters(prev => ({ ...prev, category }));
    };

    const setStatus = (status: Status | 'all') => {
        setFilters(prev => ({ ...prev, status }));
    };

    const setSearchTerm = (searchTerm: string) => {
        setFilters(prev => ({ ...prev, searchTerm }));
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            status: 'all',
            searchTerm: ''
        });
    };

    return {
        filters,
        filteredItems,
        setCategory,
        setStatus,
        setSearchTerm,
        clearFilters
    };
}