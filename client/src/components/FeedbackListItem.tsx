
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



    return (
        <>
            <h4>Name: {name}</h4>
            <h5>Category: {category}</h5>
            <span>Status: {status}</span>
            <button>Edit</button>
            <button>Delete</button>
        </>
    )
}