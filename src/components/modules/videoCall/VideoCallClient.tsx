"use client";

import { useEffect, useRef } from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";

const APP_ID ="465e9790be814e88ab6cc03fbfcd4557";

export default function VideoCallClient({
  token,
  channelName,
  uid,
}: {
  token: string;
  channelName: string;
  uid: number;
}) {
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  useEffect(() => {
    const init = async () => {
      const client = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });

      clientRef.current = client;

      await client.join(APP_ID, channelName, token, uid);

      const [micTrack, camTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks();

      await client.publish([micTrack, camTrack]);

      camTrack.play("local-player");

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          user.videoTrack?.play("remote-player");
        }

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });
    };

    init();

    return () => {
      clientRef.current?.leave();
    };
  }, [token, channelName, uid]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <h3>Local</h3>
        <div id="local-player" style={{ width: 400, height: 300 }} />
      </div>

      <div>
        <h3>Remote</h3>
        <div id="remote-player" style={{ width: 400, height: 300 }} />
      </div>
    </div>
  );
}