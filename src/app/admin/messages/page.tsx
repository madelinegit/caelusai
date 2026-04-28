'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Conversation, Message } from '@/lib/supabase';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  function selectConversation(conv: Conversation) {
    setSelected(conv);
    setNotes(conv.notes ?? '');
    setNotesSaved(false);
    setMessages([]);
  }

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
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selected.id
            ? { ...c, last_message_content: content, last_message_role: 'owner', updated_at: new Date().toISOString() }
            : c
        )
      );
    }
    setSending(false);
  }

  async function saveNotes() {
    if (!selected) return;
    setSavingNotes(true);
    const res = await fetch('/api/conversations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, notes }),
    });
    if (res.ok) {
      setNotesSaved(true);
      setConversations((prev) =>
        prev.map((c) => (c.id === selected.id ? { ...c, notes } : c))
      );
      setTimeout(() => setNotesSaved(false), 2000);
    }
    setSavingNotes(false);
  }

  async function deleteConversation() {
    if (!selected) return;
    if (!confirm(`Delete ${selected.client_name}'s conversation? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/conversations?id=${selected.id}`, { method: 'DELETE' });
    if (res.ok) {
      setConversations((prev) => prev.filter((c) => c.id !== selected.id));
      setSelected(null);
      setMessages([]);
    }
    setDeleting(false);
  }

  const newCount = conversations.filter((c) => c.last_message_role === 'client').length;

  return (
    <div className="flex h-full min-h-[70vh] gap-5">

      {/* Client list */}
      <section className="flex w-[260px] shrink-0 flex-col gap-3 overflow-y-auto">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7a8194]">
            Clients ({conversations.length})
          </span>
          {newCount > 0 && (
            <span className="rounded-full bg-[#c8ff3e] px-2 py-0.5 text-xs font-bold text-[#0d0f12]">
              {newCount} new
            </span>
          )}
        </div>

        {conversations.length === 0 && (
          <p className="mt-4 text-xs text-[#7a8194]">No clients yet. They appear here once they sign up and message you.</p>
        )}

        {conversations.map((conv) => {
          const isNew = conv.last_message_role === 'client';
          const isActive = selected?.id === conv.id;
          return (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                isActive
                  ? 'border-[#c8ff3e] bg-[#c8ff3e]/10'
                  : 'border-[#2a2d36] bg-[#0d0f12] hover:border-[#3d4352]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`truncate text-sm font-semibold ${isActive ? 'text-[#c8ff3e]' : 'text-[#f5f5f3]'}`}>
                  {conv.client_name || 'Client'}
                </p>
                {isNew && !isActive && (
                  <span className="shrink-0 rounded-full bg-[#c8ff3e] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0d0f12]">
                    new
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-[#7a8194]">{conv.client_email}</p>
              {conv.last_message_content && (
                <p className="mt-2 truncate text-xs text-[#3d4352]">"{conv.last_message_content}"</p>
              )}
              <p className="mt-1 text-xs text-[#3d4352]">{timeAgo(conv.updated_at)}</p>
            </button>
          );
        })}
      </section>

      {/* Right panel */}
      <section className="flex flex-1 flex-col gap-5 overflow-hidden">
        {!selected ? (
          <div className="flex flex-1 items-center justify-center text-sm text-[#7a8194]">
            Select a client to view their conversation.
          </div>
        ) : (
          <>
            {/* Client header */}
            <div className="flex items-center justify-between rounded-2xl border border-[#2a2d36] bg-[#0d0f12] px-6 py-4">
              <div>
                <p className="font-semibold text-[#f5f5f3]">{selected.client_name}</p>
                <p className="text-xs text-[#7a8194]">{selected.client_email}</p>
              </div>
              <button
                onClick={deleteConversation}
                disabled={deleting}
                className="rounded-xl border border-[#3d4352] px-4 py-2 text-xs text-[#7a8194] transition hover:border-red-500/50 hover:text-red-400 disabled:opacity-40"
              >
                {deleting ? 'Deleting…' : 'Delete client'}
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col rounded-2xl border border-[#2a2d36] bg-[#0d0f12]">
              <div className="border-b border-[#1e2128] px-6 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3d4352]">Messages</p>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-5" style={{ maxHeight: '280px' }}>
                {messages.length === 0 && (
                  <p className="text-xs text-[#3d4352]">No messages yet.</p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'owner' ? 'items-end' : 'items-start'}`}
                  >
                    <p className="mb-1 px-1 text-xs text-[#3d4352]">
                      {msg.role === 'owner' ? 'You (Caelus AI Team)' : msg.sender_name}
                    </p>
                    <div
                      className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-7 ${
                        msg.role === 'owner'
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

              <div className="border-t border-[#1e2128] px-6 py-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendReply()}
                    placeholder="Reply as Caelus AI Team…"
                    className="flex-1 rounded-xl border border-[#2a2d36] bg-[#1c1f26] px-4 py-3 text-sm text-[#f5f5f3] placeholder-[#3d4352] outline-none transition focus:border-[#c8ff3e]"
                  />
                  <button
                    onClick={sendReply}
                    disabled={sending || !input.trim()}
                    className="rounded-xl bg-[#c8ff3e] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e] disabled:opacity-40"
                  >
                    {sending ? '…' : 'Send'}
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-2xl border border-[#2a2d36] bg-[#0d0f12] px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3d4352]">Client notes</p>
                {notesSaved && (
                  <span className="text-xs text-[#c8ff3e]">Saved</span>
                )}
              </div>
              <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setNotesSaved(false); }}
                placeholder="Add private notes about this client — project scope, preferences, follow-ups…"
                rows={4}
                className="w-full resize-none rounded-xl border border-[#2a2d36] bg-[#1c1f26] px-4 py-3 text-sm text-[#f5f5f3] placeholder-[#3d4352] outline-none transition focus:border-[#c8ff3e]"
              />
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="mt-3 rounded-xl bg-[#1c1f26] px-5 py-2.5 text-xs font-semibold text-[#f5f5f3] transition hover:bg-[#22252e] disabled:opacity-40"
              >
                {savingNotes ? 'Saving…' : 'Save notes'}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
