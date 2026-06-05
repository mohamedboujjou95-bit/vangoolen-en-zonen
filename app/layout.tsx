import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Van Goolen & Zonen — Algemeene Loodgieters Gilde | Binnen 2 Uur",
    template: "%s | Van Goolen & Zonen",
  },
  description:
    "Gecertificeerde gilde-loodgieters binnen 2 uur aan uw deur. Vaste gildetarieven, geen verrassingen. Lekkages, rioolverstopping, cv-ketel storing — wij lossen het op.",
  keywords: [
    "spoed loodgieter",
    "loodgieter binnen 2 uur",
    "lekkage reparatie",
    "rioolverstopping",
    "cv-ketel storing",
    "vaste prijs loodgieter",
    "Van Goolen loodgieters",
    "gilde loodgieter",
    "betrouwbare loodgieter",
  ],
  authors: [{ name: "Van Goolen & Zonen B.V." }],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://vangoolen.nl",
    siteName: "Van Goolen & Zonen",
    title: "Van Goolen & Zonen — Algemeene Loodgieters Gilde",
    description:
      "Gecertificeerde gilde-loodgieters. Vaste tarieven. Binnen 2 uur ter plaatse.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Van Goolen & Zonen — Algemeene Loodgieters Gilde",
    description: "Gecertificeerde gilde-loodgieters. Vaste tarieven. Binnen 2 uur.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-cream font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
