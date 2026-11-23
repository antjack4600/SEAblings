// src/app/layout.tsx — SEAblings Only root layout (metadata base for the site).
import type { Metadata, Viewport } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/siteUrl";
import "./globals.css";
import { AuthProvider } from "@/app/providers/AuthProvider";

// Note: Google Fonts (next/font/google) is unreachable in this environment —
// replaced the Geist fonts with system fonts (v1). Re-add with next/font/local later.
const DESCRIPTION =
  "A community news feed of ASEAN — news from your country and the region in 17 languages, free to join. Politics and social issues from around the region.";

// SITE_URL is set at build time: :3100 for the prod build, :3101 for dev.
// Child layouts use relative paths, which Next resolves against metadataBase.
export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  alternates: { canonical: "/" },
  title: "SEAblings Only — ASEAN News Feed",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEAblings Only — ASEAN News Feed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

// Let the virtual keyboard resize the layout viewport so short-screen sign-in
// controls are not covered on Android/Chrome (iOS is handled in page.tsx).
export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
