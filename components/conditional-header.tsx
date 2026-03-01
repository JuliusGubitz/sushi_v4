"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/landing/header";

export function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname === "/customizer") return null;
  return <Header />;
}
