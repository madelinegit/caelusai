import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

async function verifyAccess(userId: string, conversationId: string, isAdmin: boolean) {
  if (isAdmin) return true;
  const { data } = await supabase
    .from('conversations')
    .select('client_id')
    .eq('id', conversationId)
    .single();
  return data?.client_id === userId;
}

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const conversationId = request.nextUrl.searchParams.get('conversationId');
  if (!conversationId) return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 });

  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  if (!(await verifyAccess(userId, conversationId, isAdmin))) {
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
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const body = await request.json();
  const { conversationId, content } = body as { conversationId?: string; content?: string };

  if (!conversationId || !content?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (!(await verifyAccess(userId, conversationId, isAdmin))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const senderName = isAdmin
    ? 'Caelus AI Team'
    : [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
      user?.emailAddresses[0]?.emailAddress ||
      'Client';

  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: userId,
      sender_name: senderName,
      role: isAdmin ? 'owner' : 'client',
      content: content.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId);

  return NextResponse.json(data);
}
