import FeedbackListItem from "./feedbackListItem/FeedbackListItem";
import useGetFeedback from "../../hooks/useGetFeedback";
import styles from './FeedbackList.module.css';
import useSorting from "../../hooks/useSorting";
import SearchBar from "../search/SearchBar";
import { useFiltering } from "../../hooks/useFiltering";
import FilterControls from "../filterControls/FilterControls";
import SortingControls from "../sortingControls/SortingControls";

export type FeedbackItem = {
    _id: string;
    name: string;
    email: string;
    content: string;
    category: string;
    status: string;
};

const statusOrder = {
    'Pending': 0,
    'Resolved': 1,
    'Closed': 2
};

export default function FeedbackList() {
    const feedbackQuery = useGetFeedback();
    const {
        filters,
        filteredItems,
        setCategory,
        setStatus,
        setSearchTerm,
        clearFilters
    } = useFiltering(feedbackQuery.data || []);

    const {
        sortedData,
        sortField,
        sortDirection,
        handleSort
    } = useSorting<FeedbackItem, keyof FeedbackItem>(
        filteredItems,
        'none',
        'asc',
        { status: statusOrder }
    );

    if (feedbackQuery.isFetching) {
        return <h2>Loading...</h2>
    }

    if (feedbackQuery.isError) {
        return <h2>Failed to load feedback.</h2>
    }

    return (
        <>
            <SearchBar
                onSearch={setSearchTerm}
                placeholder="Search by name, email, or content..."
            />
            <SortingControls
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
            />
            <FilterControls
                filters={{
                    category: filters.category,
                    status: filters.status
                }}
                onCategoryChange={setCategory}
                onStatusChange={setStatus}
                onClearFilters={clearFilters}
            />
            <ul className={styles['list']}>
                {sortedData && sortedData.map((item: any) => (
                    <li key={item._id}>
                        <FeedbackListItem
                            _id={item._id}
                            name={item.name}
                            email={item.email}
                            content={item.content}
                            category={item.category}
                            status={item.status}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}