import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import styles from './FeedbackForm.module.css'
import { FEEDBACK_CATEGORIES, FEEDBACK_STATUSES, type FeedbackCategory, type FeedbackStatus } from "../../types/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import feedbackService from "../../services/feedbackService";
import FeedbackSubmissionSuccess from "./feedbackSubmission/FeedbackSubmission";
import { useNavigate } from "react-router-dom";

export interface FeedbackData {
  _id?: string | null;
  name: string;
  email: string;
  content: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
}

export interface FeedbackFormProps {
  savedData?: FeedbackData;
  isEditMode?: boolean;
  feedbackId?: string;
}

export default function FeedbackForm({
  savedData,
  isEditMode = false,
  feedbackId
}: FeedbackFormProps) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const categories = FEEDBACK_CATEGORIES;
  const statuses = FEEDBACK_STATUSES;
  const queryClient = useQueryClient();

  const feedbackMutation = useMutation({
    mutationFn: async (feedbackData: FeedbackData) => {
      if (isEditMode && feedbackId) {
        const response = await feedbackService.update({ ...feedbackData, _id: feedbackId });
        return response.data;
      } else {
        const response = await feedbackService.create(feedbackData);
        return response.data;
      }
    },
    onSuccess: () => {
      setSubmitted(state => !state);
      if (!isEditMode) {
        form.reset();
      }
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
    onError: (error) => {
      console.error('Error submitting feedback:', error);
    }
  })

  const form = useForm({
    defaultValues: {
      _id: null,
      name: savedData?.name || '',
      email: savedData?.email || '',
      content: savedData?.content || '',
      category: savedData?.category || '',
      status: savedData?.status || ''
    } as unknown as FeedbackData,
    onSubmit: async ({ value }) => {
      feedbackMutation.mutate(value);
    }
  })

  return (
    <>
      {submitted ? (
        <FeedbackSubmissionSuccess
          isEdit={!!savedData}
          onViewFeedback={() => navigate('/')}
          savedData={savedData}
        />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className={styles['form']}
        >
          {isEditMode ? <h2>Edit Feedback</h2> : <h2>Feedback Form</h2>}

          <form.Field name="name" validators={{
            onBlur: ({ value }) => {
              return value.trim() === '' ? 'Name is required' : undefined;
            }
          }}>
            {(field) => (
              <div className={styles['form-field']}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Bobby"
                  autoComplete="on"
                  disabled={isEditMode}
                />
                {!field.state.meta.isValid && (
                  <em className={styles['invalid']}>{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="email" validators={{
            onBlur: ({ value }) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (value.trim() === '') return 'Email is required';
              return !emailRegex.test(value) ? 'Please enter a valid email' : undefined
            }
          }}>
            {(field) => (
              <div className={styles['form-field']}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Bobby@example.com"
                  autoComplete="on"
                  disabled={isEditMode}
                />
                {!field.state.meta.isValid && (
                  <em className={styles['invalid']}>{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="content" validators={{
            onBlur: ({ value }) => {
              if (value.trim() === '') return 'Content is required';
            }
          }}>
            {(field) => (
              <div className={styles['form-field']}>
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                  placeholder="Please share your feedback..."
                  autoComplete="on"
                />
                {!field.state.meta.isValid && (
                  <em className={styles['invalid']}>{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="category" validators={{
            onBlur: ({ value }) => {
              if (value.trim() === '') return 'Category is required';
            }
          }}>
            {(field) => (
              <div className={styles['form-field']}>
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value as FeedbackCategory)}
                  disabled={isEditMode}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {!field.state.meta.isValid && (
                  <em className={styles['invalid']}>{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="status" validators={{
            onBlur: ({ value }) => {
              if (value.trim() === '') return 'Status is required';
            }
          }}>
            {(field) => (
              <div className={styles['form-field']}>
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value as FeedbackStatus)}
                >
                  <option value="">Select a status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {!field.state.meta.isValid && (
                  <em className={styles['invalid']}>{field.state.meta.errors.join(', ')}</em>
                )}
              </div>
            )}
          </form.Field>

          {feedbackMutation.isError && (
            <div className={styles['error']}>
              Failed to submit feedback. Please try again.
            </div>
          )}

          <button
            className={styles['form-btn']}
            disabled={feedbackMutation.isPending}
          >
            {feedbackMutation.isPending ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </>
  )
}