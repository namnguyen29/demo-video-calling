import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { AgoraRTCProvider } from 'agora-rtc-react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { rootRouter } from './root.routes';
import { appTheme, appQueryClient, rctClient } from '@app-core/configs';

export const App = () => {
  return (
    <AgoraRTCProvider client={rctClient}>
      <QueryClientProvider client={appQueryClient}>
        <MantineProvider theme={appTheme}>
          <RouterProvider router={rootRouter} />
        </MantineProvider>
      </QueryClientProvider>
    </AgoraRTCProvider>
  );
};
