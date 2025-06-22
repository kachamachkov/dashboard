import React from 'react';
import styles from './FeedbackList.module.css'; // Assuming styles are shared
import type { FeedbackItem } from './FeedbackList';


interface SortingControlsProps {
    sortField: keyof FeedbackItem | "none";
    sortDirection: 'asc' | 'desc';
    onSort: (field: keyof FeedbackItem | "none") => void;
}

const SortingControls: React.FC<SortingControlsProps> = ({
    sortField,
    sortDirection,
    onSort
}) => {
    const getSortIcon = (field: string) => {
        if (sortField === field) {
            return sortDirection === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    return (
        <div className={styles['sort-controls']}>
            <label>Sort by: </label>
            <button
                onClick={() => onSort('name')}
                className={sortField === 'name' ? styles['active-sort'] : ''}
            >
                Name {getSortIcon('name')}
            </button>
            <button
                onClick={() => onSort('category')}
                className={sortField === 'category' ? styles['active-sort'] : ''}
            >
                Category {getSortIcon('category')}
            </button>
            <button
                onClick={() => onSort('status')}
                className={sortField === 'status' ? styles['active-sort'] : ''}
            >
                Status {getSortIcon('status')}
            </button>
            <button
                onClick={() => onSort('none')}
                className={sortField === 'none' ? styles['active-sort'] : ''}
            >
                Reset
            </button>
        </div>
    );
};

export default SortingControls;