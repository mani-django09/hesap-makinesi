import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://hesap-makinesi.online'),
  title: {
    default: 'Hesap Makinesi Online - Türkçe Hesaplama Araçları',
    template: '%s | Hesap Makinesi Online'
  },
  description: 'Online hesap makinesi ve hesaplama araçları. Yüzde hesaplama, yaş hesaplama, KDV hesaplama, gebelik hesaplama ve daha fazlası.',
  keywords: 'hesap makinesi, calculator, yüzde hesaplama, yaş hesaplama, kdv hesaplama, online hesaplama',
  authors: [{ name: 'Hesap Makinesi Online' }],
  creator: 'Hesap Makinesi Online',
  publisher: 'Hesap Makinesi Online',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hesap-makinesi.online',
    siteName: 'Hesap Makinesi Online',
    title: 'Hesap Makinesi Online - Türkçe Hesaplama Araçları',
    description: 'Online hesap makinesi ve hesaplama araçları. Yüzde hesaplama, yaş hesaplama, KDV hesaplama, gebelik hesaplama ve daha fazlası.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hesap Makinesi Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hesap Makinesi Online - Türkçe Hesaplama Araçları',
    description: 'Online hesap makinesi ve hesaplama araçları.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
