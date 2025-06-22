import path from 'path';
import feedbackData from '../data/feedback.json';

export {feedbackData};
export const JSON_FILE_PATH = path.join(__dirname, '../data/feedback.json');
export const PORT = process.env.PORT || 5000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://localhost:4173'];