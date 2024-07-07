import { Suspense } from 'react';

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

import { Home, VideoRoom } from '@app-features/general/pages';
import { ErrorBoundary } from '@app-shared/components';
import { MainLayout } from '@app-containers/layouts';
import { VideoContextProvider } from '@app-shared/contexts';

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={<LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />}
      >
        <VideoContextProvider>
          <MainLayout />
        </VideoContextProvider>
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        )
      },
      {
        path: '/room/:roomName',
        element: <VideoRoom />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]);
