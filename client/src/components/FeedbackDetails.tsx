import { useParams } from "react-router-dom";
import useGetOneFeedback from "../hooks/useGetOneFeedback";
import FeedbackForm from "./FeedbackForm";


export default function FeedbackDetails() {
    const { id } = useParams();
    const { data: feedback, isLoading, error } = useGetOneFeedback(id!);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading feedback.</div>
    if (!feedback) return <div>Feedback not found.</div>

    return (
        <div>
            <h1>Edit Feedback</h1>
            <FeedbackForm
                savedData={feedback}
                isEditMode={true}
                feedbackId={id}

                
            />
        </div>
    )
}