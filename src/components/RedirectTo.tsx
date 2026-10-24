"use client";

import { useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";

/** A static-export redirect: sends the visitor on, with a plain link as a fallback. */
export default function RedirectTo({ href, label }: { href: string; label: string }) {
  useEffect(() => { window.location.replace(href); }, [href]);
  return (
    <Container className="py-24">
      <p className="text-muted">Taking you to <Link href={href} className="text-accent hover:opacity-70">{label}</Link>…</p>
      <noscript><p className="mt-3"><a href={href} className="text-accent">Open the page: {label}</a></p></noscript>
    </Container>
  );
}
