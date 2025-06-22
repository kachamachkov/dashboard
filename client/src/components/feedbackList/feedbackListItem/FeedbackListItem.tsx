import { useState } from "react";
import styles from './FeedbackListItem.module.css'
import useDeleteFeedback from "../../../hooks/useDeleteFeedback";
import { Link } from "react-router-dom";

interface FeedbackListItemProps {
    _id: string,
    name: string,
    email: string,
    content: string,
    category: string,
    status: string,
}

export default function FeedbackListItem({
    _id,
    name,
    email,
    content,
    category,
    status
}: FeedbackListItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const deleteFeedback = useDeleteFeedback();
    const handleDelete = () => deleteFeedback.mutate(_id);

    return (
        <div className={styles['feedback-accordion']}>
            <div className={styles['feedback-header']}>
                <div className={styles['feedback-controls']}>
                    <button
                        className={`${styles['icon-button']} ${styles['drag-button']}`}
                        title="Drag to reorder"
                    >
                        ⋮⋮
                    </button>

                    <button
                        className={`${styles['icon-button']} ${styles['expand-button']}`}
                        onClick={() => setIsExpanded(state => !state)}
                        title={isExpanded ? "Collapse" : "Expand"}
                    >
                        {isExpanded ? '▼' : '▶'}
                    </button>
                </div>

                <div className={styles['feedback-info']}>
                    <h4>{name}</h4>
                    <span className={styles['category']}>Category: {category}</span>
                    <span className={styles['status']}>
                        <span className={`${styles['status-dot']} ${getStatusClass(status)}`}></span>
                        Status: {status}
                    </span>
                </div>

                <div className={styles['feedback-actions']}>
                    <Link
                        to={`/feedback/${_id}`}
                        className={`${styles['icon-button']} ${styles['edit-button']}`}
                        title="Edit"
                    >
                        ✏️
                    </Link>

                    <button
                        className={`${styles['icon-button']} ${styles['delete-button']}`}
                        onClick={handleDelete}
                        title="Delete"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className={styles['feedback-details']}>
                    <div className={styles['detail-item']}>
                        <strong>Email:</strong> {email}
                    </div>
                    <div className={styles['detail-item']}>
                        <strong>Content:</strong> {content}
                    </div>
                </div>
            )}
        </div>
    );
}

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return styles['status-pending'];
        case 'resolved':
            return styles['status-resolved'];
        case 'closed':
            return styles['status-closed'];
        default:
            return styles['status-default'];
    }
};