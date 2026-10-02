'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, ShieldCheck, Check, AlertCircle } from 'lucide-react';

const MAX = 2000;
const MIN = 3;

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const trimmedLength = message.trim().length;
  const canSubmit = trimmedLength >= MIN;
  const isDisabled = status === 'loading' || !canSubmit;
  const remaining = MAX - message.length;

  async function handleSubmit(e) {
    e.preventDefault();
    if (isDisabled) return;

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, website }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setMessage('');
      } else {
        setStatus('error');
        setError(data.error || 'Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please try again.');
    }
  }

  /* -------- SUCCESS STATE -------- */
  if (status === 'success') {
    return (
      <div className="animate-in py-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-sky/30 bg-brand-sky/[0.08]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="check-draw h-[18px] w-[18px]"
            >
              <path
                d="M5 12.5l4.5 4.5L19 7"
                stroke="#3ED2FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-[15px] font-medium tracking-[-0.01em] text-white">
            Thank you.
          </h3>
        </div>

        <p className="mt-3 text-[13.5px] font-light leading-[1.65] text-slate-400">
          Your feedback has been received.
          <br />
          <span className="text-slate-500">
            Your ideas help shape InfoBrains 2026 / 2027.
          </span>
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setMessage('');
          }}
          className="mt-6 text-[12px] font-normal tracking-wide text-slate-500 underline-offset-4 transition hover:text-brand-sky hover:underline"
        >
          Send another response
        </button>
      </div>
    );
  }

  /* -------- FORM STATE -------- */
  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Label + helper line */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="feedback"
          className="text-[13px] font-medium tracking-[-0.005em] text-slate-200"
        >
          What should we know?
        </label>
        <p className="text-[12px] font-light leading-[1.6] text-slate-500">
          Events you want. Things to improve. Activities you loved. New ideas,
          workshops, or competitions — anything you'd like InfoBrains to do this
          year.
        </p>
      </div>

      {/* Textarea — the centerpiece */}
      <div className="group relative">
        <textarea
          id="feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you would like InfoBrains to do this year..."
          maxLength={MAX}
          rows={6}
          disabled={status === 'loading'}
          required
          aria-describedby="feedback-counter"
          className="block w-full resize-none rounded-[14px] border border-white/[0.08]
                     bg-[#070c16] px-4 pb-10 pt-4
                     text-[13.5px] font-light leading-[1.75] text-slate-100
                     placeholder:text-slate-600
                     transition-colors duration-200
                     hover:border-white/[0.11]
                     focus:border-brand-sky/45 focus:outline-none
                     disabled:cursor-not-allowed disabled:opacity-60"
          style={{ minHeight: 168 }}
        />

        {/* Counter — sits inside the surface, unobtrusive */}
        <span
          id="feedback-counter"
          className={`pointer-events-none absolute bottom-3.5 right-4 select-none text-[10.5px] font-normal tabular-nums tracking-wide transition-colors ${
            remaining < 100 ? 'text-amber-400/80' : 'text-slate-600'
          }`}
        >
          {message.length}
          <span className="text-slate-700"> / {MAX}</span>
        </span>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* CTA */}
      <button
        type="submit"
        disabled={isDisabled}
        className="group relative flex w-full items-center justify-center gap-2
                   rounded-[14px] border border-brand-sky/30
                   bg-brand-mid px-5 py-[15px]
                   text-[13.5px] font-medium tracking-[-0.005em] text-white
                   shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_20px_-10px_rgba(25,138,205,0.45)]
                   transition-all duration-200
                   hover:border-brand-bright/45
                   hover:bg-brand-sky
                   hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_10px_26px_-10px_rgba(40,187,232,0.55)]
                   active:scale-[0.995]
                   disabled:cursor-not-allowed
                   disabled:border-white/[0.07]
                   disabled:bg-white/[0.03]
                   disabled:text-slate-500
                   disabled:shadow-none"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-[15px] w-[15px] animate-spin" strokeWidth={2.25} />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <span>Send anonymously</span>
            <ArrowRight
              className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[3px]"
              strokeWidth={2.25}
            />
          </>
        )}
      </button>

      {/* Error state — minimal */}
      {status === 'error' && error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-[10px] border border-red-500/20 bg-red-500/[0.045] px-3.5 py-2.5 animate-in"
        >
          <AlertCircle
            className="mt-px h-[13px] w-[13px] shrink-0 text-red-400/90"
            strokeWidth={2.25}
          />
          <p className="text-[12px] font-light leading-[1.6] text-red-200/90">
            {error}
          </p>
        </div>
      )}

      {/* Privacy reassurance — inline, not a card */}
      <div className="flex items-start gap-2.5 pt-1">
        <ShieldCheck
          className="mt-px h-[14px] w-[14px] shrink-0 text-slate-500"
          strokeWidth={1.75}
        />
        <p className="text-[11.5px] font-light leading-[1.65] text-slate-500">
          <span className="font-normal text-slate-400">Anonymous by design.</span>{' '}
          No name, email, account, or personal information is requested. We only
          store the feedback you submit.
        </p>
      </div>
    </form>
  );
}