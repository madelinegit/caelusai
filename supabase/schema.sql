-- Run this in the Supabase SQL editor (Dashboard > SQL Editor)

create table if not exists conversations (
  id uuid default gen_random_uuid() primary key,
  client_id text not null unique,
  client_name text not null default '',
  client_email text not null default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id text not null,
  sender_name text not null,
  role text not null check (role in ('client', 'owner')),
  content text not null,
  created_at timestamptz default now()
);

create index if not exists messages_conversation_id_idx on messages(conversation_id, created_at);
