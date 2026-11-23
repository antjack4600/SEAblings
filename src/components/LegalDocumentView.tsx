// src/components/LegalDocumentView.tsx — shared renderer for authored legal documents.
import type { LegalDocument } from "@/i18n/legal";
import Footer from "@/components/Footer";

export default function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <main className="min-h-full px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-3xl font-bold text-foreground">{doc.title}</h1>
        <p className="text-sm leading-relaxed text-foreground/70">{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-foreground/80">{section.heading}</h2>
            <p className="mt-1 text-sm leading-relaxed text-foreground/70">{section.body}</p>
          </section>
        ))}
        {doc.disclaimer && (
          <aside
            data-legal-disclaimer
            className="rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm leading-relaxed text-foreground/70"
          >
            {doc.disclaimer}
          </aside>
        )}
        <Footer />
      </div>
    </main>
  );
}
