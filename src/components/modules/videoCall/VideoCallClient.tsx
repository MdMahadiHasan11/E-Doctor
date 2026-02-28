/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import type { IAgoraRTCClient } from "agora-rtc-react";
import {
  AgoraRTCProvider,
  useJoin,
  usePublish,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useRemoteUsers,
  LocalVideoTrack,
  RemoteUser,
} from "agora-rtc-react";
import io, { Socket } from "socket.io-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Phone, Video, Mic, Send, MicOff, VideoOff } from "lucide-react";
import { getVideoCall } from "@/services/video-call/video-call.service";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000";

interface Message {
  senderId: string;
  text: string;
  createdAt: string;
}

export default function VideoCall({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [rtcClient, setRtcClient] = useState<IAgoraRTCClient | null>(null);
  const [agoraData, setAgoraData] = useState<any>(null);
  const [inCall, setInCall] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* ==============================
     LOAD AGORA CLIENT (SSR SAFE)
  ============================== */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAgora = async () => {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

      const client = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });

      setRtcClient(client as unknown as IAgoraRTCClient);
    };

    loadAgora();
  }, []);

  /* ==============================
     FETCH TOKEN
  ============================== */
  useEffect(() => {
    if (!appointmentId) return;

    const fetchToken = async () => {
      try {
        const result = await getVideoCall(appointmentId);

        if (!result?.data?.token) {
          throw new Error("Invalid token response");
        }

        setAgoraData(result.data);
      } catch (err) {
        console.error(err);
        alert("Failed to connect to video call");
      }
    };

    fetchToken();
  }, [appointmentId]);

  /* ==============================
     SAFE JOIN (IMPORTANT FIX)
  ============================== */
  useEffect(() => {
    if (rtcClient && agoraData) {
      setInCall(true);
    }
  }, [rtcClient, agoraData]);

  /* ==============================
     SOCKET CHAT
  ============================== */
  useEffect(() => {
    if (!appointmentId) return;

    const newSocket = io(BACKEND_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);
    newSocket.emit("joinAppointment", appointmentId);

    newSocket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [appointmentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendChatMessage", {
      appointmentId,
      text: newMessage,
    });

    setMessages((prev) => [
      ...prev,
      {
        senderId: "me",
        text: newMessage,
        createdAt: new Date().toISOString(),
      },
    ]);

    setNewMessage("");
  };

  if (!rtcClient || !agoraData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white text-xl">
        Connecting to call...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <div className="flex-1 relative">
        <AgoraRTCProvider client={rtcClient}>
          <VideoContent
            rtcClient={rtcClient}
            token={agoraData.token}
            channelName={agoraData.channelName}
            uid={agoraData.uid}
            inCall={inCall}
            setInCall={setInCall}
          />
        </AgoraRTCProvider>
      </div>

      {/* Chat Panel */}
      <Card className="w-80 border-l border-gray-800 bg-gray-900 flex flex-col rounded-none">
        <div className="p-4 border-b border-gray-800 font-medium">
          Live Chat
        </div>

        <ScrollArea className="flex-1 p-4">
          {messages.map((msg, i) => (
            <div key={i} className="mb-4 flex justify-end">
              <div className="max-w-[80%] p-3 rounded-2xl bg-blue-600">
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-4 border-t border-gray-800 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="bg-gray-800 border-gray-700"
          />
          <Button size="icon" variant="ghost" onClick={sendMessage}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}


interface VideoContentProps {
  rtcClient: IAgoraRTCClient;
  token: string;
  channelName: string;
  uid: number;
  inCall: boolean;
  setInCall: (val: boolean) => void;
}

function VideoContent({
  rtcClient,
  token,
  channelName,
  uid,
  inCall,
  setInCall,
}: VideoContentProps) {
  useJoin(
    {
      appid: APP_ID,
      channel: channelName,
      token,
      uid,
    },
    inCall
  );

  const { localCameraTrack } = useLocalCameraTrack(inCall);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(inCall);

  usePublish(
    localCameraTrack && localMicrophoneTrack
      ? [localCameraTrack, localMicrophoneTrack]
      : [],
    inCall
  );

  const remoteUsers = useRemoteUsers();

  /* 🔥 Debug Listeners */
  useEffect(() => {
    rtcClient.on("connection-state-change", (state) => {
      console.log("Connection:", state);
    });

    rtcClient.on("user-joined", (user) => {
      console.log("User joined:", user.uid);
    });

    rtcClient.on("user-published", (user, mediaType) => {
      console.log("User published:", user.uid, mediaType);
    });

    return () => {
      rtcClient.removeAllListeners();
    };
  }, [rtcClient]);

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const toggleMic = async () => {
    if (!localMicrophoneTrack) return;
    await localMicrophoneTrack.setEnabled(!micOn);
    setMicOn(!micOn);
  };

  const toggleVideo = async () => {
    if (!localCameraTrack) return;
    await localCameraTrack.setEnabled(!videoOn);
    setVideoOn(!videoOn);
  };

  const handleEndCall = async () => {
    setInCall(false);

    if (localCameraTrack) {
      localCameraTrack.stop();
      localCameraTrack.close();
    }

    if (localMicrophoneTrack) {
      localMicrophoneTrack.stop();
      localMicrophoneTrack.close();
    }

    await rtcClient.leave();
  };

  return (
    <div className="relative h-full bg-black">
      <div className="grid grid-cols-2 gap-4 p-6">
        {remoteUsers.map((user) => (
          <div key={user.uid} className="rounded-xl overflow-hidden">
            <RemoteUser user={user} />
          </div>
        ))}
      </div>

      {localCameraTrack && inCall && videoOn && (
        <div className="absolute bottom-6 right-6 w-52 h-36 rounded-xl overflow-hidden border border-white/20">
          <LocalVideoTrack track={localCameraTrack} play />
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 bg-black/60 px-8 py-4 rounded-full">
        <Button size="icon" variant="ghost" onClick={toggleVideo}>
          {videoOn ? <Video /> : <VideoOff />}
        </Button>

        <Button size="icon" variant="ghost" onClick={toggleMic}>
          {micOn ? <Mic /> : <MicOff />}
        </Button>

        <Button size="icon" variant="destructive" onClick={handleEndCall}>
          <Phone className="h-6 w-6 rotate-135" />
        </Button>
      </div>
    </div>
  );
}