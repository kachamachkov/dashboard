import feedbackService from "../services/feedbackService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateFeedback() {
    const queryClient = useQueryClient();
    
    const feedbackMutation = useMutation({
        mutationFn: feedbackService.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback'] })
        }
    })

    return feedbackMutation;
}