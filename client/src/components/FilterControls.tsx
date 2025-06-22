import styles from './FilterControls.module.css';

type Category = 'bug-report' | 'feature-request' | 'general' | 'complaint';
type Status = 'pending' | 'resolved' | 'closed';

interface FilterState {
    category: Category | '';
    status: Status | '';
}

interface FilterControlsProps {
    filters: FilterState;
    onCategoryChange: (category: Category | '') => void;
    onStatusChange: (status: Status | '') => void;
    onClearFilters: () => void;
}

export default function FilterControls({
    filters,
    onCategoryChange,
    onStatusChange,
    onClearFilters
}: FilterControlsProps) {

    return (
        <>
            <div className={styles['filter-controls']}>
                <div className={styles['filter-section']}>
                    <label htmlFor="category-filter" className={styles['filter-label']}>
                        Category
                    </label>
                    <select
                        id="category-filter"
                        className={styles['filter-select']}
                        value={filters.category}
                        onChange={(e) => onCategoryChange(e.target.value as Category | '')}
                    >
                        <option value="Bug Report">Bug Report</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="General">General</option>
                        <option value="Complaint">Complaint</option>
                    </select>
                </div>

                <div className={styles['filter-section']}>
                    <label htmlFor="status-filter" className={styles['filter-label']}>
                        Status
                    </label>
                    <select
                        id="status-filter"
                        className={styles['filter-select']}
                        value={filters.status}
                        onChange={(e) => onStatusChange(e.target.value as Status | '')}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <button
                    className={styles['clear-filters-btn']}
                    type="button"
                    onClick={onClearFilters}
                >
                    Clear Filters
                </button>
            </div>
        </>
    )
}