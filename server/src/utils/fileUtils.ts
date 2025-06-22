import fs from 'fs/promises';
import { FeedbackObject } from '../types/feedback';

export class FileUtils {
    static async readFeedbackData(filePath: string): Promise<FeedbackObject[]> {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            return [];
        }
    }

    static async writeFeedbackData(filePath: string, data: FeedbackObject[]): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    }
}