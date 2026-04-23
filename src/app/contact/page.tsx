import Link from 'next/link';

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-3xl px-8 py-20">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Start your engagement</h1>
          <p className="mt-4 text-sm leading-7 text-[#d6d6d6]">
            Tell us a bit about your AI challenge and we’ll follow up with a practical launch plan.
          </p>
        </div>

        <form className="space-y-6 rounded-3xl border border-[#3d4352] bg-[#11141a] p-8">
          <label className="block text-sm text-[#e8e8e5]">
            <span className="mb-2 block text-[#f5f5f3]">Name</span>
            <input className="w-full rounded-2xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none transition focus:border-[#c8ff3e]" type="text" placeholder="Your name" />
          </label>
          <label className="block text-sm text-[#e8e8e5]">
            <span className="mb-2 block text-[#f5f5f3]">Email</span>
            <input className="w-full rounded-2xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none transition focus:border-[#c8ff3e]" type="email" placeholder="you@example.com" />
          </label>
          <label className="block text-sm text-[#e8e8e5]">
            <span className="mb-2 block text-[#f5f5f3]">Message</span>
            <textarea className="w-full rounded-2xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none transition focus:border-[#c8ff3e]" rows={6} placeholder="Tell us your priority." />
          </label>
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#c8ff3e] px-7 py-3 text-sm font-semibold text-[#0d0f12] transition hover:bg-[#a8ff6b]">
            Send inquiry
          </button>
        </form>

        <div className="mt-10 text-sm text-[#7a8194]">
          <p>Prefer an intro by email? Mail us at <span className="text-[#f5f5f3]">hello@ecodev.ai</span>.</p>
          <p className="mt-3">Already a client? <Link href="/portal" className="text-[#c8ff3e] hover:text-[#a8ff6b]">Open the client portal</Link>.</p>
        </div>
      </div>
    </main>
  );
}
