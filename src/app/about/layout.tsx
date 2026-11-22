import { SITE_NAME } from "@/lib/siteUrl";
import Footer from "@/components/Footer";

export const metadata = {
  title: `${SITE_NAME} — About the Community News Feed`,
  description:
    "About SEAblings Only — the community news feed of ASEAN: read the stories of your country and the region, in 17 languages, free to join and read.",
  openGraph: {
    url: "/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — About the Community News Feed" }],
  },
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
