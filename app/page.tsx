import type { Metadata } from "next";
import Image from "next/image";
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
    n: "01", title: "Screen", text: "Comprehensive preventive screening.", accent: "green",
    img: "/home/pillars/screen-school-eye-examination.png", w: 1536, h: 1024,
    alt: "A doctor examining a schoolgirl's eyes during a school health screening",
  },
  {
    n: "02", title: "Record", text: "Digital health profile for every student.", accent: "blue",
    img: "/home/pillars/record-digital-student-health-profile.png", w: 1672, h: 941,
    alt: "A student's digital health profile with health charts on a tablet",
  },
  {
    n: "03", title: "Track", text: "Year-on-year health trends.", accent: "green",
    img: "/home/pillars/track-principal-health-dashboard.png", w: 1672, h: 941,
    alt: "A school principal reviewing student health trends on a dashboard",
  },
  {
    n: "04", title: "Act", text: "Recommendations and referrals where required.", accent: "blue",
    img: "/home/pillars/act-doctor-parent-consultation.png", w: 1672, h: 941,
    alt: "A doctor going over a health report with a student and her parent",
  },
];

const REALITY = [
  {
    value: "1 in 4", text: "students have undiagnosed vision problems", tilt: -4, highlight: true,
    img: "/home/reality/vision-eye-screening.png", pos: "83%", alt: "A schoolgirl having her eyes tested during a school vision screening",
  },
  {
    value: "60%", text: "students have dental related issues", tilt: -1.5,
    img: "/home/reality/dental-checkup.png", pos: "74%", alt: "A dentist checking a schoolgirl's teeth",
  },
  {
    value: "50%", text: "students have mild, moderate or severe anemia", tilt: 1.5,
    img: "/home/reality/anemia-blood-test.png", pos: "58%", alt: "A schoolgirl having a blood test for anemia",
  },
  {
    value: "30%", text: "students have BMI related issues", tilt: 4,
    img: "/home/reality/bmi-height-check.png", pos: "89%", alt: "A nurse measuring a schoolgirl's height for BMI",
  },
];

const COMPARISON = [
  { label: "Timeline", camp: "A single-day snapshot of each child", clara: "A baseline for every child, re-measured every year" },
  { label: "Record", camp: "Paper report, rarely revisited", clara: "Digital health record the family keeps" },
  { label: "Follow-up", camp: "Findings noted, follow-up left to chance", clara: "Recommendations and referrals where required" },
  { label: "Tracking", camp: "No comparison with last year", clara: "Year-on-year trends for each student" },
  { label: "Leadership", camp: "No view for school leadership", clara: "Class and grade analytics for leadership" },
];

const SPEND = [
  { label: "Tuition & extra classes", bar: 100, alpha: 0.34, amount: "₹18,000–30,000" },
  { label: "Junk food & entertainment", bar: 72, alpha: 0.28, amount: "₹12,000–20,000" },
  { label: "School trips & other", bar: 58, alpha: 0.24, amount: "₹10,000–15,000" },
  { label: "Books & extra materials", bar: 46, alpha: 0.2, amount: "₹6,000–12,000" },
];

const IMPACT = [
  { value: "30,000+", text: "students screened", tilt: -4 },
  { value: "25+", text: "partner schools", tilt: -2 },
  { value: "6,500+", text: "vision problems identified & corrected", tilt: 0, tone: "green" },
  { value: "4,800+", text: "anemia cases detected & treated", tilt: 2 },
  { value: "60%", text: "of students had previously undetected health issues", tilt: 4, tone: "blue" },
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
    { title: "Vision Screening", text: "The blindfold most often missed. Spot vision screener, both eyes." },
  ],
];

