import { useState, useMemo } from 'react';
import type { FeedbackItem } from '../components/FeedbackList';

type Category = 'bug-report' | 'feature-request' | 'general' | 'complaint';
type Status = 'pending' | 'resolved' | 'closed';

interface FilterableItem extends FeedbackItem {}

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
      // Category filter
      const categoryMatch = filters.category === 'all' || 
        item.category.toLowerCase().replace(' ', '-') === filters.category;

      // Status filter  
      const statusMatch = filters.status === 'all' || 
        item.status.toLowerCase() === filters.status;

      // Search filter
      const searchMatch = !filters.searchTerm.trim() || 
        item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(filters.searchTerm.toLowerCase());

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