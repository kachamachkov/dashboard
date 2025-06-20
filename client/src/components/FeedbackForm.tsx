import { useState } from "react";
import styles from './FeedbackForm.module.css'


interface FeedbackData {
    _id: null;
    name: string;
    email: string;
    content: string;
    category: string;
    status: string;
}

export default function FeedbackForm() {
    const [formData, setFormData] = useState<FeedbackData>({
        _id: null,
        name: '',
        email: '',
        content: '',
        category: '',
        status: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const categories = [
        'Bug Report',
        'Feature Request',
        'General',
        'Complaint',
    ];

    const statuses = [
        'Pending',
        'Resolved',
        'Closed',
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData(oldValues => ({
            ...oldValues,
            [name]: value
        }));

        // console.log(formData);
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // were submitting here
        setIsSubmitting(state => !state); //true


        //submit to backend here when done? async
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('feedback submitted', formData);
        alert(JSON.stringify(formData, null, 2));

        // we submitted
        setSubmitted(state => !state);

        // no longer submitting
        setIsSubmitting(state => !state); //false again aka reset

        // reset form
        setFormData({
            _id: null,
            name: '',
            email: '',
            content: '',
            category: '',
            status: ''
        });

    }

    return (
        <>
            {submitted ? (
                <div>
                    <h2>Thank you for your feedback!</h2>
                    <button onClick={() => setSubmitted(state => !state)}>
                        Create New
                    </button>
                </div>
            ) :
                (
                    <form onSubmit={handleFormSubmit} className={styles['form']}>
                        <h2>Feedback Form</h2>
                        <div className={styles['form-field']}>
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Bobby"
                            />
                        </div>

                        <div>
                            <label htmlFor="name">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="Bobby@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="content">Content *</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                placeholder="Please share your feedback..."
                            />
                        </div>

                        <div>
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="status">Status *</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a status</option>
                                {statuses.map(status => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </form>
                )}
        </>
    )
}