const INSTRUMENTS = [
  "Non-Invasive Hb Machine",
  "Spot Vision Screener",
  "Portable Spirometer",
  "Digital Stethoscope",
  "Digital BMI Scale",
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
              <p className={s.pill}>Student Health Intelligence</p>
              <h1 id="hero-title" className={s.heroTitle}>
                Every school checks health.<br /><span className={s.blue}>Almost none can see it.</span>
              </h1>
              <p className={s.cueText}>A child can pass every exam and still be seeing the board through a blur.</p>
            </div>
          </div>
          <div data-cue="0.24,0.44" className={`${s.cue} ${s.cueRight} ${s.cueHidden}`}>
            <div className={s.cueBox}>
              <p className={s.eyebrow}>The invisible variable</p>
              <h2 className={s.cueTitle}>
                80% of learning outcomes are linked to <span className={s.blue}>physical and mental well-being</span>.
              </h2>
              <p className={s.cueText}>If health is invisible, performance becomes unpredictable.</p>
            </div>
          </div>
          <div data-cue="0.48,0.70" className={`${s.cue} ${s.cueLeft} ${s.cueHidden}`}>
            <div className={s.cueBox}>
              <h2 className={s.cueTitle}>
                A health camp sees a child once. <span className={s.green}>Clara follows every child, year after year.</span>
              </h2>
            </div>
          </div>
          <div data-cue="0.76,1.0" className={`${s.cue} ${s.cueRight} ${s.cueHidden}`}>
            <div className={`${s.cueBox} ${s.cueBoxWide}`}>
              <p className={s.eyebrow}>The reveal</p>
              <h2 className={`${s.cueTitle} ${s.cueTitleBig}`}>
                We reveal the gift of <span className={s.green}>school health</span>.
              </h2>
              <p className={s.cueText}>
                A longitudinal health intelligence system for every student, built on SMART, non-invasive screening.
              </p>
              <div className={s.cueActions}>
                <a href="#book" className={s.btnPrimary}>{CTA_LABEL}</a>
                <a href="#why" className={s.btnGhost}>Why Clara</a>
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
                src="/home/digital-school-health-screening.png"
                alt="Clara's digital school health screening in action"
                fill
                sizes="(max-width: 640px) 300vw, 1700px"
                quality={85}
                className={s.bannerImg}
              />
              <div className={s.bannerShade} />
              <div className={s.bannerText}>
                <p className={s.bannerBadge}><span aria-hidden="true" />A first for India</p>
                <h2 className={s.bannerTitle}>
                  <span className={s.highlight}>India’s first</span> non-invasive digital school health screening system
                </h2>
              </div>
            </div>
            </div>
            <div className={s.whyFit}>
            <header data-reveal="up" className={s.centerHead}>
              <p className={s.eyebrow}>Why schools choose Clara</p>
              <h2 id="why-title" className={`${s.h2xl} ${s.whyTitle}`}>
                One screening. One digital health record. <span className={s.blue}>One longitudinal view of every child.</span>
              </h2>
            </header>
            <ol className={s.pillars}>
              {PILLARS.map((p) => (
                <li key={p.n} data-reveal="up" className={s.pillar}>
                  <Image src={p.img} alt={p.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 999px) 600px, 700px" quality={85} className={s.pillarImg} />
                  <div className={s.pillarTop}>
                    <span className={s.pillarNum}>{p.n}</span>
                    <span className={p.accent === "green" ? s.ruleGreen : s.ruleBlue} aria-hidden="true" />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
            <p className={s.centerNote}>
              Health, managed like academics: a baseline for every child, measured every year, with analytics for school leadership.
            </p>
            </div>
          </div>
        </section>

        {/* 02 — The reality */}
        <section id="reality" className={`${s.section} ${s.realitySection}`} aria-labelledby="reality-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={s.splitHead}>
              <h2 id="reality-title" className={`${s.h2lg} ${s.realityTitle}`}>The reality inside schools</h2>
              <p>Most schools lack individual health baselines. These are the numbers we keep finding.</p>
            </header>
            <ul className={s.realityGrid}>
              {REALITY.map((r) => (
                <li key={r.value} data-tilt={r.tilt} data-reveal="up" className={`${s.statCard} ${r.highlight ? s.statCardBlue : ""}`}>
                  <Image src={r.img} alt={r.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 999px) 600px, 960px" quality={85} className={s.statImg} style={{ "--pos": r.pos } as React.CSSProperties} />
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
            <h2 id="mandate-title" data-reveal="up" className={s.quoteTitle}>
              “Compliance protects your affiliation. <span className={s.blue}>Excellence protects your reputation.</span>”
            </h2>
            <div className={s.mandate}>
              <div className={s.mandateCards}>
                <figure data-reveal="up" className={s.mandateCard}>
                  <figcaption>CBSE CIRCULAR 14.6</figcaption>
                  <blockquote>“Every school SHALL arrange annual medical checkups and maintain proper health records.”</blockquote>
                  <p>Binding on all affiliated schools.</p>
                </figure>
                <figure data-reveal="up" className={s.mandateCard}>
                  <figcaption>NEP 2020</figcaption>
                  <blockquote>“Regular health checkups and health cards shall be provided to ALL school children.”</blockquote>
                  <p>It&apos;s not optional. It&apos;s mandatory.</p>
                </figure>
              </div>
              <div data-reveal="right" className={s.mandateArt}>
                <Image
                  src="/home/clara-owl-health-compliance-checklist.png"
                  alt="Clara owl holding a health compliance checklist"
                  width={1374}
                  height={1145}
                  sizes="(max-width: 800px) 92vw, 560px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 09 — Camp vs system */}
        <section className={s.section} aria-labelledby="camp-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={s.leftHead}>
              <p className={s.eyebrow}>Beyond the health camp</p>
              <h2 id="camp-title" className={s.h2xl}>
                A camp is an event. <span className={s.blue}>Health is a record that grows.</span>
              </h2>
              <p>
                Screening once a year meets the mandate. Building a record that compares every child against their own
                history is what turns findings into outcomes.
              </p>
            </header>
            <div data-reveal="up" className={s.versus}>
              <table className={s.versusTable}>
                <caption className={s.srOnly}>A one-time health camp compared with Clara&apos;s longitudinal system</caption>
                <thead>
                  <tr>
                    <th scope="col"><span>The usual way</span>A one-time health camp</th>
                    <th scope="col"><span>The Clara way</span>Clara&apos;s longitudinal system</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} data-reveal="up">
                      <td><span className={s.cross} aria-label="No">✕</span>{row.camp}</td>
                      <td><span className={s.tick} aria-label="Yes">✓</span>{row.clara}<span className={s.rowLabel}>{row.label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={s.vs} aria-hidden="true">VS</div>
            </div>
          </div>
        </section>

        {/* 10 — Investment */}
        <section id="invest" className={`${s.section} ${s.tint}`} aria-labelledby="invest-title">
          <div className={s.wrapNarrow}>
            <div data-reveal="up" className={s.investHead}>
              <h2 id="invest-title" className={s.h2xl}>An investment, not an expense</h2>
              <div className={s.investRow}>
                <div className={s.onePct}>1<span>%</span></div>
                <div className={s.investCopy}>
                  <p className={s.eyebrow}>Nearly 1% of school fees</p>
                  <p className={s.investLead}>
                    For about one rupee in every hundred spent on school, every child gets a year of health, measured and on record.
                  </p>
                  <p className={s.investNote}>Parent-paid model — zero capital investment for the school.</p>
                </div>
              </div>
            </div>
            <div data-reveal="up" className={s.spend}>
              <h3 className={s.spendTitle}>What a family already spends each year</h3>
              <dl className={s.spendList}>
                {SPEND.map((row) => (
                  <div key={row.label} className={s.spendRow}>
                    <dt>{row.label}</dt>
                    <dd className={s.spendTrack}>
                      <span data-bar={row.bar} style={{ background: `rgba(20,99,216,${row.alpha})` }} />
                    </dd>
                    <dd>{row.amount}</dd>
                  </div>
                ))}
                <div className={`${s.spendRow} ${s.spendRowClara}`}>
                  <dt>Clara&apos;s health screening</dt>
                  <dd className={s.spendTrack}><span data-bar={5} style={{ background: "#12A57C" }} /></dd>
                  <dd>A small share, a lifetime of value</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 11 — Impact */}
        <section className={s.section} aria-labelledby="impact-title">
          <div className={s.wrap}>
            <header data-reveal="up" className={`${s.centerHead} ${s.centerHeadTight}`}>
              <p className={s.eyebrow}>Our collective impact</p>
              <h2 id="impact-title" className={s.h2xl}>This isn&apos;t transactional. It&apos;s transformational.</h2>
            </header>
            <ul className={s.impactGrid}>
              {IMPACT.map((m) => (
                <li
                  key={m.value}
                  data-tilt={m.tilt}
                  data-reveal="up"
                  className={`${s.impactCard} ${m.tone === "green" ? s.impactGreen : m.tone === "blue" ? s.impactBlue : ""}`}
                >
                  <strong>{m.value}</strong>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
            <p data-reveal="up" className={s.movement}>You&apos;re not joining a service. You&apos;re joining a movement.</p>
          </div>
        </section>

        {/* 05 — The 360° ring */}
        <ScreeningRing faces={INDICATORS} />

        {/* 06 — SMART tech */}
        <section className={s.tech} aria-labelledby="tech-title">
          <div className={s.techInner}>
            <div data-reveal="left" className={s.techVisual}>
              {/* Add a photo of all the instruments together here (e.g. public/home/screening-instruments.jpg). */}
              <ul className={s.techTags}>
                <li>No needles</li>
                <li className={s.techTagGreen}>No fear</li>
              </ul>
            </div>
            <div data-reveal="right" className={s.techCopy}>
              <p className={s.eyebrow}>SMART screening</p>
              <h2 id="tech-title">
                State of the art latest <span className={s.blue}>non invasive technologies</span>
              </h2>
              <p>Non-invasive. Fast. Accurate. An environment that changes the entire approach — no fear, just curiosity.</p>
              <ol className={s.instruments}>
                {INSTRUMENTS.map((name, i) => (
                  <li key={name}><span>{String(i + 1).padStart(2, "0")}</span>{name}</li>
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
                <p className={s.eyebrow}>What your school gets</p>
                <h2 id="report-title" className={s.h2lg}>
                  Three pillars, <span className={s.blue}>for every student screened.</span>
                </h2>
              </div>
              <p>One screening gives the parent a report, the child a lasting record, and the school a dashboard.</p>
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
                  <p>A personalised, printed health report for every child, in the family’s hands.</p>
                  <Checklist
                    items={[
                      "Printed copy in hand for every student screened",
                      "Findings across all eight indicators, explained in plain language",
                      "Customized parental guidance & diet recommendation",
                      "Doctor visit recommendation where needed",
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
                  <p>A unique Digital Health ID for every child.</p>
                  <Checklist
                    dark
                    items={[
                      "Delivered to parents on WhatsApp, carrying your school’s logo",
                      "Secure digital access anytime",
                      "Year-on-year comparison tracking",
                      "One record that grows with the child, every year",
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
                  <p>Health, visible at the level you manage it: class, grade, and school.</p>
                  <Checklist
                    items={[
                      "Class-wise and grade-wise analytics for leadership",
                      "Year-on-year trends across the whole school",
                      "Proper health records, maintained as CBSE 14.6 requires",
                      "Clear view of which students need follow-up",
                    ]}
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 12 — Close */}
        <section id="book" className={s.book} aria-labelledby="book-title">
          <div className={s.bookGlow} />
          <div className={s.bookInner}>
            <figure data-reveal="up" className={s.proverb}>
              <blockquote className={s.proverbRow}>
                <div>
                  <p className={s.proverbLead}>“The best time to plant a tree was</p>
                  <p className={s.proverbThen}>20 years ago.<span aria-hidden="true" /></p>
                </div>
                <div className={s.proverbRight}>
                  <p className={s.proverbLeadGreen}>The second best time is</p>
                  <p className={s.proverbNow}>now.<span>”</span></p>
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
            <h2 id="book-title" data-reveal="up" className={s.bookTitle}>
              We reveal the gift of health. <span className={s.blue}>You nurture the gift of education.</span>
            </h2>
            <p data-reveal="up" className={s.bookLead}>Together, we create unstoppable children.</p>
            <div data-reveal="up" className={s.bookCard}>
              <a href="#book" className={s.btnBig}>{CTA_LABEL}</a>
              <ul className={s.bookPoints}>
                <li>See the platform</li>
                <li>Explore a sample report</li>
                <li>Understand the school implementation</li>
              </ul>
            </div>
            <p data-reveal="up" className={s.bookFine}>Exclusive for the first 10 schools · Healthy Start 2026</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
