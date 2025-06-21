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

        existingData.unshift(newObject);

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

app.get('/feedback/:id', async (req: Request, res: Response) => {
    try {
        const feedbackId = parseInt(req.params.id);

        if (isNaN(feedbackId)) {
            return res.status(400).json({ error: 'Invalid feedback ID' });
        }

        let feedbackData: FeedbackObject[] = [];

        try {
            const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            feedbackData = JSON.parse(fileContent);
        } catch (error) {
            feedbackData = [];
        }

        const feedback = feedbackData.find(item => item._id === feedbackId);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error reading feedback file:', error);
        res.status(500).json({ error: 'Failed to retrieve feedback' });
    }
});

app.post('/submit-feedback', async (req: Request, res: Response) => {
    try {
        const feedbackObject: FeedbackObject = req.body;
        feedbackObject._id = Date.now();

        await writeToJsonFile(feedbackObject);
        res.status(201).json({ message: 'Feedback saved successfully.' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to save feedback.' })

    }
});

app.put('/feedback/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        let feedbackData: FeedbackObject[] = [];
        try {
            const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            feedbackData = JSON.parse(fileContent);
        } catch (readError) {
            // If the file doesn't exist, we can't update anything.
            return res.status(404).json({ error: 'Feedback data not found.' });
        }

        const feedbackIndex = feedbackData.findIndex(feedback => feedback._id === parseInt(id));

        if (feedbackIndex === -1) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        // Update the existing feedback object with new data
        const originalFeedback = feedbackData[feedbackIndex];
        feedbackData[feedbackIndex] = { ...originalFeedback, ...updatedData, _id: originalFeedback._id };

        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(feedbackData, null, 2));

        res.status(200).json({ message: 'Feedback updated successfully', data: feedbackData[feedbackIndex] });
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ error: 'Failed to update feedback' });
    }
});

app.delete('/feedback/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        let feedbackData: FeedbackObject[] = [];
        try {
            const fileContent = await fs.readFile(JSON_FILE_PATH, 'utf-8');
            feedbackData = JSON.parse(fileContent);
        } catch (error) {
            feedbackData = [];
        }

        const feedbackIndex = feedbackData.findIndex(feedback => feedback._id === parseInt(id));

        if (feedbackIndex === -1) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        feedbackData.splice(feedbackIndex, 1);
        await fs.writeFile(JSON_FILE_PATH, JSON.stringify(feedbackData, null, 2));

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
