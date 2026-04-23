import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(200,255,62,0.08),_transparent_30%),_#0d0f12] text-white">
      <header className="border-b border-[#3d4352] px-8 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
          <div className="text-lg font-semibold tracking-tight">
            Caelus AI <span className="text-[#c8ff3e]">_</span>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm text-[#7a8194]">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/portal" className="rounded-full bg-[#c8ff3e] px-5 py-2 font-semibold text-[#0d0f12] transition hover:bg-[#a8ff6b]">
              Client login
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-8 py-20">
        <div className="max-w-3xl space-y-8">
          <div className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">AI consulting</div>
          <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
            Caelus AI —
            <span className="block text-[#c8ff3e]">by Ecodev LLC</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#e8e8e5]">
            We build resilient AI systems and secure client workflows for fast-growing companies.
            Launch your client portal, messaging, and AI foundation now — with the polish and trust clients expect.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-[#c8ff3e] px-7 py-3 text-sm font-semibold text-[#0d0f12] transition hover:bg-[#a8ff6b]">
              Start the conversation
            </Link>
            <Link href="/services" className="rounded-full border border-[#3d4352] px-7 py-3 text-sm text-[#f5f5f3] transition hover:border-[#c8ff3e] hover:text-[#c8ff3e]">
              Explore services
            </Link>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Secure client portal', description: 'A branded login area with messaging, files, and project updates.' },
            { title: 'AI strategy that scales', description: 'Roadmaps, systems, and product integration for responsible automation.' },
            { title: 'Trusted by founders', description: 'Built for businesses that need results, not buzzwords.' },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#3d4352] bg-[#11141a] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
              <h2 className="mb-4 text-xl font-semibold text-white">{item.title}</h2>
              <p className="text-sm leading-7 text-[#d6d6d6]">{item.description}</p>
            </article>
          ))}
        </section>
      </section>

      <footer className="border-t border-[#3d4352] px-8 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[#7a8194] md:flex-row md:items-center md:justify-between">
          <span>© 2026 Caelus AI. Operated by Ecodev LLC.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
