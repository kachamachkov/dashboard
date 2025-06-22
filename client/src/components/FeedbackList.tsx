import FeedbackListItem from "./FeedbackListItem";
import useGetFeedback from "../hooks/useGetFeedback";
import styles from './FeedbackList.module.css';
import useSorting from "../hooks/useSorting";

type FeedbackItem = {
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
        sortedData,
        sortField,
        sortDirection,
        handleSort
    } = useSorting<FeedbackItem, keyof FeedbackItem>(
        feedbackQuery.data,
        'name',
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
            <h2>Feedback Collection</h2>
            <div className={styles['sort-controls']}>
                <label>Sort by: </label>
                <button
                    onClick={() => handleSort('name')}
                    className={sortField === 'name' ? styles['active-sort'] : ''}
                >
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => handleSort('category')}
                    className={sortField === 'category' ? styles['active-sort'] : ''}
                >
                    Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => handleSort('status')}
                    className={sortField === 'status' ? styles['active-sort'] : ''}
                >
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => handleSort('none')}
                    className={sortField === 'none' ? styles['active-sort'] : ''}
                >
                    Reset
                </button>
            </div>

            <ul className={styles['list']}>

                {sortedData && sortedData.map((item: any) => (
                    <li
                        key={item._id}
                    >
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