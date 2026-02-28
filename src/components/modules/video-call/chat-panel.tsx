'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  senderName: string;
  content: string;
  // timestamp: Date;
}

interface ChatPanelProps {
  doctorName: string;
  patientName: string;
}

export default function ChatPanel({ doctorName, patientName }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'doctor',
      senderName: doctorName,
      content: 'Hello! How are you feeling today?',
      // timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '2',
      sender: 'patient',
      senderName: patientName,
      content: 'Good, thank you for asking. I have been experiencing some headaches.',
      // timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '3',
      sender: 'doctor',
      senderName: doctorName,
      content: 'When did the headaches start?',
      // timestamp: new Date(Date.now() - 30000),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: String(Date.now()),
      sender: 'patient',
      senderName: patientName,
      content: inputValue,
      // timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/50">
        <p className="text-sm font-semibold text-white">Chat</p>
        <p className="text-xs text-slate-400">Session messages</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-800/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'doctor' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.sender === 'doctor'
                  ? 'bg-slate-600 text-slate-100'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p className="text-xs font-medium mb-1 opacity-75">{message.senderName}</p>
              <p className="text-sm break-words">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'doctor' ? 'text-slate-400' : 'text-blue-200'
                }`}
              >
                {/* {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })} */}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-slate-700 bg-slate-800/50">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type message..."
            className="flex-1 bg-slate-700 text-white text-sm px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors font-medium text-sm flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
