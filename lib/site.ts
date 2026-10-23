// Single source of truth for site-wide SEO values.
// Set SITE_URL (e.g. https://www.yourdomain.com) in your hosting environment so
// canonical URLs, the sitemap and social previews point at the live domain.
// Pages are prerendered, so it must be set when `next build` runs.
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Clara Healtonation";

export const SITE_DESCRIPTION =
  "Non-invasive health screening for schools in India, with a digital health record for every student. Helps schools meet the CBSE and NEP 2020 requirement for annual health checkups.";

export const LOGO = "/home/clara-healtonation-logo.png";

export const CTA_LABEL = "Book a 15-minute demo";

// Next.js replaces (not merges) openGraph per page, so pages spread these in.
export const OG_DEFAULTS = {
  type: "website" as const,
  siteName: SITE_NAME,
  locale: "en_IN",
  images: [{ url: "/home/clara-school-courtyard-banner.png", width: 1874, height: 839, alt: SITE_NAME }],
};
