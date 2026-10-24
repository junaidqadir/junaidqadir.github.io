import type { Metadata } from "next";
import { Inter, Fraunces, Amiri, Aref_Ruqaa } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { socials } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-calli",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Junaid Qadir",
  jobTitle: "Professor of Computer Engineering",
  affiliation: { "@type": "CollegeOrUniversity", name: "Qatar University" },
  url: "https://junaidqadir.github.io",
  image: "https://junaidqadir.github.io/headshot.jpg",
  sameAs: [socials.scholar, socials.orcid, socials.linkedin, socials.youtube, socials.researchgate],
  knowsAbout: ["Artificial intelligence ethics and governance", "AI in education", "AI in healthcare", "Multiplexity", "Islamic ethics of technology", "Wireless networks and machine learning"],
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://junaidqadir.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Junaid Qadir — Professor of Computer Engineering, Qatar University", template: "%s" },
  description:
    "Academic working across artificial intelligence, engineering education, multiplexity, and Islamic ethics. Publications, talks, teaching and a continuously synced CV.",
  openGraph: { type: "website", siteName: "Junaid Qadir", title: "Junaid Qadir", description: "Technology with wisdom. Education with ihsan.", images: [{ url: "/headshot.jpg", width: 781, height: 781, alt: "Junaid Qadir" }] },
  twitter: { card: "summary", title: "Junaid Qadir", description: "Technology with wisdom. Education with ihsan.", images: ["/headshot.jpg"] },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${amiri.variable} ${arefRuqaa.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var P=["lapis","saffron","emerald","plum"],k="jq-palette",q=new URLSearchParams(location.search).get("palette"),p=P.indexOf(q)>=0?q:sessionStorage.getItem(k);if(P.indexOf(p)<0){p="lapis"}sessionStorage.setItem(k,p);document.documentElement.setAttribute("data-palette",p)}catch(e){}try{document.documentElement.setAttribute("data-theme",localStorage.getItem("jq-theme")==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()',
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main" className="sr-only rounded bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
