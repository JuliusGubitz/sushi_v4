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
  title: 'Push Up Sushi | Jetzt Customizen und Anfragen',
  description: 'Die innovative Sushi To-Go Verpackung jetzt für den Frühling bestellen. Made for you.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Push Up Sushi | Jetzt Customizen und Anfragen',
    description: 'Die innovative Sushi To-Go Verpackung jetzt für den Frühling bestellen. Made for you.',
    url: 'https://www.popupsu-shi.de',
    siteName: 'Push Up Sushi',
    images: [{ url: 'https://www.popupsu-shi.de/icon.png', width: 512, height: 512 }],
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary',
    title: 'Push Up Sushi | Jetzt Customizen und Anfragen',
    description: 'Die innovative Sushi To-Go Verpackung jetzt für den Frühling bestellen. Made for you.',
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
