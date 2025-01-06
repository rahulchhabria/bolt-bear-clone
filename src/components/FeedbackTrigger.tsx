import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import { MessageSquare } from 'lucide-react';
import { FeedbackDialog } from './FeedbackDialog';

export function FeedbackTrigger() {
  const [showDialog, setShowDialog] = useState(false);
  const [eventId, setEventId] = useState<string | null>(null);

  const handleClick = () => {
    const id = Sentry.captureMessage("User initiated feedback");
    setEventId(id);
    setShowDialog(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-lg"
        aria-label="Give feedback"
      >
        <MessageSquare size={18} />
        <span>Give Feedback</span>
      </button>

      {showDialog && (
        <FeedbackDialog 
          eventId={eventId} 
          onClose={() => setShowDialog(false)} 
        />
      )}
    </>
  );
}