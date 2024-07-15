import AgoraRTC from 'agora-rtc-react';

export const rctClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

// Set Agora Log level | 4 = stop
AgoraRTC.setLogLevel(4);

export const createScreenVideoTrack = () =>
  AgoraRTC.createScreenVideoTrack(
    {
      encoderConfig: '1080p_1',
      optimizationMode: 'detail'
    },
    'auto'
  );

export const agoraAppId = '5f6f68ae19b8442387168fdd8228f102';
export const agoraChannelName = 'owt2';
export const agoraTempToken =
  '007eJxTYDD+tFXk/Y/gfSFVn678Y9q6pkxny6sYvanaojv3MhzY2XxTgcE0zSzNzCIx1dAyycLExMjYwtzQzCItJcXCyMgizdDAaMLC7rSGQEaG12FsLIwMEAjiszDkl5cYMTAAAPWCIPA=';
