import { useCallback, useEffect, useRef, useState } from 'react';

import {
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers
} from 'agora-rtc-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './VideoRoom.module.scss';
import { LocalUser, RemoteUser, RoomControl } from '@app-features/general/components';
import { LocalStorageKey } from '@app-shared/enums';
import { RoomDataType, ScreenVideoTrackType } from '@app-shared/types';
import { createScreenVideoTrack, rctClient } from '@app-core/configs';
import { UserLayout } from '@app-features/general/layouts';
import { localCameraDefaultSettings } from '@app-shared/constants';

export const VideoRoom = () => {
  const [microphone, setMicrophone] = useState(true);
  const [camera, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(microphone, {
    ANS: true,
    AEC: true,
    AGC: false
  });
  const { localCameraTrack } = useLocalCameraTrack(camera, localCameraDefaultSettings);
  const roomDataString = localStorage.getItem(LocalStorageKey.SUBMITTED_DATA);
  const roomDataObject: RoomDataType = JSON.parse(roomDataString ?? '{}');
  const { appId, channel, token, calling } = roomDataObject;
  const navigate = useNavigate();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Join room
  useJoin({ appid: appId, channel, token: token ?? null }, calling);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  const toggleCamera = () => setCamera((cam) => !cam);
  const toggleMicrophone = () => setMicrophone((mic) => !mic);
  const leaveRoom = (): void => {
    navigate('/');
    setMicrophone(false);
    setCamera(false);
    handleStopShareScreen();
    localStorage.removeItem(LocalStorageKey.SUBMITTED_DATA);
  };

  useEffect(() => {
    if (!appId || !token) {
      navigate('/');
    }
  }, [appId, navigate, token]);

  audioTracks.forEach((audio) => {
    audio.play();
  });

  // Share window
  const shareScreenRef = useRef<HTMLDivElement | null>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [shareScreenTracks, setShareScreenTracks] = useState<ScreenVideoTrackType | null>(null);

  const handleStopShareScreen = useCallback(async () => {
    setIsScreenSharing(false);
    setCamera(true);

    if (Array.isArray(shareScreenTracks)) {
      shareScreenTracks[0].close();
      shareScreenTracks[1].close();
    } else {
      shareScreenTracks?.close();
    }

    if (shareScreenTracks) await rctClient.unpublish(shareScreenTracks);

    if (localCameraTrack) {
      await rctClient.publish([localCameraTrack]);
    }
  }, [localCameraTrack, shareScreenTracks]);

  const shareScreen = async (): Promise<void> => {
    const screenTrackresults = await createScreenVideoTrack();
    setShareScreenTracks(screenTrackresults);

    if (localCameraTrack) {
      await rctClient.unpublish([localCameraTrack]);
    }

    if (Array.isArray(screenTrackresults)) {
      screenTrackresults[0].play(shareScreenRef.current as HTMLDivElement);
    } else {
      screenTrackresults.play(shareScreenRef.current as HTMLDivElement);
    }

    await rctClient.publish(screenTrackresults);
    setIsScreenSharing(true);
  };

  useEffect(() => {
    if (Array.isArray(shareScreenTracks)) {
      shareScreenTracks[0].on('track-ended', handleStopShareScreen);
      shareScreenTracks[1].on('track-ended', handleStopShareScreen);
    } else {
      shareScreenTracks?.on('track-ended', handleStopShareScreen);
    }

    return () => {
      if (Array.isArray(shareScreenTracks)) {
        shareScreenTracks[0].off('track-ended', handleStopShareScreen);
        shareScreenTracks[1].off('track-ended', handleStopShareScreen);
      } else {
        shareScreenTracks?.off('track-ended', handleStopShareScreen);
      }
    };
  }, [handleStopShareScreen, shareScreenTracks]);

  // Expand user
  // const [expandScreen, setExpandScreen] = useState(false);

  return (
    <article className={clsx(styles.roomContainer)}>
      <div
        // onClick={() => setExpandScreen(false)}
        className={clsx(isScreenSharing ? styles.dBlock : styles.dNone)}
        ref={shareScreenRef}
      ></div>

      {/* User Layout */}
      <UserLayout
        localUser={
          <LocalUser
            audiotrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={camera}
            micOn={microphone}
          />
        }
        remoteUsers={remoteUsers.map((user, index) => (
          <RemoteUser key={`${user.uid}-${index}`} user={user} />
        ))}
      />

      <section className={styles.roomControlWrapper}>
        <RoomControl
          isCameraOpen={camera}
          isScreenSharing={isScreenSharing}
          isMicrophoneOpen={microphone}
          shareScreeen={shareScreen}
          stopShareScreen={handleStopShareScreen}
          toggleMicrophone={toggleMicrophone}
          toggleCamera={toggleCamera}
          leaveRoom={leaveRoom}
        />
      </section>
    </article>
  );
};
