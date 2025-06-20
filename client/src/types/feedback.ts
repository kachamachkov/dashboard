export const FEEDBACK_CATEGORIES = [
    'Bug Report',
    'Feature Request',
    'General',
    'Complaint'
] as const;

export const FEEDBACK_STATUSES = [
    'Pending',
    'Resolved',
    'Closed'
] as const;

export type FeedbackCategory = typeof FEEDBACK_CATEGORIES[number];
export type FeedbackStatus = typeof FEEDBACK_STATUSES[number];