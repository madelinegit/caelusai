import Link from 'next/link';

const services = [
  {
    title: 'AI Strategy & Roadmapping',
    body: 'We map your business to AI opportunities that actually move the needle. You leave with a phased roadmap, not a whitepaper.',
  },
  {
    title: 'Workflow Automation',
    body: 'Identify the repetitive, high-cost processes eating your team\'s time. We automate them reliably — with human oversight built in.',
  },
  {
    title: 'AI Implementation',
    body: 'From model selection to production deployment, we build and ship. Tested under real load, not just demo conditions.',
  },
  {
    title: 'Data & Analytics Consulting',
    body: 'Clean data is the foundation. We audit your pipelines, structure your outputs, and make your analytics decisions AI-ready.',
  },
];

export default function Services() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f12] text-[#f5f5f3]">

      {/* Header */}
      <header className="border-b border-[#1e2128] px-8 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-[0.15em] uppercase">
            Caelus AI <span className="text-[#c8ff3e]">_</span>
          </Link>
          <nav className="flex items-center gap-8 text-sm text-[#7a8194]">
            <Link href="/services" className="text-[#f5f5f3]">Services</Link>
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

      <main className="flex-1 px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#c8ff3e]">
            Services
          </p>
          <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-[#f5f5f3] md:text-6xl">
            What we<br />deliver.
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-8 text-[#7a8194]">
            No fluff, no buzzwords. Every engagement is scoped to produce something real.
          </p>

          <div className="mt-20 grid gap-px bg-[#1e2128] sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="bg-[#0d0f12] px-10 py-12">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-[#c8ff3e]">—</p>
                <h2 className="mb-4 text-xl font-bold text-[#f5f5f3]">{service.title}</h2>
                <p className="text-sm leading-7 text-[#7a8194]">{service.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-[#1e2128] pt-16">
            <p className="mb-6 max-w-lg text-sm leading-8 text-[#7a8194]">
              Ready to scope a project? We keep it direct — one call, honest assessment, clear next step.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-[#c8ff3e] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e]"
            >
              Get started
            </Link>
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
