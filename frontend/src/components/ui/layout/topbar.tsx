export function TopBar() {
  return (
    <header className="w-full bg-background text-foreground shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 font-bold">
          <span className="text-xl">🔗</span>
          <span className="text-lg text-blue-500">URL Shortener</span>
        </div>
      </div>
    </header>
  );
}
