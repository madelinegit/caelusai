import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-6xl px-8 py-20">
        <div className="mb-12 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">About</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Caelus AI by Ecodev LLC</h1>
          </div>
          <Link href="/" className="text-sm text-[#c8ff3e] hover:text-[#a8ff6b]">
            Back to home
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#3d4352] bg-[#11141a] p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">What we do</h2>
            <p className="text-sm leading-7 text-[#d6d6d6]">
              Caelus AI helps businesses move past pilots and launch systems that work in production.
              We focus on practical AI, secure client experiences, and product launch velocity.
            </p>
          </div>
          <div className="rounded-3xl border border-[#3d4352] bg-[#11141a] p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">Why we build this</h2>
            <p className="text-sm leading-7 text-[#d6d6d6]">
              The first impression matters. Starting with a polished marketing site and client portal means you
              launch with credibility — then extend the product with thoughtful features later.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
