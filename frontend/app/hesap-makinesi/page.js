'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { calculators } from '@/lib/calculators'

export default function HesapMakinesiPage() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeButton, setActiveButton] = useState(null)

  const inputDigit = useCallback((digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(prev => prev === '0' ? String(digit) : prev.length < 12 ? prev + digit : prev)
    }
  }, [waitingForOperand])

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(prev => prev + '.')
    }
  }, [waitingForOperand, display])

  const clear = useCallback(() => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setActiveButton(null)
  }, [])

  const backspace = useCallback(() => {
    if (!waitingForOperand && display.length > 1) {
      setDisplay(prev => prev.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }, [waitingForOperand, display])

  const calculate = useCallback((firstValue, secondValue, op) => {
    switch (op) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '×': return firstValue * secondValue
      case '÷': return secondValue !== 0 ? firstValue / secondValue : 'Hata'
      default: return secondValue
    }
  }, [])

  const performOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display)
    setActiveButton(nextOperation)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      if (newValue === 'Hata') {
        setDisplay('Hata')
        setPreviousValue(null)
        setOperation(null)
        return
      }
      const rounded = Math.round(newValue * 1000000000) / 1000000000
      setDisplay(String(rounded))
      setPreviousValue(rounded)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }, [display, previousValue, operation, calculate])

  const handleEquals = useCallback(() => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      const rounded = newValue === 'Hata' ? newValue : Math.round(newValue * 1000000000) / 1000000000
      
      const historyEntry = {
        expression: `${previousValue} ${operation} ${inputValue}`,
        result: rounded
      }
      setHistory(prev => [historyEntry, ...prev].slice(0, 6))
      
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 300)
      
      setDisplay(String(rounded))
      setPreviousValue(null)
      setOperation(null)
      setActiveButton(null)
      setWaitingForOperand(true)
    }
  }, [display, previousValue, operation, calculate])

  const toggleSign = useCallback(() => {
    setDisplay(prev => {
      const value = parseFloat(prev)
      return String(value * -1)
    })
  }, [])

  const percentage = useCallback(() => {
    setDisplay(prev => {
      const value = parseFloat(prev)
      return String(value / 100)
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') inputDigit(parseInt(e.key))
      else if (e.key === '.') inputDot()
      else if (e.key === '+') performOperation('+')
      else if (e.key === '-') performOperation('-')
      else if (e.key === '*') performOperation('×')
      else if (e.key === '/') { e.preventDefault(); performOperation('÷') }
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); handleEquals() }
      else if (e.key === 'Escape') clear()
      else if (e.key === 'Backspace') backspace()
      else if (e.key === '%') percentage()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [inputDigit, inputDot, performOperation, handleEquals, clear, backspace, percentage])

  const formatDisplay = (value) => {
    if (value === 'Hata') return value
    const num = parseFloat(value)
    if (isNaN(num)) return '0'
    if (value.endsWith('.')) return value
    if (Math.abs(num) >= 1e9) return num.toExponential(3)
    return value
  }

  const relatedCalculators = calculators.filter(calc => 
    calc.category === 'Matematik' && calc.id !== 'hesap-makinesi'
  ).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Online Hesap Makinesi',
    description: 'Ücretsiz online hesap makinesi. Toplama, çıkarma, çarpma, bölme ve yüzde hesaplama işlemlerini kolayca yapın.',
    url: 'https://hesap-makinesi.online/hesap-makinesi',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }
  }

  // SVG Icons Component
  const Icons = {
    home: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>,
    chevronRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>,
    keyboard: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5h.75m3-.75h.75m3 .75h.75M6.75 12h.75m3-.75h.75m3 .75h.75m-9 3.75h7.5M3 18.75V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75z"/></svg>,
    lightning: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
    shield: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
    device: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>,
    check: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>,
    info: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>,
    clock: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    sparkles: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>,
    globe: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>,
    wallet: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"/></svg>,
    refresh: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>,
    leaf: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-2.686-9-6v-.5c0-3.866 4.03-7 9-7s9 3.134 9 7v.5c0 3.314-4.03 6-9 6z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 21V10m0 0c-2-2-2-5.5 0-7.5 2 2 2 5.5 0 7.5z"/></svg>,
    bolt: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
    lock: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>,
    question: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>,
    arrowRight: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>,
  }

  const CalcButton = ({ onClick, children, variant = 'number', active = false, className = '' }) => {
    const base = "relative font-semibold text-xl rounded-2xl transition-all duration-200 active:scale-[0.94] flex items-center justify-center select-none"
    const variants = {
      number: `bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm hover:shadow`,
      operation: `${active ? 'bg-white text-teal-600 ring-2 ring-teal-500' : 'bg-gradient-to-b from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:from-teal-400 hover:to-teal-500'}`,
      function: "bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600",
      equals: "bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-400 hover:to-blue-500",
      clear: "bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:from-rose-400 hover:to-rose-500"
    }
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className} h-[68px]`}>
        {children}
      </button>
    )
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-mono-calc { font-family: 'JetBrains Mono', monospace; }
        
        .result-pop {
          animation: pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes pop {
          0% { transform: scale(0.96); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        .fade-up {
          animation: fadeUp 0.7s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        .hero-mesh {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(at 0% 0%, rgba(20, 184, 166, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.05) 0px, transparent 50%);
        }
        
        .dark .hero-mesh {
          background-color: #0f172a;
          background-image: 
            radial-gradient(at 0% 0%, rgba(20, 184, 166, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.08) 0px, transparent 50%);
        }

        .calculator-shadow {
          box-shadow: 
            0 0 0 1px rgba(0, 0, 0, 0.03),
            0 2px 4px rgba(0, 0, 0, 0.02),
            0 12px 24px rgba(0, 0, 0, 0.06),
            0 32px 64px rgba(0, 0, 0, 0.04);
        }
        
        .dark .calculator-shadow {
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 12px 24px rgba(0, 0, 0, 0.3),
            0 32px 64px rgba(0, 0, 0, 0.2);
        }

        .display-gradient {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-display">
        
        {/* Hero Section */}
        <section className="hero-mesh relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative container mx-auto px-4 lg:px-8 py-10 lg:py-16">
            <div className="max-w-6xl mx-auto">
              
              {/* Breadcrumb */}
              <nav className="mb-8 fade-up">
                <div className="inline-flex items-center gap-2 text-sm bg-white dark:bg-slate-800/80 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Link href="/" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
                    {Icons.home}
                    <span>Ana Sayfa</span>
                  </Link>
                  <span className="text-slate-300 dark:text-slate-600">{Icons.chevronRight}</span>
                  <span className="text-slate-800 dark:text-white font-medium">Hesap Makinesi</span>
                </div>
              </nav>

              {/* Title */}
              <div className="max-w-3xl fade-up stagger-1">
                
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-[1.1]">
                  Online Hesap
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500">
                    Makinesi
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  Günlük hesaplamalarınız için hızlı, güvenilir ve kullanımı kolay dijital hesap makinesi. 
                  Herhangi bir kurulum gerektirmeden hemen kullanmaya başlayın.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-10 lg:py-16 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Calculator */}
                <div className="lg:col-span-5 fade-up stagger-2">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl calculator-shadow p-5 sm:p-6 border border-slate-200 dark:border-slate-800 sticky top-8">
                    
                    {/* Display */}
                    <div className="display-gradient rounded-2xl p-5 mb-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                      
                      <div className="relative text-right">
                        <div className="h-6 mb-2 flex items-center justify-end">
                          {operation && previousValue !== null && (
                            <span className="text-sm text-slate-400 font-mono-calc">
                              {previousValue.toLocaleString('tr-TR')} {operation}
                            </span>
                          )}
                        </div>
                        
                        <div className={`font-mono-calc text-4xl sm:text-5xl text-white min-h-[56px] flex items-center justify-end tracking-tight font-medium ${isAnimating ? 'result-pop' : ''}`}>
                          {formatDisplay(display)}
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-4 gap-2.5">
                      <CalcButton onClick={clear} variant="clear">AC</CalcButton>
                      <CalcButton onClick={toggleSign} variant="function">±</CalcButton>
                      <CalcButton onClick={percentage} variant="function">%</CalcButton>
                      <CalcButton onClick={() => performOperation('÷')} variant="operation" active={activeButton === '÷'}>÷</CalcButton>

                      <CalcButton onClick={() => inputDigit(7)}>7</CalcButton>
                      <CalcButton onClick={() => inputDigit(8)}>8</CalcButton>
                      <CalcButton onClick={() => inputDigit(9)}>9</CalcButton>
                      <CalcButton onClick={() => performOperation('×')} variant="operation" active={activeButton === '×'}>×</CalcButton>

                      <CalcButton onClick={() => inputDigit(4)}>4</CalcButton>
                      <CalcButton onClick={() => inputDigit(5)}>5</CalcButton>
                      <CalcButton onClick={() => inputDigit(6)}>6</CalcButton>
                      <CalcButton onClick={() => performOperation('-')} variant="operation" active={activeButton === '-'}>−</CalcButton>

                      <CalcButton onClick={() => inputDigit(1)}>1</CalcButton>
                      <CalcButton onClick={() => inputDigit(2)}>2</CalcButton>
                      <CalcButton onClick={() => inputDigit(3)}>3</CalcButton>
                      <CalcButton onClick={() => performOperation('+')} variant="operation" active={activeButton === '+'}>+</CalcButton>

                      <CalcButton onClick={() => inputDigit(0)} className="col-span-2">0</CalcButton>
                      <CalcButton onClick={inputDot}>.</CalcButton>
                      <CalcButton onClick={handleEquals} variant="equals">=</CalcButton>
                    </div>

                    {/* Keyboard hint */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
                      {Icons.keyboard}
                      <span>Klavye ile de kullanabilirsiniz</span>
                    </div>
                  </div>

                  {/* History */}
                  {history.length > 0 && (
                    <div className="mt-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          {Icons.clock}
                          Son İşlemler
                        </h3>
                        <button onClick={() => setHistory([])} className="text-xs text-slate-400 hover:text-rose-500 transition-colors font-medium">
                          Temizle
                        </button>
                      </div>
                      <div className="space-y-2">
                        {history.slice(0, 5).map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-2.5 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <span className="font-mono-calc text-slate-500 dark:text-slate-400">{item.expression}</span>
                            <span className="font-mono-calc font-semibold text-slate-800 dark:text-white">= {item.result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Info Cards */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Feature Cards */}
                  <div className="grid sm:grid-cols-3 gap-4 fade-up stagger-3">
                    {[
                      { icon: Icons.lightning, title: 'Anında Sonuç', desc: 'Saniyeler içinde hesaplama', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
                      { icon: Icons.shield, title: 'Güvenli', desc: 'Verileriniz korunur', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
                      { icon: Icons.device, title: 'Her Cihazda', desc: 'Mobil uyumlu tasarım', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' }
                    ].map((f, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm card-hover">
                        <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-3`}>
                          {f.icon}
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-1">{f.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* How to Use */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm fade-up stagger-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-5 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                        {Icons.info}
                      </span>
                      Nasıl Kullanılır?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { step: '01', text: 'İlk sayıyı girin veya klavyeden yazın' },
                        { step: '02', text: 'İşlem butonunu seçin (+, −, ×, ÷)' },
                        { step: '03', text: 'İkinci sayıyı girin' },
                        { step: '04', text: 'Sonuç için = veya Enter tuşuna basın' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                          <span className="text-2xl font-bold text-teal-500/30 dark:text-teal-400/20 font-mono-calc">
                            {item.step}
                          </span>
                          <p className="text-sm text-slate-600 dark:text-slate-400 pt-1">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keyboard Shortcuts */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm fade-up stagger-5">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-5 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                        {Icons.keyboard}
                      </span>
                      Klavye Kısayolları
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { key: '0-9', label: 'Sayılar' },
                        { key: '+ − × ÷', label: 'İşlemler' },
                        { key: 'Enter', label: 'Hesapla' },
                        { key: 'Esc', label: 'Temizle' },
                        { key: '⌫', label: 'Sil' },
                        { key: '%', label: 'Yüzde' },
                        { key: '.', label: 'Ondalık' },
                        { key: '=', label: 'Sonuç' }
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                          <kbd className="px-2.5 py-1.5 bg-white dark:bg-slate-700 rounded-lg text-xs font-mono-calc shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                            {s.key}
                          </kbd>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rich Content Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-5 border border-blue-200 dark:border-blue-800">
                  {Icons.sparkles}
                  Kapsamlı Rehber
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight">
                  Hesap Makinesi Hakkında
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    Her Şey
                  </span>
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Temel matematik işlemlerinden pratik kullanım önerilerine kadar ihtiyacınız olan tüm bilgiler
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6 mb-16">
                
                {/* What is Calculator */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-teal-500/20">
                    🧮
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Online Hesap Makinesi Nedir?</h3>
                  
                  <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                      Hesap makinesi, matematiksel işlemleri hızlı ve doğru şekilde gerçekleştirmenizi sağlayan 
                      vazgeçilmez bir araçtır. Geleneksel fiziksel cihazların yerini artık web tabanlı çözümler 
                      almakta ve kullanıcılara çok daha pratik bir deneyim sunmaktadır.
                    </p>
                    <p>
                      Sunduğumuz online hesap makinesi, tamamen tarayıcınızda çalışır ve internet bağlantısı 
                      kesildikten sonra bile kullanılabilir. Hesaplamalarınız asla sunucuya gönderilmez, 
                      bu sayede finansal verileriniz dahil tüm bilgileriniz tamamen güvende kalır.
                    </p>
                  </div>
                </div>

                {/* History */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl p-8 border border-amber-200/50 dark:border-slate-700">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-amber-500/20">
                    📜
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hesap Makinesinin Tarihi</h3>
                  
                  <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                      Hesaplama araçlarının geçmişi antik çağlara kadar uzanır. Sümerler kil tabletleri, 
                      Çinliler abaküsü kullanırken, 17. yüzyılda Blaise Pascal dünyanın ilk mekanik 
                      hesap makinesini icat etti. Bu buluş, modern hesaplayıcıların temelini oluşturdu.
                    </p>
                    <p>
                      1970'lerde cep hesap makinelerinin yaygınlaşmasıyla bu araçlar herkesin günlük 
                      yaşamına girdi. Bugün ise akıllı telefonlar ve web uygulamaları sayesinde 
                      hesaplama yapmak hiç olmadığı kadar kolay ve erişilebilir hale geldi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Four Operations */}
              <div className="mb-16">
                <div className="text-center mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    Dört Temel İşlem
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Matematiğin temel yapı taşları olan aritmetik işlemler
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    {
                      icon: '+',
                      title: 'Toplama',
                      gradient: 'from-blue-500 to-cyan-500',
                      shadow: 'shadow-blue-500/20',
                      bg: 'bg-blue-50 dark:bg-blue-900/20',
                      desc: 'İki veya daha fazla sayının birleştirilmesiyle elde edilen sonuçtur. Günlük hayatta en sık kullandığımız işlemdir.',
                      examples: ['25 + 17 = 42', '3.5 + 2.5 = 6', '100 + 250 = 350'],
                      usage: 'Toplam harcama, gelir hesaplama'
                    },
                    {
                      icon: '−',
                      title: 'Çıkarma',
                      gradient: 'from-rose-500 to-pink-500',
                      shadow: 'shadow-rose-500/20',
                      bg: 'bg-rose-50 dark:bg-rose-900/20',
                      desc: 'Bir sayıdan başka bir sayının çıkarılmasıyla bulunan farktır. Kalan miktar hesaplamaları için kullanılır.',
                      examples: ['100 − 35 = 65', '50.5 − 20.3 = 30.2', '1000 − 750 = 250'],
                      usage: 'Bütçe kontrolü, fark hesaplama'
                    },
                    {
                      icon: '×',
                      title: 'Çarpma',
                      gradient: 'from-amber-500 to-orange-500',
                      shadow: 'shadow-amber-500/20',
                      bg: 'bg-amber-50 dark:bg-amber-900/20',
                      desc: 'Bir sayının kendisiyle belirli sayıda toplanmasının kısa yoludur. Alan hesaplamalarında kritik öneme sahiptir.',
                      examples: ['12 × 8 = 96', '4.5 × 2 = 9', '25 × 4 = 100'],
                      usage: 'Alan hesaplama, birim fiyat'
                    },
                    {
                      icon: '÷',
                      title: 'Bölme',
                      gradient: 'from-emerald-500 to-teal-500',
                      shadow: 'shadow-emerald-500/20',
                      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                      desc: 'Bir sayının eşit parçalara ayrılması işlemidir. Paylaştırma ve ortalama hesaplamalarında kullanılır.',
                      examples: ['144 ÷ 12 = 12', '100 ÷ 4 = 25', '75 ÷ 3 = 25'],
                      usage: 'Ortalama, kişi başı pay'
                    }
                  ].map((op, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 card-hover shadow-sm">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${op.gradient} flex items-center justify-center text-white text-2xl font-bold mb-5 shadow-lg ${op.shadow}`}>
                        {op.icon}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{op.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                        {op.desc}
                      </p>
                      <div className="space-y-2 mb-4">
                        {op.examples.map((ex, j) => (
                          <div key={j} className={`font-mono-calc text-sm ${op.bg} px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300`}>
                            {ex}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
                        {Icons.arrowRight}
                        {op.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tips Section - NEW DESIGN */}
              <div className="mb-16">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                  {/* Background decorations */}
                  <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="relative">
                    <div className="text-center mb-10">
                      <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/10">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                        Pro İpuçları
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Hesap Makinesi Kullanım İpuçları
                      </h3>
                      <p className="text-slate-400 max-w-2xl mx-auto">
                        Hesaplamalarınızı daha hızlı ve verimli yapmanız için uzman önerileri
                      </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {[
                        {
                          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
                          title: 'Klavyeyi Kullanın',
                          desc: 'Fare yerine klavye kullanarak hesaplama hızınızı iki katına çıkarabilirsiniz. Sayıları ve işlemleri doğrudan yazın.',
                          color: 'from-teal-400 to-cyan-400'
                        },
                        {
                          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                          title: 'Geçmişi Kontrol Edin',
                          desc: 'Son işlemlerinizi geçmiş bölümünden kontrol edebilirsiniz. Hata yaptığınızı düşünüyorsanız buraya göz atın.',
                          color: 'from-violet-400 to-purple-400'
                        },
                        {
                          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
                          title: 'Yüzde Hesaplama',
                          desc: 'İndirim hesaplamak için: sayıyı girin, çarpı işaretine basın, yüzdeyi yazın ve % butonuna basın.',
                          color: 'from-amber-400 to-orange-400'
                        },
                        {
                          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
                          title: 'Zincirleme İşlemler',
                          desc: 'Bir işlemin sonucu üzerinden devam edebilirsiniz. Her seferinde sıfırdan başlamanıza gerek yoktur.',
                          color: 'from-rose-400 to-pink-400'
                        },
                        {
                          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
                          title: 'Ondalık Sayılar',
                          desc: 'Türkçe klavyede virgül yerine nokta (.) kullanın. Örneğin 3,5 yerine 3.5 yazmalısınız.',
                          color: 'from-blue-400 to-indigo-400'
                        },
                        {
                          icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
                          title: 'Büyük Sayılar',
                          desc: 'Milyonlarca sayı ile çalışırken sonuçlar bilimsel gösterimde (örn: 1.5e9) görüntülenebilir.',
                          color: 'from-emerald-400 to-green-400'
                        }
                      ].map((tip, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white mb-4`}>
                            {tip.icon}
                          </div>
                          <h4 className="font-bold text-white mb-2">{tip.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">{tip.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-16">
                <div className="text-center mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    Sıkça Sorulan Sorular
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Kullanıcılarımızın en çok merak ettiği konular
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    {
                      q: 'Bu hesap makinesi ücretsiz mi?',
                      a: 'Evet, hesap makinemiz tamamen ücretsizdir. Herhangi bir kayıt, üyelik veya ödeme gerektirmez. Sınırsız kullanabilirsiniz.'
                    },
                    {
                      q: 'Hesaplamalarım kaydediliyor mu?',
                      a: 'Hayır, tüm hesaplamalar yalnızca tarayıcınızda gerçekleşir. Sunucuya hiçbir veri gönderilmez. Gizliliğiniz tamamen korunur.'
                    },
                    {
                      q: 'Mobil cihazlarda çalışıyor mu?',
                      a: 'Evet, hesap makinemiz tüm cihazlarda sorunsuz çalışır. Telefon, tablet veya bilgisayardan aynı kalitede deneyim yaşarsınız.'
                    },
                    {
                      q: 'İnternet olmadan kullanabilir miyim?',
                      a: 'Sayfa bir kez yüklendikten sonra internet bağlantısı olmadan da kullanmaya devam edebilirsiniz. Tüm işlemler yerel olarak yapılır.'
                    },
                    {
                      q: 'Bilimsel hesaplamalar yapabilir miyim?',
                      a: 'Bu hesap makinesi temel aritmetik işlemler için tasarlanmıştır. Karekök, trigonometri gibi işlemler için bilimsel hesaplayıcımızı kullanabilirsiniz.'
                    },
                    {
                      q: 'Neden virgül yerine nokta kullanıyorum?',
                      a: 'Web tarayıcıları uluslararası standart olan nokta (.) karakterini ondalık ayırıcı olarak kullanır. 3,5 yerine 3.5 yazmanız gerekir.'
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal-600 dark:text-teal-400">{Icons.question}</span>
                        </span>
                        {faq.q}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Why Use Online Calculator */}
              <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 rounded-3xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
                <div className="text-center mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    Neden Online Hesap Makinesi?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Dijital çözümlerin avantajlarını keşfedin
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Icons.globe,
                      title: 'Her Yerden Erişim',
                      desc: 'İnternet bağlantısı olan her cihazdan hesap makinenize ulaşabilirsiniz. Fiziksel cihaz taşımanıza gerek kalmaz.',
                      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    },
                    {
                      icon: Icons.wallet,
                      title: 'Tamamen Ücretsiz',
                      desc: 'Pahalı hesap makineleri satın almak yerine ücretsiz online araçlarımızı kullanın. Aynı işlevsellik, sıfır maliyet.',
                      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    },
                    {
                      icon: Icons.refresh,
                      title: 'Her Zaman Güncel',
                      desc: 'Online araçlar sürekli güncellenir ve iyileştirilir. Yeni özellikler otomatik olarak eklenir.',
                      color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                    },
                    {
                      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" /></svg>,
                      title: 'Çevre Dostu',
                      desc: 'Pil gerektirmez, elektronik atık oluşturmaz. Dijital çözümler doğaya daha az zarar verir.',
                      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    },
                    {
                      icon: Icons.bolt,
                      title: 'Anında Başlat',
                      desc: 'Kurulum, indirme veya güncelleme beklemeye gerek yok. Sayfayı açın ve hemen hesaplamaya başlayın.',
                      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    },
                    {
                      icon: Icons.lock,
                      title: 'Güvenli ve Gizli',
                      desc: 'Tüm hesaplamalar tarayıcınızda yapılır. Hiçbir kişisel veya finansal veri kaydedilmez.',
                      color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <section className="py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                  <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-emerald-200 dark:border-emerald-800">
                    {Icons.sparkles}
                    Diğer Araçlar
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    İlgili Hesaplayıcılar
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {relatedCalculators.map((calc, i) => (
                    <Link key={calc.id} href={`/${calc.id}`}>
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 card-hover shadow-sm group h-full">
                        <div className="w-12 h-12 mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div 
                            className="w-6 h-6 text-slate-600 dark:text-slate-300"
                            dangerouslySetInnerHTML={{ __html: calc.icon }}
                          />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-2">
                          {calc.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {calc.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}