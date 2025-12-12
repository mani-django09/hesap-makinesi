export const metadata = {
  title: 'Kullanım Koşulları | Hesap Makinesi Online',
  description: 'Hesap Makinesi Online kullanım koşulları ve şartları. Siteyi kullanırken kabul ettiğiniz kurallar ve sorumluluklar.',
}

export default function TermsPage() {
  const lastUpdated = '28 Kasım 2024'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Kullanım Koşulları
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Son Güncelleme: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Hoş geldiniz! Hesap Makinesi Online ("Site", "biz", "bizim") web sitesini 
                kullanarak, aşağıdaki kullanım koşullarını ("Koşullar") kabul etmiş olursunuz. 
                Lütfen bu koşulları dikkatlice okuyun.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Eğer bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayın.
              </p>
            </div>

            {/* 1. Hizmet Açıklaması */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Hizmet Açıklaması
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Hesap Makinesi Online, kullanıcılara çeşitli hesaplama araçları sunan ücretsiz 
                bir web platformudur. Hizmetlerimiz şunları içerir:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4">
                <li>Temel ve gelişmiş matematik hesaplamaları</li>
                <li>Yüzde ve KDV hesaplamaları</li>
                <li>Eğitim ve sınav puan hesaplamaları (LGS, KPSS, ALES vb.)</li>
                <li>Sağlık hesaplamaları (gebelik, kilo, yaş)</li>
                <li>Dini hesaplamalar (zekat)</li>
                <li>Diğer özel hesaplama araçları</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Tüm hesaplamalar tamamen ücretsizdir ve kayıt gerektirmez.
              </p>
            </div>

            {/* 2. Kullanım Kuralları */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Kullanım Kuralları
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Sitemizi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-green-900 dark:text-green-300 mb-2">✓ İzin Verilen Kullanım</h3>
                  <ul className="space-y-1 text-sm text-green-800 dark:text-green-200 list-disc list-inside ml-2">
                    <li>Kişisel ve eğitim amaçlı kullanım</li>
                    <li>İş yerinde profesyonel hesaplamalar</li>
                    <li>Ticari olmayan projeler için kullanım</li>
                    <li>Siteyi arkadaşlarınızla paylaşma</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <h3 className="font-bold text-red-900 dark:text-red-300 mb-2">✗ Yasak Kullanım</h3>
                  <ul className="space-y-1 text-sm text-red-800 dark:text-red-200 list-disc list-inside ml-2">
                    <li>Siteyi otomatik araçlarla (botlar, scraper'lar) tarама</li>
                    <li>Aşırı sayıda istek göndererek sunucuları yavaşlatma</li>
                    <li>Siteyi hacklemek veya güvenlik açığı aramak</li>
                    <li>İçeriği izinsiz kopyalayıp başka sitelerde yayınlama</li>
                    <li>Zararlı kod veya virüs yüklemeye çalışma</li>
                    <li>Diğer kullanıcıların hizmet almasını engelleme</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Hesaplama Doğruluğu */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Hesaplama Doğruluğu ve Sorumluluk
              </h2>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-2 border-yellow-200 dark:border-yellow-800 mb-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <p className="font-bold text-yellow-900 dark:text-yellow-300 mb-2">Önemli Uyarı</p>
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm leading-relaxed">
                      Tüm hesaplamalar mümkün olan en yüksek doğrulukla yapılmaya çalışılsa da, 
                      kritik kararlar almadan önce sonuçları resmi kaynaklardan teyit etmenizi 
                      öneririz.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Hesap Makinesi Online olarak:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Güncel ve doğru formüller kullanmak için elimizden geleni yaparız</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Sınav puanları gibi resmi hesaplamalarda güncel katsayıları kullanırız</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Hataları düzeltmek için sürekli çalışırız</span>
                </li>
              </ul>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Ancak, hesaplama hatalarından veya yanlış kararlardan kaynaklanan herhangi bir 
                kayıptan sorumlu tutulamayız. Hesaplamalar yalnızca bilgilendirme amaçlıdır.
              </p>
            </div>

            {/* 4. Fikri Mülkiyet */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Fikri Mülkiyet Hakları
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Sitedeki tüm içerik (metin, tasarım, logo, kod, grafikler) Hesap Makinesi Online'ın 
                mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                İzin verilen kullanım:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4">
                <li>Kişisel kullanım için içeriği görüntüleme</li>
                <li>Siteye doğrudan link verme</li>
                <li>Sosyal medyada paylaşma</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                İzin verilmeyen kullanım:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4">
                <li>İçeriği kopyalayıp başka sitelerde yayınlama</li>
                <li>Tasarımı veya kodu taklit etme</li>
                <li>Ticari amaçlarla kullanma (izinsiz)</li>
              </ul>
            </div>

            {/* 5. Hizmet Değişiklikleri */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Hizmet Değişiklikleri ve Sonlandırma
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Hesap Makinesi Online, herhangi bir zamanda:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4">
                <li>Siteyi değiştirme, güncelleme veya iyileştirme</li>
                <li>Yeni özellikler ekleme veya mevcut özellikleri kaldırma</li>
                <li>Geçici veya kalıcı olarak hizmeti askıya alma veya sonlandırma</li>
                <li>Belirli kullanıcıların erişimini engelleme</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Bu tür değişiklikler için önceden bildirimde bulunma zorunluluğumuz yoktur.
              </p>
            </div>

            {/* 6. Üçüncü Taraf Bağlantıları */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Üçüncü Taraf Bağlantıları
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin 
                içeriğinden veya gizlilik uygulamalarından sorumlu değiliz. Üçüncü taraf siteleri 
                ziyaret ettiğinizde kendi risk ve sorumluluğunuzdadır.
              </p>
            </div>

            {/* 7. Sorumluluk Reddi */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Sorumluluk Reddi
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-primary-600">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 font-medium">
                  HİZMET "OLDUĞU GİBİ" VE "MEVCUT OLDUĞU ŞEKILDE" SAĞLANIR
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  Kesintisiz, hatasız veya güvenli olduğuna dair hiçbir garanti vermiyoruz. 
                  Siteyi kullanımınızdan kaynaklanan doğrudan, dolaylı, tesadüfi, özel veya 
                  sonuç olarak ortaya çıkan zararlardan sorumlu tutulamayız.
                </p>
              </div>
            </div>

            {/* 8. Yürürlükteki Hukuk */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Yürürlükteki Hukuk
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Bu koşullar Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir anlaşmazlık 
                durumunda İstanbul mahkemeleri ve icra daireleri yetkilidir.
              </p>
            </div>

            {/* 9. İletişim */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                İletişim
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Bu kullanım koşulları hakkında sorularınız varsa, bizimle iletişime geçebilirsiniz:
              </p>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href="mailto:info@hesap-makinesi.online" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  info@hesap-makinesi.online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}