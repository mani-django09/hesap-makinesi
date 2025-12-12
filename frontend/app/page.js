import Link from 'next/link'
import { calculators, categories } from '@/lib/calculators'
import CalculatorCard from '@/components/CalculatorCard'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hesap Makinesi Online',
    url: 'https://hesap-makinesi.online',
    description: 'Online hesap makinesi ve hesaplama araçları',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://hesap-makinesi.online/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hesap makinesi online kullanmak güvenli mi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, tamamen güvenlidir. Sitemizde yaptığınız tüm hesaplamalar anlık olarak tarayıcınızda gerçekleşir ve hiçbir verileriniz sunucularımızda saklanmaz. Girdiğiniz bilgiler kaydedilmez ve üçüncü taraflarla paylaşılmaz. Modern şifreleme teknolojileri kullanarak güvenliğinizi en üst düzeyde tutuyoruz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Hesap makinesi uygulamasını kullanmak için ücret ödemem gerekiyor mu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hayır, sitemizde bulunan tüm hesaplama araçları tamamen ücretsizdir. Kayıt olmadan, kredi kartı bilgisi vermeden sınırsız şekilde kullanabilirsiniz. Herhangi bir gizli ücret veya abonelik planı yoktur. Amacımız herkese erişilebilir, ücretsiz hesaplama araçları sunmaktır.'
        }
      },
      {
        '@type': 'Question',
        name: 'Mobil cihazlardan hesap makinesi kullanabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kesinlikle! Web sitemiz tüm mobil cihazlar için özel olarak optimize edilmiştir. Akıllı telefonunuz, tabletiniz veya herhangi bir mobil cihazınızdan internet tarayıcınız üzerinden sorunsuz bir şekilde tüm hesaplama araçlarına erişebilirsiniz. Responsive tasarımımız sayesinde her ekran boyutunda mükemmel çalışır.'
        }
      },
      {
        '@type': 'Question',
        name: 'Hesaplama sonuçları ne kadar doğru?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tüm hesaplama araçlarımız güncel ve doğru matematiksel formüllere dayanarak çalışır. Özellikle sınav puan hesaplamaları ve resmi hesaplamalar için en güncel katsayılar ve formüller kullanılmaktadır. Ancak kritik kararlar için resmi kaynaklardan da teyit almanızı öneririz.'
        }
      },
      {
        '@type': 'Question',
        name: 'İnternet bağlantısı olmadan hesap makinesi kullanabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'İlk ziyaretinizde sayfayı yükledikten sonra bazı temel hesaplamalar çevrimdışı olarak da çalışabilir. Ancak en iyi deneyim ve tüm özelliklere erişim için internet bağlantınızın olması önerilir. Gelecekte tam çevrimdışı çalışma desteği eklemeyi planlıyoruz.'
        }
      },
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero Section - Compact & Professional */}
        <section className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="max-w-4xl mx-auto text-center">
              
              
              {/* Main Heading */}
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                Hesap Makinesi
                <span className="text-primary-600 dark:text-primary-400"> Online</span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
                7 farklı hesaplama aracı. Hızlı, güvenilir ve tamamen ücretsiz.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">Kayıt Gerektirmez</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">%100 Ücretsiz</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-medium">Anlık Sonuçlar</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculators Section */}
        <section id="calculators" className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Hesaplama Araçları
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                İhtiyacınız olan hesaplama aracını seçin ve hemen kullanmaya başlayın
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {calculators.map((calculator) => (
                <CalculatorCard key={calculator.id} calculator={calculator} />
              ))}
            </div>
          </div>
        </section>

        {/* Content Section - Clean Layout */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Main Content Intro */}
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Hayatınızı Kolaylaştıran Hesaplamalar
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Modern hayatın karmaşık hesaplamalarını basitleştirmek için tasarlanmış platformumuz, 
                  her gün karşılaştığınız sayılarla ilgili soruları anında yanıtlar. İster alışverişte 
                  indirim hesabı yapın, ister sınav puanınızı merak edin - ihtiyacınız olan her araç burada.
                </p>
              </div>

              {/* Category Cards - 2 Column Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Math & Finance */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Matematik & Finans</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Günlük hayatta sayılarla uğraşmak artık çok kolay. Alışverişte indirim hesaplama, 
                    KDV dahil fiyatları bulma veya fatura ödemelerinde yüzde hesapları saniyeler içinde.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Yüzde hesaplama, indirim ve zam oranları
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      KDV (%1, %8, %18) hesaplamaları
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Temel matematik işlemleri
                    </li>
                  </ul>
                </div>

                {/* Health & Life */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 rounded-2xl p-8 border border-pink-200 dark:border-pink-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sağlık & Yaşam</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Sağlığınız için önemli hesaplamaları güvenilir formüllerle yapın. Hamilelik takibi, 
                    ideal kilo hesaplama ve yaş hesaplamaları doktorların kullandığı formüllerle.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Gebelik hesaplama ve bebek gelişimi takibi
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      BMI ve ideal kilo hesaplama
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Detaylı yaş hesaplama
                    </li>
                  </ul>
                </div>

                {/* Education */}
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Eğitim & Sınavlar</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Öğrenciler için vazgeçilmez araçlar. LGS, KPSS, ALES gibi sınavların puan hesaplamaları 
                    en güncel formüller ve katsayılarla.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      LGS puan hesaplama
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      KPSS ve ALES hesaplamaları
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Vize-final not hesaplama
                    </li>
                  </ul>
                </div>

                {/* Religious */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Dini Hesaplamalar</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    İbadetleriniz için gereken hesaplamaları doğru formüllerle yapın. Zekat vermek dini bir 
                    sorumluluktur ve doğru miktar hesaplamak önemlidir.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Zekat hesaplama ve nisap miktarı
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Güncel altın ve gümüş kurları
                    </li>
                    <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      İslami kurallara uygun hesaplama
                    </li>
                  </ul>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-900/20 rounded-2xl p-8 lg:p-10 border border-orange-200 dark:border-orange-800">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Neden Hesap Makinesi Online?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hız</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Anında sonuç, bekleme yok. Hesaplamalarınız tarayıcınızda lokal olarak yapılır.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Doğruluk</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Güncel formüller ve katsayılar. Özellikle sınav hesaplamalarında güvenilirsiniz.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Gizlilik</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hiçbir verileriniz kaydedilmez veya paylaşılmaz. %100 gizlilik garantisi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hızlı ve Kolay</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Karmaşık hesaplamaları saniyeler içinde yapın. Kullanıcı dostu arayüz sayesinde hiçbir teknik bilgiye ihtiyaç duymadan tüm araçları kullanabilirsiniz.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">%100 Güvenli</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Verileriniz tamamen güvendedir. Hiçbir bilginiz sunucularımızda saklanmaz veya üçüncü taraflarla paylaşılmaz. Gizliliğiniz bizim için önemlidir.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Her Cihazda Çalışır</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Masaüstü, tablet veya akıllı telefon fark etmeksizin tüm cihazlarda mükemmel çalışır. Responsive tasarım sayesinde her ekran boyutuna uyumludur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Sıkça Sorulan Sorular
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Hesap makinesi hakkında merak ettikleriniz
                </p>
              </div>

              <div className="space-y-4">
                {faqJsonLd.mainEntity.map((faq, index) => (
                  <details key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group">
                    <summary className="cursor-pointer p-6 font-semibold text-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors list-none flex items-center justify-between">
                      <span>{faq.name}</span>
                      <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                      {faq.acceptedAnswer.text}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}