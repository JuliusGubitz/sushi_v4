"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/landing/footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/customizer") return null;
  return <Footer />;
}
