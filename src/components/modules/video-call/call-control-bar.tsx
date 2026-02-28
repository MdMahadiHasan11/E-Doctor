'use client';

interface CallControlBarProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  isChatOpen: boolean;
  onMicToggle: () => void;
  onCameraToggle: () => void;
  onScreenShareToggle: () => void;
  onChatToggle: () => void;
  onEndCall: () => void;
}

export default function CallControlBar({
  isMicOn,
  isCameraOn,
  isScreenSharing,
  isChatOpen,
  onMicToggle,
  onCameraToggle,
  onScreenShareToggle,
  onChatToggle,
  onEndCall,
}: CallControlBarProps) {
  return (
    <div className="bg-slate-800 border-t border-slate-700 px-4 py-4">
      <div className="flex items-center justify-center gap-4">
        {/* Microphone */}
        <button
          onClick={onMicToggle}
          className={`p-3 rounded-full transition-all ${
            isMicOn
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          }`}
          title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
        >
          {isMicOn ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm0-10c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 10c2.13 0 4 1.12 5 2.78V20c0 .55-.45 1-1 1s-1-.45-1-1v-2.22c-.9.66-1.98 1.07-3 1.07s-2.1-.41-3-1.07V20c0 .55-.45 1-1 1s-1-.45-1-1v-2.22C8 15.12 9.87 14 12 14z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 5.23 11.08 5 12 5c3.04 0 5.64 2.05 6.32 4.84l2.03-2.03c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-15.59 15.59c-.29.29-.77.29-1.06 0-.29-.29-.29-.77 0-1.06l1.46-1.46C4.46 15.13 4 13.64 4 12c0-1.48.43-2.85 1.17-4.01L2.71 5.86C1.78 7.55 1.29 9.5 1.29 11.56c0 5.68 4.4 10.32 9.91 10.36 1.49.03 2.93-.2 4.3-.67l2.5 2.5c.34.34.77.51 1.24.51.47 0 .9-.17 1.24-.51.68-.68.68-1.79 0-2.47L19.35 10.04zM12 17c-2.76 0-5-2.24-5-5 0-1.36.54-2.59 1.41-3.49l7.08 7.08C14.59 16.46 13.36 17 12 17z" />
            </svg>
          )}
        </button>

        {/* Camera */}
        <button
          onClick={onCameraToggle}
          className={`p-3 rounded-full transition-all ${
            isCameraOn
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          }`}
          title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
        >
          {isCameraOn ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zm-11 6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
          )}
        </button>

        {/* Screen Share */}
        <button
          onClick={onScreenShareToggle}
          className={`p-3 rounded-full transition-all ${
            isScreenSharing
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14l4 4V5c0-1.1-.9-2-2-2zm-2 12h-4v4h-4v-4H4V5h14v10z" />
          </svg>
        </button>

        {/* Chat */}
        <button
          onClick={onChatToggle}
          className={`p-3 rounded-full transition-all ${
            isChatOpen
              ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
          title={isChatOpen ? 'Close chat' : 'Open chat'}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm6-6H6v2h14V8z" />
          </svg>
        </button>

        {/* Settings */}
        <button
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-all"
          title="Settings"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.09-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.1.62l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.12-.62l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        </button>

        <div className="w-px h-8 bg-slate-700 mx-2"></div>

        {/* End Call */}
        <button
          onClick={onEndCall}
          className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all font-medium text-sm flex items-center gap-2"
          title="End call"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          End Call
        </button>
      </div>
    </div>
  );
}
