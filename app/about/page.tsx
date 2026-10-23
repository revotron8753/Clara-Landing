import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { CTA_LABEL, OG_DEFAULTS } from "@/lib/site";
import Gallery from "./Gallery";
import styles from "./about.module.css";

const DESCRIPTION =
  "Since 2018, Clara Healtonation has brought preventive healthcare to school children, with 30,000+ student screenings across 25+ schools. Meet our founders and see our journey so far.";

export const metadata: Metadata = {
  title: "About Us: Our Journey and Founders",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "About Clara Healtonation: Our Journey and Founders",
    description: DESCRIPTION,
    url: "/about",
    images: [{ url: "/about/gallery/camp-07.jpg", width: 1600, height: 1066, alt: "A Clara school health camp" }],
  },
};

const STATS = [
  { value: "2018", label: "Founded" },
  { value: "25+", label: "Schools served" },
  { value: "30,000+", label: "Student screenings" },
  { value: "1M", label: "Students: our goal" },
];

const FOUNDERS = [
  {
    name: "Dr. Sanket Chavan",
    role: "Founder & CEO",
    photo: "/about/sanket-chavan.jpg",
    width: 1083,
    height: 1400,
    story: [
      "A dentist by qualification and an entrepreneur by passion, Dr. Sanket Chavan believes that meaningful change begins with identifying problems that matter and building solutions that create lasting impact.",
      "His vision for Clara Healtonation grew from a desire to move beyond conventional healthcare delivery and make preventive healthcare more accessible to school children through technology, clinical expertise and scalable systems.",
      "For Sanket, Clara Healtonation is more than a healthcare venture. It is a commitment to a future where every child has the opportunity to grow healthier, thrive and reach their full potential.",
    ],
    mission: "To make preventive healthcare an integral part of every child's journey.",
  },
  {
    name: "Mahesh Reddy",
    role: "Co-founder & CTO",
    photo: "/about/mahesh-reddy.jpg",
    width: 608,
    height: 760,
    story: [
      "A technology leader with an entrepreneurial mindset, Mahesh Reddy is driven by the belief that technology can transform the way essential services are delivered, accessed and experienced.",
      "As Co-founder and Chief Technology Officer of Clara Healtonation, Mahesh leads the vision behind its digital platform, bringing together product development, technology architecture and innovation to create a more connected approach to school healthcare.",
      "His focus is on building technology that simplifies health screening, enables organised digital health records and supports efficient, scalable operations. By translating the larger vision of Clara Healtonation into practical technology solutions, he plays a pivotal role in shaping the organisation's digital future.",
      "For Mahesh, technology is not merely about building software; it is about solving meaningful problems and creating systems that can grow with the needs of the people they serve.",
    ],
    mission:
      "To harness technology to make preventive healthcare more accessible, efficient and scalable for every child.",
  },
];

export default function AboutPage() {
  return (
    <>
    <SiteNav current="/about" />
    <main className={styles.page}>
      {/* Hero / Our Journey intro */}
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.pill}>Our Journey</span>
          <h1>
            Building a Healthier Future, One Child at a Time
          </h1>
          <p className={styles.lead}>
            Founded in 2018, Clara Healtonation began with a simple belief: every child deserves
            access to preventive healthcare.
          </p>
        </div>
        <div className={styles.collage} aria-hidden="true">
          <Image src="/about/gallery/camp-07.jpg" alt="" width={1600} height={1066} className={styles.c1} priority sizes="(max-width: 860px) 70vw, 30vw" />
          <Image src="/about/gallery/camp-11.jpg" alt="" width={578} height={1280} className={styles.c2} priority sizes="(max-width: 860px) 35vw, 14vw" />
          <Image src="/about/gallery/camp-19.jpg" alt="" width={1495} height={1356} className={styles.c3} priority sizes="(max-width: 860px) 50vw, 20vw" />
        </div>
      </header>

      <section className={styles.stats} aria-label="Clara at a glance">
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.journey}>
        <div className={styles.journeyGrid}>
          <div>
            <h2>How we started</h2>
          </div>
          <div className={styles.prose}>
            <p>
              What started as a vision to make school health screening more accessible has evolved
              into a technology-enabled approach that brings healthcare professionals, non-invasive
              screening and digital health records together.
            </p>
            <p>
              With experience across 25+ schools and 30,000+ student screenings, we continue to work
              towards a future where health is an integral part of every child&apos;s educational
              journey.
            </p>
          </div>
        </div>

        <div className={styles.vision}>
          <p className={styles.visionText}>
            To reach one million students and help build a healthier future for India —{" "}
            <span>one school, one child and one screening at a time.</span>
          </p>
          <div className={styles.progress}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: "3%" }} />
            </div>
            <div className={styles.progressLabels}>
              <span>30,000+ screened so far</span>
              <span>1,000,000 students</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.founders} id="founders">
        <div className={styles.sectionHead}>
          <h2>The Founders&apos; Story</h2>
        </div>
        {FOUNDERS.map((f, i) => (
          <article key={f.name} className={`${styles.founder} ${i % 2 ? styles.flip : ""}`}>
            <div className={styles.portrait}>
              <Image src={f.photo} alt={`${f.name}, ${f.role}`} width={f.width} height={f.height} sizes="(max-width: 860px) 100vw, 40vw" />
            </div>
            <div className={styles.bio}>
              <h3>{f.name}</h3>
              <div className={styles.role}>{f.role}</div>
              {f.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <blockquote className={styles.mission}>
                <span>His mission</span>
                {f.mission}
              </blockquote>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.gallery} id="gallery">
        <div className={styles.sectionHead}>
          <h2>Camps, 2018–2020</h2>
          <p>Photos from school health camps we ran between 2018 and 2020.</p>
        </div>
        <Gallery />
      </section>

      <section className={styles.cta}>
        <h2>Want Clara at your school?</h2>
        <Link href="/#book" className={styles.ctaBtn}>{CTA_LABEL}</Link>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
