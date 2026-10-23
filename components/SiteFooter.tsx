import Image from "next/image";
import Link from "next/link";
import { LOGO, SITE_NAME } from "@/lib/site";
import styles from "./site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Image src={LOGO} alt={SITE_NAME} width={1829} height={446} sizes="170px" className={styles.footerLogo} />
      <p>Health screening and records for schools in India</p>
      <div className={styles.footerLinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
        <Link href="/#book">Book a demo</Link>
      </div>
    </footer>
  );
}
