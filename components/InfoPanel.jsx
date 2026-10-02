import { Lightbulb, Wrench, CalendarHeart, ShieldCheck } from 'lucide-react';

const items = [
  {
    icon: Lightbulb,
    title: 'What you want to see',
    text: 'Recommendations and new ideas for the club this year.',
  },
  {
    icon: Wrench,
    title: 'What should be fixed',
    text: 'Anything that did not work well and should change.',
  },
  {
    icon: CalendarHeart,
    title: 'Events you loved',
    text: 'The ones you want to see again, or something new.',
  },
];

export default function InfoPanel() {
  return (
    <section>
      <div className="mb-5 text-center">
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-white">
          Tell us what you want this year
        </h2>
        <p className="mx-auto mt-2 max-w-[360px] text-[12.5px] font-light leading-relaxed text-slate-500">
          One box, in your own words. Write about any of these, or all of them.
        </p>
      </div>

      <ul className="space-y-2">
        {items.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition hover:border-white/[0.11] hover:bg-white/[0.035]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.01] text-brand-sky transition group-hover:border-brand-sky/30">
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-tight text-slate-100">
                {title}
              </p>
              <p className="mt-1 text-[11.5px] font-light leading-snug text-slate-500">
                {text}
              </p>
            </div>

            <span className="text-[11px] font-medium tabular-nums text-slate-700">
              0{i + 1}
            </span>
          </li>
        ))}
      </ul>

      {/* Anonymity */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-brand-sky/15 bg-brand-sky/[0.04] px-3.5 py-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-sky/10 text-brand-sky">
          <ShieldCheck className="h-[15px] w-[15px]" strokeWidth={2} />
        </div>
        <p className="text-[12px] font-light leading-[1.55] text-slate-400">
          <span className="font-medium text-slate-200">100% anonymous.</span>{' '}
          No sign-in, and we only receive what you write.
        </p>
      </div>
    </section>
  );
}