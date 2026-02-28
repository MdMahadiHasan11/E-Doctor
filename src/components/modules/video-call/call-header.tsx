'use client';

import { useEffect, useState } from 'react';

interface CallHeaderProps {
  doctorData: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    avatar: string;
  };
  callDuration: number;
}

export default function CallHeader({ doctorData, callDuration }: CallHeaderProps) {
  const [duration, setDuration] = useState('00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = Math.floor((now.getTime() - new Date().getTime() + callDuration * 1000) / 3600000);
      const minutes = Math.floor((now.getTime() - new Date().getTime() + callDuration * 1000) / 60000) % 60;
      const seconds = Math.floor((now.getTime() - new Date().getTime() + callDuration * 1000) / 1000) % 60;
      
      setDuration(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [callDuration]);

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
      {/* Doctor Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg">
          {doctorData.avatar}
        </div>
        <div>
          <p className="font-semibold text-white">{doctorData.name}</p>
          <p className="text-xs text-slate-400">{doctorData.specialty} • {doctorData.experience}</p>
        </div>
        <div className="ml-2 flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium text-white">{doctorData.rating}</span>
        </div>
      </div>

      {/* Call Duration */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="font-mono text-sm text-white">{duration}</span>
        </div>

        {/* Call Status */}
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
          <svg className="w-4 h-4 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
          </svg>
          <span className="text-xs font-medium text-green-400">Connected</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
          title="More options"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
        <button
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
          title="Minimize"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
