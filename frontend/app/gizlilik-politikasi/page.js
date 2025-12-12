export const metadata = {
  title: 'Gizlilik Politikası | Hesap Makinesi Online',
  description: 'Hesap Makinesi Online gizlilik politikası. Kişisel verilerinizin nasıl korunduğu ve kullanıldığı hakkında detaylı bilgi.',
}

export default function PrivacyPage() {
  const lastUpdated = '28 Kasım 2024'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Gizlilik Politikası
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
                Hesap Makinesi Online olarak, kullanıcılarımızın gizliliğini korumayı en önemli 
                önceliklerimizden biri olarak görüyoruz. Bu gizlilik politikası, web sitemizi 
                ziyaret ettiğinizde hangi bilgilerin toplandığını, nasıl kullanıldığını ve nasıl 
                korunduğunu açıklamaktadır.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sitemizi kullanarak, bu gizlilik politikasında belirtilen uygulamaları kabul 
                etmiş olursunuz.
              </p>
            </div>

            {/* 1. Toplanan Bilgiler */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Toplanan Bilgiler
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    1.1. Hesaplama Verileri
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Sitemizde yapılan tüm hesaplamalar tamamen tarayıcınızda (client-side) 
                    gerçekleştirilir. Bu demektir ki:
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Girdiğiniz hiçbir sayı veya hesaplama verisi sunucularımıza gönderilmez</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Hesaplama sonuçları saklanmaz veya kaydedilmez</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Kişisel veya finansal bilgileriniz hiçbir şekilde depolanmaz</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    1.2. Otomatik Toplanan Bilgiler
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    Web sitemizi ziyaret ettiğinizde, standart web sunucusu kayıtları olarak 
                    aşağıdaki bilgiler otomatik olarak toplanabilir:
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <li>IP adresi</li>
                    <li>Tarayıcı türü ve versiyonu</li>
                    <li>İşletim sistemi</li>
                    <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
                    <li>Siteye yönlendiren kaynak (referrer)</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                    Bu bilgiler yalnızca site performansını izlemek ve iyileştirmeler yapmak 
                    için kullanılır.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    1.3. Çerezler (Cookies)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Sitemiz, kullanıcı deneyimini iyileştirmek için minimal düzeyde çerez 
                    kullanabilir. Çerezler hakkında detaylı bilgi için Çerez Politikası 
                    sayfamızı ziyaret edebilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Bilgilerin Kullanımı */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Bilgilerin Kullanımı
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Toplanan bilgiler yalnızca aşağıdaki amaçlar için kullanılır:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Hizmet Sağlama:</span>
                    <span className="text-gray-600 dark:text-gray-400"> Web sitemizin düzgün çalışmasını sağlamak</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Performans İyileştirme:</span>
                    <span className="text-gray-600 dark:text-gray-400"> Site hızını ve kullanıcı deneyimini optimize etmek</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Güvenlik:</span>
                    <span className="text-gray-600 dark:text-gray-400"> Kötüye kullanımı önlemek ve siteyi korumak</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">İstatistik:</span>
                    <span className="text-gray-600 dark:text-gray-400"> Site kullanımını anlamak ve geliştirmeler yapmak</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* 3. Bilgi Paylaşımı */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Bilgi Paylaşımı ve Aktarımı
              </h2>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 mb-6">
                <p className="text-green-900 dark:text-green-300 font-semibold mb-2">
                  ✓ Önemli Garanti
                </p>
                <p className="text-green-800 dark:text-green-200 leading-relaxed">
                  Kişisel bilgileriniz hiçbir şekilde üçüncü taraflarla satılmaz, kiralanmaz 
                  veya paylaşılmaz. Bu bizim en temel prensibimizdir.
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Bilgileriniz yalnızca aşağıdaki durumlarda paylaşılabilir:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                <li>Yasal zorunluluk gereği (mahkeme kararı, yasal süreç)</li>
                <li>Site güvenliğini sağlamak için gerekli durumlarda</li>
                <li>Açık rızanız ile</li>
              </ul>
            </div>

            {/* 4. Veri Güvenliği */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Veri Güvenliği
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Bilgilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alıyoruz:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">SSL Şifreleme</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tüm veri iletişimi SSL/TLS protokolü ile şifrelenir
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Güvenli Sunucular</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Modern güvenlik standartlarına uygun sunucu altyapısı
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Düzenli Güncellemeler</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Güvenlik yamalarının düzenli olarak uygulanması
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Erişim Kontrolü</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sınırlı ve kontrollü sistem erişimi
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Kullanıcı Hakları */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Kullanıcı Hakları
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>İşlenmişse buna ilişkin bilgi talep etme</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Düzeltme veya silinmesini talep etme</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>İşleme şartlarının ortadan kalkması halinde silinmesini isteme</span>
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Bu haklarınızı kullanmak için info@hesap-makinesi.online adresinden bizimle 
                iletişime geçebilirsiniz.
              </p>
            </div>

            {/* 6. Çocukların Gizliliği */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Çocukların Gizliliği
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sitemiz, 13 yaşından küçük çocuklardan bilerek kişisel bilgi toplamaz. Eğer 13 
                yaşından küçük bir çocuğun bizimle kişisel bilgi paylaştığını fark ederseniz, 
                lütfen bizimle iletişime geçin.
              </p>
            </div>

            {/* 7. Değişiklikler */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Politika Değişiklikleri
              </h2>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada 
                yayınlanacak ve "Son Güncelleme" tarihi değiştirilecektir. Önemli değişiklikler 
                olması durumunda, sitemizde duyuru yapılacaktır.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Bu politikadaki değişiklikleri düzenli olarak kontrol etmenizi öneririz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
