import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

const metrics = [
  { label: 'Active Projects', value: '—', sub: 'Coming soon' },
  { label: 'Unread Messages', value: '—', sub: 'Open messages to check' },
  { label: 'Recent Files', value: '—', sub: 'Coming soon' },
];

const activity = [
  { text: 'Your portal is ready.', time: 'Just now' },
  { text: 'Account created successfully.', time: 'Today' },
];

export default async function PortalHome() {
  const user = await currentUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="space-y-10">

      {/* Welcome */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#f5f5f3]">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-2 text-sm text-[#7a8194]">
          Here's a summary of your workspace.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-px bg-[#1e2128] sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#0d0f12] px-8 py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#3d4352]">
              {m.label}
            </p>
            <p className="mt-3 text-4xl font-black text-[#f5f5f3]">{m.value}</p>
            <p className="mt-2 text-xs text-[#7a8194]">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#3d4352]">
          Recent activity
        </p>
        <div className="flex flex-col gap-px bg-[#1e2128]">
          {activity.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-between bg-[#0d0f12] px-6 py-5"
            >
              <p className="text-sm text-[#f5f5f3]">{item.text}</p>
              <p className="text-xs text-[#3d4352]">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="border-t border-[#1e2128] pt-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#3d4352]">
          Quick actions
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal/messages"
            className="rounded-full bg-[#c8ff3e] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e]"
          >
            Open messages
          </Link>
          <Link
            href="/portal/files"
            className="rounded-full border border-[#2a2d36] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#7a8194] transition hover:border-[#c8ff3e] hover:text-[#c8ff3e]"
          >
            View files
          </Link>
        </div>
      </div>

    </div>
  );
}
