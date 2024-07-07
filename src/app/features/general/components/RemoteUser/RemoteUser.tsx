// import { useState } from 'react';

import { RemoteUser as AgoraRemoteUser, IAgoraRTCRemoteUser } from 'agora-rtc-react';
import {
  ActionIcon,
  Badge
  // Menu, MenuDropdown, rem
} from '@mantine/core';
import {
  IconMicrophone,
  IconMicrophoneOff

  // IconDotsVertical
} from '@tabler/icons-react';

import styles from './RemoteUser.module.scss';

type Props = {
  user?: IAgoraRTCRemoteUser;
  expandUser?: () => void;
  toggleRemoteMicro?: () => void;
};

export const RemoteUser = ({
  user,
  // toggleRemoteMicro,
  expandUser
}: Props) => {
  // const [isShowSetting, setIsShowSetting] = useState(false);

  return (
    <div className={styles.remoteUserContainer} onClick={expandUser}>
      {/* Settings */}
      {/* <div className={styles.remoteSetting}>
        <Menu shadow="md" opened={isShowSetting} onChange={setIsShowSetting}>
          <Menu.Target>
            <ActionIcon variant="light" color="cyan" size="md" radius="lg" aria-label="Settings">
              <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <MenuDropdown>
            <Menu.Item
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                toggleRemoteMicro();
              }}
              leftSection={<IconMicrophoneOff style={{ width: rem(14), height: rem(14) }} />}
            >
              Mute audio
            </Menu.Item>
          </MenuDropdown>
        </Menu>
      </div> */}

      <AgoraRemoteUser
        className={styles.remoteUserStyle}
        cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
        user={user}
      >
        <div className={styles.remoteUserInfo}>
          <Badge color="cyan" radius="md" size="md" className={styles.userNameBadge}>
            {user?.uid}
          </Badge>
          <ActionIcon variant="outline" color="cyan" size="md" radius="lg" aria-label="Settings">
            {user?.hasAudio ? (
              <IconMicrophone style={{ width: '70%', height: '70%' }} stroke={1.5} />
            ) : (
              <IconMicrophoneOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
            )}
          </ActionIcon>
        </div>
      </AgoraRemoteUser>
    </div>
  );
};
