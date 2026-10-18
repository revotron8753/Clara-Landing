// Single source of truth for site-wide SEO values.
// Set SITE_URL (e.g. https://www.yourdomain.com) in your hosting environment so
// canonical URLs, the sitemap and social previews point at the live domain.
// Pages are prerendered, so it must be set when `next build` runs.
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Clara Healtonation";

export const SITE_DESCRIPTION =
  "India's first non-invasive digital school health screening system. One screening, one digital health record and one longitudinal view of every child, for CBSE and NEP 2020 compliant schools.";

export const LOGO = "/home/clara-healtonation-logo.png";

export const CTA_LABEL = "Book a 15-Minute School Demo";

// Next.js replaces (not merges) openGraph per page, so pages spread these in.
export const OG_DEFAULTS = {
  type: "website" as const,
  siteName: SITE_NAME,
  locale: "en_IN",
  images: [{ url: "/home/digital-school-health-screening.png", width: 1873, height: 840, alt: SITE_NAME }],
};
