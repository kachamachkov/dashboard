import { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search feedback...", 
  className 
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`${styles['search-container']} ${className || ''}`}>
      <div className={styles['search-input-wrapper']}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles['search-input']}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className={styles['clear-button']}
            title="Clear search"
          >
            ✕
          </button>
        )}
        <span className={styles['search-icon']}>🔍</span>
      </div>
    </div>
  );
}