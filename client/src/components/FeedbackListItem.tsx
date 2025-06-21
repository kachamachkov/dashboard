import { useMutation } from "@tanstack/react-query"
import feedbackService from "../services/feedbackService"

interface FeedbackListItemProps {
    _id: number,
    name: string,
    email: string,
    content: string,
    category: string,
    status: string,
}

export default function FeedbackListItem({
    _id,
    name,
    email,
    content,
    category,
    status
}: FeedbackListItemProps) {

    const deleteMutation = useMutation({
        mutationFn: feedbackService.deleteFeedbackItem,
    })

    const updateMutation = useMutation({
        mutationFn: feedbackService.updateFeedbackItem,
    })

    return (
        <>
            <h4>Name: {name}</h4>
            <h5>Category: {category}</h5>
            <span>Status: {status}</span>

            <button
                onClick={() => updateMutation.mutate({ _id })}
            >
                Edit
            </button>

            <button
                onClick={() => deleteMutation.mutate({ _id })}
            >
                Delete
            </button>

        </>
    )
}