export default function AppStoreBadges() {
  return (
    <div className="flex items-center gap-4">
      <img src="/badge_app_store.png" alt="App Store" width={144} height={36} className="h-9 w-auto" />
      <img src="/badge_google_play.png" alt="Google Play" width={144} height={36} className="h-9 w-auto" />
    </div>
  );
}
