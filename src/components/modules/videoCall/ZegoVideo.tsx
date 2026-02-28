// src/components/modules/videoCall/ZegoVideo.tsx   (or VideoCallZego.tsx)

"use client";

import dynamic from "next/dynamic";

// Dynamic import + ssr: false is essential
const ZegoUIKitPrebuilt = dynamic(
  () =>
    import("@zegocloud/zego-uikit-prebuilt").then(
      (mod) => mod.ZegoUIKitPrebuilt,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          background: "#000",
          color: "#fff",
          display: "grid",
          placeItems: "center",
        }}
      >
        Loading video call...
      </div>
    ),
  },
);

interface VideoCallProps {
  token: string;
  roomID: string;
  userID: string;
  userName: string;
  appID?: number;
}

export default function VideoCallZego({
  token,
  roomID,
  userID,
  userName,
  appID: propAppID,
}: VideoCallProps) {
  const finalAppID =
    propAppID ?? Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID || "0");

  if (!finalAppID) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#000",
          color: "#ff4d4f",
          display: "grid",
          placeItems: "center",
        }}
      >
        ZEGOCLOUD App ID is missing
      </div>
    );
  }

  if (!token || !roomID || !userID) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#000",
          color: "#faad14",
          display: "grid",
          placeItems: "center",
        }}
      >
        Missing video call parameters
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ZegoUIKitPrebuilt
        appID={finalAppID}
        kitToken={token}
        userID={userID}
        userName={userName}
        roomID={roomID}
        config={{
          scenario: {
            mode: 1, // 1 = OneONoneCall
          },
          turnOnCameraWhenJoining: true,
          turnOnMicrophoneWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showScreenShareButton: true,
          showEndCallButton: true,
          showFullScreenButton: true,
        }}
      />
    </div>
  );
}
