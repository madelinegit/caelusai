import Link from 'next/link';

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f12] text-[#f5f5f3]">

      {/* Header */}
      <header className="border-b border-[#1e2128] px-8 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-[0.15em] uppercase">
            Caelus AI <span className="text-[#c8ff3e]">_</span>
          </Link>
          <nav className="flex items-center gap-8 text-sm text-[#7a8194]">
            <Link href="/services" className="transition hover:text-[#f5f5f3]">Services</Link>
            <Link href="/about" className="transition hover:text-[#f5f5f3]">About</Link>
            <Link href="/contact" className="text-[#f5f5f3]">Contact</Link>
            <Link
              href="/portal"
              className="rounded-full bg-[#c8ff3e] px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0d0f12] transition hover:bg-[#d9ff6e]"
            >
              Client login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-8 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">Contact</p>
            <h1 className="mt-4 text-5xl font-black leading-tight tracking-tight text-[#f5f5f3] md:text-6xl">
              Start your<br />engagement.
            </h1>
            <p className="mt-6 text-sm leading-8 text-[#7a8194]">
              Tell us a bit about your AI challenge and we'll follow up with a practical launch plan.
            </p>
          </div>

          <form className="space-y-6 rounded-3xl border border-[#1e2128] bg-[#11141a] p-8">
            <label className="block">
              <span className="mb-2 block text-sm text-[#7a8194]">Name</span>
              <input
                className="w-full rounded-xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-[#f5f5f3] outline-none transition focus:border-[#c8ff3e]"
                type="text"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-[#7a8194]">Email</span>
              <input
                className="w-full rounded-xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-[#f5f5f3] outline-none transition focus:border-[#c8ff3e]"
                type="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-[#7a8194]">Message</span>
              <textarea
                className="w-full rounded-xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-[#f5f5f3] outline-none transition focus:border-[#c8ff3e]"
                rows={6}
                placeholder="Tell us your priority."
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-[#c8ff3e] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e]"
            >
              Send inquiry
            </button>
          </form>

          <div className="mt-10 text-sm text-[#7a8194]">
            <p>Prefer email? Reach us at <span className="text-[#f5f5f3]">hello@ecodev.ai</span>.</p>
            <p className="mt-3">
              Already a client?{' '}
              <Link href="/portal" className="text-[#c8ff3e] transition hover:text-[#d9ff6e]">
                Open the client portal
              </Link>.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#1e2128] px-8 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-[#3d4352] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Caelus AI. Operated by EcoDev LLC.</span>
          <div className="flex gap-5">
            <Link href="/legal/privacy" className="transition hover:text-[#7a8194]">Privacy</Link>
            <Link href="/legal/terms" className="transition hover:text-[#7a8194]">Terms</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
