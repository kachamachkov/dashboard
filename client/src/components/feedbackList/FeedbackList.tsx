import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import FeedbackListItem from "./feedbackListItem/FeedbackListItem";
import styles from './FeedbackList.module.css';
import useSorting from "../../hooks/useSorting";
import SearchBar from "../search/SearchBar";
import { useFiltering } from "../../hooks/useFiltering";
import FilterControls from "../filterControls/FilterControls";
import SortingControls from "../sortingControls/SortingControls";
import { useInView } from "react-intersection-observer";
import { useFeedbackList } from "../../hooks/useInfiniteQuery";

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
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useFeedbackList();

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    const allFeedback = data?.pages.flatMap(page => page.data) ?? [];

    const {
        filters,
        filteredItems,
        setCategory,
        setStatus,
        setSearchTerm,
        clearFilters
    } = useFiltering(allFeedback);

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



    if (status === 'pending') return <h2>Loading...</h2>;
    if (status === 'error') return <h2>Failed to load feedback.</h2>;

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
                {sortedData && sortedData.map((item) => (
                    <li key={item._id}>
                        <FeedbackListItem {...item} />
                    </li>
                ))}
            </ul>

            <div style={{ height: '50px' }} ref={ref}>{isFetchingNextPage && <p>Loading more...</p>}</div>
        </>
    );
}
