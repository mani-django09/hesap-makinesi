import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  // This ensures all relative links (like og-image) use your full domain
  metadataBase: new URL('https://hesap-makinesi.online'),
  
  title: {
    // This is the homepage title
    default: 'Hesap Makinesi Online - Hızlı, Ücretsiz ve Güncel Araçlar',
    // This template automatically adds your site name to every sub-page title
    template: '%s | Hesap Makinesi Online'
  },
  
  description: 'Online hesap makinesi ve tüm hesaplama araçları bir arada. Yüzde, KDV, LGS puanı, yaş ve gebelik hesaplamalarını en güncel formüllerle anında yapın.',
  keywords: 'hesap makinesi, calculator, yüzde hesaplama, yaş hesaplama, kdv hesaplama, lgs puan hesaplama, online hesaplama araçları',
  
  authors: [{ name: 'Hesap Makinesi Online' }],
  creator: 'Hesap Makinesi Online',
  publisher: 'Hesap Makinesi Online',

  alternates: {
    canonical: './',
  },

  // Favicon and Web App Configuration
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  applicationName: 'Hesap Makinesi Online',
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hesap Makinesi',
  },

  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hesap-makinesi.online',
    siteName: 'Hesap Makinesi Online',
    title: 'Hesap Makinesi Online - Türkçe Hesaplama Araçları',
    description: 'En güncel ve hızlı online hesaplama araçları.',
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
    title: 'Hesap Makinesi Online',
    description: 'Hızlı ve ücretsiz online hesaplama araçları.',
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
    // REPLACE THIS with the code from Google Search Console
    google: 'ENTER_YOUR_ACTUAL_VERIFICATION_CODE_HERE',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Microsoft Browser Configuration */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* AD SENSE TIP: 
          When you get your Google AdSense code, paste the <script> tag here 
        */}
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}