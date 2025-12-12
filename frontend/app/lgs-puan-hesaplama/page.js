'use client';

import { useState } from 'react';

export default function LGSPuanHesaplama() {
  const [formData, setFormData] = useState({
    turkceNet: '',
    matNet: '',
    fenNet: '',
    sosyalNet: '',
    dinNet: '',
    ingilizceNet: '',
    examYear: '2025'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const numValue = parseFloat(value);
    const maxValues = {
      turkceNet: 20,
      matNet: 20,
      fenNet: 20,
      sosyalNet: 10,
      dinNet: 10,
      ingilizceNet: 10
    };

    if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > maxValues[name])) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const turkce = parseFloat(formData.turkceNet) || 0;
      const matematik = parseFloat(formData.matNet) || 0;
      const fen = parseFloat(formData.fenNet) || 0;
      const sosyal = parseFloat(formData.sosyalNet) || 0;
      const din = parseFloat(formData.dinNet) || 0;
      const ingilizce = parseFloat(formData.ingilizceNet) || 0;

      const questionCounts = {
        turkce: 20,
        matematik: 20,
        fen: 20,
        sosyal: 10,
        din: 10,
        ingilizce: 10,
        total: 90
      };

      const totalNet = turkce + matematik + fen + sosyal + din + ingilizce;
      const lgsScore = totalNet * 5.880332;
      
      const turkcePercentage = (turkce / questionCounts.turkce) * 100;
      const matematikPercentage = (matematik / questionCounts.matematik) * 100;
      const fenPercentage = (fen / questionCounts.fen) * 100;
      const sosyalPercentage = (sosyal / questionCounts.sosyal) * 100;
      const dinPercentage = (din / questionCounts.din) * 100;
      const ingilizcePercentage = (ingilizce / questionCounts.ingilizce) * 100;
      const totalPercentage = (totalNet / questionCounts.total) * 100;

      let approximatePercentile;
      if (lgsScore >= 490) approximatePercentile = 0.1;
      else if (lgsScore >= 480) approximatePercentile = 0.5;
      else if (lgsScore >= 470) approximatePercentile = 1.0;
      else if (lgsScore >= 460) approximatePercentile = 2.0;
      else if (lgsScore >= 450) approximatePercentile = 3.0;
      else if (lgsScore >= 440) approximatePercentile = 5.0;
      else if (lgsScore >= 430) approximatePercentile = 7.0;
      else if (lgsScore >= 420) approximatePercentile = 10.0;
      else if (lgsScore >= 410) approximatePercentile = 13.0;
      else if (lgsScore >= 400) approximatePercentile = 17.0;
      else if (lgsScore >= 390) approximatePercentile = 22.0;
      else if (lgsScore >= 380) approximatePercentile = 28.0;
      else if (lgsScore >= 370) approximatePercentile = 35.0;
      else if (lgsScore >= 360) approximatePercentile = 42.0;
      else if (lgsScore >= 350) approximatePercentile = 48.0;
      else if (lgsScore >= 340) approximatePercentile = 54.0;
      else if (lgsScore >= 330) approximatePercentile = 60.0;
      else if (lgsScore >= 320) approximatePercentile = 65.0;
      else if (lgsScore >= 310) approximatePercentile = 70.0;
      else approximatePercentile = 75.0;

      const totalStudents = 963142;
      const approximateRank = Math.round((approximatePercentile / 100) * totalStudents);

      setResult({
        status: 'success',
        result: {
          examYear: formData.examYear,
          lgsScore: parseFloat(lgsScore.toFixed(4)),
          maxScore: 500,
          totalNet: parseFloat(totalNet.toFixed(2)),
          totalQuestions: questionCounts.total,
          totalPercentage: parseFloat(totalPercentage.toFixed(2)),
          approximatePercentile: parseFloat(approximatePercentile.toFixed(2)),
          approximateRank,
          totalStudents,
          breakdown: {
            turkce: {
              net: turkce,
              questions: questionCounts.turkce,
              percentage: parseFloat(turkcePercentage.toFixed(2))
            },
            matematik: {
              net: matematik,
              questions: questionCounts.matematik,
              percentage: parseFloat(matematikPercentage.toFixed(2))
            },
            fen: {
              net: fen,
              questions: questionCounts.fen,
              percentage: parseFloat(fenPercentage.toFixed(2))
            },
            sosyal: {
              net: sosyal,
              questions: questionCounts.sosyal,
              percentage: parseFloat(sosyalPercentage.toFixed(2))
            },
            din: {
              net: din,
              questions: questionCounts.din,
              percentage: parseFloat(dinPercentage.toFixed(2))
            },
            ingilizce: {
              net: ingilizce,
              questions: questionCounts.ingilizce,
              percentage: parseFloat(ingilizcePercentage.toFixed(2))
            }
          }
        }
      });

    } catch (err) {
      setError(err.message || 'Hesaplama sırasında bir hata oluştu');
      console.error('LGS Calculation Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      turkceNet: '',
      matNet: '',
      fenNet: '',
      sosyalNet: '',
      dinNet: '',
      ingilizceNet: '',
      examYear: '2025'
    });
    setResult(null);
    setError('');
  };

  // SVG Icons as components for cleaner code
  const icons = {
    calculator: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
    book: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    history: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    star: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    globe: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    math: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
      </svg>
    ),
    flask: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    academic: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    target: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    check: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    arrow: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    ),
    refresh: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    question: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    trophy: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
    rocket: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    document: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    heart: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    sparkles: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  };

  const subjects = [
    { name: 'turkceNet', label: 'Türkçe', max: 20, color: 'slate' },
    { name: 'sosyalNet', label: 'T.C. İnkılap Tarihi ve Atatürkçülük', max: 10, color: 'slate' },
    { name: 'dinNet', label: 'Din Kültürü ve Ahlak Bilgisi', max: 10, color: 'slate' },
    { name: 'ingilizceNet', label: 'Yabancı Dil (İngilizce)', max: 10, color: 'slate' },
    { name: 'matNet', label: 'Matematik', max: 20, color: 'slate' },
    { name: 'fenNet', label: 'Fen Bilimleri', max: 20, color: 'slate' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
              {icons.calculator}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">LGS Puan Hesaplama</h1>
              <p className="text-slate-500 text-sm">2025 Liselere Giriş Sınavı</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-2xl">
            Her yıl yaklaşık bir milyon öğrencinin girdiği LGS, lise hayatınızın kapısını açan en kritik sınav. 
            Net sayılarınızı girin, tahmini puanınızı ve sıralamanızı anında öğrenin.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calculator Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Info Banner */}
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-4">
                <div className="flex gap-3">
                  <div className="text-amber-600 mt-0.5">{icons.warning}</div>
                  <div>
                    <p className="text-sm text-amber-900 font-medium">Net Hesaplama Kuralı</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Her 4 yanlış cevap, 1 doğruyu götürür. Boş bırakılan sorular puanı etkilemez.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {/* Year Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sınav Yılı</label>
                  <select 
                    name="examYear"
                    value={formData.examYear}
                    onChange={handleChange}
                    className="w-full max-w-[200px] px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  >
                    <option value="2025">2025 LGS</option>
                    <option value="2024">2024 LGS</option>
                  </select>
                </div>

                {/* Subject Inputs */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-700 mb-4">Net Sayılarınız</p>
                  
                  {subjects.map((subject, index) => (
                    <div 
                      key={subject.name}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-slate-800">{subject.label}</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          name={subject.name}
                          value={formData[subject.name]}
                          onChange={handleChange}
                          step="0.25"
                          min="0"
                          max={subject.max}
                          placeholder="0"
                          className="w-20 px-3 py-2 bg-white border border-slate-200 rounded-lg text-center font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                          required
                        />
                        <span className="text-sm text-slate-500 w-16">/ {subject.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-400 transition-colors font-medium"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Hesaplanıyor...</span>
                      </>
                    ) : (
                      <>
                        <span>Puanı Hesapla</span>
                        {icons.arrow}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-3.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                    title="Sıfırla"
                  >
                    {icons.refresh}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
              </form>

              {/* Results */}
              {result && result.result && (
                <div className="border-t border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                    {icons.chart}
                    Sonuçlarınız
                  </h3>
                  
                  {/* Main Score Card */}
                  <div className="bg-slate-900 rounded-xl p-6 mb-6 text-white">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">LGS Puanı (MSP)</p>
                        <p className="text-4xl font-bold mt-1">{result.result.lgsScore.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">Maksimum</p>
                        <p className="text-2xl font-semibold mt-1">{result.result.maxScore}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-slate-400 text-xs">Toplam Net</p>
                        <p className="text-lg font-semibold">{result.result.totalNet.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Yüzdelik</p>
                        <p className="text-lg font-semibold text-emerald-400">%{result.result.approximatePercentile}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Tahmini Sıra</p>
                        <p className="text-lg font-semibold">{result.result.approximateRank.toLocaleString('tr-TR')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Subject Breakdown */}
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(result.result.breakdown).map(([key, data]) => {
                      const labels = {
                        turkce: 'Türkçe',
                        matematik: 'Matematik',
                        fen: 'Fen Bilimleri',
                        sosyal: 'T.C. İnk. Tarihi',
                        din: 'Din Kültürü',
                        ingilizce: 'Yabancı Dil'
                      };
                      return (
                        <div key={key} className="bg-white rounded-lg p-3 border border-slate-200">
                          <p className="text-xs text-slate-500">{labels[key]}</p>
                          <p className="text-lg font-semibold text-slate-900">{data.net.toFixed(2)} <span className="text-sm font-normal text-slate-400">/ {data.questions}</span></p>
                          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-slate-900 rounded-full transition-all duration-500"
                              style={{ width: `${data.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Formula Info */}
                  <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="text-slate-400">{icons.info}</div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">2025 LGS Hesaplama Formülü</p>
                        <p className="text-sm text-slate-600 mt-1">
                          LGS Puanı = Toplam Net × 5.880332
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {result.result.totalNet.toFixed(2)} × 5.880332 = {result.result.lgsScore.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Sınav Hakkında</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                    {icons.document}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">90</p>
                    <p className="text-xs text-slate-500">Toplam Soru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                    {icons.clock}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">150</p>
                    <p className="text-xs text-slate-500">Dakika Süre</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                    {icons.users}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">~1M</p>
                    <p className="text-xs text-slate-500">Öğrenci Katılımı</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Sınav Oturumları</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">1. Oturum — Sözel</p>
                  <p className="text-sm text-slate-700 mt-2">Türkçe (20), Sosyal (10), Din (10), İngilizce (10)</p>
                  <p className="text-xs text-slate-500 mt-1">50 soru • 75 dakika</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">2. Oturum — Sayısal</p>
                  <p className="text-sm text-slate-700 mt-2">Matematik (20), Fen Bilimleri (20)</p>
                  <p className="text-xs text-slate-500 mt-1">40 soru • 75 dakika</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-12 space-y-8">
          
          {/* Section 1: LGS Nedir */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                {icons.academic}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">LGS Tam Olarak Nedir?</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                Liselere Giriş Sınavı ya da bilinen adıyla LGS, 8. sınıfı bitiren öğrencilerin lise tercihlerini 
                belirleyen merkezi bir sınav. MEB tarafından her yıl Haziran ayında düzenleniyor. Yaklaşık bir milyon 
                öğrencinin aynı anda girdiği bu sınav, Türkiye'nin en büyük eğitim değerlendirmelerinden biri.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Sınav sonucunda aldığınız puan, hangi liselere başvurabileceğinizi doğrudan etkiliyor. Fen liseleri, 
                Anadolu liseleri, sosyal bilimler liseleri ve mesleki teknik liseler gibi farklı okul türleri, 
                farklı taban puanlar istiyor. Dolayısıyla hedefinizi belirleyip ona göre çalışmanız büyük önem taşıyor.
              </p>
              <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Kısa bir bilgi:</span> LGS sadece akademik başarıyı ölçmüyor. 
                  Aynı zamanda zaman yönetimi, stres kontrolü ve stratejik düşünme becerilerinizi de test ediyor. 
                  Bu yüzden sadece konu çalışmak değil, deneme sınavları çözmek de kritik.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Puan Hesaplama */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                {icons.calculator}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Puan Nasıl Hesaplanıyor?</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                LGS puan hesaplaması aslında oldukça basit bir formüle dayanıyor. Önce her ders için netinizi 
                hesaplıyorsunuz, sonra tüm netleri toplayıp katsayıyla çarpıyorsunuz. İşte adım adım süreç:
              </p>
              
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-3">1</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Net Hesabı</h4>
                  <p className="text-sm text-slate-600">Doğru sayısından yanlışların dörtte birini çıkarın. Örnek: 18 doğru, 4 yanlış = 17 net</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-3">2</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Toplam Net</h4>
                  <p className="text-sm text-slate-600">6 dersten aldığınız netleri toplayın. Maksimum 90 net yapabilirsiniz.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-3">3</div>
                  <h4 className="font-semibold text-slate-900 mb-2">Puan</h4>
                  <p className="text-sm text-slate-600">Toplam neti 5.880332 ile çarpın. Sonuç LGS puanınız (maks. 500).</p>
                </div>
              </div>

              <div className="mt-6 p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm text-emerald-800">
                  <span className="font-semibold">Pratik örnek:</span> Diyelim ki toplam 72 net yaptınız. 
                  72 × 5.880332 = 423.38 puan alırsınız. Bu puanla birçok kaliteli Anadolu lisesine 
                  rahatlıkla başvurabilirsiniz.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Başarı Stratejileri */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                {icons.trophy}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Başarı İçin Kanıtlanmış Yöntemler</h2>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                LGS'de başarılı olan öğrencilerin ortak özellikleri var. Bunlar sadece çok çalışmak değil, 
                aynı zamanda doğru çalışmakla ilgili. İşte gerçekten fark yaratan stratejiler:
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 flex-shrink-0">{icons.clock}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Düzenli Çalışma Programı</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Her gün aynı saatlerde, 3-4 saat odaklanmış çalışma yapın. Beyin rutinleri sever. 
                      Sabah erken çalışmak genelde daha verimli oluyor çünkü zihin dinlenmiş oluyor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 flex-shrink-0">{icons.refresh}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Aralıklı Tekrar Sistemi</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Bir konuyu öğrendikten 1 gün, 3 gün ve 1 hafta sonra tekrar edin. Bilimsel araştırmalar 
                      bu yöntemin kalıcı öğrenme için en etkili yol olduğunu gösteriyor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 flex-shrink-0">{icons.document}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Haftada 2-3 Deneme Sınavı</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Gerçek sınav koşullarında deneme çözmek, hem sınav psikolojisine alışmanızı sağlar 
                      hem de zayıf noktalarınızı görmenize yardımcı olur. Hatalarınızı mutlaka analiz edin.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 flex-shrink-0">{icons.heart}</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Sağlığınızı İhmal Etmeyin</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Günde 7-8 saat uyku, düzenli beslenme ve hafif egzersiz başarınızı doğrudan etkiler. 
                      Yorgun bir beyin verimli çalışamaz. Kendinize iyi bakın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Sık Sorulan Sorular */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                {icons.question}
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Sık Sorulan Sorular</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-semibold text-slate-900">Bilmediğim soruları işaretlemeli miyim?</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Kesinlikle hayır. 4 yanlış 1 doğruyu götürdüğü için, emin olmadığınız soruları boş bırakın. 
                  Tahminle işaretlemek çoğu zaman zarar verir. Boş bırakmak ise hiçbir puan kaybettirmez.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-semibold text-slate-900">Hangi liseler en yüksek puanları istiyor?</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Robert Kolej, Galatasaray Lisesi, İstanbul Erkek Lisesi ve büyük şehirlerdeki fen liseleri 
                  genellikle 470-500 arası puan istiyor. Ancak her yıl taban puanlar değişebilir.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-semibold text-slate-900">Kaç net kaç puan eder?</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Her net yaklaşık 5.88 puan değerinde. 80 net = ~470 puan, 70 net = ~411 puan, 
                  60 net = ~353 puan, 50 net = ~294 puan. Tam hesaplama için yukarıdaki aracı kullanın.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <h4 className="font-semibold text-slate-900">Sınav sırasında nasıl bir strateji izlemeliyim?</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Önce kolay soruları çözüp puanı garantileyin. Sonra orta zorlukta olanlara geçin. 
                  Zor soruları sona bırakın. Her soru için ortalama 1.5 dakikanız var, bunu aklınızda tutun.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">Hangi kaynaklardan çalışmalıyım?</h4>
                <p className="text-sm text-slate-600 mt-2">
                  Öncelik MEB ders kitapları olmalı. Ardından güvenilir yayınların (Hız, Bilgi Sarmal, Palme, 
                  Tudem gibi) soru bankaları ve denemeleri. EBA ve Morpa Kampüs gibi online platformlar 
                  da destek için kullanılabilir.
                </p>
              </div>
            </div>
          </section>

          {/* Motivational Section */}
          <section className="bg-slate-900 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                {icons.rocket}
              </div>
              <h2 className="text-xl font-semibold">Son Söz</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              LGS zorlu bir süreç, bunu inkar etmek anlamsız. Ancak doğru hazırlık, düzenli çalışma ve 
              kendinize güvenle bu sınavı başarıyla geçebilirsiniz. Unutmayın, bu sınav hayatınızı 
              tamamen belirleyen bir şey değil – sadece bir basamak. Elinizden gelenin en iyisini yapın, 
              gerisini bırakın.
            </p>
            <p className="text-white font-medium mt-4">
              Hedefinizi belirleyin, planınızı yapın ve pes etmeden çalışın. Başarı sizinle olsun.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}