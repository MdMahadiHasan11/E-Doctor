/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PreCallScreen from '@/components/modules/video-call/pre-call-screen';
import VideoCallScreen from '@/components/modules/video-call/video-call-screen';
import { useState, useEffect } from 'react';


const doctorData = {
  id: 'doctor-001',
  name: 'Dr. Sarah Mitchell',
  specialty: 'General Practitioner',
  experience: '8 years',
  rating: 4.9,
  avatar: '👨‍⚕️',
};

export default function VideoCallHome({mockZegoData}: any) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
console.log({mockZegoData});
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      {!isCallActive ? (
        <PreCallScreen
          doctorData={doctorData}
          onStartCall={() => setIsCallActive(true)}
        />
      ) : (
        <VideoCallScreen
          zegoData={mockZegoData}
          doctorData={doctorData}
          onEndCall={() => setIsCallActive(false)}
        />
      )}
    </div>
  );
}
