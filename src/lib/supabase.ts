import { createClient } from '@supabase/supabase-js';

// Server-side client used in API routes (Clerk handles auth, not Supabase)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export type Conversation = {
  id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  role: 'client' | 'owner';
  content: string;
  created_at: string;
};
