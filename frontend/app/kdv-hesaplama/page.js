'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function KDVHesaplama() {
  const [formData, setFormData] = useState({
    amount: '',
    vatRate: '20',
    operation: 'remove'
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const vatRates = [
    { value: '1', label: '%1' },
    { value: '10', label: '%10' },
    { value: '20', label: '%20' }
  ]

  const calculateVAT = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const amount = parseFloat(formData.amount)
      const rate = parseFloat(formData.vatRate)

      let baseAmount, vatAmount, totalAmount

      if (formData.operation === 'remove') {
        // KDV dahil tutardan KDV hariç hesaplama
        totalAmount = amount
        baseAmount = amount / (1 + rate / 100)
        vatAmount = amount - baseAmount
      } else {
        // KDV hariç tutara KDV ekleme
        baseAmount = amount
        vatAmount = amount * (rate / 100)
        totalAmount = amount + vatAmount
      }

      setResult({
        baseAmount: baseAmount.toFixed(2),
        vatAmount: vatAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        rate: rate
      })
      setLoading(false)
    }, 400)
  }

  const handleReset = () => {
    setFormData({ amount: '', vatRate: '20', operation: 'remove' })
    setResult(null)
  }

  const Icons = {
    home: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
    chevronRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
    receipt: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>,
    check: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
    calculator: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M12 10h2M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    lightbulb: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
    trophy: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
    book: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
    spinner: <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>,
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-mono-calc { font-family: 'JetBrains Mono', monospace; }
        
        .hero-mesh {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 0% 0%, rgba(20, 184, 166, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.08) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.05) 0px, transparent 50%);
        }
        
        .dark .hero-mesh {
          background-color: #0f172a;
          background-image: 
            radial-gradient(at 0% 0%, rgba(20, 184, 166, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.08) 0px, transparent 50%);
        }

        .card-shadow {
          box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 12px 24px rgba(0,0,0,0.06);
        }
        
        .dark .card-shadow {
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05), 0 12px 24px rgba(0,0,0,0.3);
        }

        .result-pop {
          animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes pop {
          0% { transform: scale(0.96); opacity: 0.8; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }

        .fade-up {
          animation: fadeUp 0.5s ease-out forwards;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-display">
        
        {/* Compact Hero Section */}
        <section className="hero-mesh border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 py-6 lg:py-8">
            <div className="max-w-5xl mx-auto">
              
              {/* Breadcrumb */}
              <nav className="mb-4 fade-up">
                <div className="inline-flex items-center gap-1.5 text-sm">
                  <Link href="/" className="text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1">
                    {Icons.home}
                    <span className="hidden sm:inline">Ana Sayfa</span>
                  </Link>
                  <span className="text-slate-300 dark:text-slate-600">{Icons.chevronRight}</span>
                  <Link href="/finans" className="text-slate-500 hover:text-teal-600 transition-colors">Finans</Link>
                  <span className="text-slate-300 dark:text-slate-600">{Icons.chevronRight}</span>
                  <span className="text-slate-800 dark:text-white font-medium">KDV Hesaplama</span>
                </div>
              </nav>

              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 flex-shrink-0">
                  {Icons.receipt}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    KDV Hesaplama
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">
                    Hızlı ve kolay KDV hesaplaması yapın
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Main Calculator Column */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Calculator Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 card-shadow border border-slate-200 dark:border-slate-800 fade-up">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        {Icons.calculator}
                      </span>
                      KDV Hesaplama Aracı
                    </h2>

                    <form onSubmit={calculateVAT} className="space-y-5">
                      {/* Operation Type */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                          İşlem Türü
                        </label>
                        <div className="space-y-3">
                          <label className="flex items-start cursor-pointer group">
                            <input
                              type="radio"
                              name="operation"
                              value="remove"
                              checked={formData.operation === 'remove'}
                              onChange={(e) => setFormData({ ...formData, operation: e.target.value })}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300 mt-0.5"
                            />
                            <span className="ml-3 text-sm text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              KDV dahil tutardan KDV hariç tutar hesaplama
                            </span>
                          </label>
                          <label className="flex items-start cursor-pointer group">
                            <input
                              type="radio"
                              name="operation"
                              value="add"
                              checked={formData.operation === 'add'}
                              onChange={(e) => setFormData({ ...formData, operation: e.target.value })}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300 mt-0.5"
                            />
                            <span className="ml-3 text-sm text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              KDV hariç tutara KDV ekleyerek KDV dahil tutar hesaplama
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* VAT Rate */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                          KDV Oranı
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {vatRates.map((rate) => (
                            <label key={rate.value} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="vatRate"
                                value={rate.value}
                                checked={formData.vatRate === rate.value}
                                onChange={(e) => setFormData({ ...formData, vatRate: e.target.value })}
                                className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                              />
                              <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                {rate.label}
                              </span>
                            </label>
                          ))}
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="vatRate"
                              checked={!['1', '10', '20'].includes(formData.vatRate)}
                              onChange={() => setFormData({ ...formData, vatRate: '' })}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300">Diğer:</span>
                            {!['1', '10', '20'].includes(formData.vatRate) && (
                              <input
                                type="number"
                                value={formData.vatRate}
                                onChange={(e) => setFormData({ ...formData, vatRate: e.target.value })}
                                placeholder="%"
                                min="0"
                                max="100"
                                step="0.01"
                                className="w-20 px-3 py-1 text-sm border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Amount Input */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          {formData.operation === 'remove' ? 'KDV Dahil Tutar' : 'KDV Hariç Tutar'}
                        </label>
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          required
                          placeholder="Örn: 1200.00"
                          step="0.01"
                          min="0"
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium transition-all"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loading ? Icons.spinner : 'Hesapla'}
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-all"
                        >
                          Temizle
                        </button>
                      </div>
                    </form>

                    {/* Result Display */}
                    {result && (
                      <div className="mt-6 space-y-4 result-pop">
                        {/* Main Result */}
                        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl overflow-hidden card-shadow">
                          <div className="p-5 sm:p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                {Icons.check}
                              </div>
                              <div>
                                <p className="text-white/80 text-sm">Hesaplama Sonucu</p>
                                <p className="text-2xl sm:text-3xl font-bold font-mono-calc">
                                  {parseFloat(result.totalAmount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                </p>
                              </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-white/80">KDV Hariç:</span>
                                <span className="font-semibold font-mono-calc">
                                  {parseFloat(result.baseAmount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-white/80">KDV (%{result.rate}):</span>
                                <span className="font-semibold font-mono-calc">
                                  {parseFloat(result.vatAmount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                </span>
                              </div>
                              <div className="pt-2 border-t border-white/20 flex justify-between">
                                <span className="text-white font-semibold">KDV Dahil:</span>
                                <span className="font-bold font-mono-calc">
                                  {parseFloat(result.totalAmount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Educational Content */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    
                    {/* What is VAT */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">KDV (Katma Değer Vergisi) Nedir?</h2>
                      <div className="text-slate-600 dark:text-slate-400 space-y-3 text-sm leading-relaxed">
                        <p>
                          KDV (Katma Değer Vergisi), mal ve hizmet alım-satımlarında uygulanan dolaylı bir vergidir. 
                          Türkiye'de 1985 yılından beri uygulanmaktadır ve devletin en önemli gelir kaynaklarından biridir.
                        </p>
                        <p>
                          Her aşamada oluşan katma değer üzerinden hesaplanır. Yani üretimden tüketime kadar geçen 
                          her aşamada ürün veya hizmete eklenen değer üzerinden alınır. Nihai olarak bu vergiyi 
                          tüketici öder, ancak her aşamadaki satıcı devlete KDV ödemekle yükümlüdür.
                        </p>
                      </div>
                    </div>

                    {/* VAT Rates */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">KDV Oranları</h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { rate: '%1', desc: 'Temel gıda, eğitim, sağlık hizmetleri' },
                          { rate: '%10', desc: 'Bazı gıda maddeleri, konut kiraları' },
                          { rate: '%20', desc: 'Genel mal ve hizmetler (standart oran)' },
                        ].map((item, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">{item.rate}</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* How to Calculate */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">KDV Nasıl Hesaplanır?</h3>
                      <div className="space-y-4">
                        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 border-l-4 border-teal-500">
                          <p className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">KDV Dahil Tutar Hesaplama:</p>
                          <p className="font-mono-calc text-xs text-slate-700 dark:text-slate-300 mb-2">
                            KDV Dahil = KDV Hariç × (1 + KDV Oranı/100)
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Örnek: 1.000 ₺ + %20 KDV = 1.000 × 1.20 = 1.200 ₺
                          </p>
                        </div>
                        <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 border-l-4 border-cyan-500">
                          <p className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">KDV Hariç Tutar Hesaplama:</p>
                          <p className="font-mono-calc text-xs text-slate-700 dark:text-slate-300 mb-2">
                            KDV Hariç = KDV Dahil / (1 + KDV Oranı/100)
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Örnek: 1.200 ₺ / 1.20 = 1.000 ₺
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Usage Areas */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Kullanım Alanları</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { emoji: '🏪', title: 'Perakende Satış', desc: 'Mağazalarda fiyat etiketleri KDV dahildir' },
                          { emoji: '📝', title: 'Fatura Düzenleme', desc: 'İşletmeler arası ticarette KDV hesabı' },
                          { emoji: '💼', title: 'Muhasebe', desc: 'Aylık KDV beyannamesi hazırlama' },
                          { emoji: '🧾', title: 'Mal Alımı', desc: 'Toptan alımlarda KDV iade hesabı' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                            <div>
                              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-1">{item.title}</h4>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQ */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Sıkça Sorulan Sorular</h3>
                      <div className="space-y-4">
                        {[
                          { q: 'KDV matrahı nedir?', a: 'KDV matrahı, verginin hesaplanacağı tutardır. Yani KDV hariç fiyattır. Örneğin KDV dahil 1.200 ₺ olan bir üründe matrah 1.000 ₺\'dir.' },
                          { q: 'KDV beyannamesi ne zaman verilir?', a: 'Aylık KDV mükellefleri bir sonraki ayın 26\'sına kadar, üç aylık mükellefler ise dönem sonunu izleyen ayın sonuna kadar beyanname verirler.' },
                          { q: 'İndirilecek KDV nedir?', a: 'İşletmelerin ticari faaliyetleri için yaptıkları alışlardan ödedikleri KDV, hesaplanan KDV\'den indirilebilir. Bu sisteme "indirim mekanizması" denir.' },
                          { q: 'Hangi ürünlerde KDV oranı düşük?', a: 'Temel gıda maddeleri (%1), bazı tarım ürünleri, eğitim ve sağlık hizmetleri gibi sosyal öncelikli alanlarda düşük KDV oranları uygulanır.' },
                        ].map((faq, i) => (
                          <div key={i} className="border-b border-slate-200 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">{faq.q}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-4 space-y-4">
                    
                    {/* Quick Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-sm shadow-lg">
                          ℹ️
                        </span>
                        Hızlı Bilgi
                      </h3>
                      <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <p>KDV hesaplayıcımız ile:</p>
                        <ul className="space-y-2">
                          {[
                            'KDV dahil/hariç tutarı hesaplayın',
                            'Farklı KDV oranları ile çalışın',
                            'Anında sonuç alın',
                            'Ücretsiz kullanın'
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-teal-500">{Icons.check}</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tip Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 card-shadow border border-amber-200 dark:border-amber-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        {Icons.lightbulb}
                        İpucu
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        Faturalarınızda KDV dahil ve KDV hariç tutarları ayrı ayrı göstermeyi unutmayın. 
                        Bu hem şeffaflık sağlar hem de muhasebe işlemlerini kolaylaştırır.
                      </p>
                    </div>

                    {/* Features */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        {Icons.trophy}
                        Özellikler
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          { text: 'Çift yönlü hesaplama', color: 'emerald' },
                          { text: 'Özel KDV oranı desteği', color: 'blue' },
                          { text: 'Anında sonuç', color: 'purple' },
                          { text: 'Mobil uyumlu', color: 'pink' },
                          { text: 'Ücretsiz kullanım', color: 'amber' }
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className={`text-${item.color}-500`}>{Icons.check}</span>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Related Tools */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                          {Icons.calculator}
                        </span>
                        İlgili Araçlar
                      </h3>
                      <div className="space-y-2">
                        {[
                          { name: 'Yüzde Hesaplama', href: '/yuzde-hesaplama' },
                          { name: 'Faiz Hesaplama', href: '/faiz-hesaplama' },
                          { name: 'Hesap Makinesi', href: '/hesap-makinesi' },
                        ].map((link, i) => (
                          <Link 
                            key={i} 
                            href={link.href}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors group"
                          >
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {link.name}
                            </span>
                            <span className="text-slate-400 group-hover:text-teal-500 transition-colors">
                              {Icons.chevronRight}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            "Artık hesaplamalar çok net"
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Hızlı ve doğru KDV hesaplamaları için ücretsiz aracımızı kullanın
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/kullanici-sozlesmesi" className="hover:underline">
              Kullanıcı Sözleşmesi
            </Link>
            <span className="text-blue-300">•</span>
            <Link href="/gizlilik-ilkeleri" className="hover:underline">
              Gizlilik İlkeleri
            </Link>
            <span className="text-blue-300">•</span>
            <Link href="/sitene-ekle" className="hover:underline">
              Sitene Ekle
            </Link>
            <span className="text-blue-300">•</span>
            <Link href="/hakkimizda" className="hover:underline">
              Hakkımızda
            </Link>
            <span className="text-blue-300">•</span>
            <Link href="/iletisim" className="hover:underline">
              İletişim
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-75">
            hesaplama.net © 2009 - 2025
          </p>
        </div>
      </div>
    </>
  )
}