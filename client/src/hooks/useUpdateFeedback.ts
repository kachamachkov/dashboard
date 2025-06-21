import feedbackService from "../services/feedbackService";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateFeedback() {
    const feedbackMutation = useMutation({
        mutationFn: feedbackService.updateFeedbackItem,
    })

    return feedbackMutation;
}