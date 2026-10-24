import type { Metadata } from "next";
import RedirectTo from "@/components/RedirectTo";

// The teaching approach now sits on the Courses page; this address stays working for old links.
export const metadata: Metadata = { title: "Teaching — Junaid Qadir", robots: { index: false } };

export default function TeachingMoved() {
  return <RedirectTo href="/courses/#teaching-philosophy" label="Courses: teaching philosophy" />;
}
