"use client";

import { useState, useEffect } from "react";
import {
  PASSWORD_PROTECTION_ENABLED,
  PASSWORD,
} from "@/lib/password-protection";

const STORAGE_KEY = "password-gate-unlocked";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!PASSWORD_PROTECTION_ENABLED) {
      setUnlocked(true);
      return;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    setUnlocked(stored === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    if (password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (!PASSWORD_PROTECTION_ENABLED || unlocked === true) {
    return <>{children}</>;
  }

  if (unlocked === null) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black" />
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen flex-col items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 px-6"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium tracking-wide text-neutral-400"
          >
            Passwort
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="••••••••"
            autoFocus
            autoComplete="off"
            className="w-full rounded-lg border border-neutral-700 bg-transparent px-4 py-3.5 text-white placeholder-neutral-600 outline-none transition-colors focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
          />
          {error && (
            <p className="text-sm text-red-400">Falsches Passwort</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Eingeben
        </button>
      </form>
    </div>
  );
}
