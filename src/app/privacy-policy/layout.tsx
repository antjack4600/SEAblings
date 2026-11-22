import { SITE_NAME, SITE_URL } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Privacy policy`,
  description: "What SEAblings Only collects and how it protects you.",
  openGraph: {
    url: `${SITE_URL}/privacy-policy`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "SEAblings Only — Privacy policy" }],
  },
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyLayout({ children }: LayoutProps<"/privacy-policy">) {
  return children;
}