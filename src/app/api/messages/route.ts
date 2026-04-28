import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { SupabaseClient } from '@supabase/supabase-js';

async function verifyAccess(supabase: SupabaseClient, userId: string, conversationId: string, isAdmin: boolean) {
  if (isAdmin) return true;
  const { data } = await supabase
    .from('conversations')
    .select('client_id')
    .eq('id', conversationId)
    .single();
  return data?.client_id === userId;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const conversationId = request.nextUrl.searchParams.get('conversationId');
  if (!conversationId) return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 });

  const isAdmin = user.email === process.env.ADMIN_EMAIL;

  if (!(await verifyAccess(supabase, user.id, conversationId, isAdmin))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const isAdmin = user.email === process.env.ADMIN_EMAIL;
  const body = await request.json() as { conversationId?: string; content?: string };
  const { conversationId, content } = body;

  if (!conversationId || !content?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (!(await verifyAccess(supabase, user.id, conversationId, isAdmin))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const senderName = isAdmin
    ? 'Caelus AI Team'
    : (user.user_metadata?.full_name as string | undefined) || user.email?.split('@')[0] || 'Client';

  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      sender_name: senderName,
      role: isAdmin ? 'owner' : 'client',
      content: content.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase
    .from('conversations')
    .update({
      updated_at: new Date().toISOString(),
      last_message_content: content.trim().substring(0, 120),
      last_message_role: isAdmin ? 'owner' : 'client',
    })
    .eq('id', conversationId);

  return NextResponse.json(data);
}
