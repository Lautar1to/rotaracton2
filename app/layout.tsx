import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RUN Altas Cumbres - La Carrera de los Verdaderos Titanes",
  description: "Carrera de running de montaña en Córdoba Argentina",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20icon-nuEgLeBoWS9ZGzwMTxtjMZVeS21F8v.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="bg-white">{children}</body>
    </html>
  )
}



import './globals.css'