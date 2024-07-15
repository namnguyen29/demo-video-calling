import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import { AgoraForm } from '@app-features/general/components';
import { usePublish } from '@app-shared/hooks';

export const Home = () => {
  const { localStream, remoteStream } = usePublish();
  const localRef = useRef<HTMLVideoElement | null>(null);
  const remoteRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    console.log({ localStream, remoteStream });
    if (localRef.current && localStream) localRef.current.srcObject = localStream;
    if (remoteRef.current && remoteStream) remoteRef.current.srcObject = remoteStream;
  }, [localStream, remoteStream]);

  return (
    <article
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'flex-row',
        'flex-wrap',
        'px-4',
        'h-[calc(100dvh-70px)]',
        'gap-3'
      )}
    >
      <AgoraForm />

      <div>
        <video className="w-85 border h20" ref={localRef} id="user-1"></video>
        <video className="w-85 border h20" ref={remoteRef} id="user-2"></video>
      </div>
    </article>
  );
};
