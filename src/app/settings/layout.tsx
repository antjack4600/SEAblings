import { SITE_NAME } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Settings: Display, Password, Account`,
  description: "Settings for SEAblings Only — choose your language and dark mode, and manage your password and account on the community news feed of ASEAN.",
  openGraph: {
    url: "/settings",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Settings" }],
  },
  alternates: { canonical: "/settings" },
};

export default function SettingsLayout({ children }: LayoutProps<"/settings">) {
  return children;
}
