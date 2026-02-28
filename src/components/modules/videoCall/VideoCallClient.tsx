// src/components/modules/videoCall/VideoCallClient.tsx
"use client"; // ← এটা অবশ্যই রাখো, top-এ

import AgoraRTC, {
  AgoraRTCProvider,
  useJoin,
  usePublish,
} from "agora-rtc-react"; // ← এটা agora-rtc-react থেকে import (sdk-ng bundled)
import { useEffect, useState } from "react";

interface VideoCallProps {
  token: string | null;
  channelName: string;
  uid: number | string;
  appId: string;
}

export default function VideoCallClient({
  token,
  channelName,
  uid,
  appId,
}: VideoCallProps) {
  const [client, setClient] = useState<ReturnType<
    typeof AgoraRTC.createClient
  > | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Client create + setup শুধু client-side-এ
  useEffect(() => {
    if (typeof window === "undefined") return; // extra safe (SSR skip)

    setIsMounted(true);

    const newClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(newClient);

    return () => {
      newClient.leave().catch((err) => console.error("Leave error:", err));
    };
  }, []);

  if (!isMounted || !client) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>ভিডিও কল লোড হচ্ছে... (browser-এ চেক করুন)</p>
      </div>
    );
  }

  return (
    <AgoraRTCProvider client={client}>
      <VideoCallContent
        token={token}
        channelName={channelName}
        uid={uid}
        appId={appId}
      />
    </AgoraRTCProvider>
  );
}

// Inner content – hooks এখানে ব্যবহার করো (AgoraRTCProvider-এর ভিতরে)
function VideoCallContent({ token, channelName, uid, appId }: VideoCallProps) {
  useJoin(
    {
      appid: appId,
      channel: channelName,
      token: token ?? undefined,
      uid,
    },
    true, // auto join
  );

  usePublish(["microphone", "camera"]);

  // পরে যোগ করো:
  // const localCam = useLocalCameraTrack();
  // const localMic = useLocalMicrophoneTrack();
  // const remoteUsers = useRemoteUsers();

  return (
    <div
      style={{
        height: "100vh",
        background: "#000",
        color: "white",
        position: "relative",
      }}
    >
      <p style={{ textAlign: "center", paddingTop: "40vh", fontSize: "24px" }}>
        ভিডিও কল চলছে... অন্য পার্টি যোগ দিলে দেখা যাবে
      </p>

      {/* এখানে তোমার full UI যোগ করো */}
      {/* উদাহরণ: <RemoteUser />, <LocalUser />, controls ইত্যাদি */}
    </div>
  );
}
