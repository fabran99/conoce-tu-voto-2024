import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ConoceTuVoto - Conoce y compara propuestas electorales en Uruguay",
  description:
    "Consulta y compara las propuestas de los partidos políticos para las próximas elecciones en Uruguay. Infórmate y decide con ConoceTuVoto.",
  keywords: [
    "Uruguay",
    "elecciones",
    "partidos políticos",
    "propuestas",
    "comparativas",
    "voto informado",
    "información electoral",
    "ConoceTuVoto",
  ],
  openGraph: {
    title: "ConoceTuVoto - Información Electoral de Uruguay",
    description:
      "Accede a las propuestas de los partidos políticos y compara sus planes de gobierno. Infórmate antes de votar.",
    url: "https://ConoceTuVoto.com",
    type: "website",
    images: [
      {
        url: "https://ConoceTuVoto.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ConoceTuVoto - Información Electoral de Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ConoceTuVoto",
    title: "ConoceTuVoto - Conoce y compara propuestas electorales",
    description:
      "Consulta y compara las propuestas de los partidos políticos para las próximas elecciones en Uruguay.",
    images: ["https://ConoceTuVoto.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
