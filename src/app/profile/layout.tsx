import { SITE_NAME } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Your Public Details`,
  description: "Edit your details on SEAblings Only — username, name, country, language, bio and other settings. Set it up once, it follows you across the site.",
  openGraph: {
    url: "/profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Your Details" }],
  },
  alternates: { canonical: "/profile" },
};

export default function ProfileLayout({ children }: LayoutProps<"/profile">) {
  return children;
}
