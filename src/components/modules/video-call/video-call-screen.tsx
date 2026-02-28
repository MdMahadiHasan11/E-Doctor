'use client';

import { useState, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

interface VideoCallScreenProps {
  zegoData: {
    token: string;
    roomID: string;
    userID: string;
    userName: string;
    expiresIn: number;
  };
  doctorData: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    avatar: string;
  };
  onEndCall: () => void;
}

export default function VideoCallScreen({ zegoData, doctorData, onEndCall }: VideoCallScreenProps) {
  const [callDuration, setCallDuration] = useState(0);

  // Optional: your custom timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Very important: Zego expects string userID & roomID
  const myUserID = zegoData.userID;
  const myUserName = zegoData.userName || "Patient";

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Your custom header */}
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold">{doctorData.name}</h2>
          <p className="text-sm text-slate-400">
            {doctorData.specialty} • {callDurationToString(callDuration)}
          </p>
        </div>
        <button
          onClick={onEndCall}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
        >
          End Call
        </button>
      </div>

      {/* Zego takes over the main area */}
      <div className="flex-1">
        <ZegoUIKitPrebuilt
          appID={481621082}           // ← from Zego dashboard
          serverSecret={"2f962ad3943d62ade41b914041a89b52"}   // ← only if using token login
          // or use token directly (recommended for security)
          // token: zegoData.token,

          user={{
            userID: myUserID,
            userName: myUserName,
          }}
          roomID={zegoData.roomID}

          // Very important config for 1:1 doctor-patient call
          config={{
            turnOnCameraWhenJoin: true,
            turnOnMicrophoneWhenJoin: true,
            showRoomTimer: true,           // shows duration
            showTextChat: true,            // built-in chat
            showScreenShare: true,
            showPinButton: false,          // usually not needed in 1:1
            showLeaveRoomConfirmDialog: false, // we handle it ourselves
            onLeaveRoom: () => {
              onEndCall();
            },

            // Optional: customize layout
            layout: "Auto", // or "PictureInPicture", "Sidebar"
            // You can also use custom layout if needed later
          }}

          // Optional styling
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}

function callDurationToString(seconds: number): string {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}