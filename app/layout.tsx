import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { LOGO, OG_DEFAULTS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Headings: Manrope. Body: Inter. Both self-hosted by Next.js at build time.
const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Digital School Health Screening in India`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "school health screening",
    "student health check-up",
    "digital health record for students",
    "non-invasive health screening",
    "CBSE annual medical checkup",
    "NEP 2020 health card",
    "school health program India",
  ],
  openGraph: { ...OG_DEFAULTS },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1463D8",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${LOGO}`,
  description: SITE_DESCRIPTION,
  foundingDate: "2018",
  areaServed: "IN",
  founder: [
    { "@type": "Person", name: "Dr. Sanket Chavan", jobTitle: "Founder & CEO" },
    { "@type": "Person", name: "Mahesh Reddy", jobTitle: "Co-founder & CTO" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        {children}
      </body>
    </html>
  );
}
