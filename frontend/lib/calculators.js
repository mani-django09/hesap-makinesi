export const calculators = [
  {
    id: 'hesap-makinesi',
    title: 'Hesap Makinesi',
    description: 'Temel matematik işlemlerini yapın: toplama, çıkarma, çarpma, bölme',
    icon: '<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="8" width="48" height="52" rx="4" fill="#3B82F6" fill-opacity="0.1" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="36" height="12" rx="2" fill="currentColor" fill-opacity="0.2"/><circle cx="20" cy="36" r="3" fill="currentColor"/><circle cx="28" cy="36" r="3" fill="currentColor"/><circle cx="36" cy="36" r="3" fill="currentColor"/><circle cx="44" cy="36" r="3" fill="currentColor"/><circle cx="20" cy="44" r="3" fill="currentColor"/><circle cx="28" cy="44" r="3" fill="currentColor"/><circle cx="36" cy="44" r="3" fill="currentColor"/><circle cx="44" cy="44" r="3" fill="currentColor"/><circle cx="20" cy="52" r="3" fill="currentColor"/><rect x="26" y="49" width="20" height="6" rx="3" fill="currentColor"/></svg>',
    category: 'Matematik',
    keywords: 'hesap makinesi, calculator, toplama, çıkarma, çarpma, bölme',
  },
  {
    id: 'yuzde-hesaplama',
    title: 'Yüzde Hesaplama',
    description: 'Yüzde hesaplamaları, artırma ve azaltma işlemleri',
    icon: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="26" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><text x="32" y="40" font-size="28" font-weight="bold" text-anchor="middle" fill="currentColor">%</text><path d="M20 20 L44 44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    category: 'Matematik',
    keywords: 'yüzde hesaplama, percentage calculator, yüzde artırma, yüzde azaltma',
  },
  {
    id: 'yas-hesaplama',
    title: 'Yaş Hesaplama',
    description: 'Doğum tarihinize göre yaşınızı hesaplayın',
    icon: '<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="40" rx="3" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><line x1="20" y1="10" x2="20" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="44" y1="10" x2="44" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="26" x2="52" y2="26" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="36" r="2" fill="currentColor"/><circle cx="32" cy="36" r="2" fill="currentColor"/><circle cx="42" cy="36" r="2" fill="currentColor"/><circle cx="22" cy="46" r="2" fill="currentColor"/><circle cx="32" cy="46" r="2" fill="currentColor"/><circle cx="42" cy="46" r="2" fill="currentColor"/></svg>',
    category: 'Genel',
    keywords: 'yaş hesaplama, age calculator, doğum tarihi, kaç yaşındayım',
  },
  {
    id: 'yukselen-hesaplama',
    title: 'Yükselen Burç Hesaplama',
    description: 'Doğum saatinize göre yükselen burcunuzu öğrenin',
    icon: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.05"/><path d="M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z" fill="currentColor" fill-opacity="0.8" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    category: 'Astroloji',
    keywords: 'yükselen burç, ascending sign, astroloji, burç hesaplama',
  },
  {
    id: 'kdv-hesaplama',
    title: 'KDV Hesaplama',
    description: 'KDV dahil veya hariç fiyat hesaplayın',
    icon: '<svg viewBox="0 0 64 64" fill="none"><rect x="10" y="16" width="44" height="32" rx="3" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="32" cy="32" r="8" stroke="currentColor" stroke-width="2" fill="none"/><text x="32" y="36" font-size="12" font-weight="bold" text-anchor="middle" fill="currentColor">₺</text><rect x="16" y="22" width="32" height="4" rx="2" fill="currentColor" fill-opacity="0.3"/><line x1="24" y1="40" x2="40" y2="40" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    category: 'Finans',
    keywords: 'kdv hesaplama, vat calculator, kdv ekleme, kdv çıkarma',
  },
  {
    id: 'gebelik-hesaplama',
    title: 'Gebelik Hesaplama',
    description: 'Son adet tarihinize göre gebelik haftanızı hesaplayın',
    icon: '<svg viewBox="0 0 64 64" fill="none"><path d="M32 12 C20 12 12 20 12 32 C12 44 20 52 32 52 C44 52 52 44 52 32 C52 20 44 12 32 12 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><path d="M32 20 C32 20 24 24 24 32 C24 40 28 44 32 44 C36 44 40 40 40 32 C40 24 32 20 32 20 Z" fill="currentColor" fill-opacity="0.3"/><path d="M20 28 Q32 18 44 28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    category: 'Sağlık',
    keywords: 'gebelik hesaplama, pregnancy calculator, hamilelik, gebelik haftası',
  },
  
  {
    id: 'lgs-puan-hesaplama',
    title: 'LGS Puan Hesaplama',
    description: 'LGS net sayılarınıza göre puanınızı hesaplayın',
    icon: '<svg viewBox="0 0 64 64" fill="none"><path d="M16 12 L48 12 L52 20 L52 52 L12 52 L12 20 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><rect x="20" y="20" width="24" height="4" rx="1" fill="currentColor" fill-opacity="0.4"/><rect x="20" y="28" width="24" height="4" rx="1" fill="currentColor" fill-opacity="0.4"/><rect x="20" y="36" width="18" height="4" rx="1" fill="currentColor" fill-opacity="0.4"/><circle cx="50" cy="42" r="10" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/><text x="50" y="46" font-size="10" font-weight="bold" text-anchor="middle" fill="currentColor">A+</text></svg>',
    category: 'Eğitim',
    keywords: 'lgs puan hesaplama, lgs calculator, lgs puanı, ortaokul sınavı',
  },
  
];

export const getCalculatorById = (id) => {
  return calculators.find(calc => calc.id === id);
};

export const getCalculatorsByCategory = (category) => {
  return calculators.filter(calc => calc.category === category);
};

export const categories = [
  'Tümü',
  'Matematik',
  'Finans',
  'Sağlık',
  'Eğitim',
  'Genel',
  'Astroloji',
  'Dini'
];