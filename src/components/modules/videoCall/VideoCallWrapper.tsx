// src/components/VideoCallWrapper.tsx   ← new file

"use client";

import VideoCallZego from "@/components/modules/videoCall/ZegoVideo";

interface WrapperProps {
  token: string;
  roomID: string;
  userID: string;
  userName: string;
  appID?: number;
}

export default function VideoCallWrapper({
  token,
  roomID,
  userID,
  userName,
  appID,
}: WrapperProps) {
  return (
    <VideoCallZego
      token={token}
      roomID={roomID}
      userID={userID}
      userName={userName}
      appID={appID}
    />
  );
}
