// Validate environment variables
export const config = {
  sentry: {
    dsn: 'https://e87d338979089335fdce730a44131875@o4506312335294464.ingest.us.sentry.io/4508589619806208',
    environment: import.meta.env.MODE || 'development',
  },
} as const;

// Validate Sentry configuration
export function validateSentryConfig() {
  const dsn = config.sentry.dsn;
  
  if (!dsn) {
    console.error('Sentry DSN is not configured.');
    return false;
  }

  // Basic DSN format validation
  try {
    const url = new URL(dsn);
    if (!url.hostname.includes('ingest.sentry.io')) {
      console.error('Invalid Sentry DSN format. Please check your DSN value.');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid Sentry DSN format. Please check your DSN value.');
    return false;
  }
}