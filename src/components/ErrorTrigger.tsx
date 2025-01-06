import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { showToast } from '../utils/toast';

export function ErrorTrigger() {
  const triggerError = () => {
    showToast('Triggering synchronous error...');
    throw new Error('This is a test error for Sentry');
  };

  return (
    <button
      onClick={triggerError}
      className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg"
      aria-label="Trigger test error"
    >
      <AlertTriangle size={18} />
      <span>Trigger Error</span>
    </button>
  );
}