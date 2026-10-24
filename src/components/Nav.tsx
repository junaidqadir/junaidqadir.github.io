import Link from "next/link";
import Container from "./Container";
import IhsanBlock from "./IhsanBlock";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { identity } from "@/content/site";

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <Container width="max-w-6xl">
        <div className="flex items-center justify-between gap-6 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap font-serif text-lg tracking-tight text-foreground">
            <IhsanBlock size={32} className="rounded-[20%]" />
            <span>{identity.name}</span>
          </Link>
          {/* desktop */}
          <nav aria-label="Main" className="hidden items-center gap-x-3.5 text-[13px] xl:gap-x-5 xl:text-sm lg:flex"><NavLinks /></nav>
          {/* phones and small tablets */}
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
