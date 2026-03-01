"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Download } from "lucide-react";

const TEMPLATE_DOWNLOAD_PATH = "/template/push-up-tube-template.ai";

interface CustomizerIntroProps {
  onUploadComplete: (imageDataUrl: string) => void;
}

export function CustomizerIntro({ onUploadComplete }: CustomizerIntroProps) {
  const [error, setError] = useState<string | null>(null);

  const readFileAsDataUrl = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === "string") {
        setError(null);
        onUploadComplete(dataUrl);
      }
    };
    reader.onerror = () => setError("Datei konnte nicht gelesen werden");
    reader.readAsDataURL(file);
  }, [onUploadComplete]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        setError("Datei zu groß. Max. 5 MB.");
        return;
      }
      if (file.type === "image/png" || file.type === "image/jpeg") {
        readFileAsDataUrl(file);
      } else {
        setError("Nur PNG und JPG werden unterstützt.");
      }
    },
    [readFileAsDataUrl]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        if (file.size > 5 * 1024 * 1024) {
          setError("Datei zu groß. Max. 5 MB.");
          return;
        }
        readFileAsDataUrl(file);
      } else {
        setError("Nur PNG und JPG werden unterstützt.");
      }
    },
    [readFileAsDataUrl]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Zurück</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              PUSH UP SUSHI
            </span>
            <span className="text-sm font-normal text-muted-foreground">Customizer</span>
          </div>
        </nav>
      </header>

      <main className="pt-[4.5rem] min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="max-w-2xl w-full space-y-10">
          {/* Visueller Block: 2D Vorlage → Tube */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
              So wird Ihre Grafik zur Tube
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* 2D Vorlage */}
              <div className="text-center">
                <div className="w-32 h-44 border-2 border-dashed border-muted-foreground/40 rounded flex items-center justify-center bg-muted/30">
                  <span className="text-xs text-muted-foreground font-mono">157×220</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">2D Vorlage (mm)</p>
              </div>
              {/* Pfeil */}
              <div className="text-muted-foreground">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              {/* Tube */}
              <div className="text-center">
                <div className="w-20 h-32 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center bg-muted/30 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-b from-muted to-muted/50" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">3D Tube</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6">
              Die abgewickelte Fläche (Umfang π × 50mm ≈ 157mm) wird 1:1 auf die Außenhaut der Tube projiziert.
            </p>
          </div>

          {/* Optionen: Download oder Upload */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Illustrator Download */}
            <a
              href={TEMPLATE_DOWNLOAD_PATH}
              download
              className="block"
            >
              <div className="rounded-xl border-2 border-dashed border-border hover:border-accent/50 hover:bg-accent/5 transition-colors p-8 h-full flex flex-col items-center justify-center text-center cursor-pointer">
                <Download className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Adobe-Illustrator-Vorlage</h3>
                <p className="text-sm text-muted-foreground">
                  Vorlage mit exakten Maßen (157×220mm) herunterladen und in Illustrator bearbeiten
                </p>
              </div>
            </a>

            {/* Upload */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="rounded-xl border-2 border-dashed border-border hover:border-accent/50 hover:bg-accent/5 transition-colors p-8 h-full flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileSelect}
                className="hidden"
                id="intro-image-upload"
              />
              <label htmlFor="intro-image-upload" className="cursor-pointer w-full">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Grafik hochladen</h3>
                <p className="text-sm text-muted-foreground">
                  PNG oder JPG (Max. 5 MB)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Per Klick oder Drag & Drop
                </p>
              </label>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive text-center">
              {error}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
