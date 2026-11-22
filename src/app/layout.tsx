import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/providers/AuthProvider";

// Note: Google Fonts (next/font/google) is unreachable in this environment —
// replaced the Geist fonts with system fonts (v1). Re-add with next/font/local later.
export const metadata: Metadata = {
  title: "SEAblings Only — ASEAN News Feed",
  description:
    "A multilingual news and community feed for ASEAN: politics, social issues, community stories, culture and local events.",
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
