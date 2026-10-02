import Header from '@/components/Header';
import FeedbackForm from '@/components/FeedbackForm';

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col">
      <div className="shell flex flex-1 flex-col px-5 py-8 sm:px-6 sm:py-12">
        {/* 1. Masthead */}
        <Header />

        {/* 2. Headline — the strongest element on the page */}
        <section className="mt-14 sm:mt-20">
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-brand-sky/85">
            InfoBrains · 2026 / 2027
          </span>

          <h1 className="mt-4 text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[44px]">
            Your voice
            <br />
            shapes our year.
          </h1>

          <p className="mt-5 max-w-[42ch] text-[14px] font-light leading-[1.7] text-slate-400">
            A new university year is beginning. Before we plan anything, we want
            to hear from you — your ideas, honest feedback, and what you hope
            InfoBrains becomes this year.
          </p>
        </section>

        {/* 3. Hairline divider — visual rhythm */}
        <div className="rule my-10 sm:my-12" aria-hidden />

        {/* 4. Feedback form */}
        <FeedbackForm />

        {/* 5. Spacer pushes footer to bottom on short pages */}
        <div className="flex-1" />

        {/* 6. Footer — minimal, quiet */}
        <footer className="mt-14 border-t border-white/[0.05] pt-6">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-[11.5px] font-normal text-slate-400">
                InfoBrains Scientific Club
              </p>
              <p className="mt-0.5 text-[11px] font-light text-slate-600">
                Faculty of Exact Sciences &amp; Informatics
              </p>
            </div>
            <p className="text-[11px] font-light tracking-wide text-slate-600">
              2026 / 2027
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}