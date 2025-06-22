import { useState, useMemo } from 'react';

type Category = 'bug-report' | 'feature-request' | 'general' | 'complaint';
type Status = 'pending' | 'resolved' | 'closed';

interface FilterableItem {
  category: Category;
  status: Status;
  [key: string]: any;
}

interface FilterState {
  category: Category | '';
  status: Status | '';
}

export function useFiltering<T extends FilterableItem>(items: T[]) {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    status: ''
  });

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const categoryMatch = !filters.category || item.category === filters.category;
      const statusMatch = !filters.status || item.status === filters.status;
      return categoryMatch && statusMatch;
    });
  }, [items, filters]);

  const setCategory = (category: Category | '') => {
    setFilters(prev => ({ ...prev, category }));
  };

  const setStatus = (status: Status | '') => {
    setFilters(prev => ({ ...prev, status }));
  };

  const clearFilters = () => {
    setFilters({ category: '', status: '' });
  };

  return {
    filters,
    filteredItems,
    setCategory,
    setStatus,
    clearFilters
  };
}