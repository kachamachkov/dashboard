import { FeedbackObject, CreateFeedbackRequest } from '../types/feedback';
import { FileUtils } from '../utils/fileUtils';
import { JSON_FILE_PATH } from '../utils/constants';

export class FeedbackService {
    static async getAllFeedback(): Promise<FeedbackObject[]> {
        return await FileUtils.readFeedbackData(JSON_FILE_PATH);
    }

    static async getFeedbackById(id: number): Promise<FeedbackObject | null> {
        const feedbackData = await this.getAllFeedback();
        return feedbackData.find(item => item._id === id) || null;
    }

    static async createFeedback(feedback: CreateFeedbackRequest): Promise<FeedbackObject> {
        const feedbackData = await this.getAllFeedback();
        const newFeedback: FeedbackObject = {
            ...feedback,
            _id: Date.now()
        };
        
        feedbackData.unshift(newFeedback);
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);
        
        return newFeedback;
    }

    static async updateFeedback(id: number, updates: Partial<FeedbackObject>): Promise<FeedbackObject | null> {
        const feedbackData = await this.getAllFeedback();
        const index = feedbackData.findIndex(item => item._id === id);
        
        if (index === -1) return null;
        
        feedbackData[index] = { ...feedbackData[index], ...updates, _id: id };
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);
        
        return feedbackData[index];
    }

    static async deleteFeedback(id: number): Promise<boolean> {
        const feedbackData = await this.getAllFeedback();
        const index = feedbackData.findIndex(item => item._id === id);
        
        if (index === -1) return false;
        
        feedbackData.splice(index, 1);
        await FileUtils.writeFeedbackData(JSON_FILE_PATH, feedbackData);
        
        return true;
    }
}