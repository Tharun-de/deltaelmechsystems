import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        // Don't send events in development
        if (import.meta.env.DEV) {
          console.warn('Sentry event in development:', event);
          return null;
        }
        return event;
      },
    });
  }
};

export const captureError = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.DEV) {
    console.error('Error captured:', error, context);
  } else {
    Sentry.captureException(error, {
      extra: context,
    });
  }
};

export const setUserContext = (user: { id: string; email: string; role?: string }) => {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    role: user.role,
  });
};

export const clearUserContext = () => {
  Sentry.setUser(null);
}; 