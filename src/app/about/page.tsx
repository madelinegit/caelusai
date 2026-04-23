import Link from 'next/link';

const values = [
  {
    label: 'Precision',
    body: 'We scope tightly and execute cleanly. No feature creep, no hand-waving.',
  },
  {
    label: 'Transparency',
    body: 'You always know where the project stands, what it costs, and what comes next.',
  },
  {
    label: 'Results',
    body: 'We measure success by what ships and performs — not by hours logged.',
  },
];

export default function About() {
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
            <Link href="/about" className="text-[#f5f5f3]">About</Link>
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

      <main className="flex-1 px-8 py-24">
        <div className="mx-auto max-w-7xl">

          {/* Who we are */}
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">
              Who we are
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-[#f5f5f3] md:text-6xl">
              We build AI<br />that holds.
            </h1>
            <p className="mt-10 text-sm leading-8 text-[#7a8194]">
              Caelus AI is an AI consulting agency operated by EcoDev LLC. We work with founders and
              fast-growing companies who need AI that performs in production — not just in a pitch deck.
            </p>
            <p className="mt-5 text-sm leading-8 text-[#7a8194]">
              We don't do vague strategy decks. We scope real engagements, ship working systems, and stay
              until the thing is live and measurable.
            </p>
          </div>

          {/* Why Caelus */}
          <div className="mt-24 border-t border-[#1e2128] pt-20">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">
                  The name
                </p>
                <h2 className="text-3xl font-black tracking-tight text-[#f5f5f3]">Why Caelus?</h2>
                <p className="mt-6 text-sm leading-8 text-[#7a8194]">
                  Caelus is Latin for sky. It implies elevation — a higher vantage point, a clearer picture
                  of what's below. That's the lens we bring to every engagement.
                </p>
                <p className="mt-5 text-sm leading-8 text-[#7a8194]">
                  Most AI projects fail because they're built too close to the problem. We step back,
                  map the full system, then move precisely.
                </p>
              </div>

              {/* Values */}
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">
                  Values
                </p>
                <div className="flex flex-col gap-px bg-[#1e2128]">
                  {values.map((v) => (
                    <div key={v.label} className="bg-[#0d0f12] px-8 py-8">
                      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f5f5f3]">
                        {v.label}
                      </p>
                      <p className="text-sm leading-7 text-[#7a8194]">{v.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
