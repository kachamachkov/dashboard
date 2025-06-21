import { useParams } from "react-router-dom"
import useGetOneFeedback from "../hooks/useGetOneFeedback";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackDetails() {
    const { id } = useParams<{ id: string }>();
    const feedbackOneQuery = useGetOneFeedback(id!);

    if (feedbackOneQuery.isLoading) {
        return <div>Loading feedback...</div>;
    }

    if (feedbackOneQuery.isError) {
        return <div>Error loading feedback details.</div>;
    }

    return (
        <div>
            <h1>Edit Feedback</h1>
            {feedbackOneQuery.data && (
                <FeedbackForm
                    isEditMode={true}
                    savedData={feedbackOneQuery.data}
                    feedbackId={id}
                />
            )}
        </div>
    )
}