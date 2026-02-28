'use client';

import { useState, useEffect } from 'react';

interface VideoDisplayProps {
  isCameraOn: boolean;
  isScreenSharing: boolean;
  doctorName: string;
  patientName: string;
}

export default function VideoDisplay({
  isCameraOn,
  isScreenSharing,
  doctorName,
  patientName,
}: VideoDisplayProps) {
  const [isDoctor, setIsDoctor] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 relative overflow-hidden">
      {/* Main Video Feed - Doctor */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-900/20 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl shadow-lg mb-4">
            👨‍⚕️
          </div>
          <p className="text-xl font-semibold text-white">{doctorName}</p>
          <p className="text-sm text-slate-300">Doctor • Online</p>
          {!isCameraOn && (
            <div className="mt-4 px-4 py-2 bg-slate-700/80 rounded-full">
              <p className="text-sm text-slate-300">Camera is off</p>
            </div>
          )}
        </div>
      </div>

      {/* Picture-in-Picture - Patient */}
      <div className="absolute bottom-4 right-4 w-40 h-32 bg-slate-800 rounded-xl border-2 border-slate-600 overflow-hidden shadow-xl">
        <div className="w-full h-full bg-gradient-to-br from-green-600/20 to-emerald-900/20 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg mb-2">
            🧑‍💼
          </div>
          <p className="text-xs font-medium text-white text-center">{patientName}</p>
          <p className="text-xs text-slate-400">Patient</p>
          {!isCameraOn && (
            <p className="text-xs text-slate-400 mt-1">Camera off</p>
          )}
        </div>
      </div>

      {/* Screen Sharing Overlay */}
      {isScreenSharing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-slate-700 rounded-2xl flex items-center justify-center border-2 border-slate-500">
              <svg
                className="w-16 h-16 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M5 20h.01"
                />
              </svg>
            </div>
            <p className="text-white font-semibold">Doctor is sharing screen</p>
          </div>
        </div>
      )}

      {/* Top Right Info */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700">
        <p className="text-sm text-white font-medium">Connection: Good</p>
        <p className="text-xs text-green-400">Secure • Encrypted</p>
      </div>

      {/* Top Left Status */}
      <div className="absolute top-4 left-4 flex gap-3">
        {!isCameraOn && (
          <div className="bg-red-500/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-red-200 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-white">Camera off</span>
          </div>
        )}
      </div>
    </div>
  );
}
