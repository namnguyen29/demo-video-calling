export const getUserMediaStream = (video: boolean, audio: boolean): Promise<MediaStream> =>
  navigator.mediaDevices.getUserMedia({
    video,
    audio
  });

export const getConnectedDevices = async (type: MediaDeviceKind): Promise<MediaDeviceInfo[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
};

export const createOffer = async (): Promise<{
  remoteStream: MediaStream;
  peerConnection: RTCPeerConnection;
}> => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
  });
  const remoteStream = new MediaStream();
  const offer = await peerConnection.createOffer();

  await peerConnection.setLocalDescription(offer);
  console.log('View Offer::', offer);

  return { remoteStream, peerConnection };
};
