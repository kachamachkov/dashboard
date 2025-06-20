import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetFeedback() {
    const feedbackQuery = useQuery({
        queryKey: ['feedback'],
        queryFn: () => getFeedbackItems(),
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })

    return feedbackQuery;
}

async function getFeedbackItems() {
    const url = 'http://localhost:5000/feedback';
    const result = await axios.get(url);

    return result.data;
}