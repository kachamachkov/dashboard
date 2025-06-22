import styles from './FilterControls.module.css';

export default function FilterControls() {


    return (
        <>
            <div className={styles['filter-controls']}>
                <div className={styles['filter-section']}>
                    <label htmlFor="category-filter" className={styles['filter-label']}>
                        Category
                    </label>
                    <select id="category-filter" className={styles['filter-select']}>
                        <option value="">All Categories</option>
                        <option value="bug-report">Bug Report</option>
                        <option value="feature-request">Feature Request</option>
                        <option value="general">General</option>
                        <option value="complaint">Complaint</option>
                    </select>
                </div>

                <div className={styles['filter-section']}>
                    <label htmlFor="status-filter" className={styles['filter-label']}>
                        Status
                    </label>
                    <select id="status-filter" className={styles['filter-select']}>
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <button className={styles['clear-filters-btn']} type="button">
                    Clear Filters
                </button>
            </div>
        </>
    )
}