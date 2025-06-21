import { useMutation } from "@tanstack/react-query"
import feedbackService from "../services/feedbackService"
import { useState } from "react";
import styles from './FeedbackListItem.module.css'

interface FeedbackListItemProps {
    _id: number,
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

    const deleteMutation = useMutation({
        mutationFn: feedbackService.deleteFeedbackItem,
    });

    const updateMutation = useMutation({
        mutationFn: feedbackService.updateFeedbackItem,
    });

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
                    <span className={styles['status']}>Status: {status}</span>
                </div>

                <div className={styles['feedback-actions']}>
                    <button
                        className={`${styles['icon-button']} ${styles['edit-button']}`}
                        onClick={() => updateMutation.mutate({ _id })}
                        title="Edit"
                    >
                        ✏️
                    </button>

                    <button
                        className={`${styles['icon-button']} ${styles['delete-button']}`}
                        onClick={() => deleteMutation.mutate({ _id })}
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