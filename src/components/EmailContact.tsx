"use client";

import { useState } from "react";

// The address is an image, and the text exists only after a click, so it is not in the page's HTML for spam harvesters to read.
// (It is assembled here, from pieces, when needed.)
const parts = ["jqadir", "qu.edu.qa"];
const address = () => parts.join("@");

export default function EmailContact({ className = "" }: { className?: string }) {
  const [shown, setShown] = useState(false);
  const alt = "My email address, shown as an image to keep it away from spammers. Use the buttons below to write to me or to see it as text.";
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/contact-email-dark.png" alt={alt} height={34} className="email-img email-img-dark h-[34px] w-auto" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/contact-email-light.png" alt={alt} height={34} className="email-img email-img-light h-[34px] w-auto" />
      <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <button type="button" onClick={() => { window.location.href = `mailto:${address()}`; }} className="text-accent hover:opacity-70">Write an email →</button>
        <button type="button" onClick={() => setShown(!shown)} aria-expanded={shown} className="text-muted hover:text-accent">{shown ? "Hide the address" : "Show the address as text"}</button>
      </p>
      {shown && <p className="mt-2 select-all font-serif text-lg text-foreground" role="status">{address()}</p>}
    </div>
  );
}
