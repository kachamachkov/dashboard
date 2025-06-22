import fs from 'fs/promises';
import { FeedbackObject } from '../types/feedback';

export class FileUtils {
    static async readFeedbackData(filePath: string): Promise<FeedbackObject[]> {
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading feedback data:', error);
            return [];
        }
    }

    static async writeFeedbackData(filePath: string, data: FeedbackObject[]): Promise<void> {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error writing feedback data:', error);
            throw new Error('Failed to write data to file.');
        }
    }
}