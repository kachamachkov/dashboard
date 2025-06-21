import { useQuery } from "@tanstack/react-query";
import feedbackService from "../services/feedbackService";


export default function useGetOneFeedback(id: string) {
    const feedbackQuery = useQuery({
        queryKey: ['feedback', id],
        queryFn: () => feedbackService.getOne(id),
        enabled: !!id,
    })

    return feedbackQuery;
}