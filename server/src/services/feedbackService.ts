import { FeedbackObject, CreateFeedbackRequest } from '../types/feedback';
import { FileUtils } from '../utils/fileUtils';
import { JSON_FILE_PATH, feedbackData } from '../utils/constants';

export class FeedbackService {
    static getAllFeedback(page: number): { data: FeedbackObject[], totalPages: number, currentPage: number } {
        const allFeedback = feedbackData;
        const pageSize = 10;
        const totalItems = allFeedback.length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (page - 1) * pageSize;
        const paginatedData = allFeedback.slice(startIndex, startIndex + pageSize);

        return {
            data: paginatedData,
            totalPages,
            currentPage: page
        };
    }

    static getFeedbackById(id: number): FeedbackObject | null {
        return feedbackData.find(item => item._id === id) || null;
    }

    static async createFeedback(feedback: CreateFeedbackRequest): Promise<FeedbackObject> {
        const newFeedback: FeedbackObject = {
            ...feedback,
            _id: Date.now()
        };

        feedbackData.unshift(newFeedback);
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);

        return newFeedback;
    }

    static async updateFeedback(id: number, updates: Partial<FeedbackObject>): Promise<FeedbackObject | null> {
        const index = feedbackData.findIndex(item => item._id === id);

        if (index === -1) return null;

        feedbackData[index] = { ...feedbackData[index], ...updates, _id: id };
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);

        return feedbackData[index];
    }

    static async deleteFeedback(id: number): Promise<boolean> {
        const index = feedbackData.findIndex(item => item._id === id);

        if (index === -1) return false;

        feedbackData.splice(index, 1);
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);

        return true;
    }
}