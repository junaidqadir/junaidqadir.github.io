"use client";

import { useState } from "react";
import { socials } from "@/content/site";

// Delivery: FormSubmit (formsubmit.co) forwards each submission by email to the address below; no account is needed,
// but the address owner must confirm it once, from the first message the service sends.
const ENDPOINT = `https://formsubmit.co/ajax/${socials.email}`;

const TOPICS: { id: string; label: string; subject: string; hint: string }[] = [
  { id: "student", label: "Prospective student", subject: "Prospective student", hint: "Your degree level, your background, and the research topic that interests you." },
  { id: "talk", label: "Talk or workshop", subject: "Invitation to speak", hint: "The audience, the date, the format and the place." },
  { id: "media", label: "Media or interview", subject: "Media request", hint: "Your outlet, the topic, and your deadline." },
  { id: "collab", label: "Collaboration or funding", subject: "Collaboration", hint: "What the problem is, who the partners are, and what you have in mind." },
  { id: "other", label: "Something else", subject: "Message", hint: "A few words on what you would like to discuss." },
];

const field = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-[15px] outline-none focus:border-accent";
const label = "text-xs font-medium uppercase tracking-wide text-muted";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0].id);
  const [state, setState] = useState<State>("idle");
  const t = TOPICS.find((x) => x.id === topic) ?? TOPICS[0];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("_honey")) return; // a hidden field only bots fill in
    setState("sending");
    const name = String(f.get("name") ?? "").trim();
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email: String(f.get("email") ?? "").trim(),
          topic: t.label,
          message: String(f.get("message") ?? "").trim(),
          _subject: `[Website] ${t.subject}: ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || String(j.success) === "false") throw new Error("send failed");
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="max-w-xl rounded border border-border bg-surface p-5" role="status">
        <p className="font-serif text-lg text-foreground">Thank you. Your message has been sent.</p>
        <p className="mt-1 text-sm text-muted">I will reply by email as soon as I can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-xl space-y-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Your name</label>
          <input id="cf-name" name="name" required maxLength={120} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Your email</label>
          <input id="cf-email" name="email" type="email" required maxLength={160} autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-topic" className={label}>I am writing about</label>
        <select id="cf-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
          {TOPICS.map((x) => (<option key={x.id} value={x.id}>{x.label}</option>))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>Your message</label>
        <textarea id="cf-message" name="message" required rows={6} maxLength={4000} aria-describedby="cf-hint" className={field} />
        <p id="cf-hint" className="mt-1.5 text-sm text-muted">Please include: {t.hint}</p>
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="rounded-sm bg-foreground px-5 py-2.5 text-sm text-background transition-opacity hover:opacity-85 disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-muted">Sent to me by email, with the subject line filled in. It goes through a form service (FormSubmit) and is used only to reply.</p>
      </div>
      {state === "error" && (
        <p role="alert" className="text-sm text-foreground">
          The message could not be sent. Please email me directly at{" "}
          <a href={`mailto:${socials.email}?subject=${encodeURIComponent(`[Website] ${t.subject}`)}`} className="text-accent hover:opacity-70">{socials.email}</a>.
        </p>
      )}
    </form>
  );
}
