import { Dispatch, ReactNode, createContext, useState, SetStateAction } from 'react';

import { RoomDataType } from '@app-shared/types';

type ContextProps = {
  roomData: RoomDataType;
  setRoomData: Dispatch<SetStateAction<RoomDataType>>;
};

export const VideoContext = createContext<ContextProps>({
  roomData: {
    appId: '',
    token: '',
    channel: '',
    calling: false
  },
  setRoomData: () => {}
});

export const VideoContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomData, setRoomData] = useState<RoomDataType>({
    appId: '',
    token: '',
    channel: '',
    calling: false
  });

  return (
    <VideoContext.Provider
      value={{
        roomData,
        setRoomData
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
