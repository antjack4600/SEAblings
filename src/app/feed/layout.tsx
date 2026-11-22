import { SITE_NAME } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Community Feed`,
  description: "The community news feed of ASEAN — read stories from Indonesia, Malaysia, Thailand, Vietnam, Myanmar, Laos, Cambodia and the Philippines. Free to join.",
  openGraph: {
    url: "/feed",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Community Feed" }],
  },
  alternates: { canonical: "/feed" },
};

export default function FeedLayout({ children }: LayoutProps<"/feed">) {
  return children;
}
