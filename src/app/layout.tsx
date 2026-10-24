import type { Metadata } from "next";
import { Inter, Fraunces, Amiri, Aref_Ruqaa } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://junaidqadir.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Junaid Qadir — Professor of Computer Engineering, Qatar University", template: "%s" },
  description:
    "Academic working across artificial intelligence, engineering education, multiplexity, and Islamic ethics. Publications, talks, teaching and a continuously synced CV.",
  openGraph: { type: "website", siteName: "Junaid Qadir", title: "Junaid Qadir", description: "Technology with wisdom. Education with ihsan." },
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
              '(function(){try{var P=["saffron","lapis","emerald","plum"],k="jq-palette",q=new URLSearchParams(location.search).get("palette"),p=P.indexOf(q)>=0?q:sessionStorage.getItem(k);if(P.indexOf(p)<0){p=P[Math.floor(Math.random()*P.length)]}sessionStorage.setItem(k,p);document.documentElement.setAttribute("data-palette",p)}catch(e){}})()',
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
