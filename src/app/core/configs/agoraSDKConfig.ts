import AgoraRTC from 'agora-rtc-react';

export const rctClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

export const createScreenVideoTrack = () =>
  AgoraRTC.createScreenVideoTrack(
    {
      encoderConfig: '1080p_1',
      optimizationMode: 'detail'
    },
    'auto'
  );
