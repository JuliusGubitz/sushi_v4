"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
  firma: string;
  stueckzahl: string;
  datenschutz: boolean;
}

export default function AnfragePage() {
  const [formData, setFormData] = useState<FormData>({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    nachricht: "",
    firma: "",
    stueckzahl: "",
    datenschutz: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, datenschutz: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.datenschutz) {
      setErrorMessage("Bitte stimmen Sie der Datenschutzerklärung zu.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Get screenshot and design file from sessionStorage if available
      const designFile = sessionStorage.getItem("designFile") || null;
      const screenshot = sessionStorage.getItem("screenshot") || null;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          designFile,
          screenshot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const apiError = typeof data?.error === "string" ? data.error : "Fehler beim Senden der Anfrage";
        setErrorMessage(apiError);
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      // Clear sessionStorage after successful submission
      sessionStorage.removeItem("designFile");
      sessionStorage.removeItem("screenshot");
      // Reset form
      setFormData({
        vorname: "",
        nachname: "",
        email: "",
        telefon: "",
        nachricht: "",
        firma: "",
        stueckzahl: "",
        datenschutz: false,
      });
    } catch (error) {
      setSubmitStatus("error");
      const msg = error instanceof Error ? error.message : "Es gab einen Fehler beim Senden. Bitte versuchen Sie es später erneut.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.vorname.trim() !== "" &&
    formData.nachname.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.telefon.trim() !== "" &&
    formData.nachricht.trim() !== "" &&
    formData.datenschutz;

  return (
    <main className="pt-24 pb-16 px-6 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Anfrage senden</h1>
            <p className="text-muted-foreground mt-2">
              Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
            </p>
          </div>
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Anfrage erfolgreich gesendet!
              </h3>
              <p className="text-muted-foreground mb-6">
                Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/">Zur Startseite</Link>
                </Button>
                <Button asChild>
                  <Link href="/customizer">Zum Customizer</Link>
                </Button>
              </div>
            </div>
          ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Required Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vorname">
                        Vorname <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="vorname"
                        name="vorname"
                        value={formData.vorname}
                        onChange={handleInputChange}
                        required
                        placeholder="Max"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nachname">
                        Nachname <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nachname"
                        name="nachname"
                        value={formData.nachname}
                        onChange={handleInputChange}
                        required
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        E-Mail <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="max@beispiel.de"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefon">
                        Telefon <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="telefon"
                        name="telefon"
                        type="tel"
                        value={formData.telefon}
                        onChange={handleInputChange}
                        required
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nachricht">
                      Nachricht <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="nachricht"
                      name="nachricht"
                      value={formData.nachricht}
                      onChange={handleInputChange}
                      required
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                      rows={5}
                    />
                  </div>

                  {/* Optional Fields */}
                  <div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firma">Firma</Label>
                        <Input
                          id="firma"
                          name="firma"
                          value={formData.firma}
                          onChange={handleInputChange}
                          placeholder="Firmenname"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stueckzahl">Geplante Stückzahl</Label>
                        <Input
                          id="stueckzahl"
                          name="stueckzahl"
                          value={formData.stueckzahl}
                          onChange={handleInputChange}
                          placeholder="z.B. 1000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="datenschutz"
                      checked={formData.datenschutz}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label
                      htmlFor="datenschutz"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      Ich habe die{" "}
                      <Link
                        href="/datenschutz"
                        className="text-accent hover:underline font-medium"
                        target="_blank"
                      >
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zu.{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Anfrage senden
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Mit <span className="text-destructive">*</span> markierte Felder sind Pflichtfelder.
                  </p>
                </form>
              )}
        </div>
    </main>
  );
}
