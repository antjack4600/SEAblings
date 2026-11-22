// src/components/AppStoreBadges.tsx — app-store badges (bottom of the landing page)
export default function AppStoreBadges() {
  return (
    <div className="flex items-center gap-4">
      <img src="/badge_app_store.png" alt="App Store" className="h-9 w-auto" />
      <img src="/badge_google_play.png" alt="Google Play" className="h-9 w-auto" />
    </div>
  );
}
