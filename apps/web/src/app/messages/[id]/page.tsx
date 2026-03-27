'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockMessages = [
  { id: '1', sender: 'them', text: 'Hi! I just applied for your loft listing. Looking forward to hearing back!', time: '10:32 AM' },
  { id: '2', sender: 'them', text: 'Just wanted to confirm — is the place available from April 1st?', time: '10:33 AM' },
  { id: '3', sender: 'me', text: 'Hi Jordan! Thanks for applying. Yes, it\'s available April 1st. I\'ll review your application today.', time: '10:45 AM' },
  { id: '4', sender: 'them', text: 'That\'s great! Is there a chance to schedule a viewing this weekend?', time: '10:47 AM' },
  { id: '5', sender: 'me', text: 'Absolutely! How about Saturday at 2pm?', time: '10:50 AM' },
  { id: '6', sender: 'them', text: 'Saturday at 2pm works perfectly. See you then! 🙌', time: '10:51 AM' },
];

export default function ConversationPage() {
  const [input, setInput] = useState('');
  const otherUser = { name: 'Jordan Lee', property: 'Modern Downtown Loft', initials: 'JL' };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 pt-28 flex flex-col" style={{ height: 'calc(100vh - 112px)' }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4" style={{ borderBottom: '1px solid var(--rc-border)' }}>
        <Link href="/messages" className="rc-btn-ghost px-2 py-1 text-sm">←</Link>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color: 'var(--rc-primary)' }}>{otherUser.initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--rc-text)' }}>{otherUser.name}</p>
          <p className="text-xs" style={{ color: 'var(--rc-muted)' }}>Re: {otherUser.property}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
              msg.sender === 'me'
                ? 'bg-blue-600 text-white rounded-br-md'
                : 'bg-gray-100 rounded-bl-md'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid var(--rc-border)' }}>
        <input
          className="rc-input flex-1"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) setInput(''); }}
        />
        <button className="rc-btn-primary px-5 py-3 text-sm">Send</button>
      </div>
    </div>
  );
}
