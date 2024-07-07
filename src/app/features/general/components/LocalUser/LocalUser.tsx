import { ActionIcon, Badge } from '@mantine/core';
import {
  LocalUser as AgoraLocalUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack
} from 'agora-rtc-react';
import { IconMicrophone, IconMicrophoneOff } from '@tabler/icons-react';
import clsx from 'clsx';

import styles from './LocalUser.module.scss';

type Props = {
  audiotrack: IMicrophoneAudioTrack | null;
  videoTrack: ICameraVideoTrack | null;
  cameraOn: boolean;
  micOn: boolean;
};

export const LocalUser = ({ audiotrack, videoTrack, cameraOn, micOn }: Props) => {
  return (
    <div className={clsx(styles.localUserContainer)}>
      <AgoraLocalUser
        className={styles.defaultLocalUserStyle}
        audioTrack={audiotrack}
        videoTrack={videoTrack}
        cameraOn={cameraOn}
        micOn={micOn}
        cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
      >
        <div className={styles.localUserInfo}>
          <Badge color="cyan" radius="md" size="md" className={styles.userNameBadge}>
            You
          </Badge>
          <ActionIcon
            variant="outline"
            color="cyan"
            size="lg"
            radius="lg"
            aria-label="Settings"
            className={styles.micButton}
          >
            {micOn ? (
              <IconMicrophone style={{ width: '70%', height: '70%' }} stroke={1.5} />
            ) : (
              <IconMicrophoneOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
            )}
          </ActionIcon>
        </div>
      </AgoraLocalUser>
    </div>
  );
};
