import { SITE_NAME } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Terms of Use`,
  description:
    "Terms of use for SEAblings Only, including a disclaimer about ASEAN country names and flags.",
  openGraph: {
    url: "/terms",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Terms of Use" }],
  },
  alternates: { canonical: "/terms" },
};

export default function TermsLayout({ children }: LayoutProps<"/terms">) {
  return children;
}
