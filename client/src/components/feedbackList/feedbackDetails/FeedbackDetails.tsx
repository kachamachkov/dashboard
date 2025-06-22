import { useParams } from "react-router-dom"
import useGetOneFeedback from "../../../hooks/useGetOneFeedback";
import FeedbackForm from "../../feedbackForm/FeedbackForm";

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