import { Request, Response, NextFunction } from 'express';
import { FeedbackService } from '../services/feedbackService';

export const getAllFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const feedback = await FeedbackService.getAllFeedback();
        res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

export const getFeedbackById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid feedback ID' });
            return;
        }

        const feedback = await FeedbackService.getFeedbackById(id);

        if (!feedback) {
            res.status(404).json({ error: 'Feedback not found' });
            return;
        }

        res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

export const createFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const feedback = await FeedbackService.createFeedback(req.body);
        res.status(201).json({ message: 'Feedback saved successfully.', data: feedback });
    } catch (error) {
        next(error);
    }
};

export const updateFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid feedback ID' });
            return;
        }

        const updatedFeedback = await FeedbackService.updateFeedback(id, req.body);

        if (!updatedFeedback) {
            res.status(404).json({ error: 'Feedback not found' });
            return;
        }

        res.status(200).json({ message: 'Feedback updated successfully', data: updatedFeedback });
    } catch (error) {
        next(error);
    }
};

export const deleteFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid feedback ID' });
            return;
        }

        const deleted = await FeedbackService.deleteFeedback(id);

        if (!deleted) {
            res.status(404).json({ error: 'Feedback not found' });
            return;
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        next(error);
    }
};