import { useState } from "react";
import styles from './FeedbackListItem.module.css'
import useDeleteFeedback from "../../../hooks/useDeleteFeedback";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBug,
    faLightbulb,
    faInfoCircle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';


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
                        aria-label="Drag to reorder feedback item"
                    >
                        ⋮⋮
                    </button>

                    <button
                        className={`${styles['icon-button']} ${styles['expand-button']}`}
                        onClick={() => setIsExpanded(state => !state)}
                        title={isExpanded ? "Collapse feedback details" : "Expand feedback details"}
                        aria-label={isExpanded ? "Collapse feedback details" : "Expand feedback details"}
                    >
                        {isExpanded ? '-' : '+'}
                    </button>
                </div>

                <div className={styles['feedback-info']}>
                    <h4
                        title="Submitted by"
                    >
                        {name}
                    </h4>
                    <div className={styles['category']}>
                        <FontAwesomeIcon
                            icon={getCategoryIcon(category)}
                            className={styles['category-icon']}
                            aria-label={`Category: ${category}`}
                            title={`Feedback category: ${category}`}
                        />
                        <span
                            title={`Feedback category: ${category}`}
                            aria-label={`Category: ${category}`}
                        >
                            {category}
                        </span>
                    </div>

                    <span className={styles['status']}>
                        <span
                            className={`${styles['status-dot']} ${getStatusClass(status)}`}
                            aria-label={`Status: ${status}`}
                            title={`Current status: ${status}`}
                            role="img"
                        ></span>
                        <span
                            title={`Current status: ${status}`}
                            aria-label={`Status: ${status}`}
                        >
                            {status}
                        </span>
                    </span>
                </div>

                <div className={styles['feedback-actions']}>
                    <Link
                        to={`/feedback/${_id}`}
                        className={`${styles['icon-button']} ${styles['edit-button']}`}
                        title="Edit this feedback"
                        aria-label="Edit this feedback"
                    >
                        ✏️
                    </Link>

                    <button
                        className={`${styles['icon-button']} ${styles['delete-button']}`}
                        onClick={handleDelete}
                        title="Delete this feedback"
                        aria-label="Delete this feedback"
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

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'bug report':
        case 'bug':
            return faBug;
        case 'feature request':
        case 'feature':
            return faLightbulb;
        case 'complaint':
            return faExclamationCircle;
        case 'general':
        default:
            return faInfoCircle;
    }
};