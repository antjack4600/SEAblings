import { SITE_NAME } from "@/lib/siteUrl";
import Footer from "@/components/Footer";

export const metadata = {
  title: `${SITE_NAME} — Contact Us`,
  description:
    "How to contact SEAblings Only — the community news feed of ASEAN: questions, suggestions and feedback to Anthony.",
  openGraph: {
    url: "/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Contact Us" }],
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return children;
}
