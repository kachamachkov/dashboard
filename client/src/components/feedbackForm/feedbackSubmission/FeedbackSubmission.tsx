import styles from './FeedbackSubmission.module.css';

interface FeedbackSubmissionSuccessProps {
    isEdit?: boolean;
    onViewFeedback?: () => void;
    savedData?: any;
}

const FeedbackSubmissionSuccess: React.FC<FeedbackSubmissionSuccessProps> = ({
    isEdit = false,
    onViewFeedback,
}) => {
    return (
<div className={styles['feedback-success']}>
            <div className={styles['success-content']}>
                <h2>
                    {isEdit ? 'Feedback Updated!' : 'Thank you for your feedback!'}
                </h2>

                <p className={styles['success-message']}>
                    {isEdit
                        ? 'Your feedback has been saved successfully.'
                        : 'We appreciate you taking the time to share your thoughts with us.'
                    }
                </p>

                <div className={styles['action-buttons']}>
                    {onViewFeedback && (
                        <button
                            className={styles['btn-secondary']}
                            onClick={onViewFeedback}
                        >
                            View All
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackSubmissionSuccess;