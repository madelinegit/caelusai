'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Conversation, Message } from '@/lib/supabase';

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchConversations = useCallback(async () => {
    const res = await fetch('/api/conversations');
    if (res.ok) setConversations(await res.json());
  }, []);

  const fetchMessages = useCallback(async (convId: string) => {
    const res = await fetch(`/api/messages?conversationId=${convId}`);
    if (res.ok) setMessages(await res.json());
  }, []);

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  useEffect(() => {
    if (!selected) return;
    fetchMessages(selected.id);
    const interval = setInterval(() => fetchMessages(selected.id), 3000);
    return () => clearInterval(interval);
  }, [selected, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendReply() {
    if (!input.trim() || !selected || sending) return;
    setSending(true);
    const content = input.trim();
    setInput('');

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: selected.id, content }),
    });

    if (res.ok) {
      const msg: Message = await res.json();
      setMessages((prev) => [...prev, msg]);
    }
    setSending(false);
  }

  return (
    <div className="flex h-full gap-6" style={{ minHeight: '70vh' }}>
      {/* Conversation list */}
      <section className="w-[260px] shrink-0 rounded-3xl border border-[#3d4352] bg-[#0d0f12] p-4">
        <div className="mb-4 text-xs uppercase tracking-[0.35em] text-[#7a8194]">
          Clients ({conversations.length})
        </div>
        <div className="space-y-2">
          {conversations.length === 0 && (
            <p className="text-xs text-[#7a8194]">No conversations yet.</p>
          )}
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelected(conv)}
              className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                selected?.id === conv.id
                  ? 'bg-[#c8ff3e] text-[#0d0f12]'
                  : 'bg-[#11141a] text-white hover:bg-[#1c1f26]'
              }`}
            >
              <p className="text-sm font-medium">{conv.client_name || 'Client'}</p>
              <p
                className={`mt-0.5 truncate text-xs ${
                  selected?.id === conv.id ? 'text-[#0d0f12]/60' : 'text-[#7a8194]'
                }`}
              >
                {conv.client_email}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Message thread */}
      <section className="flex flex-1 flex-col rounded-3xl border border-[#3d4352] bg-[#0d0f12] p-6">
        {!selected ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#7a8194]">
            Select a conversation to view messages.
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="font-medium text-white">{selected.client_name}</p>
              <p className="text-xs text-[#7a8194]">{selected.client_email}</p>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
              {messages.length === 0 && (
                <p className="text-sm text-[#7a8194]">No messages yet.</p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] rounded-3xl p-4 text-sm leading-7 ${
                    msg.role === 'owner'
                      ? 'ml-auto bg-[#c8ff3e] text-[#0d0f12]'
                      : 'bg-[#11141a] text-[#e8e8e5]'
                  }`}
                >
                  {msg.role === 'client' && (
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
                onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                placeholder="Reply as Caelus AI Team..."
                className="flex-1 rounded-2xl border border-[#3d4352] bg-[#11141a] px-4 py-3 text-sm text-white outline-none focus:border-[#c8ff3e]"
              />
              <button
                onClick={sendReply}
                disabled={sending || !input.trim()}
                className="rounded-2xl bg-[#c8ff3e] px-5 py-3 text-sm font-semibold text-[#0d0f12] transition hover:bg-[#a8ff6b] disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
