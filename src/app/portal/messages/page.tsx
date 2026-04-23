'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Conversation, Message } from '@/lib/supabase';

export default function MessagesPage() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async (convId: string) => {
    const res = await fetch(`/api/messages?conversationId=${convId}`);
    if (res.ok) setMessages(await res.json());
  }, []);

  useEffect(() => {
    async function init() {
      const res = await fetch('/api/conversations', { method: 'POST' });
      if (!res.ok) return;
      const conv: Conversation = await res.json();
      setConversation(conv);
      await fetchMessages(conv.id);
      setLoading(false);
    }
    init();
  }, [fetchMessages]);

  useEffect(() => {
    if (!conversation) return;
    const interval = setInterval(() => fetchMessages(conversation.id), 3000);
    return () => clearInterval(interval);
  }, [conversation, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || !conversation || sending) return;
    setSending(true);
    const content = input.trim();
    setInput('');
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conversation.id, content }),
    });
    if (res.ok) {
      const msg: Message = await res.json();
      setMessages((prev) => [...prev, msg]);
    }
    setSending(false);
  }

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="flex h-full gap-4" style={{ minHeight: '72vh' }}>

      {/* Conversation list */}
      <aside className="w-[240px] shrink-0 rounded-2xl border border-[#2a2d36] bg-[#0d0f12] p-3">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#3d4352]">
          Conversations
        </p>
        <button
          className="w-full rounded-xl bg-[#1c1f26] px-4 py-4 text-left transition hover:bg-[#22252e]"
        >
          <p className="text-sm font-semibold text-[#f5f5f3]">Caelus AI Team</p>
          <p className="mt-1 truncate text-xs text-[#7a8194]">
            {loading
              ? 'Loading...'
              : lastMessage
              ? lastMessage.content
              : 'No messages yet'}
          </p>
        </button>
      </aside>

      {/* Message thread */}
      <section className="flex flex-1 flex-col rounded-2xl border border-[#2a2d36] bg-[#0d0f12]">

        {/* Thread header */}
        <div className="border-b border-[#1e2128] px-6 py-4">
          <p className="text-sm font-semibold text-[#f5f5f3]">Caelus AI Team</p>
          <p className="text-xs text-[#3d4352]">Your support channel</p>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-5">
          {loading && (
            <p className="text-xs text-[#3d4352]">Loading...</p>
          )}
          {!loading && messages.length === 0 && (
            <div className="max-w-[70%] rounded-2xl bg-[#1c1f26] px-5 py-4">
              <p className="mb-1 text-xs font-semibold text-[#c8ff3e]">Caelus AI Team</p>
              <p className="text-sm leading-7 text-[#f5f5f3]">
                Welcome to your client portal. Send us a message and we'll respond within one business day.
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'client' ? 'items-end' : 'items-start'}`}
            >
              <p className="mb-1 px-1 text-xs text-[#3d4352]">
                {msg.role === 'client' ? 'You' : msg.sender_name}
              </p>
              <div
                className={`max-w-[70%] rounded-2xl px-5 py-4 text-sm leading-7 ${
                  msg.role === 'client'
                    ? 'bg-[#c8ff3e] text-[#0d0f12]'
                    : 'bg-[#1c1f26] text-[#f5f5f3]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#1e2128] px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Write a message..."
              className="flex-1 rounded-xl border border-[#2a2d36] bg-[#1c1f26] px-4 py-3 text-sm text-[#f5f5f3] placeholder-[#3d4352] outline-none transition focus:border-[#c8ff3e]"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim()}
              className="rounded-xl bg-[#c8ff3e] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e] disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
