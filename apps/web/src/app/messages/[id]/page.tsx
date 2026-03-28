'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const initialMessages = [
  { id: '1', sender: 'them', text: 'Hi! I just applied for your loft listing. Looking forward to hearing back!', time: '10:32 AM' },
  { id: '2', sender: 'them', text: 'Just wanted to confirm — is the place available from April 1st?', time: '10:33 AM' },
  { id: '3', sender: 'me', text: "Hi Jordan! Thanks for applying. Yes, it's available April 1st. I'll review your application today.", time: '10:45 AM' },
  { id: '4', sender: 'them', text: "That's great! Is there a chance to schedule a viewing this weekend?", time: '10:47 AM' },
  { id: '5', sender: 'me', text: 'Absolutely! How about Saturday at 2pm?', time: '10:50 AM' },
  { id: '6', sender: 'them', text: 'Saturday at 2pm works perfectly. See you then! 🙌', time: '10:51 AM' },
];

export default function ConversationPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const otherUser = { name: 'Jordan Lee', property: 'Modern Downtown Loft', initials: 'JL', color: '#007AFF' };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'me', text: input.trim(), time: 'Now' },
    ]);
    setInput('');
  };

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100dvh',
        background: 'var(--ios-grouped-bg)',
        paddingTop: 'var(--ios-nav)',
      }}
    >
      {/* iOS Nav bar for conversation */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center glass-card"
        style={{
          height: 'var(--ios-nav)',
          borderBottom: '0.5px solid var(--ios-sep)',
        }}
      >
        <div className="flex items-center w-full px-2">
          <Link
            href="/messages"
            className="ios-btn-text flex items-center gap-1 flex-shrink-0"
            style={{ minWidth: 44, minHeight: 44, fontSize: 17 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* Centered header (iOS convention) */}
          <div className="flex-1 flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-0.5"
              style={{ background: otherUser.color }}
            >
              {otherUser.initials}
            </div>
            <p className="ios-headline" style={{ fontSize: 12, lineHeight: 1 }}>{otherUser.name}</p>
          </div>

          <button
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
            style={{ color: 'var(--ios-blue)', minWidth: 44 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
              <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {/* Property context banner */}
        <div
          className="text-center mb-3"
          style={{ color: 'var(--ios-label3)', fontSize: 12, letterSpacing: '-0.006em' }}
        >
          <div
            className="inline-block px-3 py-1 rounded-full"
            style={{ background: 'var(--ios-fill3)', fontSize: 11 }}
          >
            Re: {otherUser.property}
          </div>
        </div>

        {messages.map((msg, i) => {
          const isMe = msg.sender === 'me';
          const prevMsg = messages[i - 1];
          const showAvatar = !isMe && (!prevMsg || prevMsg.sender === 'me');

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
              style={{ marginBottom: i < messages.length - 1 && messages[i + 1]?.sender !== msg.sender ? 8 : 2 }}
            >
              {/* Avatar for "them" */}
              {!isMe && (
                <div style={{ width: 28, flexShrink: 0 }}>
                  {showAvatar && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: otherUser.color }}
                    >
                      {otherUser.initials}
                    </div>
                  )}
                </div>
              )}

              <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`} style={{ maxWidth: '78%' }}>
                <div className={isMe ? 'ios-bubble-me' : 'ios-bubble-them'}>
                  {msg.text}
                </div>
                {(i === messages.length - 1 || messages[i + 1]?.sender !== msg.sender) && (
                  <p
                    className="ios-bubble-time px-1"
                    style={{ color: 'var(--ios-label3)' }}
                  >
                    {msg.time}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* iOS-style input bar */}
      <div
        style={{
          background: 'var(--ios-glass-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '0.5px solid var(--ios-sep)',
          padding: '8px 16px',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex items-end gap-2 max-w-[640px] mx-auto">
          <div
            className="flex-1 flex items-end gap-2"
            style={{
              background: 'var(--ios-grouped-bg2)',
              borderRadius: 20,
              border: '1px solid var(--ios-sep)',
              padding: '8px 14px',
              minHeight: 36,
            }}
          >
            <textarea
              className="flex-1 bg-transparent border-none outline-none resize-none"
              style={{
                fontSize: 17,
                letterSpacing: '-0.022em',
                color: 'var(--ios-label)',
                lineHeight: 1.35,
                maxHeight: 100,
                minHeight: 22,
                fontFamily: 'inherit',
              }}
              placeholder="iMessage"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
              rows={1}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: input.trim() ? 'var(--ios-blue)' : 'var(--ios-fill3)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              flexShrink: 0,
              transition: 'background 0.15s ease',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M12 20V4m0 0l-6 6m6-6l6 6" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
