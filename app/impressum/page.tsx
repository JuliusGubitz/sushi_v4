export default function ImpressumPage() {
  return (
    <main className="flex-1 pt-24 pb-16 px-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Impressum
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Fügen Sie hier Ihr Impressum ein.
          </p>
        </div>
      </div>
    </main>
  );
}
