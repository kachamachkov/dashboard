export interface FeedbackObject {
    _id: number;
    name: string;
    email: string;
    content: string;
    category: string;
    status: string;
}

export interface CreateFeedbackRequest {
    name: string;
    email: string;
    content: string;
    category: string;
    status: string;
}