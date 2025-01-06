import * as Sentry from '@sentry/react';

interface FeedbackData {
  eventId: string;
  name: string;
  email: string;
  comments: string;
}

export function useFeedback() {
  const submitFeedback = async (data: FeedbackData) => {
    try {
      // Add user context
      Sentry.setUser({
        email: data.email,
        username: data.name
      });

      // Submit user feedback
      Sentry.captureUserFeedback({
        event_id: data.eventId,
        name: data.name,
        email: data.email,
        comments: data.comments,
      });

      // Add breadcrumb for feedback submission
      Sentry.addBreadcrumb({
        category: 'feedback',
        message: 'User feedback submitted',
        level: 'info',
      });

      if (import.meta.env.DEV) {
        console.log('Feedback submitted successfully');
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      throw error;
    }
  };

  return { submitFeedback };
}