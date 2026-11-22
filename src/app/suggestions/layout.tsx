import { SITE_NAME } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Submit Suggestions`,
  description: "Suggest a topic, video, or event for SEAblings Only — Anthony reviews every suggestion, and will come back to you when he has an answer.",
  openGraph: {
    url: "/suggestions",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Suggestions" }],
  },
  alternates: { canonical: "/suggestions" },
};

export default function SuggestionsLayout({ children }: LayoutProps<"/suggestions">) {
  return children;
}
