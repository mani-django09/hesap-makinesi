'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function YuzdeHesaplama() {
  const [calc1, setCalc1] = useState({ percent: '', of: '', result: '' })
  const [calc2, setCalc2] = useState({ what: '', of: '', result: '' })
  const [calc3, setCalc3] = useState({ value: '', of: '', result: '' })
  const [calc4, setCalc4] = useState({ value: '', percent: '', result: '' })
  const [diff, setDiff] = useState({ value1: '', value2: '', result: '' })
  const [change, setChange] = useState({ value: '', type: 'increase', percent: '', result: '' })
  
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [loading4, setLoading4] = useState(false)
  const [loadingDiff, setLoadingDiff] = useState(false)
  const [loadingChange, setLoadingChange] = useState(false)
  const [showResult1, setShowResult1] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  const calculate1 = async () => {
    if (!calc1.percent || !calc1.of) return
    setLoading1(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    const percent = parseFloat(calc1.percent)
    const of = parseFloat(calc1.of)
    const result = (percent / 100) * of
    setCalc1({ ...calc1, result: result.toFixed(2) })
    setShowResult1(true)
    setLoading1(false)
  }

  const calculate2 = async () => {
    if (!calc2.what || !calc2.of) return
    setLoading2(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    const what = parseFloat(calc2.what)
    const of = parseFloat(calc2.of)
    const result = (what / 100) * of
    setCalc2({ ...calc2, result: result.toFixed(2) })
    setLoading2(false)
  }

  const calculate3 = async () => {
    if (!calc3.value || !calc3.of) return
    setLoading3(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    const value = parseFloat(calc3.value)
    const of = parseFloat(calc3.of)
    const result = (value / of) * 100
    setCalc3({ ...calc3, result: result.toFixed(2) })
    setLoading3(false)
  }

  const calculate4 = async () => {
    if (!calc4.value || !calc4.percent) return
    setLoading4(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    const value = parseFloat(calc4.value)
    const percent = parseFloat(calc4.percent)
    const result = (value * 100) / percent
    setCalc4({ ...calc4, result: result.toFixed(2) })
    setLoading4(false)
  }

  const calculateDiff = async () => {
    if (!diff.value1 || !diff.value2) return
    setLoadingDiff(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    const v1 = parseFloat(diff.value1)
    const v2 = parseFloat(diff.value2)
    const result = ((Math.abs(v1 - v2) / ((v1 + v2) / 2)) * 100).toFixed(2)
    setDiff({ ...diff, result: result })
    setLoadingDiff(false)
  }

  const calculateChange = async () => {
    if (!change.value || !change.percent) return
    setLoadingChange(true)
    await new Promise(resolve => setTimeout(resolve, 400))
    const value = parseFloat(change.value)
    const percent = parseFloat(change.percent) / 100
    const result = change.type === 'increase' 
      ? (value * (1 + percent)).toFixed(2)
      : (value * (1 - percent)).toFixed(2)
    setChange({ ...change, result: result })
    setLoadingChange(false)
  }

  const Icons = {
    percent: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/><path strokeLinecap="round" d="M19 5L5 19"/></svg>,
    calculator: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M12 10h2M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>,
    home: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
    chevronRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
    check: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
    arrowUp: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>,
    arrowDown: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>,
    diff: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>,
    lightbulb: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
    spinner: <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>,
    chart: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    trophy: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
    book: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
    star: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    trending: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>,
    puzzle: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>,
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

  const InputField = ({ value, onChange, placeholder, readOnly = false, suffix, className = '' }) => (
    <div className={`relative ${className}`}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium
          ${readOnly 
            ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10'
          } 
          text-slate-800 dark:text-white placeholder:text-slate-400 outline-none`}
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">{suffix}</span>
      )}
    </div>
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

        .tab-indicator {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hide number input arrows */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
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
                  <Link href="/matematik" className="text-slate-500 hover:text-teal-600 transition-colors">Matematik</Link>
                  <span className="text-slate-300 dark:text-slate-600">{Icons.chevronRight}</span>
                  <span className="text-slate-800 dark:text-white font-medium">Yüzde Hesaplama</span>
                </div>
              </nav>

              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 flex-shrink-0">
                  {Icons.percent}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Yüzde Hesaplama
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">
                    Hızlı ve kolay yüzde hesaplamaları yapın
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
                  
                  {/* Tab Navigation */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-1.5 card-shadow border border-slate-200 dark:border-slate-800 fade-up" style={{ animationDelay: '0.2s' }}>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'basic', label: 'Temel', icon: Icons.percent },
                        { id: 'diff', label: 'Fark', icon: Icons.diff },
                        { id: 'change', label: 'Değişim', icon: Icons.arrowUp }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="hidden sm:block">{tab.icon}</span>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Basic Calculator */}
                  {activeTab === 'basic' && (
                    <div className="space-y-4 fade-up">
                      {/* Main Calculator Card */}
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 card-shadow border border-slate-200 dark:border-slate-800">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                            %
                          </span>
                          Yüzde Hesapla
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          <InputField 
                            value={calc1.percent} 
                            onChange={(e) => setCalc1({ ...calc1, percent: e.target.value })}
                            placeholder="25"
                            className="w-24 sm:w-28"
                          />
                          <span className="font-bold text-slate-600 dark:text-slate-400">%</span>
                          <span className="text-slate-500 hidden sm:inline">×</span>
                          <InputField 
                            value={calc1.of} 
                            onChange={(e) => setCalc1({ ...calc1, of: e.target.value })}
                            placeholder="200"
                            className="w-28 sm:w-36"
                          />
                          <span className="font-bold text-slate-600 dark:text-slate-400">=</span>
                          <InputField 
                            value={calc1.result} 
                            readOnly
                            placeholder="?"
                            className="w-28 sm:w-36"
                          />
                        </div>

                        <div className="flex gap-3">
                          <LoadingButton onClick={calculate1} loading={loading1}>
                            Hesapla
                          </LoadingButton>
                          <LoadingButton 
                            onClick={() => { setCalc1({ percent: '', of: '', result: '' }); setShowResult1(false); }} 
                            variant="secondary"
                          >
                            Temizle
                          </LoadingButton>
                        </div>
                      </div>

                      {/* Result Display */}
                      {showResult1 && calc1.result && (
                        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl overflow-hidden card-shadow result-pop">
                          <div className="p-5 sm:p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                {Icons.check}
                              </div>
                              <div>
                                <p className="text-white/80 text-sm">Sonuç</p>
                                <p className="text-2xl sm:text-3xl font-bold">{calc1.result}</p>
                              </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                              <p className="text-white/90">
                                <span className="font-bold">{calc1.result}</span>, {calc1.of} sayısının <span className="font-bold">%{calc1.percent}</span>'idir.
                              </p>
                              <div className="mt-3 pt-3 border-t border-white/20">
                                <p className="text-sm text-white/70 font-mono-calc">
                                  {calc1.of} × ({calc1.percent}/100) = {calc1.result}
                                </p>
                              </div>
                            </div>
                            {/* Visual Bar */}
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                                <span>0</span>
                                <span>{calc1.of}</span>
                              </div>
                              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-white rounded-full transition-all duration-500"
                                  style={{ width: `${Math.min(parseFloat(calc1.percent), 100)}%` }}
                                />
                              </div>
                              <p className="text-center text-xs text-white/60 mt-1">%{calc1.percent}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Calculators */}
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 card-shadow border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Diğer Hesaplamalar</h3>
                        
                        <div className="space-y-4">
                          {/* Calc 2 */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Bir sayının yüzdesi kaçtır?</p>
                            <div className="flex flex-wrap items-center gap-2">
                              <InputField 
                                value={calc2.what} 
                                onChange={(e) => setCalc2({ ...calc2, what: e.target.value })}
                                placeholder="15"
                                className="w-20"
                              />
                              <span className="text-sm text-slate-500">sayısının %</span>
                              <InputField 
                                value={calc2.of} 
                                onChange={(e) => setCalc2({ ...calc2, of: e.target.value })}
                                placeholder="100"
                                className="w-24"
                              />
                              <span className="text-sm text-slate-500">'si</span>
                              <LoadingButton onClick={calculate2} loading={loading2}>
                                =
                              </LoadingButton>
                              {calc2.result && !loading2 && (
                                <span className="font-bold text-teal-600 dark:text-teal-400 font-mono-calc">{calc2.result}</span>
                              )}
                            </div>
                          </div>

                          {/* Calc 3 */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Bir sayı diğerinin yüzde kaçıdır?</p>
                            <div className="flex flex-wrap items-center gap-2">
                              <InputField 
                                value={calc3.value} 
                                onChange={(e) => setCalc3({ ...calc3, value: e.target.value })}
                                placeholder="25"
                                className="w-20"
                              />
                              <span className="text-sm text-slate-500">sayısı,</span>
                              <InputField 
                                value={calc3.of} 
                                onChange={(e) => setCalc3({ ...calc3, of: e.target.value })}
                                placeholder="200"
                                className="w-24"
                              />
                              <span className="text-sm text-slate-500">'nin %</span>
                              <LoadingButton onClick={calculate3} loading={loading3}>
                                =
                              </LoadingButton>
                              {calc3.result && !loading3 && (
                                <span className="font-bold text-teal-600 dark:text-teal-400 font-mono-calc">%{calc3.result}</span>
                              )}
                            </div>
                          </div>

                          {/* Calc 4 */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Hangi sayının yüzdesidir?</p>
                            <div className="flex flex-wrap items-center gap-2">
                              <InputField 
                                value={calc4.value} 
                                onChange={(e) => setCalc4({ ...calc4, value: e.target.value })}
                                placeholder="50"
                                className="w-20"
                              />
                              <span className="text-sm text-slate-500">sayısı, hangi sayının %</span>
                              <InputField 
                                value={calc4.percent} 
                                onChange={(e) => setCalc4({ ...calc4, percent: e.target.value })}
                                placeholder="25"
                                className="w-20"
                              />
                              <span className="text-sm text-slate-500">'si</span>
                              <LoadingButton onClick={calculate4} loading={loading4}>
                                =
                              </LoadingButton>
                              {calc4.result && !loading4 && (
                                <span className="font-bold text-teal-600 dark:text-teal-400 font-mono-calc">{calc4.result}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Difference Calculator */}
                  {activeTab === 'diff' && (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 card-shadow border border-slate-200 dark:border-slate-800 fade-up">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                          {Icons.diff}
                        </span>
                        Yüzde Fark Hesaplama
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                        İki değer arasındaki yüzdelik farkı hesaplayın
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4 mb-5">
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Değer 1</label>
                          <InputField 
                            value={diff.value1} 
                            onChange={(e) => setDiff({ ...diff, value1: e.target.value })}
                            placeholder="100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Değer 2</label>
                          <InputField 
                            value={diff.value2} 
                            onChange={(e) => setDiff({ ...diff, value2: e.target.value })}
                            placeholder="150"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mb-5">
                        <LoadingButton onClick={calculateDiff} loading={loadingDiff}>
                          Hesapla
                        </LoadingButton>
                        <LoadingButton 
                          onClick={() => setDiff({ value1: '', value2: '', result: '' })} 
                          variant="secondary"
                        >
                          Temizle
                        </LoadingButton>
                      </div>

                      {diff.result && !loadingDiff && (
                        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl border border-violet-200 dark:border-violet-800 result-pop">
                          <p className="text-sm text-slate-600 dark:text-slate-400">Yüzde Fark</p>
                          <p className="text-3xl font-bold text-violet-600 dark:text-violet-400 font-mono-calc">%{diff.result}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-mono-calc">
                            |{diff.value1} - {diff.value2}| / (({diff.value1} + {diff.value2}) / 2) × 100
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Change Calculator */}
                  {activeTab === 'change' && (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 card-shadow border border-slate-200 dark:border-slate-800 fade-up">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          {Icons.trending}
                        </span>
                        Yüzde Değişim Hesaplama
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                        Bir sayıyı belirli bir yüzde artırın veya azaltın
                      </p>
                      
                      <div className="flex flex-wrap items-end gap-4 mb-5">
                        <div className="flex-1 min-w-[100px]">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Değer</label>
                          <InputField 
                            value={change.value} 
                            onChange={(e) => setChange({ ...change, value: e.target.value })}
                            placeholder="500"
                          />
                        </div>
                        <div className="w-32">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">İşlem</label>
                          <select
                            value={change.type}
                            onChange={(e) => setChange({ ...change, type: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                          >
                            <option value="increase">Artış</option>
                            <option value="decrease">Azalış</option>
                          </select>
                        </div>
                        <div className="w-24">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Yüzde</label>
                          <InputField 
                            value={change.percent} 
                            onChange={(e) => setChange({ ...change, percent: e.target.value })}
                            placeholder="20"
                            suffix="%"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mb-5">
                        <LoadingButton onClick={calculateChange} loading={loadingChange}>
                          Hesapla
                        </LoadingButton>
                        <LoadingButton 
                          onClick={() => setChange({ value: '', type: 'increase', percent: '', result: '' })} 
                          variant="secondary"
                        >
                          Temizle
                        </LoadingButton>
                      </div>

                      {change.result && !loadingChange && (
                        <div className={`p-4 rounded-xl border result-pop ${
                          change.type === 'increase' 
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800'
                            : 'bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 border-rose-200 dark:border-rose-800'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {change.type === 'increase' ? Icons.arrowUp : Icons.arrowDown}
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              %{change.percent} {change.type === 'increase' ? 'Artış' : 'Azalış'} Sonucu
                            </p>
                          </div>
                          <p className={`text-3xl font-bold font-mono-calc ${
                            change.type === 'increase' 
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {change.result}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-mono-calc">
                            {change.value} × (1 {change.type === 'increase' ? '+' : '-'} {parseFloat(change.percent)/100}) = {change.result}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* NEW RICH CONTENT SECTIONS */}

                  {/* Understanding Percentages - Comprehensive Guide */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                          {Icons.book}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Yüzde Hesaplama Rehberi</h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Yüzde hesaplamalarını her yönüyle anlamak için kapsamlı kılavuzunuz
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Yüzde Nedir ve Nasıl Çalışır?</h3>
                      <div className="text-slate-600 dark:text-slate-400 space-y-4 text-sm leading-relaxed">
                        <p>
                          Yüzde, Latin kökenli "per centum" ifadesinden gelir ve tam olarak "yüzde" anlamına gelir. 
                          Matematikte bunu her zaman 100 üzerinden bir oran olarak düşünebilirsiniz. Mesela bir sınıfta 
                          100 öğrenci varsa ve bunların 30'u kız ise, kızların oranı %30'dur. Ama ya sınıfta 50 öğrenci 
                          varsa ve 15'i kız? İşte burada yüzde hesaplama devreye giriyor.
                        </p>
                        <p>
                          Yüzde sembolü (%) aslında sayıların üst üste yazılmış halidir - 1, 0 ve 0. Bu da "100'de" 
                          anlamını görsel olarak temsil eder. Her yüzde ifadesi bir kesir veya ondalık sayı olarak 
                          yazılabilir. Örneğin %50 = 50/100 = 0.50 şeklinde gösterilebilir.
                        </p>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border-l-4 border-blue-500">
                          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">💡 Pratik İpucu</p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Yüzdeyi hızlı anlamak için şunu düşünün: Eğer 100 elmam varsa ve %25'ini yedim, 
                            kaç elma yedim? 25 elma! Çünkü %25, 100'ün 25'i demek.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Yüzde Hesaplama Türleri</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { 
                            icon: Icons.percent, 
                            color: 'teal',
                            title: 'Temel Yüzde Hesabı', 
                            desc: 'Bir sayının belirli yüzdesini bulma',
                            example: '200\'ün %15\'i = 30',
                            formula: 'Sayı × (Yüzde ÷ 100)'
                          },
                          { 
                            icon: Icons.chart, 
                            color: 'blue',
                            title: 'Oran Hesaplama', 
                            desc: 'Bir sayının başka bir sayıya oranı',
                            example: '30, 200\'ün %15\'i',
                            formula: '(Parça ÷ Bütün) × 100'
                          },
                          { 
                            icon: Icons.trending, 
                            color: 'emerald',
                            title: 'Artış/Azalış', 
                            desc: 'Değer değişimlerini yüzde ile ifade etme',
                            example: '100→120 = %20 artış',
                            formula: '((Yeni - Eski) ÷ Eski) × 100'
                          },
                          { 
                            icon: Icons.diff, 
                            color: 'violet',
                            title: 'Yüzde Fark', 
                            desc: 'İki değer arasındaki göreceli fark',
                            example: '80 ile 120 arası %40 fark',
                            formula: '|V1 - V2| ÷ ((V1 + V2) / 2) × 100'
                          },
                        ].map((item, i) => (
                          <div key={i} className={`bg-white dark:bg-slate-900 rounded-xl p-4 border-2 border-${item.color}-100 dark:border-${item.color}-900/30`}>
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`w-10 h-10 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400 flex-shrink-0`}>
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
                              </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 space-y-2">
                              <div>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Örnek:</p>
                                <p className="font-mono-calc text-sm text-slate-700 dark:text-slate-300">{item.example}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Formül:</p>
                                <p className="font-mono-calc text-xs text-teal-600 dark:text-teal-400">{item.formula}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Real World Applications */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          {Icons.puzzle}
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Günlük Hayatta Yüzde Kullanımı</h2>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Yüzdeler her gün karşımıza çıkar. İşte en yaygın kullanım alanları ve pratik örnekler
                      </p>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="space-y-6">
                        {[
                          {
                            emoji: '🛍️',
                            title: 'Alışveriş ve İndirimler',
                            color: 'rose',
                            scenarios: [
                              { text: 'Mağazada %40 indirim varsa, 250₺\'lik ürün kaç lira olur?', calc: '250 × (1 - 0.40) = 150₺' },
                              { text: 'İki indirim üst üste gelse (%20 sonra %10) toplam indirim kaç?', calc: 'İlk %20, sonra kalan üzerinden %10 = %28 toplam' },
                              { text: '500₺ alışverişte %15 ekstra indirim kuponu kullanırsanız ne kadar ödersiniz?', calc: '500 × 0.85 = 425₺' }
                            ]
                          },
                          {
                            emoji: '💰',
                            title: 'Finans ve Bütçe',
                            color: 'emerald',
                            scenarios: [
                              { text: 'Maaşınıza %12 zam geldiyse, 8.500₺ olan maaş ne olur?', calc: '8.500 × 1.12 = 9.520₺' },
                              { text: 'Gelirinizin %30\'unu kiraya, %20\'sini yemeğe harcıyorsanız geriye ne kalır?', calc: '100% - 30% - 20% = %50 kalır' },
                              { text: 'Yıllık %18 faizle 10.000₺ yatırdıysanız, 1 yıl sonra ne kazanırsınız?', calc: '10.000 × 0.18 = 1.800₺ faiz' }
                            ]
                          },
                          {
                            emoji: '📊',
                            title: 'İş ve Performans',
                            color: 'blue',
                            scenarios: [
                              { text: 'Satış hedefiniz 100.000₺, 85.000₺ yaptınız. Hedef gerçekleşme oranı?', calc: '(85.000 ÷ 100.000) × 100 = %85' },
                              { text: 'Geçen ay 50 müşteri, bu ay 65 müşteri. Artış yüzdesi?', calc: '((65 - 50) ÷ 50) × 100 = %30 artış' },
                              { text: 'Projede %75 ilerleme kaydettiyseniz, kalan kısım?', calc: '100% - 75% = %25 kaldı' }
                            ]
                          },
                          {
                            emoji: '🎓',
                            title: 'Eğitim ve Sınavlar',
                            color: 'indigo',
                            scenarios: [
                              { text: '100 soruluk sınavda 83 doğru yaptınız. Not ortalamanız?', calc: '(83 ÷ 100) × 100 = %83' },
                              { text: 'Sınıfın %40\'ı kız, 25 öğrenci varsa kaç kız var?', calc: '25 × 0.40 = 10 kız öğrenci' },
                              { text: 'Final notunuzun %60\'ı yazılı, %40\'ı sözlü. Yazılı 70, sözlü 90 ise not?', calc: '(70 × 0.6) + (90 × 0.4) = 78' }
                            ]
                          }
                        ].map((section, i) => (
                          <div key={i} className={`border-l-4 border-${section.color}-500 pl-4`}>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl">{section.emoji}</span>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{section.title}</h3>
                            </div>
                            <div className="space-y-3">
                              {section.scenarios.map((scenario, j) => (
                                <div key={j} className={`bg-${section.color}-50 dark:bg-${section.color}-900/20 rounded-lg p-3`}>
                                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{scenario.text}</p>
                                  <div className={`bg-white dark:bg-slate-900 rounded-md px-3 py-2 border border-${section.color}-200 dark:border-${section.color}-800`}>
                                    <p className="font-mono-calc text-xs text-slate-600 dark:text-slate-400">
                                      <span className={`text-${section.color}-600 dark:text-${section.color}-400 font-semibold`}>Çözüm: </span>
                                      {scenario.calc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  

                  {/* Advanced Concepts */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          {Icons.trophy}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800 dark:text-white">İleri Seviye Konular</h2>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Yüzde hesaplamalarında ustalaşmak için detaylı bilgiler
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-6">
                      {[
                        {
                          title: 'Bileşik Yüzde Değişimleri',
                          icon: Icons.trending,
                          color: 'purple',
                          content: 'Ardışık yüzde değişimlerinde her değişim bir önceki sonuç üzerinden hesaplanır. Mesela 100₺\'lik bir ürüne önce %20 zam gelirse 120₺ olur, sonra bu 120₺ üzerinden %10 indirim yapılırsa 108₺ olur. Toplam etki %8 artış oluşturur, basitçe %20 - %10 = %10 değil!',
                          formula: 'Son Değer = İlk Değer × (1 ± Y1/100) × (1 ± Y2/100) × ...'
                        },
                        {
                          title: 'Yüzde Puanı vs Yüzde',
                          icon: Icons.diff,
                          color: 'blue',
                          content: 'Bu iki kavram sıkça karıştırılır. Enflasyon %8\'den %12\'ye çıktıysa, bu 4 yüzde PUANI artış demektir. Ama yüzde olarak artış %50\'dir (çünkü 4/8 = 0.50). Basın ve medyada bu ayrım çok önemlidir.',
                          formula: 'Puan Farkı = |Y2 - Y1|,  Yüzde Farkı = |(Y2 - Y1) / Y1| × 100'
                        },
                        {
                          title: 'Ters Yüzde Hesaplama',
                          icon: Icons.calculator,
                          color: 'emerald',
                          content: 'Bazen sonuç değeri biliriz ama başlangıç değerini bulmak isteriz. Örneğin %20 KDV dahil fiyat 360₺ ise, KDV hariç fiyat nedir? Bu durumda 360 ÷ 1.20 = 300₺ şeklinde hesaplanır. Sadece %20\'sini çıkarmak (360 × 0.80) yanlış olur!',
                          formula: 'İlk Değer = Son Değer ÷ (1 ± Yüzde/100)'
                        },
                        {
                          title: 'Ağırlıklı Yüzdeler',
                          icon: Icons.chart,
                          color: 'amber',
                          content: 'Farklı ağırlıklara sahip yüzdeler toplamda nasıl bir etki oluşturur? Örneğin sınav notunuzun %60\'ı yazılı (%80 aldınız), %40\'ı sözlü (%90 aldınız) ise genel notunuz: (80×0.6) + (90×0.4) = 48 + 36 = 84 olur.',
                          formula: 'Ağırlıklı Ortalama = (Y1 × A1) + (Y2 × A2) + ... (Ağırlıklar toplamı 1 olmalı)'
                        }
                      ].map((topic, i) => (
                        <div key={i} className={`border-2 border-${topic.color}-200 dark:border-${topic.color}-800 rounded-xl overflow-hidden`}>
                          <div className={`bg-${topic.color}-50 dark:bg-${topic.color}-900/20 p-4 flex items-center gap-3`}>
                            <div className={`w-10 h-10 rounded-lg bg-${topic.color}-100 dark:bg-${topic.color}-900/40 flex items-center justify-center text-${topic.color}-600 dark:text-${topic.color}-400`}>
                              {topic.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{topic.title}</h3>
                          </div>
                          <div className="p-4 space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {topic.content}
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                              <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Formül:</p>
                              <p className="font-mono-calc text-sm text-slate-700 dark:text-slate-300">
                                {topic.formula}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Section - Enhanced */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl card-shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <span className="text-2xl">❓</span>
                        Sıkça Sorulan Sorular
                      </h2>
                    </div>
                    <div className="divide-y divide-slate-200 dark:divide-slate-800">
                      {[
                        {
                          q: 'Yüzdeler %100\'ü aşabilir mi?',
                          a: 'Kesinlikle! Eğer yeni değer orijinal değerin iki katından fazlaysa %100\'ü aşar. Örneğin bir hisse senedi 50₺\'den 150₺\'ye çıkarsa %200 artış olur. Çünkü 100₺ kar elde ettiniz ve bu başlangıç değerinizin iki katı (100 ÷ 50 = 2 → %200).',
                          example: '25→75 = %200 artış, 30→150 = %400 artış'
                        },
                        {
                          q: 'İki ardışık indirim nasıl hesaplanır?',
                          a: 'Ardışık indirimler topla nmaz, çarpılır! Önce %20 sonra %10 indirim varsa, birinci indirimden sonra fiyatın %80\'i kalır (0.80), ikinci indirimden sonra kalanın %90\'ı kalır (0.90). Toplam: 0.80 × 0.90 = 0.72 → %28 indirim (çünkü %72 kaldı, %28 indi).',
                          example: '500₺ × 0.80 × 0.90 = 360₺ (140₺ toplam indirim = %28)'
                        },
                        {
                          q: 'Yüzde artıştan sonra aynı oranda azaltırsam başa döner miyim?',
                          a: 'Hayır, dönmezsiniz! Bu çok yaygın bir yanılgıdır. 100₺\'ye %50 zam gelirse 150₺ olur. Sonra 150₺\'ye %50 indirim yaparsanız 75₺ olur, 100₺ olmaz! Çünkü artış önceki değer üzerinden, azalış yeni değer üzerinden hesaplanır.',
                          example: '100 → (+%50) → 150 → (-%50) → 75 (başa dönmedi!)'
                        },
                        {
                          q: 'Ondalık sayıdan yüzdeye nasıl geçilir?',
                          a: 'Ondalık sayıyı 100 ile çarpın. Örneğin 0.75 = %75, çünkü 0.75 × 100 = 75. Tersi için yüzdeyi 100\'e bölün: %85 = 0.85 çünkü 85 ÷ 100 = 0.85. Bu dönüşümü hızlı yapmak için ondalık noktasını iki basamak kaydırabilirsiniz.',
                          example: '0.15 = %15,  0.03 = %3,  1.25 = %125,  %60 = 0.60'
                        },
                        {
                          q: 'Negatif yüzdeler olur mu?',
                          a: 'Evet, özellikle değişim hesaplamalarında. Bir değer azalıyorsa negatif yüzde ile gösterilir. Örneğin satışlar 1000\'den 800\'e düştüyse %20 azalış yaşanmıştır, bunu -20% şeklinde de yazabiliriz. Ancak negatif yüzdeler kavramsal olarak "yok etme" anlamına gelmez.',
                          example: '1000→800 = -20%,  Sıcaklık 10°C\'den 5°C\'ye = -50%'
                        },
                        {
                          q: 'KDV hesabında hangi formülü kullanmalıyım?',
                          a: 'KDV eklemek için: Fiyat × (1 + KDV/100). %20 KDV için 1.20 ile çarpın. KDV çıkarmak için: KDV dahil fiyat ÷ 1.20. Sadece %20\'sini çıkarmak yanlıştır çünkü KDV dahil fiyat üzerinden %20 çıkarırsanız hatalı sonuç bulursunuz.',
                          example: '100₺ → KDV ekle → 120₺,  120₺ → KDV çıkar → 100₺ (120 ÷ 1.20)'
                        },
                        {
                          q: 'Yüzde hesaplamada parantez sırası önemli mi?',
                          a: 'Evet, çok önemli! Örneğin 200 + 200 × %50 işleminde önce çarpma yapılmalı: 200 + (200 × 0.50) = 200 + 100 = 300. Eğer (200 + 200) × %50 yaparsanız 400 × 0.50 = 200 bulursunuz ki bu yanlış olur. Matematik işlem önceliği kuralları burada da geçerli.',
                          example: 'Doğru: 150 + 150 × 0.20 = 180,  Yanlış: (150 + 150) × 0.20 = 60'
                        },
                        {
                          q: 'Yüzde ile kesir arasındaki ilişki nedir?',
                          a: 'Her yüzde bir kesire dönüştürülebilir. %25 = 25/100 = 1/4, %50 = 50/100 = 1/2, %75 = 75/100 = 3/4 gibi. Bu dönüşüm özellikle kafadan hesaplama yaparken çok işe yarar. %33.33 yaklaşık 1/3, %66.66 yaklaşık 2/3 anlamına gelir.',
                          example: '%20 = 1/5,  %40 = 2/5,  %60 = 3/5,  %80 = 4/5'
                        }
                      ].map((faq, i) => (
                        <div key={i} className="p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-3 flex items-start gap-2">
                            <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 text-xs font-bold flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {faq.q}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 pl-8">
                            {faq.a}
                          </p>
                          <div className="pl-8">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 inline-block">
                              <p className="font-mono-calc text-xs text-teal-600 dark:text-teal-400">
                                {faq.example}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-4 space-y-4">
                    
                    {/* Quick Reference */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm shadow-lg">
                          {Icons.star}
                        </span>
                        Hızlı Referans
                      </h3>
                      <div className="space-y-2 text-sm">
                        {[
                          { percent: '10%', decimal: '0.10', fraction: '1/10' },
                          { percent: '20%', decimal: '0.20', fraction: '1/5' },
                          { percent: '25%', decimal: '0.25', fraction: '1/4' },
                          { percent: '33%', decimal: '0.33', fraction: '1/3' },
                          { percent: '50%', decimal: '0.50', fraction: '1/2' },
                          { percent: '75%', decimal: '0.75', fraction: '3/4' },
                          { percent: '100%', decimal: '1.00', fraction: '1/1' },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-mono-calc text-xs hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors">
                            <span className="text-teal-600 dark:text-teal-400 font-bold">{row.percent}</span>
                            <span className="text-slate-500">{row.decimal}</span>
                            <span className="text-slate-600 dark:text-slate-400">{row.fraction}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Calculators */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                          {Icons.calculator}
                        </span>
                        İlgili Araçlar
                      </h3>
                      <div className="space-y-2">
                        {[
                          { name: 'Hesap Makinesi', href: '/hesap-makinesi' },
                          { name: 'Bilimsel Hesap Makinesi', href: '/bilimsel-hesap-makinesi' },
                          { name: 'Kesir Hesaplama', href: '/kesir-hesaplama' },
                          { name: 'KDV Hesaplama', href: '/kdv-hesaplama' },
                          { name: 'Faiz Hesaplama', href: '/faiz-hesaplama' },
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

                    {/* Categories */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 card-shadow border border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-4">Kategoriler</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Matematik', href: '/matematik' },
                          { name: 'Finans', href: '/finans' },
                          { name: 'Sağlık', href: '/saglik' },
                          { name: 'Dönüştürücü', href: '/donusturucu' },
                        ].map((cat, i) => (
                          <Link 
                            key={i}
                            href={cat.href}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                          >
                            {cat.name}
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