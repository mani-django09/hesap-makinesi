import HesapMakinesiClient from './HesapMakinesiClient'

export const metadata = {
  title: 'Online Hesap Makinesi - Hızlı ve Ücretsiz Dört İşlem',
  description: 'Toplama, çıkarma, çarpma ve bölme işlemlerini anında yapın. Kullanımı kolay, ücretsiz ve mobil uyumlu online hesap makinesi.',
  alternates: {
    canonical: 'https://hesap-makinesi.online/hesap-makinesi',
  },
}

export default function Page() {
  return <HesapMakinesiClient />
}