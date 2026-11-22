import { SITE_NAME } from "@/lib/siteUrl";

export const metadata = {
  title: `${SITE_NAME} — Sign in or Create Account`,
  description: "Join the community news feed of ASEAN. Sign in or create an account — free, email-only, with a click-to-verify link to confirm your account.",
  openGraph: {
    url: "/sign-in",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SEAblings Only — Sign in" }],
  },
  alternates: { canonical: "/sign-in" },
};

export default function SignInLayout({ children }: LayoutProps<"/sign-in">) {
  return children;
}
