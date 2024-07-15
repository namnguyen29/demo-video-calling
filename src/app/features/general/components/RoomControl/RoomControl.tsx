import { ActionIcon } from '@mantine/core';
import {
  IconCamera,
  IconCameraOff,
  IconMicrophoneOff,
  IconPhoneOff,
  IconMicrophone,
  IconScreenShare,
  IconScreenShareOff
} from '@tabler/icons-react';

import styles from './RoomControl.module.scss';

type Props = Readonly<{
  isCameraOpen: boolean;
  isScreenSharing: boolean;
  isMicrophoneOpen: boolean;
  toggleMicrophone: () => void;
  toggleCamera: () => void;
  leaveRoom: () => void;
  shareScreeen: () => void;
  stopShareScreen: () => void;
}>;

export const RoomControl = ({
  isCameraOpen,
  isMicrophoneOpen,
  isScreenSharing,
  toggleCamera,
  toggleMicrophone,
  leaveRoom,
  shareScreeen,
  stopShareScreen
}: Props) => {
  return (
    <div className={styles.roomControlContainer}>
      <ActionIcon
        variant="filled"
        color="cyan"
        size="xl"
        radius="lg"
        aria-label="Settings"
        onClick={toggleCamera}
      >
        {isCameraOpen ? (
          <IconCamera style={{ width: '70%', height: '70%' }} stroke={1.5} />
        ) : (
          <IconCameraOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
        )}
      </ActionIcon>
      <ActionIcon
        variant="filled"
        color="cyan"
        size="xl"
        radius="lg"
        aria-label="Settings"
        onClick={toggleMicrophone}
      >
        {isMicrophoneOpen ? (
          <IconMicrophone style={{ width: '70%', height: '70%' }} stroke={1.5} />
        ) : (
          <IconMicrophoneOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
        )}
      </ActionIcon>
      <ActionIcon variant="filled" color="cyan" size="xl" radius="lg" aria-label="Settings">
        {isScreenSharing ? (
          <IconScreenShareOff
            title="Stop Sharing"
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
            onClick={stopShareScreen}
          />
        ) : (
          <IconScreenShare
            title="Start Sharing"
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
            onClick={shareScreeen}
          />
        )}
      </ActionIcon>
      <ActionIcon
        variant="filled"
        color="red"
        size="xl"
        radius="lg"
        aria-label="Settings"
        onClick={leaveRoom}
      >
        <IconPhoneOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </div>
  );
};
