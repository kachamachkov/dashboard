import { Router } from 'express';
import {
    getAllFeedback,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback
} from '../controllers/feedbackController';

const router = Router();


router.get('/feedback', getAllFeedback);
router.get('/feedback/:id', getFeedbackById);
router.post('/feedback', createFeedback);
router.put('/feedback/:id', updateFeedback);
router.delete('/feedback/:id', deleteFeedback);

export default router;