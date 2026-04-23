import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const navLinks = [
  { href: '/portal', label: 'Dashboard' },
  { href: '/portal/messages', label: 'Messages' },
  { href: '/portal/files', label: 'Files' },
  { href: '/portal/projects', label: 'Projects' },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f5f5f3]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-5 px-4 py-5 xl:px-0">

        {/* Sidebar */}
        <aside className="flex w-[220px] shrink-0 flex-col rounded-2xl border border-[#1e2128] bg-[#1c1f26] p-5">
          <Link href="/" className="mb-8 text-sm font-semibold uppercase tracking-[0.15em]">
            Caelus AI <span className="text-[#c8ff3e]">_</span>
          </Link>

          <nav className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-2.5 text-[#7a8194] transition hover:bg-[#22252e] hover:text-[#f5f5f3]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-[#2a2d36] pt-5">
            <UserButton afterSignOutUrl="/" />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 rounded-2xl border border-[#1e2128] bg-[#1c1f26] p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
