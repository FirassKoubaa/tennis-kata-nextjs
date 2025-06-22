/**
 * Point d'entrée principal de l'application Next.js Tennis Kata Front.
 * Définit la structure HTML globale, les polices et les métadonnées du site.
 * @module app/layout
 */

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tennis Kata Front',
  description: 'Testeur de séquences pour Tennis Kata',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
