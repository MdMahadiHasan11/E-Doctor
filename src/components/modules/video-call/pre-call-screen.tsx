'use client';

import { useState } from 'react';

interface PreCallScreenProps {
  doctorData: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    avatar: string;
  };
  onStartCall: () => void;
}

export default function PreCallScreen({ doctorData, onStartCall }: PreCallScreenProps) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCall = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStartCall();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">TelemediCare</h1>
          <p className="text-slate-400">Professional Medical Consultations</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Doctor Info */}
            <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-lg mx-auto">
                  {doctorData.avatar}
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">{doctorData.name}</h2>
                <p className="text-blue-400 font-medium mb-2">{doctorData.specialty}</p>
                <p className="text-slate-400 text-sm mb-3">{doctorData.experience}</p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(doctorData.rating) ? 'text-yellow-400' : 'text-slate-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-semibold">{doctorData.rating}</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-2">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-green-400 font-medium">Online & Available</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-blue-400 font-medium">Secure • Encrypted Connection</p>
                </div>
              </div>
            </div>

            {/* Call Setup */}
            <div className="p-8 flex flex-col justify-between bg-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Prepare for Call</h3>

                {/* Camera Preview */}
                <div className="mb-6 rounded-xl overflow-hidden border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-900">
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl shadow-lg mx-auto mb-3">
                        🧑‍💼
                      </div>
                      <p className="text-white font-medium">Your Camera</p>
                      <p className="text-slate-400 text-sm">{isCameraOn ? 'Camera is ON' : 'Camera is OFF'}</p>
                    </div>
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-3 mb-6">
                  {/* Camera Toggle */}
                  <div className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Camera</p>
                        <p className="text-xs text-slate-400">Built-in Camera</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsCameraOn(!isCameraOn)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        isCameraOn
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {isCameraOn ? 'On' : 'Off'}
                    </button>
                  </div>

                  {/* Microphone Toggle */}
                  <div className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm0-10c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 10c2.13 0 4 1.12 5 2.78V20c0 .55-.45 1-1 1s-1-.45-1-1v-2.22c-.9.66-1.98 1.07-3 1.07s-2.1-.41-3-1.07V20c0 .55-.45 1-1 1s-1-.45-1-1v-2.22C8 15.12 9.87 14 12 14z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Microphone</p>
                        <p className="text-xs text-slate-400">Built-in Microphone</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMicOn(!isMicOn)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        isMicOn
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {isMicOn ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Start Call Button */}
              <button
                onClick={handleStartCall}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Start Consultation
                  </>
                )}
              </button>

              {/* Info Text */}
              <p className="text-center text-xs text-slate-400 mt-4">
                By starting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
            <p className="text-xs text-slate-400">Encrypted</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
            <p className="text-xs text-slate-400">Available</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">HIPAA</div>
            <p className="text-xs text-slate-400">Compliant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
