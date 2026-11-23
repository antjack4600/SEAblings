// src/app/terms/page.tsx — SEAblings Only terms of use, authored in 17 languages.
"use client";
import { useLanguageStore } from "@/i18n/store";
import { getLegal } from "@/i18n/legal";
import LegalDocumentView from "@/components/LegalDocumentView";

export default function TermsPage() {
  const { lang } = useLanguageStore();
  return <LegalDocumentView doc={getLegal(lang).terms} />;
}
