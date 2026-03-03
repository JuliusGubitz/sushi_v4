import React from "react"
import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ConditionalHeader } from "@/components/conditional-header"
import { ConditionalFooter } from "@/components/conditional-footer"
import { PasswordGate } from "@/components/password-gate"
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-bebas'
});

export const metadata: Metadata = {
  title: 'Push Up Sushi | Premium B2B Event-Catering',
  description: 'Das innovative Event-Catering für Ihre Marke. Vollständig individualisierbar, Made in Germany.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <PasswordGate>
          <ConditionalHeader />
          {children}
          <ConditionalFooter />
          <Analytics />
          <SpeedInsights />
        </PasswordGate>
      </body>
    </html>
  )
}
