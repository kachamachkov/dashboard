import feedbackService from "../services/feedbackService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteFeedback() {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: feedbackService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback'] })
        }
    })

    return deleteMutation;
}