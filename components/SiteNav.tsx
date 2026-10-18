import Image from "next/image";
import Link from "next/link";
import { LOGO, SITE_NAME } from "@/lib/site";
import styles from "./site.module.css";

const LINKS = [
  { href: "/#why", label: "Why Clara" },
  { href: "/#invest", label: "Investment" },
  { href: "/#system", label: "The System" },
  { href: "/#report", label: "What you get" },
  { href: "/about", label: "About us" },
];

export default function SiteNav({ current }: { current?: string }) {
  return (
    <nav className={styles.nav} aria-label="Main">
      <Link href="/" className={styles.logo} aria-label={`${SITE_NAME} home`}>
        <Image src={LOGO} alt={SITE_NAME} width={1829} height={446} priority sizes="170px" />
      </Link>
      <div className={styles.navLinks}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current === l.href ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
        <Link href="/#book" className={styles.navCta}>
          Book a<span className={styles.ctaLong}> 15-min</span> demo
        </Link>
      </div>
    </nav>
  );
}
