import type { Metadata } from 'next'
import { JetBrains_Mono, Noto_Sans } from 'next/font/google'

import './globals.css'

import { cn } from '@/lib/utils'

const fontSans = Noto_Sans({
  variable: '--font-custom-sans',
  subsets: ['latin'],
})

const fontMono = JetBrains_Mono({
  variable: '--font-custom-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Country Codes',
    template: '%s – Country Codes',
  },
  description:
    'Country list with ISO codes – browse all countries and their ISO 3166-1 codes. Access the data via a fast and simple REST API.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-secondary font-mono antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
