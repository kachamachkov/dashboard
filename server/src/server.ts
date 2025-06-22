import express from 'express';
import cors from 'cors';
import { PORT, CORS_ORIGIN } from './utils/constants';
import feedbackRoutes from './routes/feedbackRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}));

// Routes
app.use('/', feedbackRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});