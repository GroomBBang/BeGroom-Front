import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://94f7889215c8cf4b6b14c50569872659@o4510673763172352.ingest.us.sentry.io/4510673763368960',

  tracesSampleRate: 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [Sentry.replayIntegration()],

  debug: false,
});
