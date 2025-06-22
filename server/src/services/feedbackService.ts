import { FeedbackObject, CreateFeedbackRequest } from '../types/feedback';
import { FileUtils } from '../utils/fileUtils';
import { JSON_FILE_PATH } from '../utils/constants';

export class FeedbackService {
    static async getAllFeedback(page: number): Promise<{ data: FeedbackObject[], totalPages: number, currentPage: number }> {
        const allFeedback = await FileUtils.readFeedbackData(JSON_FILE_PATH);
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

    static async getFeedbackById(id: number): Promise<FeedbackObject | null> {
        const feedbackData = await FileUtils.readFeedbackData(JSON_FILE_PATH);
        return feedbackData.find(item => item._id === id) || null;
    }

    static async createFeedback(feedback: CreateFeedbackRequest): Promise<FeedbackObject> {
        const feedbackData = await FileUtils.readFeedbackData(JSON_FILE_PATH);
        const newFeedback: FeedbackObject = {
            ...feedback,
            _id: Date.now()
        };

        feedbackData.unshift(newFeedback);
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);

        return newFeedback;
    }

    static async updateFeedback(id: number, updates: Partial<FeedbackObject>): Promise<FeedbackObject | null> {
        const feedbackData = await FileUtils.readFeedbackData(JSON_FILE_PATH);
        const index = feedbackData.findIndex(item => item._id === id);

        if (index === -1) return null;

        feedbackData[index] = { ...feedbackData[index], ...updates, _id: id };
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);

        return feedbackData[index];
    }

    static async deleteFeedback(id: number): Promise<boolean> {
        const feedbackData = await FileUtils.readFeedbackData(JSON_FILE_PATH);
        const index = feedbackData.findIndex(item => item._id === id);

        if (index === -1) return false;

        feedbackData.splice(index, 1);
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);

        return true;
    }
}