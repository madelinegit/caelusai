import Link from 'next/link';

export default function PortalHome() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Client portal</p>
        <h1 className="text-3xl font-semibold text-white">Welcome to your secure workspace.</h1>
        <p className="max-w-2xl text-sm leading-7 text-[#d6d6d6]">
          This portal is the foundation for secure messaging, document sharing, and project updates.
          The design is ready; the backend can be connected next.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: 'Messages', description: 'Private client communication with your team.' },
          { label: 'Files', description: 'Share documents securely once your backend is connected.' },
          { label: 'Projects', description: 'Track milestones and deliverables in one place.' },
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-[#3d4352] bg-[#0d0f12] p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">{item.label}</h2>
            <p className="text-sm leading-7 text-[#d6d6d6]">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link href="/portal/messages" className="rounded-full bg-[#c8ff3e] px-6 py-3 text-sm font-semibold text-[#0d0f12] hover:bg-[#a8ff6b]">
          Open messages
        </Link>
      </div>
    </div>
  );
}
