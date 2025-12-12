'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function YasHesaplamaPage() {
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [ageResult, setAgeResult] = useState(null)
  const [useToday, setUseToday] = useState(true)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setTargetDate(today)
  }, [])

  const calculateAge = (e) => {
    e.preventDefault()
    
    const birth = new Date(birthDate)
    const target = new Date(targetDate)
    
    if (birth > target) {
      alert('Doğum tarihi hedef tarihten sonra olamaz!')
      return
    }

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((target - birth) / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60
    const totalSeconds = totalMinutes * 60

    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1)
    }
    const daysToNextBirthday = Math.ceil((nextBirthday - target) / (1000 * 60 * 60 * 24))

    const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
    const birthDayOfWeek = daysOfWeek[birth.getDay()]

    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate())
    const chineseZodiac = getChineseZodiac(birth.getFullYear())
    const season = getSeason(birth.getMonth() + 1, birth.getDate())

    setAgeResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      weeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToNextBirthday,
      birthDayOfWeek,
      zodiacSign,
      chineseZodiac,
      season,
      nextBirthday: nextBirthday.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    })
  }

  const getZodiacSign = (month, day) => {
    const zodiacSigns = [
      { sign: 'Oğlak', emoji: '♑', start: [12, 22], end: [1, 19] },
      { sign: 'Kova', emoji: '♒', start: [1, 20], end: [2, 18] },
      { sign: 'Balık', emoji: '♓', start: [2, 19], end: [3, 20] },
      { sign: 'Koç', emoji: '♈', start: [3, 21], end: [4, 19] },
      { sign: 'Boğa', emoji: '♉', start: [4, 20], end: [5, 20] },
      { sign: 'İkizler', emoji: '♊', start: [5, 21], end: [6, 20] },
      { sign: 'Yengeç', emoji: '♋', start: [6, 21], end: [7, 22] },
      { sign: 'Aslan', emoji: '♌', start: [7, 23], end: [8, 22] },
      { sign: 'Başak', emoji: '♍', start: [8, 23], end: [9, 22] },
      { sign: 'Terazi', emoji: '♎', start: [9, 23], end: [10, 22] },
      { sign: 'Akrep', emoji: '♏', start: [10, 23], end: [11, 21] },
      { sign: 'Yay', emoji: '♐', start: [11, 22], end: [12, 21] }
    ]

    for (const z of zodiacSigns) {
      if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) {
        return `${z.sign} ${z.emoji}`
      }
    }
    return 'Oğlak ♑'
  }

  const getChineseZodiac = (year) => {
    const animals = ['Maymun', 'Horoz', 'Köpek', 'Domuz', 'Fare', 'Öküz', 'Kaplan', 'Tavşan', 'Ejderha', 'Yılan', 'At', 'Koyun']
    return animals[year % 12]
  }

  const getSeason = (month, day) => {
    if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) return '❄️ Kış'
    if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) return '🌸 İlkbahar'
    if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 23)) return '☀️ Yaz'
    return '🍂 Sonbahar'
  }

  const Icons = {
    home: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
    chevronRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
    cake: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"/></svg>,
    calendar: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
    clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    star: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    sparkles: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
    check: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
    lightbulb: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
    calculator: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M12 10h2M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    trophy: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
    book: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
    spinner: <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>,
  }

  const LoadingButton = ({ onClick, loading, children, variant = 'primary' }) => {
    const variants = {
      primary: 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/25',
      secondary: 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
    }
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-5 py-2.5 font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed ${variants[variant]}`}
      >
        {loading ? Icons.spinner : children}
      </button>
    )
  }

  const InputField = ({ value, onChange, type = "date", readOnly = false, className = '' }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium
        ${readOnly 
          ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300' 
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'
        } 
        text-slate-800 dark:text-white placeholder:text-slate-400 outline-none ${className}`}
    />
  )

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

        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
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
                  <Link href="/tarih" className="text-slate-500 hover:text-teal-600 transition-colors">Tarih</Link>
                  <span className="text-slate-300 dark:text-slate-600">{Icons.chevronRight}</span>
                  <span className="text-slate-800 dark:text-white font-medium">Yaş Hesaplama</span>
                </div>
              </nav>

              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 flex-shrink-0">
                  {Icons.cake}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Yaş Hesaplama
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">
                    Doğum tarihinize göre tam yaşınızı hesaplayın
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
                        {Icons.calendar}
                      </span>
                      Yaş Hesaplama
                    </h2>

                    <form onSubmit={calculateAge} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Doğum Tarihiniz
                        </label>
                        <InputField
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          required
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Hesaplama Tarihi
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={useToday}
                              onChange={(e) => {
                                setUseToday(e.target.checked)
                                if (e.target.checked) {
                                  setTargetDate(new Date().toISOString().split('T')[0])
                                }
                              }}
                              className="w-4 h-4 rounded text-teal-600 focus:ring-2 focus:ring-teal-500"
                            />
                            <span className="text-slate-600 dark:text-slate-400">Bugün</span>
                          </label>
                        </div>
                        <InputField
                          value={targetDate}
                          onChange={(e) => {
                            setTargetDate(e.target.value)
                            setUseToday(false)
                          }}
                          required
                        />
                      </div>

                      <div className="flex gap-3">
                        <button 
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.98]"
                        >
                          Hesapla
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBirthDate('')
                            setTargetDate(new Date().toISOString().split('T')[0])
                            setAgeResult(null)
                            setUseToday(true)
                          }}
                          className="px-5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-all"
                        >
                          Temizle
                        </button>
                      </div>
                    </form>

                    {ageResult && (
                      <div className="mt-6 space-y-5 result-pop">
                        {/* Main Result */}
                        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl overflow-hidden card-shadow">
                          <div className="p-5 sm:p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                {Icons.check}
                              </div>
                              <div>
                                <p className="text-white/80 text-sm">Tam Yaşınız</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                  <span className="text-3xl sm:text-4xl font-bold font-mono-calc">{ageResult.years}</span>
                                  <span className="text-sm">yıl</span>
                                  <span className="text-2xl sm:text-3xl font-bold font-mono-calc">{ageResult.months}</span>
                                  <span className="text-sm">ay</span>
                                  <span className="text-2xl sm:text-3xl font-bold font-mono-calc">{ageResult.days}</span>
                                  <span className="text-sm">gün</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { label: 'Toplam Gün', value: ageResult.totalDays.toLocaleString() },
                            { label: 'Toplam Hafta', value: ageResult.weeks.toLocaleString() },
                            { label: 'Toplam Ay', value: ageResult.totalMonths.toLocaleString() },
                            { label: 'Toplam Saat', value: ageResult.totalHours.toLocaleString() },
                            { label: 'Toplam Dakika', value: ageResult.totalMinutes.toLocaleString() },
                            { label: 'Doğum Gününe', value: `${ageResult.daysToNextBirthday} gün` },
                          ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 font-mono-calc mb-1">
                                {stat.value}
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Additional Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">Doğum Bilgileri</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Doğduğunuz Gün:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{ageResult.birthDayOfWeek}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Mevsim:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{ageResult.season}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm">Burç Bilgileri</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Batı Burcu:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{ageResult.zodiacSign}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Çin Burcu:</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{ageResult.chineseZodiac}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Next Birthday */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800 text-center">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Sonraki Doğum Gününüz</p>
                          <p className="text-lg font-bold text-slate-900 dark:text-white">{ageResult.nextBirthday}</p>
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold mt-1">
                            {ageResult.daysToNextBirthday} gün sonra! 🎉
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Educational Content */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    
                    {/* What is Age Calculation */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Yaş Hesaplama Nedir?</h2>
                      <div className="text-slate-600 dark:text-slate-400 space-y-3 text-sm leading-relaxed">
                        <p>
                          Yaş hesaplama, bir kişinin doğum tarihinden belirli bir tarihe kadar geçen süreyi yıl, ay ve gün 
                          cinsinden belirleme işlemidir. Bu hesaplama sadece kaç yaşında olduğunuzu göstermekle kalmaz, 
                          aynı zamanda hayatınızda ne kadar zaman geçirdiğinizi farklı birimlerle görmenizi sağlar.
                        </p>
                        <p>
                          Online yaş hesaplayıcılar, manuel hesaplamadan çok daha hızlı ve doğru sonuçlar verir. Özellikle 
                          ay ve gün bazında detaylı yaş hesaplamalarında artık yılları ve farklı ay günlerini göz önünde 
                          bulundurarak kesin sonuçlar sunar.
                        </p>
                      </div>
                    </div>

                    {/* How to Calculate */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Yaş Nasıl Hesaplanır?</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          {
                            title: 'Basit Hesaplama',
                            steps: [
                              'Bugünün yılından doğum yılını çıkarın',
                              'Doğum günü henüz gelmediyse 1 çıkarın'
                            ],
                            example: '2024 - 1990 = 34 yaş'
                          },
                          {
                            title: 'Detaylı Hesaplama',
                            steps: [
                              'Yıl farkını hesaplayın',
                              'Ay farkını bulun (negatifse ayarlayın)',
                              'Gün farkını hesaplayın (negatifse ayarlayın)'
                            ],
                            example: '33 yıl 9 ay 26 gün'
                          }
                        ].map((method, i) => (
                          <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-3">{method.title}</h4>
                            <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-400 mb-3 list-decimal list-inside">
                              {method.steps.map((step, j) => (
                                <li key={j}>{step}</li>
                              ))}
                            </ol>
                            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-3">
                              <p className="text-xs font-mono-calc text-teal-700 dark:text-teal-400">
                                <strong>Örnek:</strong> {method.example}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Usage Areas */}
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Kullanım Alanları</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { emoji: '📋', title: 'Resmi İşlemler', desc: 'Nüfus, pasaport, ehliyet gibi evraklarda yaş bilgisi gerekir.' },
                          { emoji: '🏥', title: 'Sağlık ve Tıp', desc: 'Bebek gelişimi, aşı takvimleri için ay bazında yaş önemlidir.' },
                          { emoji: '🎓', title: 'Eğitim', desc: 'Okul kayıtlarında yaş sınırı vardır, ay bazında hesaplama gerekir.' },
                          { emoji: '💼', title: 'İş ve Emeklilik', desc: 'Emeklilik yaşı, kıdem tazminatı hesaplamalarında kesin yaş gerekir.' },
                          { emoji: '🎂', title: 'Doğum Günü', desc: 'Özel kutlamalar için kaç gün kaldığını öğrenebilirsiniz.' },
                          { emoji: '🎯', title: 'Spor Yarışmaları', desc: 'Yaş kategorilerinde yarışabilmek için tam yaş gerekir.' },
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

                    {/* Interesting Facts */}
                    <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/30">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        {Icons.sparkles}
                        İlginç Bilgiler
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { icon: '🌍', text: 'Dünya ortalaması 73 yıl, Türkiye\'de 78 yıl civarındadır' },
                          { icon: '📅', text: '29 Şubat doğumlular her 4 yılda bir doğum günü kutlar' },
                          { icon: '⏰', text: '80 yıl yaşarsanız 700.000+ saat geçirirsiniz' },
                          { icon: '🎂', text: 'En çok doğum Eylül ayında gerçekleşir' },
                        ].map((fact, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="text-xl flex-shrink-0">{fact.icon}</span>
                            <p className="text-xs text-slate-600 dark:text-slate-400">{fact.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQ */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Sıkça Sorulan Sorular</h3>
                      <div className="space-y-4">
                        {[
                          { q: 'Yaş nasıl hesaplanır?', a: 'Doğum tarihinizi girin. Hesaplayıcımız bugünkü tarih ile doğum tarihiniz arasındaki farkı yıl, ay ve gün olarak hesaplar.' },
                          { q: 'Ay ve gün olarak yaş nasıl hesaplanır?', a: 'Yaş hesaplayıcımız otomatik olarak yaşınızı yıl, ay ve gün cinsinden gösterir. Örneğin 25 yıl 3 ay 15 gün gibi.' },
                          { q: 'Kaç gündür yaşıyorum?', a: 'Doğum tarihinizi girdiğinizde, hesaplayıcımız bugüne kadar kaç gün yaşadığınızı gösterir.' },
                          { q: 'Doğduğum gün hangi gündü?', a: 'Yaş hesaplayıcımız doğum tarihinizi analiz ederek hangi gün doğduğunuzu gösterir.' },
                          { q: 'Burç hesaplama yapıyor mu?', a: 'Evet, doğum tarihinize göre burcunuzu otomatik olarak hesaplar ve gösterir.' },
                          { q: 'Gelecek doğum günüm ne zaman?', a: 'Hesaplayıcımız bir sonraki doğum gününüzün tarihini ve kaç gün sonra olduğunu gösterir.' },
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
                    
                    {/* Info Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-sm shadow-lg">
                          ℹ️
                        </span>
                        Nasıl Kullanılır
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          'Doğum tarihinizi seçin',
                          'Hesaplama tarihini belirleyin',
                          'Hesapla butonuna tıklayın',
                          'Detaylı sonuçlarınızı görün'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <span className="text-teal-500">{Icons.check}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tip Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 card-shadow border border-amber-200 dark:border-amber-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                        {Icons.lightbulb}
                        İpucu
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        Gelecek veya geçmiş bir tarih için de yaş hesaplayabilirsiniz. "Bugün" seçeneğini kaldırıp 
                        istediğiniz tarihi seçin.
                      </p>
                    </div>

                    {/* Features Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        {Icons.trophy}
                        Özellikler
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {[
                          { text: 'Detaylı yaş analizi', color: 'emerald' },
                          { text: 'Çoklu zaman birimi', color: 'blue' },
                          { text: 'Burç hesaplama', color: 'purple' },
                          { text: 'Doğum günü takvimi', color: 'pink' },
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
                          { name: 'Gün Hesaplama', href: '/gun-hesaplama' },
                          { name: 'Tarih Farkı', href: '/tarih-farki' },
                          { name: 'Hafta Hesaplama', href: '/hafta-hesaplama' },
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
      </div>
    </>
  )
}