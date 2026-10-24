import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/Container";
import SiteSearch from "@/components/SiteSearch";

export const metadata: Metadata = { title: "Search — Junaid Qadir", robots: { index: false } };

export default function SearchPage() {
  return (
    <Container width="max-w-3xl" className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Search</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">Pages, research themes, publications, talks and videos in one place.</p>
      <div className="mt-6">
        <Suspense fallback={null}><SiteSearch /></Suspense>
      </div>
    </Container>
  );
}
