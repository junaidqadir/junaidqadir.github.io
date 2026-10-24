"use client";

import { useState } from "react";
import { socials } from "@/content/site";

// No server and no outside service: the form prepares the email (address, subject and text) and opens the visitor's own email program.
const TOPICS: { id: string; label: string; subject: string; hint: string }[] = [
  { id: "student", label: "Prospective student", subject: "Prospective student", hint: "Your degree level, your background, and the research topic that interests you." },
  { id: "talk", label: "Talk or workshop", subject: "Invitation to speak", hint: "The audience, the date, the format and the place." },
  { id: "media", label: "Media or interview", subject: "Media request", hint: "Your outlet, the topic, and your deadline." },
  { id: "collab", label: "Collaboration or funding", subject: "Collaboration", hint: "What the problem is, who the partners are, and what you have in mind." },
  { id: "other", label: "Something else", subject: "Message", hint: "A few words on what you would like to discuss." },
];

const field = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-[15px] outline-none focus:border-accent";
const label = "text-xs font-medium uppercase tracking-wide text-muted";

export default function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0].id);
  const [composed, setComposed] = useState<{ subject: string; body: string; href: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const t = TOPICS.find((x) => x.id === topic) ?? TOPICS[0];

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const subject = `[Website] ${t.subject}: ${name}`;
    const body = `${message}\n\n— ${name}\n(About: ${t.label})`;
    const href = `mailto:${socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setComposed({ subject, body, href });
    window.location.href = href;
  }

  async function copy() {
    if (!composed) return;
    try {
      await navigator.clipboard.writeText(`To: ${socials.email}\nSubject: ${composed.subject}\n\n${composed.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={submit} className="space-y-4" aria-label="Write an email">
        <div>
          <label htmlFor="cf-name" className={label}>Your name</label>
          <input id="cf-name" name="name" required maxLength={120} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-topic" className={label}>I am writing about</label>
          <select id="cf-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
            {TOPICS.map((x) => (<option key={x.id} value={x.id}>{x.label}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-message" className={label}>Your message</label>
          <textarea id="cf-message" name="message" required rows={6} maxLength={1500} aria-describedby="cf-hint" className={field} />
          <p id="cf-hint" className="mt-1.5 text-sm text-muted">Please include: {t.hint}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="rounded-sm bg-foreground px-5 py-2.5 text-sm text-background transition-opacity hover:opacity-85">Prepare my email</button>
          <p className="text-xs text-muted">This opens your own email program with the address, the subject and your message filled in. Nothing is sent through this website.</p>
        </div>
      </form>

      {composed && (
        <div className="mt-5 rounded border border-border bg-surface p-4 text-sm" role="status">
          <p className="text-foreground">Your email program should open with the message ready to send. If it does not, you can copy the message, or <a href={composed.href} className="text-accent hover:opacity-70">try again</a>, or write to <a href={`mailto:${socials.email}`} className="text-accent hover:opacity-70">{socials.email}</a>.</p>
          <p className="mt-2 text-muted"><span className="text-foreground">Subject:</span> {composed.subject}</p>
          <button type="button" onClick={copy} className="mt-3 text-accent hover:opacity-70">{copied ? "Copied ✓" : "Copy the message"}</button>
        </div>
      )}
    </div>
  );
}
