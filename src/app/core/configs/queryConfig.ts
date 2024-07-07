import { QueryClient } from '@tanstack/react-query';

import { API_REFETCH_TIME } from '@app-shared/constants';

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_REFETCH_TIME,
      refetchInterval: API_REFETCH_TIME,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});
