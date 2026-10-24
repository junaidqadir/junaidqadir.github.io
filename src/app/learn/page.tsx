import type { Metadata } from "next";
import RedirectTo from "@/components/RedirectTo";

// A short address to give students: junaidqadir.github.io/learn goes to the Learning page.
export const metadata: Metadata = { title: "How to learn well — Junaid Qadir", robots: { index: false } };

export default function LearnShortcut() {
  return <RedirectTo href="/learning/" label="How to learn well" />;
}
