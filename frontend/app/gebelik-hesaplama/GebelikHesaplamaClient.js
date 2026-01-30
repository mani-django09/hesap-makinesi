'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GebelikHesaplama() {
  const [lastPeriodDate, setLastPeriodDate] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [result, setResult] = useState(null)

  const calculatePregnancy = (e) => {
    e.preventDefault()
    
    const lastPeriod = new Date(lastPeriodDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Calculate conception date (approximately 14 days after last period)
    const conceptionDate = new Date(lastPeriod)
    conceptionDate.setDate(conceptionDate.getDate() + parseInt(cycleLength) / 2)
    
    // Calculate due date (280 days or 40 weeks from last period)
    const dueDate = new Date(lastPeriod)
    dueDate.setDate(dueDate.getDate() + 280)
    
    // Calculate current week and day
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24))
    const weeksPassed = Math.floor(daysSinceLastPeriod / 7)
    const daysPassed = daysSinceLastPeriod % 7
    
    // Calculate remaining time
    const daysRemaining = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24))
    const weeksRemaining = Math.floor(daysRemaining / 7)
    
    // Calculate trimester
    let trimester = 1
    if (weeksPassed >= 28) trimester = 3
    else if (weeksPassed >= 13) trimester = 2
    
    // Calculate percentage completed
    const percentComplete = Math.min(100, Math.round((daysSinceLastPeriod / 280) * 100))
    
    // Determine pregnancy stage
    let stage = weeksPassed < 13 ? '1. Trimester' : weeksPassed < 28 ? '2. Trimester' : '3. Trimester'

    // Baby development info
    let babySize = ''
    let babyWeight = ''
    if (weeksPassed < 4) {
      babySize = 'İmplantasyon aşaması'
      babyWeight = '-'
    } else if (weeksPassed < 8) {
      babySize = '1-2 cm (susam tohumu)'
      babyWeight = '1-2 gram'
    } else if (weeksPassed < 13) {
      babySize = '5-8 cm (limon)'
      babyWeight = '15-30 gram'
    } else if (weeksPassed < 18) {
      babySize = '10-15 cm (avokado)'
      babyWeight = '100-150 gram'
    } else if (weeksPassed < 28) {
      babySize = '25-35 cm (muz)'
      babyWeight = '500-1000 gram'
    } else if (weeksPassed < 36) {
      babySize = '40-45 cm (ananas)'
      babyWeight = '1500-2500 gram'
    } else {
      babySize = '48-53 cm (karpuz)'
      babyWeight = '2500-3500 gram'
    }

    setResult({
      lastPeriod: lastPeriod.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      conceptionDate: conceptionDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      dueDate: dueDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      currentWeek: weeksPassed,
      currentDay: daysPassed,
      weeksRemaining,
      daysRemaining,
      trimester,
      stage,
      percentComplete,
      babySize,
      babyWeight,
      daysSinceLastPeriod
    })
  }

  const handleReset = () => {
    setLastPeriodDate('')
    setCycleLength('28')
    setResult(null)
  }

  const Icons = {
    home: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
    chevronRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
    heart: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
    calendar: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
    check: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
    calculator: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M12 10h2M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    lightbulb: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
    trophy: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
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
                  <Link href="/saglik" className="text-slate-500 hover:text-teal-600 transition-colors">Sağlık</Link>
                  <span className="text-slate-300 dark:text-slate-600">{Icons.chevronRight}</span>
                  <span className="text-slate-800 dark:text-white font-medium">Gebelik Hesaplama</span>
                </div>
              </nav>

              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/25 flex-shrink-0">
                  {Icons.heart}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Gebelik Hesaplama
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">
                    Doğum tarihi ve hamilelik haftası hesaplama
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
                      <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                        {Icons.calendar}
                      </span>
                      Gebelik Hesaplama
                    </h2>

                    <form onSubmit={calculatePregnancy} className="space-y-5">
                      {/* Last Period Date */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Son Adet Tarihinizin İlk Günü
                        </label>
                        <input
                          type="date"
                          value={lastPeriodDate}
                          onChange={(e) => setLastPeriodDate(e.target.value)}
                          required
                          max={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium transition-all"
                        />
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                          Son adet döngünüzün başladığı tarihi seçin
                        </p>
                      </div>

                      {/* Cycle Length */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Adet Döngüsü Süresi
                        </label>
                        <select
                          value={cycleLength}
                          onChange={(e) => setCycleLength(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium transition-all"
                        >
                          {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map(day => (
                            <option key={day} value={day}>
                              {day} gün {day === 28 && '(Ortalama)'}
                            </option>
                          ))}
                        </select>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                          İki adet dönemi arasındaki ortalama gün sayısı
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-500/25 transition-all duration-200 active:scale-[0.98]"
                        >
                          Hesapla
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
                        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl overflow-hidden card-shadow">
                          <div className="p-5 sm:p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                {Icons.check}
                              </div>
                              <div>
                                <p className="text-white/80 text-sm">Tahmini Doğum Tarihi</p>
                                <p className="text-2xl sm:text-3xl font-bold">{result.dueDate}</p>
                              </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-white/80">Hamilelik Haftası:</span>
                                <span className="text-xl font-bold font-mono-calc">{result.currentWeek} hafta {result.currentDay} gün</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-white/80">Trimester:</span>
                                <span className="font-semibold">{result.stage}</span>
                              </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                                <span>İlerleme</span>
                                <span>%{result.percentComplete}</span>
                              </div>
                              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-white rounded-full transition-all duration-500"
                                  style={{ width: `${result.percentComplete}%` }}
                                />
                              </div>
                              <p className="text-center text-xs text-white/60 mt-1">
                                {result.weeksRemaining} hafta ({result.daysRemaining} gün) kaldı
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Detailed Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Son Adet', value: result.lastPeriod },
                            { label: 'Tahmini Döllenme', value: result.conceptionDate },
                            { label: 'Geçen Gün', value: `${result.daysSinceLastPeriod} gün` },
                            { label: 'Kalan Hafta', value: `${result.weeksRemaining} hafta` },
                          ].map((stat, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                              <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">{stat.label}</div>
                              <div className="font-semibold text-slate-900 dark:text-white text-sm">{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Baby Development */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
                          <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="text-xl">👶</span>
                            {result.currentWeek}. Hafta Bebek Gelişimi
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                              <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">Bebek Boyu</div>
                              <div className="font-semibold text-slate-900 dark:text-white">{result.babySize}</div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                              <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">Bebek Ağırlığı</div>
                              <div className="font-semibold text-slate-900 dark:text-white">{result.babyWeight}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Educational Content */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    
                    {/* What is Pregnancy Calculator */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Gebelik Hesaplama Nedir?</h2>
                      <div className="text-slate-600 dark:text-slate-400 space-y-3 text-sm leading-relaxed">
                        <p>
                          Gebelik hesaplama, hamile bir kadının son adet tarihine göre tahmini doğum tarihini, 
                          hamilelik haftasını ve bebek gelişimini öğrenmesini sağlayan bir yöntemdir. Bu hesaplama 
                          Naegele kuralına dayanır ve son adet tarihinin ilk gününden itibaren 280 gün (40 hafta) 
                          eklenerek yapılır.
                        </p>
                        <p>
                          Hesaplanan doğum tarihi bir tahmindir. Bebeklerin sadece %5'i tam hesaplanan tarihte doğar. 
                          Çoğu bebek 37-42 hafta arasında dünyaya gelir ve bu tamamen normaldir.
                        </p>
                      </div>
                    </div>

                    {/* Trimesters */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Gebelik Dönemleri (Trimesterler)</h3>
                      <div className="space-y-3">
                        {[
                          { num: '1', name: '1. Trimester', weeks: '0-13 hafta', desc: 'Organların oluşması, kalp atışının başlaması' },
                          { num: '2', name: '2. Trimester', weeks: '14-27 hafta', desc: 'Bebek hareketleri, cinsiyetin belirginleşmesi' },
                          { num: '3', name: '3. Trimester', weeks: '28-40 hafta', desc: 'Hızlı büyüme, doğuma hazırlık' },
                        ].map((tri, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold flex-shrink-0">
                              {tri.num}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-1">{tri.name} ({tri.weeks})</h4>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{tri.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Important Info */}
                    <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/30">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        {Icons.lightbulb}
                        Önemli Bilgiler
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        {[
                          'Hesaplama son adet tarihine göre yapılır',
                          'Normal hamilelik 40 hafta sürer',
                          '37-42 hafta arası doğum normaldir',
                          'Düzenli doktor kontrolü çok önemlidir',
                          'Ultrason ile daha kesin tarih belirlenir'
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-pink-500 mt-0.5">{Icons.check}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* FAQ */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Sıkça Sorulan Sorular</h3>
                      <div className="space-y-4">
                        {[
                          { q: 'Gebelik tarihi nasıl hesaplanır?', a: 'Son adet tarihinin ilk gününden itibaren 280 gün (40 hafta) eklenerek tahmini doğum tarihi bulunur.' },
                          { q: 'Hamilelik kaç hafta sürer?', a: 'Normal hamilelik 40 hafta sürer. Ancak 37-42 hafta arası doğumlar da normal kabul edilir.' },
                          { q: 'Doğum tarihi kesin mi?', a: 'Hayır, tahminidir. Bebeklerin sadece %5\'i tam hesaplanan tarihte doğar.' },
                          { q: 'Adet düzensizliği etkiler mi?', a: 'Evet, düzensiz döngü hesaplamayı etkileyebilir. Ultrason ile daha doğru tarih belirlenir.' },
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
                    
                    {/* Quick Tips */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-sm shadow-lg">
                          ℹ️
                        </span>
                        Kullanım
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Son adet tarihini girin',
                          'Döngü sürenizi seçin',
                          'Hesapla butonuna tıklayın',
                          'Detaylı sonuçları görün'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className="text-pink-500">{Icons.check}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Warning */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 card-shadow border border-amber-200 dark:border-amber-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        {Icons.lightbulb}
                        Önemli Uyarı
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        Bu hesaplama aracı bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. 
                        Düzenli doktor kontrolü sağlıklı gebelik için şarttır.
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
                          { text: 'Doğum tarihi tahmini', color: 'emerald' },
                          { text: 'Haftalık takip', color: 'blue' },
                          { text: 'Bebek gelişimi bilgisi', color: 'purple' },
                          { text: 'Trimester bilgileri', color: 'pink' },
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
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
                          {Icons.calculator}
                        </span>
                        İlgili Araçlar
                      </h3>
                      <div className="space-y-2">
                        {[
                          { name: 'Yaş Hesaplama', href: '/yas-hesaplama' },
                          { name: 'Gün Hesaplama', href: '/gun-hesaplama' },
                          { name: 'BMI Hesaplama', href: '/bmi-hesaplama' },
                        ].map((link, i) => (
                          <Link 
                            key={i} 
                            href={link.href}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors group"
                          >
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                              {link.name}
                            </span>
                            <span className="text-slate-400 group-hover:text-pink-500 transition-colors">
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
      </div>
    </>
  )
}