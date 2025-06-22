import { useInfiniteQuery } from '@tanstack/react-query';
import feedbackService from '../services/feedbackService';

export const useFeedbackList = () => {
    return useInfiniteQuery({
        queryKey: ['feedback'],
        queryFn: async ({ pageParam = 1 }) => {
            return await feedbackService.getPaginated(pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages) {
                return lastPage.currentPage + 1;
            }
            return undefined;
        },
    });
};