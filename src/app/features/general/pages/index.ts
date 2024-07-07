import { lazy } from 'react';

export const Home = lazy(() => import('./Home/Home').then(({ Home }) => ({ default: Home })));
export const VideoRoom = lazy(() =>
  import('./VideoRoom/VideoRoom').then(({ VideoRoom }) => ({ default: VideoRoom }))
);
