import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/browser';
import { config } from './config';

export const initSentry = () => {
  const dsn = config.sentry.dsn;
  
  if (!dsn) {
    console.error('Sentry DSN not found');
    return;
  }

  Sentry.init({
    dsn,
    environment: config.sentry.environment,
    
    // Enable session tracking
    autoSessionTracking: true,
    
    // Performance monitoring
    integrations: [
      new BrowserTracing({
        tracePropagationTargets: ["localhost", /^https:\/\/your-site\.com/],
      }),
      new Sentry.Replay({
        // Capture 100% of sessions for testing
        sessionSampleRate: 1.0,
        // Capture 100% of sessions where an error occurs
        errorSampleRate: 1.0,
        // Configure session replay
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Performance sampling
    tracesSampleRate: 1.0,
    
    // Release tracking
    release: import.meta.env.VITE_COMMIT_SHA || 'development',
    
    // Enable debug in development
    debug: import.meta.env.DEV,
    
    beforeSend(event) {
      if (import.meta.env.DEV) {
        console.log('[Sentry] Event:', event);
      }
      return event;
    },
  });

  // Set user information if available
  const user = localStorage.getItem('user');
  if (user) {
    Sentry.setUser(JSON.parse(user));
  }
};