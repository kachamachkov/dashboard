import { Request, Response } from "express";
import cors from 'cors'
import fs from 'fs/promises';
import path from 'path';

interface FeedbackObject {
    _id: number;
    name: string;
    email: string;
    content: string;
    category: string;
    status: string;
}

const JSON_FILE_PATH = path.join(__dirname, 'feedback.json');

async function writeToJsonFile(newObject: FeedbackObject): Promise<void> {
    try {
        let existingData: FeedbackObject[] = [];

        try {
            const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            existingData = JSON.parse(fileContent)

        } catch (error) {
            existingData = [];
        }

        existingData.push(newObject);

        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(existingData, null, 2));
        console.log('Object written to JSON file successfully');

    } catch (error) {
        throw new Error('Error writing to JSON file');
    }
}


const express = require('express')
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello from Express'
    })
})

app.get('/feedback', async (req: Request, res: Response) => {
    try {
        let feedbackData: FeedbackObject[] = [];

        try {
            const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            feedbackData = JSON.parse(fileContent);
        } catch (error) {
            feedbackData = [];
        }

        res.status(200).json(feedbackData);
    } catch (error) {
        console.error('Error reading feedback file:', error);
        res.status(500).json({ error: 'Failed to retrieve feedback' });
    }
})

app.post('/submit-feedback', async (req: Request, res: Response) => {
    try {
        const feedbackObject: FeedbackObject = req.body;
        feedbackObject._id = Date.now();

        await writeToJsonFile(feedbackObject);
        res.status(201).json({ message: 'Feedback saved successfully.' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to save feedback.' })

    }
})

app.listen(5000, () => console.log('Server is listening on port 5000...'));
