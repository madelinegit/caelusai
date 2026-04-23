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
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
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

  // Poll for new messages every 3 seconds
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

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-[#7a8194]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-0">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Messages</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Caelus AI Team</h1>
        <p className="text-xs text-[#7a8194]">Secure messaging</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-[#3d4352] bg-[#0d0f12] p-6">
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <div className="rounded-3xl bg-[#11141a] p-4 text-sm leading-7 text-[#e8e8e5]">
              <p className="text-xs text-[#7a8194]">Caelus AI Team</p>
              <p className="mt-2">
                Welcome to your Caelus client portal. Send a message to get started — we typically
                respond within one business day.
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] rounded-3xl p-4 text-sm leading-7 ${
                msg.role === 'client'
                  ? 'ml-auto bg-[#c8ff3e] text-[#0d0f12]'
                  : 'bg-[#11141a] text-[#e8e8e5]'
              }`}
            >
              {msg.role === 'owner' && (
                <p className="mb-1 text-xs text-[#7a8194]">{msg.sender_name}</p>
              )}
              <p>{msg.content}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="mt-4 flex gap-3 border-t border-[#3d4352] pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Send a message..."
            className="flex-1 rounded-2xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none focus:border-[#c8ff3e]"
          />
          <button
            onClick={sendMessage}
            disabled={sending || !input.trim()}
            className="rounded-2xl bg-[#c8ff3e] px-5 py-3 text-sm font-semibold text-[#0d0f12] transition hover:bg-[#a8ff6b] disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
