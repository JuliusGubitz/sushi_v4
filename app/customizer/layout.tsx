import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Push Up Sushi Konfigurator | Design selbst gestalten',
  description:
    'Gestalten Sie Ihre individuelle Push Up Sushi Tube – Design hochladen, 3D-Vorschau in Echtzeit, Vorlage downloaden. Jetzt Konfigurator starten.',
  openGraph: {
    title: 'Push Up Sushi Konfigurator | Design selbst gestalten',
    description:
      'Gestalten Sie Ihre individuelle Push Up Sushi Tube – Design hochladen, 3D-Vorschau in Echtzeit, Vorlage downloaden.',
    url: 'https://www.popupsu-shi.de/customizer',
  },
}

export default function CustomizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
