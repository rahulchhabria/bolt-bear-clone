import React from 'react';
import * as Sentry from '@sentry/react';
import { X } from 'lucide-react';

interface FeedbackDialogProps {
  eventId: string | null;
}

function FeedbackDialog({ eventId }: FeedbackDialogProps) {
  const [showDialog, setShowDialog] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [comments, setComments] = React.useState('');

  if (!showDialog || !eventId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Sentry.captureUserFeedback({
      event_id: eventId,
      name,
      email,
      comments,
    });
    setShowDialog(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Help Us Improve</h2>
          <button onClick={() => setShowDialog(false)} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">What happened?</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 h-32"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}