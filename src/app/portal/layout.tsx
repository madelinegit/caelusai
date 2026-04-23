import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6 xl:px-0">
        <aside className="w-full max-w-[280px] rounded-3xl border border-[#3d4352] bg-[#11141a] p-6">
          <div className="mb-10 text-lg font-semibold text-white">
            Caelus AI <span className="text-[#c8ff3e]">_</span>
          </div>
          <nav className="space-y-3 text-sm text-[#e8e8e5]">
            <Link href="/portal" className="block rounded-2xl px-4 py-3 transition hover:bg-[#1c1f26]">Dashboard</Link>
            <Link href="/portal/messages" className="block rounded-2xl px-4 py-3 transition hover:bg-[#1c1f26]">Messages</Link>
            <Link href="/portal/files" className="block rounded-2xl px-4 py-3 transition hover:bg-[#1c1f26]">Files</Link>
            <Link href="/portal/projects" className="block rounded-2xl px-4 py-3 transition hover:bg-[#1c1f26]">Projects</Link>
          </nav>
          <div className="mt-10 border-t border-[#3d4352] pt-6">
            <UserButton afterSignOutUrl="/" />
          </div>
        </aside>

        <main className="flex-1 rounded-3xl border border-[#3d4352] bg-[#11141a] p-8">{children}</main>
      </div>
    </div>
  );
}
