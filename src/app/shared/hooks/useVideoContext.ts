import { useContext } from 'react';

import { VideoContext } from '@app-shared/contexts';

export const useVideoContext = () => {
  const { roomData, setRoomData } = useContext(VideoContext);

  return {
    roomData,
    setRoomData
  };
};
