export type Conversation = {
  id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  last_message_content?: string | null;
  last_message_role?: 'client' | 'owner' | null;
  notes?: string | null;
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
