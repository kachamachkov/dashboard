import feedbackService from "../services/feedbackService";
import { useQuery } from "@tanstack/react-query";

export default function useGetFeedback() {
    const feedbackQuery = useQuery({
        queryKey: ['feedback'],
        queryFn: feedbackService.getFeedbackItems,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })

    return feedbackQuery;
}