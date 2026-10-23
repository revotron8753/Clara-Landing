import type { Metadata } from "next";
import Image from "next/image";
import BannerOwl from "@/components/BannerOwl";
import CardVideo from "@/components/CardVideo";
import ComplianceOwl from "@/components/ComplianceOwl";
import FeeCountdown from "@/components/FeeCountdown";
import HeroScroll from "@/components/HeroScroll";
import ScreeningRing, { type Indicator } from "@/components/ScreeningRing";
import ScrollEffects from "@/components/ScrollEffects";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { CTA_LABEL, LOGO, OG_DEFAULTS, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import s from "./home.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${SITE_NAME} | Digital School Health Screening in India`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

const PILLARS = [
  {
    n: "01", title: "Screen", text: "Doctors check every student at school with non-invasive equipment.",
    pos: "80%", img: "/home/pillars/screen-school-eye-examination.png", w: 1536, h: 1024,
    alt: "A doctor examining a schoolgirl's eyes during a school health screening",
  },
  {
    n: "02", title: "Record", text: "Results go into a digital health record for each child.",
    pos: "65%", img: "/home/pillars/record-digital-student-health-profile.png", w: 1672, h: 941,
    alt: "A student's digital health profile with health charts on a tablet",
  },
  {
    n: "03", title: "Track", text: "Each year's results are compared with the year before.",
    pos: "82%", img: "/home/pillars/track-principal-health-dashboard.png", w: 1672, h: 941,
    alt: "A school principal reviewing student health trends on a dashboard",
  },
  {
    n: "04", title: "Act", text: "Parents get advice and a doctor referral when needed.",
    pos: "62%", img: "/home/pillars/act-doctor-parent-consultation.png", w: 1672, h: 941,
    alt: "A doctor going over a health report with a student and her parent",
  },
];

const REALITY = [
  {
    value: "1 in 4", text: "students have undiagnosed vision problems", highlight: true,
    video: "/home/reality/vision-eye-screening.mp4", pos: "42%", alt: "A schoolgirl having her eyes tested during a school vision screening",
  },
  {
    value: "60%", text: "students have dental problems",
    video: "/home/reality/dental-checkup.mp4", pos: "72%", loopEnd: 8.3, alt: "A dentist checking a schoolgirl's teeth",
  },
  {
    value: "50%", text: "students have some degree of anemia",
    video: "/home/reality/anemia-blood-test.mp4", pos: "32%", loopStart: 2.3, loopEnd: 8.3, alt: "A schoolgirl having a blood test for anemia",
  },
  {
    value: "30%", text: "students are underweight or overweight",
    video: "/home/reality/bmi-height-check.mp4", pos: "88%", alt: "A nurse measuring a schoolgirl's height for BMI",
  },
];

const COMPARISON = [
  { label: "Timeline", camp: "A single-day snapshot of each child", clara: "A baseline for every child, re-measured every year" },
  { label: "Record", camp: "Paper report, rarely revisited", clara: "Digital health record the family keeps" },
  { label: "Follow-up", camp: "Findings noted, follow-up left to chance", clara: "Recommendations and referrals where required" },
  { label: "Tracking", camp: "No comparison with last year", clara: "Year-on-year trends for each student" },
  { label: "Leadership", camp: "No view for school leadership", clara: "Class and grade analytics for leadership" },
];


const IMPACT = [
  { value: "30,000+", text: "students screened" },
  { value: "25+", text: "partner schools" },
  { value: "6,500+", text: "vision problems identified & corrected" },
  { value: "4,800+", text: "anemia cases detected & treated" },
  { value: "60%", text: "of students had previously undetected health issues" },
];

const INDICATORS: Indicator[][] = [
  [
    { title: "Growth & Development", text: "Height, weight, BMI baseline tracked year on year.", icon: "/home/indicators/01.png", iconW: 175, iconH: 331 },
    { title: "Hygiene & Wellness", text: "Hair, nails, skin and daily-habit indicators.", icon: "/home/indicators/02.png", iconW: 166, iconH: 194 },
    { title: "Dental Health", text: "Cavities, gums, alignment, enamel and hygiene.", icon: "/home/indicators/03.png", iconW: 194, iconH: 180 },
  ],
  [
    { title: "ENT Evaluation", text: "Ear canals, hearing sensitivity, nasal pathways, throat.", icon: "/home/indicators/04.png", iconW: 285, iconH: 166 },
    { title: "General Physician", text: "Pallor, jaundice, lymph nodes, posture, gait.", icon: "/home/indicators/05.png", iconW: 352, iconH: 387 },
    { title: "Nervous & Reflex", text: "Brain-to-muscle response, bilateral strength, alertness.", icon: "/home/indicators/06.png", iconW: 181, iconH: 250 },
  ],
  [
    { title: "Cardiovascular", text: "Heart sounds, pulse, SpO₂, capillary refill.", icon: "/home/indicators/07.png", iconW: 185, iconH: 287 },
    { title: "Vision Screening", text: "Both eyes checked with a Spot vision screener." },
  ],
];

const SCREENING_DAY = [
  { title: "No needles", text: "Haemoglobin is measured without drawing blood." },
  { title: "At your school", text: "Our team brings portable equipment and sets up on campus." },
  { title: "Calm for children", text: "Nothing hurts, so children stay relaxed through every check." },
  { title: "Results saved on the spot", text: "Each reading goes straight into the child’s digital record." },
];
const DASHBOARD = [
  { label: "Vision", pct: 25, color: "#1463D8" },
  { label: "Dental", pct: 60, color: "#1463D8" },
  { label: "Anemia", pct: 50, color: "#12A57C" },
  { label: "BMI", pct: 30, color: "#12A57C" },
];

function Checklist({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={`${s.checklist} ${dark ? s.checklistDark : ""}`}>
      {items.map((t) => (
        <li key={t}><span className={s.checkDot} aria-hidden="true"><span /></span>{t}</li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <ScrollEffects />
      <main>
        {/* 01 — The reveal */}
        <HeroScroll>
          <div data-cue="0,0.20" className={`${s.cue} ${s.cueLeft}`}>
            <div className={s.cueBox}>
              <h1 id="hero-title" className={s.heroTitle}>Health screening for schools, with a record for every child</h1>
              <p className={s.cueText}>Poor eyesight, anemia and dental problems often go unnoticed in class. We check for them at school and keep the results.</p>
            </div>
          </div>
          <div data-cue="0.24,0.44" className={`${s.cue} ${s.cueRight} ${s.cueHidden}`}>
            <div className={s.cueBox}>
              <h2 className={s.cueTitle}>80% of learning outcomes are linked to physical and mental well-being.</h2>
              <p className={s.cueText}>A child who can&apos;t see the board, or is tired all day, falls behind. Often nobody knows why.</p>
            </div>
          </div>
          <div data-cue="0.48,0.70" className={`${s.cue} ${s.cueLeft} ${s.cueHidden}`}>
            <div className={s.cueBox}>
              <h2 className={s.cueTitle}>A health camp sees each child once. We screen every year and compare the results.</h2>
            </div>
          </div>
          <div data-cue="0.76,1.0" className={`${s.cue} ${s.cueRight} ${s.cueHidden}`}>
            <div className={`${s.cueBox} ${s.cueBoxWide}`}>
              <h2 className={`${s.cueTitle} ${s.cueTitleBig}`}>Yearly health screening at your school</h2>
              <p className={s.cueText}>Non-invasive checks across eight areas of health, and a digital health record for every student.</p>
              <div className={s.cueActions}>
                <a href="#book" className={s.btnPrimary}>{CTA_LABEL}</a>
                <a href="#why" className={s.btnGhost}>How it works</a>
              </div>
            </div>
          </div>
        </HeroScroll>

        {/* 04 — Why Clara */}
        <section id="why" className={`${s.section} ${s.tint} ${s.why}`} aria-labelledby="why-title">
          <div className={s.wrap}>
            <div className={s.bannerFit}>
            <div data-reveal="up" className={s.banner}>
              <Image
                src="/home/clara-school-courtyard-banner.png"
                alt="A sunny school courtyard and building"
                fill
                sizes="(max-width: 640px) 300vw, 1700px"
                quality={85}
                className={s.bannerImg}
              />
              <div className={s.bannerShade} />
              <BannerOwl />
              <div className={s.bannerText}>
                <h2 className={s.bannerTitle}>
                  <span className={s.titleLine}><span className={s.highlight}>India’s First</span></span>{" "}
                  <span className={s.titleLine}>Non-Invasive</span>{" "}
                  <span className={s.titleLine}>Digital School Health</span>{" "}
                  <span className={s.titleLine}>Screening System</span>{" "}
                  <span className={s.titleSub}>for Preventive Healthcare</span>
                </h2>
              </div>
            </div>
            </div>
            <div className={s.whyFit}>
            <header data-reveal="up" className={s.centerHead}>
              <h2 id="why-title" className={`${s.h2xl} ${s.whyTitle}`}>How it works</h2>
            </header>
            <ol className={s.pillars}>
              {PILLARS.map((p) => (
                <li key={p.n} data-reveal="up" className={s.pillar}>
                  <CardVideo
                    video={p.img.replace(/\.png$/, ".mp4")}
                    img={p.img}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    sizes="(max-width: 600px) 100vw, (max-width: 999px) 600px, 700px"
                    className={s.pillarImg}
                    style={{ "--pos": p.pos } as React.CSSProperties}
                  />
                  <div className={s.pillarTop}>
                    <span className={s.pillarNum}>{p.n}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
            <p className={s.centerNote}>
              The first screening sets a baseline for each child. Every screening after that is measured against it, and the school sees the results by class and grade.
            </p>
            </div>
          </div>
        </section>

        {/* 02 — The reality */}
        <section id="reality" className={`${s.section} ${s.realitySection}`} aria-labelledby="reality-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={s.splitHead}>
              <h2 id="reality-title" className={`${s.h2lg} ${s.realityTitle}`}>What we find in schools</h2>
              <p>Across the schools we&apos;ve screened, these problems come up again and again. Most were never picked up before.</p>
            </header>
            <ul className={s.realityGrid}>
              {REALITY.map((r) => (
                <li key={r.value} data-reveal="up" className={`${s.statCard} ${r.highlight ? s.statCardBlue : ""}`}>
                  <CardVideo video={r.video} loopEnd={"loopEnd" in r ? r.loopEnd : undefined} loopStart={"loopStart" in r ? r.loopStart : undefined} alt={r.alt} className={s.statImg} style={{ "--pos": r.pos } as React.CSSProperties} />
                  <strong>{r.value}</strong>
                  <span>{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 08 — Mandate */}
        <section className={`${s.section} ${s.tint} ${s.sectionTight}`} aria-labelledby="mandate-title">
          <div className={s.wrap}>
            <div className={s.mandate}>
              <div className={s.mandateText}>
              <h2 id="mandate-title" data-reveal="up" className={s.quoteTitle}>What CBSE, NEP 2020 and the WHO say</h2>
              <div className={s.mandateCards}>
                <figure data-reveal="up" className={s.mandateCard}>
                  <figcaption><span>Clause 14.6</span>CBSE Affiliation Bye-Laws 2018</figcaption>
                  <blockquote cite="https://www.cbse.gov.in/cbsenew/aff-bye-laws.html">
                    “The school shall arrange the medical check-up of the students at least once every year and keep a proper record of the same.”
                  </blockquote>
                  <p>Applies to every CBSE-affiliated school.</p>
                </figure>
                <figure data-reveal="up" className={s.mandateCard}>
                  <figcaption><span>Para 2.9</span>National Education Policy 2020</figcaption>
                  <blockquote cite="https://static.pib.gov.in/WriteReadData/userfiles/NEP_Final_English_0.pdf">
                    “All school children shall undergo regular health check-ups especially for 100% immunization in schools and health cards will be issued to monitor the same.”
                  </blockquote>
                  <p>Ministry of Education, Government of India.</p>
                </figure>
                <figure data-reveal="up" className={s.mandateCard}>
                  <figcaption><span>2021</span>WHO Guideline on School Health Services</figcaption>
                  <blockquote cite="https://www.who.int/publications/i/item/9789240029392">
                    “Comprehensive school health services should be implemented.”
                  </blockquote>
                  <p>A strong recommendation. The services it lists include screening for vision, hearing, oral health and nutrition problems such as anaemia.</p>
                </figure>
              </div>
              </div>
              <div data-reveal="right" className={s.mandateArt}>
                <ComplianceOwl />
              </div>
            </div>
          </div>
        </section>

        {/* 09 — Camp vs system */}
        <section className={`${s.section} ${s.campSection}`} aria-labelledby="camp-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={s.leftHead}>
              <h2 id="camp-title" className={s.h2xl}>Why a one-day health camp isn&apos;t enough</h2>
              <p>
                A camp checks children once and hands out paper reports. We screen every year and keep each child&apos;s
                results, so changes get noticed and followed up.
              </p>
            </header>
            <div data-reveal="up" className={s.versus}>
              <table className={s.versusTable}>
                <caption className={s.srOnly}>A one-day health camp compared with yearly screening by Clara</caption>
                <thead>
                  <tr>
                    <th scope="col"><span>Usual approach</span>One-day health camp</th>
                    <th scope="col"><span>With Clara</span>Yearly screening and records</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.label} data-reveal="up" style={{ "--i": i } as React.CSSProperties}>
                      <td>
                        <span className={s.cross} role="img" aria-label="No">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 7.5l9 9" /><path d="M16.5 7.5l-9 9" /></svg>
                        </span>
                        {row.camp}
                      </td>
                      <td>
                        <span className={s.tick} role="img" aria-label="Yes">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 12.5l3.6 3.6 7.4-8.2" /></svg>
                        </span>
                        {row.clara}
                        <span className={s.rowLabel}>{row.label}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.vs} aria-hidden="true">VS</div>
            </div>
          </div>
        </section>

        {/* 10 — Investment */}
        <section id="invest" className={`${s.section} ${s.tint} ${s.investSection}`} aria-labelledby="invest-title">
          <div className={s.wrapNarrow}>
            <div data-reveal="up" className={s.investHead}>
              <h2 id="invest-title" className={s.h2xl}>What it costs</h2>
              <div className={s.investRow}>
                <FeeCountdown />
                <div className={s.investCopy}>
                  <p className={s.eyebrow}>Per student, per year</p>
                  <p className={s.investLead}>
                    That share of the annual school fee covers a full year of screening and health records for one child.
                  </p>
                  <p className={s.investNote}>Parents pay the fee. The school doesn&apos;t need to buy any equipment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11 — Impact */}
        <section className={s.section} aria-labelledby="impact-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={`${s.centerHead} ${s.centerHeadTight}`}>
              <h2 id="impact-title" className={s.h2xl}>Our work so far</h2>
            </header>
            <ul className={s.impactGrid}>
              {IMPACT.map((m) => (
                <li
                  key={m.value}
                  data-reveal="up"
                  className={s.impactCard}
                >
                  <strong>{m.value}</strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 — The 360° ring */}
        <ScreeningRing faces={INDICATORS} />

        {/* 06 — Screening day */}
        <section className={s.tech} aria-labelledby="tech-title">
          <div className={s.techInner}>
            <div data-reveal="left" className={s.techVisual}>
              <CardVideo
                video="/home/school-screening-nurse.mp4"
                alt="A nurse screening a schoolgirl during a school health check"
                className={s.techVideo}
              />
            </div>
            <div data-reveal="right" className={s.techCopy}>
              <h2 id="tech-title">What screening day looks like</h2>
              <p>Every check is non-invasive and done at the school, so it&apos;s quick and stress-free for students.</p>
              <ol className={s.instruments}>
                {SCREENING_DAY.map((item, i) => (
                  <li key={item.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div><strong>{item.title}</strong>{item.text}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 07 — What you get */}
        <section id="report" className={`${s.section} ${s.tint}`} aria-labelledby="report-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={s.splitHead}>
              <div>
                <h2 id="report-title" className={s.h2lg}>What you get after each screening</h2>
              </div>
              <p>A printed report for parents, a digital record for each child and a dashboard for the school.</p>
            </header>
            <div className={s.offers}>
              <article data-reveal="up" className={s.offer}>
                <div className={`${s.offerArt} ${s.artReport}`}>
                  <Image src="/home/health-report-page-left.jpg" alt="" width={804} height={1137} sizes="124px" className={`${s.page} ${s.pageLeft}`} />
                  <Image src="/home/health-report-page-right.jpg" alt="" width={804} height={1137} sizes="124px" className={`${s.page} ${s.pageRight}`} />
                  <Image src="/home/health-report-cover.jpg" alt="Cover of a Clara printed student health report" width={804} height={1137} sizes="140px" className={`${s.page} ${s.pageFront}`} />
                  <span className={`${s.chip} ${s.chipTopRight}`}>16 pages · printed</span>
                </div>
                <div className={s.offerBody}>
                  <div className={s.offerMeta}><span>01</span><span className={s.audience}>For parents</span></div>
                  <h3>Physical report</h3>
                  <p>A printed health report for each child, given to the family.</p>
                  <Checklist
                    items={[
                      "Printed copy in hand for every student screened",
                      "Findings across all eight indicators, explained in plain language",
                      "Diet and care advice for parents",
                      "A doctor referral where needed",
                    ]}
                  />
                </div>
              </article>

              <article data-reveal="up" className={`${s.offer} ${s.offerBlue}`}>
                <div className={`${s.offerArt} ${s.artId}`}>
                  <div className={s.ring1} aria-hidden="true" />
                  <div className={s.idCard} aria-hidden="true">
                    <div className={s.idTop}>
                      <Image src={LOGO} alt="" width={1829} height={446} sizes="82px" />
                      <span>DIGITAL HEALTH ID</span>
                    </div>
                    <div className={s.idName}>Ananya S.</div>
                    <div className={s.idSub}>CLARA-S1-XXX · Class 6</div>
                    <div className={s.idYears}>
                      <div><span>2025</span>Screened</div>
                      <div className={s.idYearGreen}><span>2026</span>Compared</div>
                    </div>
                  </div>
                  <span className={`${s.chip} ${s.chipGreen} ${s.chipBottomLeft}`}>Sent on WhatsApp</span>
                </div>
                <div className={s.offerBody}>
                  <div className={s.offerMeta}><span>02</span><span className={s.audience}>For families &amp; school</span></div>
                  <h3>Digital health record</h3>
                  <p>Each child gets a Digital Health ID.</p>
                  <Checklist
                    dark
                    items={[
                      "Sent to parents on WhatsApp with your school’s logo",
                      "Parents can open it any time",
                      "Results compared year on year",
                      "Stays with the child across school years",
                    ]}
                  />
                </div>
              </article>

              <article data-reveal="up" className={s.offer}>
                <div className={`${s.offerArt} ${s.artDash}`}>
                  <div className={s.dash} aria-hidden="true">
                    <div className={s.dashTop}><span>School overview</span><span>ALL GRADES</span></div>
                    <div className={s.dashRows}>
                      {DASHBOARD.map((d) => (
                        <div key={d.label} className={s.dashRow}>
                          <span>{d.label}</span>
                          <div><div style={{ width: `${d.pct}%`, background: d.color }} /></div>
                          <span>{d.pct}%</span>
                        </div>
                      ))}
                    </div>
                    <div className={s.dashTabs}><span className={s.dashTabOn}>Class-wise</span><span>Grade-wise</span><span>Year-on-year</span></div>
                  </div>
                  <span className={`${s.chip} ${s.chipBottomRight}`}>Sample view</span>
                </div>
                <div className={s.offerBody}>
                  <div className={s.offerMeta}><span>03</span><span className={s.audience}>For school leadership</span></div>
                  <h3>Analytics and dashboard</h3>
                  <p>Results by class, by grade and for the whole school.</p>
                  <Checklist
                    items={[
                      "Class-wise and grade-wise results",
                      "Year-on-year trends across the whole school",
                      "Health records kept as CBSE bye-law 14.6 requires",
                      "A list of students who need follow-up",
                    ]}
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 12 — Close */}
        <section id="book" className={s.book} aria-labelledby="book-title">
          <div className={s.bookInner}>
            <figure data-reveal="up" className={s.proverb}>
              <blockquote className={s.proverbRow}>
                <div>
                  <p className={s.proverbLead}>“The best time to plant a tree was</p>
                  <p className={s.proverbThen}>20 years ago.<span aria-hidden="true" /></p>
                </div>
                <div className={s.proverbRight}>
                  <p className={s.proverbLeadNow}>The second best time is</p>
                  <p className={s.proverbNow}>now.”</p>
                </div>
              </blockquote>
              <div className={s.timeline} aria-hidden="true">
                <div className={s.timelineLine} />
                <span className={s.timelineThen} />
                <span className={s.timelineThenLabel}>THEN</span>
                <span className={s.timelineNow} />
                <span className={s.timelineNowLabel}>TODAY</span>
              </div>
            </figure>
            <h2 id="book-title" data-reveal="up" className={s.bookTitle}>Book a demo for your school</h2>
            <p data-reveal="up" className={s.bookLead}>
              We&apos;ll show you the platform, walk you through a sample report and explain how screening day works at your school.
            </p>
            <div data-reveal="up" className={s.bookCard}>
              <a href="#book" className={s.btnBig}>{CTA_LABEL}</a>
            </div>
            <p data-reveal="up" className={s.bookFine}>Introductory pricing for the first 10 schools in 2026.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
