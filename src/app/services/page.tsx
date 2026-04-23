import Link from 'next/link';

const services = [
  {
    title: 'Client portal launch',
    description: 'Branded login, secure messaging, and portal UX designed for business clients.',
  },
  {
    title: 'AI systems integration',
    description: 'Real-world AI deployment with guardrails, coaching, and clear ROI.',
  },
  {
    title: 'Technical credibility fast',
    description: 'Launch the polished version of your brand first, then add the deeper product features.',
  },
];

export default function Services() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-6xl px-8 py-20">
        <div className="mb-12 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Services</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Built for launch, built for scale.</h1>
          </div>
          <Link href="/" className="text-sm text-[#c8ff3e] hover:text-[#a8ff6b]">
            Back to home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-[#3d4352] bg-[#11141a] p-8">
              <h2 className="mb-4 text-2xl font-semibold text-white">{service.title}</h2>
              <p className="text-sm leading-7 text-[#d6d6d6]">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
