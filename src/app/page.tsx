import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f12] text-[#f5f5f3]">

      {/* Header */}
      <header className="border-b border-[#1e2128] px-8 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.15em] uppercase">
            Caelus AI <span className="text-[#c8ff3e]">_</span>
          </span>
          <nav className="flex items-center gap-8 text-sm text-[#7a8194]">
            <Link href="/services" className="transition hover:text-[#f5f5f3]">Services</Link>
            <Link href="/about" className="transition hover:text-[#f5f5f3]">About</Link>
            <Link href="/contact" className="transition hover:text-[#f5f5f3]">Contact</Link>
            <Link
              href="/portal"
              className="rounded-full bg-[#c8ff3e] px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0d0f12] transition hover:bg-[#d9ff6e]"
            >
              Client login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col justify-center px-8 py-24">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">
            AI consulting
          </p>
          <h1 className="max-w-4xl text-6xl font-black leading-[1.0] tracking-tight text-[#f5f5f3] md:text-8xl">
            Built<br />to hold.
          </h1>
          <p className="mt-10 max-w-xl text-base leading-8 text-[#7a8194]">
            We deploy AI systems that perform under real-world pressure — not just in demos.
            Strategy, integration, and the infrastructure to back it up.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[#c8ff3e] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e]"
            >
              Get started
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-[#2e3240] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-[#f5f5f3] transition hover:border-[#c8ff3e] hover:text-[#c8ff3e]"
            >
              View services
            </Link>
          </div>
        </div>

        {/* Feature strip */}
        <div className="mx-auto mt-28 w-full max-w-7xl border-t border-[#1e2128] pt-16">
          <div className="grid gap-px bg-[#1e2128] sm:grid-cols-3">
            {[
              {
                label: 'Client portal',
                body: 'Branded login, secure messaging, and document sharing — built for trust from day one.',
              },
              {
                label: 'AI integration',
                body: 'Real-world deployment with guardrails, performance monitoring, and clear ROI.',
              },
              {
                label: 'Launch-ready',
                body: 'Move fast without shortcuts. We deliver the polished, credible version first.',
              },
            ].map((item) => (
              <div key={item.label} className="bg-[#0d0f12] px-8 py-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#c8ff3e]">
                  {item.label}
                </p>
                <p className="text-sm leading-7 text-[#7a8194]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
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
