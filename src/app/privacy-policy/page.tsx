// src/app/privacy-policy/page.tsx — SEAblings Only privacy policy, authored in 17 languages.
"use client";
import { useLanguageStore } from "@/i18n/store";
import { getLegal } from "@/i18n/legal";
import LegalDocumentView from "@/components/LegalDocumentView";

export default function PrivacyPolicyPage() {
  const { lang } = useLanguageStore();
  return <LegalDocumentView doc={getLegal(lang).privacy} />;
}
