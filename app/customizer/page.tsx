"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Tag, RotateCcw, Download, Info, Eye, Send, FileDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Canvas2DEditor } from "@/components/customizer/canvas-2d-editor";
import type { PushUpTube3DRef } from "@/components/customizer/push-up-tube-3d";

// Dynamic import for 3D component to avoid SSR issues
const PushUpTube3D = dynamic(
  () => import("@/components/customizer/push-up-tube-3d").then((mod) => mod.PushUpTube3D),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-muted-foreground">3D Modell wird geladen...</div>
      </div>
    )
  }
);

// Default values for reset
const DEFAULT_ROTATION = { x: 0, y: 180, z: 0 };
const DEFAULT_TEXTURE_OFFSET = 50;
const DEFAULT_TUBE_COLOR = "#f5f5f0";
const TUBE_COLOR_PRESETS = [
  { color: "#ffffff", label: "Weiß" },
  { color: "#f5f5f0", label: "Cremeweiß" },
  { color: "#1a1a1a", label: "Schwarz" },
  { color: "#3b3b3b", label: "Dunkelgrau" },
  { color: "#c4a35a", label: "Gold" },
  { color: "#c0c0c0", label: "Silber" },
  { color: "#8b4513", label: "Braun" },
  { color: "#1e3a5f", label: "Dunkelblau" },
];
const DEFAULT_ACTIVE_TAB = "3d";

