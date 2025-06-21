import feedbackService from "../services/feedbackService";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteFeedback() {
    const feedbackMutation = useMutation({
        mutationFn: feedbackService.deleteFeedbackItem,
    })

    return feedbackMutation;
}