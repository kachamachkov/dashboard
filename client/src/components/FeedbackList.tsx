import FeedbackListItem from "./FeedbackListItem";
import useGetFeedback from "../hooks/useGetFeedback";

export default function FeedbackList() {
    const feedbackQuery = useGetFeedback();

    if (feedbackQuery.isFetching) {
        return <h2>Loading...</h2>
    }

    if (feedbackQuery.isError) {
        return <h2>Failed to load feedback.</h2>
    }

    return (
        <>
            <h2>Feedback Collection</h2>
            <ul>

                {feedbackQuery.data && feedbackQuery.data.map((item: any) => (
                    <li
                        key={item._id}
                    >
                        <FeedbackListItem
                            _id={item._id}
                            name={item.name}
                            email={item.email}
                            content={item.content}
                            category={item.category}
                            status={item.status}
                        />
                    </li>
                ))}

            </ul>
        </>
    )
}