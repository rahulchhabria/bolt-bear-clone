import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { initSentry } from './utils/sentry';
import { FeedbackDialog } from './components/FeedbackDialog';
import App from './App';
import './index.css';

// Initialize Sentry before rendering
initSentry();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Sentry.ErrorBoundary 
      fallback={({ error, eventId }) => (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reload page
          </button>
          <FeedbackDialog eventId={eventId} />
        </div>
      )}
    >
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);