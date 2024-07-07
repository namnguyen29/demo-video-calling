import { ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-react';

export type ScreenVideoTrackType = ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
