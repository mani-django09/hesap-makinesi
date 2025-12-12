export const metadata = {
  title: 'Hakkımızda | Hesap Makinesi Online',
  description: 'Hesap Makinesi Online - Türkiye\'nin en kapsamlı ücretsiz hesaplama platformu hakkında bilgi edinin.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Hakkımızda
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Günlük hesaplamalarınızı kolaylaştırmak için buradayız
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Misyonumuz</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Hesap Makinesi Online, günlük hayatta karşılaşılan matematiksel hesaplamaları 
                  herkes için kolay, hızlı ve erişilebilir kılmak amacıyla kurulmuştur. Modern 
                  yaşamın getirdiği karmaşık hesaplamaları basitleştirerek, kullanıcılarımızın 
                  zamanını ve enerjisini daha değerli işlere ayırmalarını sağlıyoruz.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Platformumuz, öğrencilerden iş insanlarına, anne adaylarından sağlık 
                  bilinçli bireylere kadar geniş bir kullanıcı kitlesine hitap etmektedir. 
                  Her kesimden insanın ihtiyaç duyduğu hesaplama araçlarını ücretsiz olarak 
                  sunmak, temel prensiplerimizden biridir.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Değerlerimiz</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Kullanıcı Odaklılık
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Her şeyi kullanıcılarımızın ihtiyaçları doğrultusunda tasarlıyor, 
                    geribildirimlerini dikkate alarak sürekli gelişiyoruz.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Ücretsiz Erişim
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Kaliteli hesaplama araçlarının herkes için erişilebilir olması gerektiğine 
                    inanıyoruz. Tüm hizmetlerimiz tamamen ücretsizdir.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Doğruluk ve Güvenilirlik
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Tüm hesaplama formüllerimiz güncel ve doğru bilgilere dayanır. 
                    Özellikle sınav puanları gibi kritik hesaplamalarda hassasiyet önceliğimizdir.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Gizlilik ve Güvenlik
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Kullanıcılarımızın verilerini korumak en önemli sorumluluğumuzdur. 
                    Hiçbir kişisel bilgi saklamıyor veya paylaşmıyoruz.
                  </p>
                </div>
              </div>
            </div>

            {/* What We Offer */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 border border-gray-200 dark:border-gray-800 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Neler Sunuyoruz?</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">14 Farklı Hesaplama Aracı</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Temel hesap makinesinden yüzde hesaplamaya, LGS puan hesaplamadan gebelik 
                      takibine kadar geniş yelpazede araçlar sunuyoruz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Anlık Sonuçlar</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tüm hesaplamalar tarayıcınızda gerçekleşir, sunucuya veri gönderilmez. 
                      Bu sayede anında sonuç alırsınız.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Mobil Uyumlu Tasarım</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Responsive tasarımımız sayesinde tüm cihazlarda (telefon, tablet, bilgisayar) 
                      sorunsuz çalışır.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Karanlık Mod Desteği</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gözlerinizi yormadan uzun süreli kullanım için karanlık mod seçeneği sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-2xl p-8 lg:p-10 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Teknoloji</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Platformumuz, modern web teknolojileri kullanılarak geliştirilmiştir. React ve 
                Next.js gibi güncel frameworkler sayesinde hızlı, güvenli ve kullanıcı dostu 
                bir deneyim sunuyoruz.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Progressive Web App (PWA) teknolojisi sayesinde, sitemizi mobil cihazınızın 
                ana ekranına ekleyerek uygulama gibi kullanabilirsiniz. Ayrıca, tüm hesaplamalar 
                client-side (tarayıcınızda) gerçekleştiği için verileriniz hiçbir zaman 
                sunucularımıza gönderilmez.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}