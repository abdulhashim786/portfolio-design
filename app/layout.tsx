import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abdul Hashim - Frontend Developer Portfolio',
  description: 'Frontend Developer with 4 years of experience building scalable web and mobile applications using Angular, Ionic, TypeScript, RxJS, React, and Next.js.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
