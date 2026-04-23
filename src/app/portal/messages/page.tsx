export default function MessagesPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <section className="rounded-3xl border border-[#3d4352] bg-[#0d0f12] p-6">
        <div className="mb-6 text-sm uppercase tracking-[0.35em] text-[#7a8194]">Conversations</div>
        <div className="space-y-3">
          <button className="w-full rounded-2xl bg-[#11141a] px-4 py-4 text-left text-sm text-white transition hover:bg-[#1c1f26]">
            Tensile Team
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-[#3d4352] bg-[#0d0f12] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white">Tensile Team</p>
            <p className="text-xs text-[#7a8194]">Secure messaging</p>
          </div>
        </div>

        <div className="flex min-h-[420px] flex-col gap-4 rounded-3xl bg-[#11141a] p-6">
          <div className="rounded-3xl bg-[#0d0f12] p-4 text-sm leading-7 text-[#e8e8e5]">
            <p className="text-xs text-[#7a8194]">Caelus AI</p>
            <p className="mt-2">Welcome to your Caelus client portal. This messaging area is ready to connect with secure persistence next.</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <input type="text" placeholder="Send a message..." className="flex-1 rounded-2xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-sm text-white outline-none focus:border-[#c8ff3e]" />
          <button className="rounded-2xl bg-[#c8ff3e] px-5 py-3 text-sm font-semibold text-[#0d0f12] hover:bg-[#a8ff6b]">Send</button>
        </div>
      </section>
    </div>
  );
}
