/* eslint-disable react-hooks/exhaustive-deps */
// No need to implement useCallback when upgrading to React 19
import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getUserMediaStream } from '@app-shared/apis';
import { environment } from '@app-environments/environment';

export const usePublish = () => {
  const localStreamData = useQuery({
    queryKey: ['mediaStream'],
    queryFn: () => getUserMediaStream(false, true) // TODO: video should be true
  });
  const localStream = localStreamData.data;
  const peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: environment.stunServerUrls }]
  });
  const remoteStream = new MediaStream();
  localStream?.getTracks().forEach((track) => peerConnection.addTrack(track));

  const handleOntrack = (event: RTCTrackEvent): void => {
    console.log('ontrack event::', event);
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  const handleSelectIceCandidate = (event: RTCPeerConnectionIceEvent): void => {
    console.log('new  ICE candidate::', event);
  };

  const createPeerOffer = async (): Promise<void> => {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    peerConnection.addEventListener('track', handleOntrack);
    peerConnection.addEventListener('icecandidate', handleSelectIceCandidate);
    createPeerOffer();

    return () => {
      peerConnection.removeEventListener('track', handleOntrack);
      peerConnection.removeEventListener('icecandidate', handleSelectIceCandidate);
    };
  }, [handleOntrack, createPeerOffer, peerConnection]);

  return {
    localStream: localStreamData.data,
    remoteStream
  };
};
