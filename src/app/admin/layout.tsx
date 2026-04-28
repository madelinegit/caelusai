import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';
import Logo from '@/components/Logo';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/portal');
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6 xl:px-0">
        <aside className="w-full max-w-[280px] rounded-3xl border border-[#3d4352] bg-[#11141a] p-6">
          <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-white">
            <Logo size={28} />
            Caelus AI
          </div>
          <div className="mb-8 text-xs uppercase tracking-[0.25em] text-[#c8ff3e]">Admin</div>
          <nav className="space-y-3 text-sm text-[#e8e8e5]">
            <Link href="/admin/messages" className="block rounded-2xl px-4 py-3 transition hover:bg-[#1c1f26]">
              All conversations
            </Link>
          </nav>
          <div className="mt-10 border-t border-[#3d4352] pt-6">
            <SignOutButton />
          </div>
        </aside>

        <main className="flex-1 rounded-3xl border border-[#3d4352] bg-[#11141a] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
