// src/app/about/page.tsx — About SEAblings Only.
"use client";
import { t } from "@/i18n/t";
import { useLanguageStore } from "@/i18n/store";
import { SITE_URL } from "@/lib/siteUrl";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const { lang } = useLanguageStore();
  const m = t(lang);
  return (
    <main className="min-h-full px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: m.aboutTitle,
            url: `${SITE_URL}/about`,
          }),
        }}
      />
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-3xl font-bold text-foreground">{m.aboutTitle}</h1>
        <p className="text-sm leading-relaxed text-foreground/70">
          SEAblings Only is the community news feed of ASEAN — the news of your country and the
          region, in 17 languages, free to join. Read the stories that matter to you, write
          comments on the posts you care about, and share what you find.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          The site brings news from Indonesia, Malaysia, Thailand, Vietnam, Myanmar, Laos,
          Cambodia, the Philippines, Brunei and East Timor — stories from community posters
          across the region. Anyone can comment or react to the posts, and you can suggest
          topics through the suggestions form: Anthony reviews every suggestion before it goes
          up. The community discussion is open to everyone — read the feed, write comments,
          and share what matters to you.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          SEAblings is the project name — it follows like tides. The community is the source of
          the news and the discussion. The app is built on Next.js, Firebase for accounts, and
          better-sqlite3 for the community posts and comments. The site is free to read, free to
          join, and always open to new posts from across ASEAN — Indonesia, Malaysia,
          Thailand, Vietnam, Myanmar, Laos, Cambodia, the Philippines, Brunei and East Timor.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          What you can do on SEAblings Only — read the community feed of ASEAN, write comments
          on the posts you care about, and share your own observations about the news your
          region covers. Stories from every country of Southeast Asia are part of the feed,
          so you always have a view from both ends of the region.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          If you have a story to tell or want to react to one, the suggestions form is the way
          to ask — Anthony reviews every suggestion before it goes up, so you can ask for
          topics or stories you want to see. Comments are welcome on every post, and the whole
          site is free to read and free to join.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          The project began as a way to follow Southeast Asian news without jumping between a
          dozen national outlets. SEAblings Only gathers those threads in one feed and lets
          readers add context from where they live. A story about a river, an election or a
          football match reads differently in each country, and the discussion is often the most
          useful part of it.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          The audience is anyone with a connection to the region: residents, students,
          journalists, and people who have lived abroad and want to keep up. You do not need to
          write in a second language to take part — pick one of the 17 options and the interface
          follows you. Preference changes apply immediately and are saved with your account.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          Translation is part of the feed rather than an afterthought: a story from Manila can be
          discussed by someone in Jakarta or Yangon, and a reader in Bangkok can follow a report
          written in Vietnamese. The site is free to read, with no advertising to wade through,
          and the app is also available on the App Store and Google Play for people who want the
          feed on their phone.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          Questions are welcome through the <a href="/contact" className="text-gold underline hover:text-gold/90">contact</a> page, and your{" "}
          <a href="/profile" className="text-gold underline hover:text-gold/90">profile</a> and{" "}
          <a href="/settings" className="text-gold underline hover:text-gold/90">settings</a> are always available from the site links.
          When you are ready, open the <a href="/feed" className="text-gold underline hover:text-gold/90">community feed</a> to read today's stories.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70">
          Submissions are reviewed before publication. The form accepts topics, videos and
          events, and Anthony decides what goes up. That keeps the feed short enough to read and
          cuts the noise that makes regional news hard to follow. Corrections and thoughtful
          disagreement are welcome in the comments on any story.
        </p>
        <Footer />
      </div>
    </main>
  );
}
