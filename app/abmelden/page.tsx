"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function AbmeldenContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!email) {
      setStatus("done");
      return;
    }

    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"));
  }, [email]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center space-y-6">
        {status === "loading" ? (
          <p className="text-muted-foreground">Wird verarbeitet…</p>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Erfolgreich abgemeldet
            </h1>
            <p className="text-muted-foreground">
              Sie wurden erfolgreich von allen E-Mails abgemeldet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Zur Startseite
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function AbmeldenPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Wird verarbeitet…</p>
      </main>
    }>
      <AbmeldenContent />
    </Suspense>
  );
}
