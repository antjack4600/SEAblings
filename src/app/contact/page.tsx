// src/app/contact/page.tsx — Contact SEAblings Only.
"use client";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import { SITE_URL } from "@/lib/siteUrl";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  return (
    <main className="min-h-full px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: m.contactTitle,
            url: `${SITE_URL}/contact`,
          }),
        }}
      />
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-3xl font-bold text-foreground">{m.contactTitle}</h1>
        <p className="text-sm leading-relaxed text-foreground/70">
          Questions, suggestions or feedback about SEAblings Only? Contact Anthony at{" "}
          <a className="text-gold underline hover:text-gold/90" href="mailto:AntJack4600@gmail.com">
            AntJack4600@gmail.com
          </a>
          . Security reports and vulnerability disclosures go to the same address — see the
          disclosure policy in the security.txt at{" "}
          <a className="text-gold underline hover:text-gold/90" href="/.well-known/security.txt">
            /.well-known/security.txt
          </a>
          .
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          SEAblings Only is a free community — the feed is open to everyone, the suggestions page
          is always accepting ideas, and the profile pages follow you across the site. If you
          would like to feature your community or a story on the site, the suggestions form is the
          way to ask. For anything else, the email above reaches Anthony directly.
        </p>
        <Footer />
      </div>
    </main>
  );
}