export default function CustomizerPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [canvasTexture, setCanvasTexture] = useState<string | null>(null);
  const [rotation, setRotation] = useState(DEFAULT_ROTATION);
  const [textureOffset, setTextureOffset] = useState(DEFAULT_TEXTURE_OFFSET);
  const [tubeColor, setTubeColor] = useState(DEFAULT_TUBE_COLOR);
  const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);
  const [showUploadToast, setShowUploadToast] = useState(false);
  
  const tube3DRef = useRef<PushUpTube3DRef>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Editor erst nach Client-Mount rendern
  const [editorReady, setEditorReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setEditorReady(true);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Navigate to contact form with design data (uploadedImage ist bereits Data-URL seit Upload)
  const handleAnfrageClick = useCallback(() => {
    if (uploadedImage) {
      sessionStorage.setItem("designFile", uploadedImage);
    }
    if (tube3DRef.current) {
      const screenshot = tube3DRef.current.captureScreenshot();
      if (screenshot) {
        sessionStorage.setItem("screenshot", screenshot);
      }
    }
    router.push("/anfrage");
  }, [uploadedImage, router]);

  // Reset all settings to default
  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setCanvasTexture(null);
    setRotation(DEFAULT_ROTATION);
    setTextureOffset(DEFAULT_TEXTURE_OFFSET);
    setTubeColor(DEFAULT_TUBE_COLOR);
    setActiveTab(DEFAULT_ACTIVE_TAB);
  }, []);

  // Save 3D view as image
  const handleSaveImage = useCallback(() => {
    if (tube3DRef.current) {
      const dataUrl = tube3DRef.current.captureScreenshot();
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = "push-up-sushi-design.png";
        link.href = dataUrl;
        link.click();
      }
    }
  }, []);

  // Datei beim Upload direkt als Data-URL lesen, damit sie später per E-Mail angehängt werden kann
  const readFileAsDataUrl = useCallback((file: File, setImage: (url: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === "string") {
        setImage(dataUrl);
        setShowUploadToast(true);
        setTimeout(() => setShowUploadToast(false), 2500);
      }
    };
    reader.onerror = () => console.error("Datei konnte nicht gelesen werden");
    reader.readAsDataURL(file);
  }, []);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        setUploadedImage(null);
        requestAnimationFrame(() => {
          readFileAsDataUrl(file, setUploadedImage);
        });
      }
      e.target.value = "";
    },
    [readFileAsDataUrl]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        readFileAsDataUrl(file, setUploadedImage);
      }
    },
    [readFileAsDataUrl]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // Mobile: Hinweis anzeigen, Customizer nicht unterstützt
  if (isMobile) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-2xl font-bold text-foreground">Konfigurator</h1>
          <p className="text-muted-foreground">
            Der Konfigurator funktioniert am besten auf dem Computer oder Tablet. Bitte öffnen Sie die Seite auf einem größeren Gerät für die beste Erfahrung.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/">Zur Startseite</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/anfrage">Direkt Anfrage senden</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Intro Popup Overlay */}
      {showIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Willkommen im Konfigurator</h2>
            <p className="text-sm text-muted-foreground mb-6">In drei einfachen Schritten zu Ihrer individuellen Tube.</p>

            <div className="space-y-5 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Upload className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">1. Design hochladen</p>
                  <p className="text-sm text-muted-foreground">Laden Sie Ihre Grafik hoch oder verwenden Sie unsere Illustrator-Vorlage.</p>
                  <a
                    href="/popupsu-shi-design-vorlage.ai"
                    download
                    className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-medium text-accent hover:underline"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    Illustrator-Vorlage herunterladen
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">2. Live anschauen</p>
                  <p className="text-sm text-muted-foreground">Sehen Sie Ihr Design in Echtzeit auf der 3D-Tube und passen Sie es an.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Send className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">3. Anfrage senden</p>
                  <p className="text-sm text-muted-foreground">Schicken Sie uns Ihr Design und wir erstellen Ihnen ein Angebot.</p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border accent-accent cursor-pointer"
              />
              <span className="text-sm text-muted-foreground leading-snug">
                Ich habe die{" "}
                <Link href="/datenschutz" target="_blank" className="text-accent underline hover:text-accent/80">
                  Datenschutzbedingungen
                </Link>{" "}
                gelesen und stimme diesen zu.
              </span>
            </label>

            <Button
              className="w-full"
              size="lg"
              disabled={!privacyAccepted}
              onClick={() => setShowIntro(false)}
            >
              Konfigurator starten
            </Button>
          </div>
        </div>
      )}

      {/* Customizer Header – volle Seitenbreite, nur Zurück | Titel | Buttons */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-border">
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
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
              Zurücksetzen
            </Button>
            <Button size="sm" className="gap-2" onClick={handleSaveImage}>
              <Download className="h-4 w-4" />
              Bild speichern
            </Button>
          </div>
        </nav>
      </header>

      <main className="pt-[4.5rem] h-screen flex bg-background overflow-hidden">
        <h1 className="sr-only">Push Up Sushi Konfigurator – Design selbst gestalten</h1>
        {/* Left Sidebar - Controls */}
        <aside className="w-80 border-r border-border bg-card overflow-y-auto flex-shrink-0 h-full">
          <div className="p-6 space-y-6">
            {/* Template Upload Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-accent" />
                <h2 className="font-semibold text-foreground">Template Upload</h2>
              </div>

              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent/50 hover:bg-accent/5 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                  <p className="font-medium text-foreground">Template hochladen</p>
                  <p className="text-sm text-muted-foreground mt-1">PNG, JPG (Max. 5MB)</p>
                </label>
              </div>

            </div>

            {/* Tube Color */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Tube-Farbe</h3>
              <div className="grid grid-cols-4 gap-2">
                {TUBE_COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.color}
                    onClick={() => setTubeColor(preset.color)}
                    className={`group relative w-full aspect-square rounded-lg border-2 transition-all ${
                      tubeColor === preset.color
                        ? "border-accent ring-2 ring-accent/30 scale-105"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: preset.color }}
                    title={preset.label}
                  >
                    {tubeColor === preset.color && (
                      <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                        preset.color === "#ffffff" || preset.color === "#f5f5f0" || preset.color === "#c0c0c0"
                          ? "text-foreground"
                          : "text-white"
                      }`}>✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Eigene Farbe:</label>
                <input
                  type="color"
                  value={tubeColor}
                  onChange={(e) => setTubeColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-border"
                />
                <span className="text-xs font-mono text-muted-foreground">{tubeColor}</span>
              </div>
            </div>

            {/* Customization Section */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Anpassung</h3>

              {/* Texture Rotation/Offset */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-muted-foreground">Grafik drehen (Naht-Position)</Label>
                  <span className="text-sm font-mono text-foreground">{textureOffset}%</span>
                </div>
                <Slider
                  value={[textureOffset]}
                  onValueChange={([value]) => setTextureOffset(value)}
                  min={0}
                  max={100}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Verschiebt die Grafik um die Tube. Bei 0% ist die Naht hinter dem Strohhalm.
                </p>
              </div>
            </div>

            {/* 3D Orientation Section */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">3D Ausrichtung</h3>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">X-Achse (Neigung)</Label>
                    <span className="text-sm font-mono text-foreground">{rotation.x}°</span>
                  </div>
                  <Slider
                    value={[rotation.x]}
                    onValueChange={([value]) => setRotation(prev => ({ ...prev, x: value }))}
                    min={-90}
                    max={90}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Y-Achse (Drehung)</Label>
                    <span className="text-sm font-mono text-foreground">{rotation.y}°</span>
                  </div>
                  <Slider
                    value={[rotation.y]}
                    onValueChange={([value]) => setRotation(prev => ({ ...prev, y: value }))}
                    min={0}
                    max={360}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Z-Achse (Kippen)</Label>
                    <span className="text-sm font-mono text-foreground">{rotation.z}°</span>
                  </div>
                  <Slider
                    value={[rotation.z]}
                    onValueChange={([value]) => setRotation(prev => ({ ...prev, z: value }))}
                    min={-45}
                    max={45}
                    step={1}
                  />
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* Center - Editor Area with Tabs */}
        <div className="flex-1 bg-muted/30 flex flex-col h-full min-h-0">
          {/* Tabs Header */}
          <div className="flex-shrink-0 px-6 py-3 border-b border-border bg-background/50 flex items-center justify-between">
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab("3d")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "3d" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                3D Vorschau
              </button>
              <button
                onClick={() => setActiveTab("2d")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "2d" 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                2D Editor
              </button>
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              157mm × 220mm (Umfang × Höhe)
            </span>
          </div>

          {/* Tab Content – beide Container absolut positioniert, übereinander */}
          <div className="flex-1 relative overflow-hidden">
            {/* 3D View - IMMER sichtbar im DOM, nur visuell versteckt */}
            <div 
              ref={threeContainerRef} 
              className="absolute inset-0"
              style={{
                visibility: activeTab === "3d" ? "visible" : "hidden",
                pointerEvents: activeTab === "3d" ? "auto" : "none",
                zIndex: activeTab === "3d" ? 1 : 0,
              }}
            >
              {editorReady && (
                <PushUpTube3D
                  ref={tube3DRef}
                  textureUrl={canvasTexture ?? uploadedImage}
                  rotation={rotation}
                  textureOffset={textureOffset}
                  tubeColor={tubeColor}
                />
              )}
            </div>

            {/* 2D Editor - auch absolut positioniert */}
            <div 
              className="absolute inset-0"
              style={{
                visibility: activeTab === "2d" ? "visible" : "hidden",
                pointerEvents: activeTab === "2d" ? "auto" : "none",
                zIndex: activeTab === "2d" ? 1 : 0,
              }}
            >
              {editorReady && (
                <Canvas2DEditor
                  width={157}
                  height={220}
                  uploadedImage={uploadedImage}
                  onCanvasChange={(dataUrl) => setCanvasTexture(dataUrl)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Info */}
        <aside className="w-80 border-l border-border bg-card overflow-y-auto flex-shrink-0 h-full">
          <div className="p-6 space-y-6">
            {/* Design Maße */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Tag className="h-3 w-3 text-accent" />
                  Design Maße
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Durchmesser</p>
                    <p className="text-muted-foreground text-xs">× Höhe</p>
                    <p className="font-mono font-medium">50 × 220</p>
                    <p className="font-mono font-medium">mm</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Template</p>
                    <p className="text-muted-foreground text-xs whitespace-nowrap">(Umfang × Höhe)</p>
                    <p className="font-mono font-medium">157 × 220</p>
                    <p className="font-mono font-medium">mm</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Das Template entspricht der abgewickelten Oberfläche der Röhre (Umfang = π × 50mm ≈ 157mm).
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button className="w-full" size="lg" onClick={handleAnfrageClick}>
                Anfrage senden
              </Button>
              <a href="/popupsu-shi-design-vorlage.ai" download>
                <Button variant="outline" className="w-full bg-transparent">
                  Vorlage downloaden
                </Button>
              </a>
            </div>

            {/* Info Box */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Info:</span> Wir helfen Ihnen natürlich beim finalen Design. Hier können Sie schon einen ersten Blick auf Ihr individuelles Produkt werfen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Upload Toast */}
      {showUploadToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          Bild erfolgreich hochgeladen
        </div>
      )}
    </>
  );
}
