import path from 'path';

export const JSON_FILE_PATH = path.join(__dirname, '../data/feedback.json');
export const PORT = process.env.PORT || 5000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';