"use client";

import { useEffect } from "react";
import Link from "next/link";
import Container from "@/components/Container";

export default function LearnRedirect() {
  useEffect(() => { window.location.replace("/learning/"); }, []);
  return (
    <Container className="py-24">
      <p className="text-muted">
        Taking you to <Link href="/learning" className="text-accent hover:opacity-70">How to learn well</Link>…
      </p>
      <noscript><p className="mt-3"><a href="/learning/" className="text-accent">Open the page: How to learn well</a></p></noscript>
    </Container>
  );
}
