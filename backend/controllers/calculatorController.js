const { validationResult } = require('express-validator');

// Helper function to handle validation errors
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
      timestamp: new Date().toISOString()
    });
  }
  return null;
};

// Basic Calculator
exports.basicCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { num1, num2, operation } = req.body;
  let result;
  let formula;

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  try {
    switch (operation) {
      case 'add':
        result = n1 + n2;
        formula = `${n1} + ${n2} = ${result}`;
        break;
      case 'subtract':
        result = n1 - n2;
        formula = `${n1} - ${n2} = ${result}`;
        break;
      case 'multiply':
        result = n1 * n2;
        formula = `${n1} × ${n2} = ${result}`;
        break;
      case 'divide':
        if (n2 === 0) {
          return res.status(400).json({
            status: 'error',
            message: 'Sıfıra bölme hatası',
            timestamp: new Date().toISOString()
          });
        }
        result = n1 / n2;
        formula = `${n1} ÷ ${n2} = ${result}`;
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Geçersiz işlem',
          timestamp: new Date().toISOString()
        });
    }

    res.json({
      status: 'success',
      result: parseFloat(result.toFixed(10)),
      formula,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};

// Percentage Calculator
exports.percentageCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { value, percentage, operation = 'find' } = req.body;
  const val = parseFloat(value);
  const perc = parseFloat(percentage);

  let result;
  let formula;

  try {
    switch (operation) {
      case 'find':
        result = (val * perc) / 100;
        formula = `${val}'nin %${perc}'si = ${result}`;
        break;
      case 'increase':
        result = val + (val * perc) / 100;
        formula = `${val} + %${perc} = ${result}`;
        break;
      case 'decrease':
        result = val - (val * perc) / 100;
        formula = `${val} - %${perc} = ${result}`;
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Geçersiz işlem',
          timestamp: new Date().toISOString()
        });
    }

    res.json({
      status: 'success',
      result: parseFloat(result.toFixed(2)),
      formula,
      originalValue: val,
      percentage: perc,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};

// Age Calculator
exports.ageCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { birthDate } = req.body;

  try {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    res.json({
      status: 'success',
      result: {
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths
      },
      formula: `${years} yıl, ${months} ay, ${days} gün`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};

// Ascending Calculator (Yükselen Burç)
exports.ascendingCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { birthDate, birthTime, birthPlace } = req.body;

  try {
    const birth = new Date(birthDate);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    const [hour, minute] = birthTime.split(':').map(Number);

    const zodiacSigns = [
      { 
        name: 'Koç', 
        start: [3, 21], 
        end: [4, 19],
        element: 'Ateş',
        ruler: 'Mars',
        description: 'Yükselen Koç burcu, enerjik, cesur ve girişken bir kişilik yapısını temsil eder. İlk izlenimde hareketli, dinamik ve kararlı görünürsünüz. Liderlik özellikleri güçlüdür ve hayata karşı savaşçı bir tutum sergilersiniz. Doğrudan iletişim kurmayı seversiniz ve sabırsız bir yapınız vardır. Fiziksel olarak atletik ve enerjik bir görünüme sahip olabilirsiniz.'
      },
      { 
        name: 'Boğa', 
        start: [4, 20], 
        end: [5, 20],
        element: 'Toprak',
        ruler: 'Venüs',
        description: 'Yükselen Boğa burcu, sakin, dengeli ve güvenilir bir dış kişilik sunar. İlk izlenimde huzurlu, pratik ve toprağa basan biri olarak görünürsünüz. Maddi güvenlik sizin için önemlidir ve konforunuza düşkün bir yapınız vardır. Güzellik duygunuz gelişmiştir ve estetik zevkleriniz yüksektir. Sabırlı ve ısrarcı yaklaşımınız dikkat çeker.'
      },
      { 
        name: 'İkizler', 
        start: [5, 21], 
        end: [6, 20],
        element: 'Hava',
        ruler: 'Merkür',
        description: 'Yükselen İkizler burcu, zeki, konuşkan ve meraklı bir kişilik yansıtır. İlk izlenimde entelektüel, hareketli ve sosyal görünürsünüz. İletişim yetenekleriniz güçlüdür ve çabuk öğrenen bir yapınız vardır. Değişken ruh haliniz ve çok yönlü ilgi alanlarınız sizi dinamik kılar. Genç ve taze bir görünüme sahip olabilirsiniz.'
      },
      { 
        name: 'Yengeç', 
        start: [6, 21], 
        end: [7, 22],
        element: 'Su',
        ruler: 'Ay',
        description: 'Yükselen Yengeç burcu, duygusal, koruyucu ve içten bir dış kişilik sergiler. İlk izlenimde hassas, nazik ve empatik görünürsünüz. Aile ve ev konularına önem verirsiniz. Güçlü bir sezgi ve duygusal derinliğe sahipsiniz. Kendinizi ifade etmekte bazen çekingen olabilir ancak sevdiklerinize karşı son derece sadıksınız.'
      },
      { 
        name: 'Aslan', 
        start: [7, 23], 
        end: [8, 22],
        element: 'Ateş',
        ruler: 'Güneş',
        description: 'Yükselen Aslan burcu, gösterişli, özgüvenli ve karizmatik bir kişilik yansıtır. İlk izlenimde güçlü, lider ve dikkat çekici görünürsünüz. Sahne almanızı ve beğenilmeyi seversiniz. Cömert ve kalbiniz geniştir. Dramatik ve yaratıcı yetenekleriniz vardır. Fiziksel olarak görkemli ve gösterişli bir duruşunuz olabilir.'
      },
      { 
        name: 'Başak', 
        start: [8, 23], 
        end: [9, 22],
        element: 'Toprak',
        ruler: 'Merkür',
        description: 'Yükselen Başak burcu, düzenli, analitik ve mütevazı bir dış kişilik sunar. İlk izlenimde titiz, dikkatli ve pratik görünürsünüz. Detaylara önem verirsiniz ve mükemmeliyetçi bir yapınız vardır. Hizmet etmeyi ve yardımcı olmayı seversiniz. Sağlığınıza ve hijyene dikkat edersiniz. Zeki ve eleştirel düşünme beceriniz gelişmiştir.'
      },
      { 
        name: 'Terazi', 
        start: [9, 23], 
        end: [10, 22],
        element: 'Hava',
        ruler: 'Venüs',
        description: 'Yükselen Terazi burcu, diplomatik, nazik ve estetik duygusu yüksek bir kişilik yansıtır. İlk izlenimde zarif, dengeli ve hoş görünürsünüz. İlişkilere önem verirsiniz ve adalet duygunuz güçlüdür. Çekici ve uyumlu bir dış görünüşe sahipsiniz. Karar vermekte bazen zorlanabilir ancak uzlaştırıcı yaklaşımınız dikkat çeker.'
      },
      { 
        name: 'Akrep', 
        start: [10, 23], 
        end: [11, 21],
        element: 'Su',
        ruler: 'Plüton',
        description: 'Yükselen Akrep burcu, yoğun, gizemli ve etkileyici bir dış kişilik sergiler. İlk izlenimde güçlü, derin ve manyetik görünürsünüz. Kontrol ve güç sizin için önemlidir. Sezgileriniz son derece güçlüdür ve insanları derinden analiz edersiniz. Tutkulu ve kararlı bir yapınız vardır. Gözleriniz nüfuz edici ve etkileyicidir.'
      },
      { 
        name: 'Yay', 
        start: [11, 22], 
        end: [12, 21],
        element: 'Ateş',
        ruler: 'Jüpiter',
        description: 'Yükselen Yay burcu, iyimser, özgür ruhlu ve maceraperest bir kişilik yansıtır. İlk izlenimde neşeli, açık fikirli ve filosofik görünürsünüz. Yeni deneyimlere açıksınız ve öğrenmeyi seversiniz. Dürüst ve doğrudan iletişim kurarısınız. Seyahat etmeyi ve farklı kültürleri keşfetmeyi seversiniz. Atletik ve hareketli bir yapınız vardır.'
      },
      { 
        name: 'Oğlak', 
        start: [12, 22], 
        end: [1, 19],
        element: 'Toprak',
        ruler: 'Satürn',
        description: 'Yükselen Oğlak burcu, ciddi, sorumlu ve hırslı bir dış kişilik sunar. İlk izlenimde olgun, güvenilir ve disiplinli görünürsünüz. Başarı ve statü sizin için önemlidir. Geleneklere ve kurallara saygılısınız. Sabırlı ve kararlı çalışma tarzınız vardır. Fiziksel olarak kemikli bir yapınız ve ciddi bir yüz ifadeniz olabilir.'
      },
      { 
        name: 'Kova', 
        start: [1, 20], 
        end: [2, 18],
        element: 'Hava',
        ruler: 'Uranüs',
        description: 'Yükselen Kova burcu, özgün, yenilikçi ve bağımsız bir kişilik yansıtır. İlk izlenimde farklı, akıllı ve insancıl görünürsünüz. Özgürlüğünüze düşkünsünüz ve geleneksel kalıplara uymaktan hoşlanmazsınız. Toplumsal konularla ilgilenirsiniz ve idealleriniz yüksektir. Teknoloji ve bilime ilginiz vardır. Sıra dışı tarzınız dikkat çeker.'
      },
      { 
        name: 'Balık', 
        start: [2, 19], 
        end: [3, 20],
        element: 'Su',
        ruler: 'Neptün',
        description: 'Yükselen Balık burcu, hassas, hayalperest ve şefkatli bir dış kişilik sergiler. İlk izlenimde gizemli, empatik ve sanatsal görünürsünüz. Ruhsal ve manevi konulara ilginiz vardır. Güçlü bir hayal gücüne sahipsiniz ve sanatsal yetenekleriniz gelişmiştir. Fedakâr bir yapınız vardır ancak bazen kendinizi kaybedebilirsiniz. Büyüleyici ve romantik bir havanız vardır.'
      }
    ];

    // Calculate sun sign
    let sunSign = '';
    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        sunSign = sign.name;
        break;
      }
    }

    // Enhanced ascending calculation based on birth time
    // This is still simplified but more accurate than before
    const totalMinutes = hour * 60 + minute;
    const minutesPerSign = (24 * 60) / 12; // Average time per sign
    
    // Get sun sign index
    const sunSignIndex = zodiacSigns.findIndex(s => s.name === sunSign);
    
    // Calculate ascending sign index (simplified algorithm)
    const ascendingOffset = Math.floor(totalMinutes / minutesPerSign);
    const ascendingIndex = (sunSignIndex + ascendingOffset) % 12;
    
    const ascendingSignData = zodiacSigns[ascendingIndex];

    res.json({
      status: 'success',
      data: {
        sunSign,
        ascendingSign: ascendingSignData.name,
        element: ascendingSignData.element,
        ruler: ascendingSignData.ruler,
        description: ascendingSignData.description,
        birthPlace,
        birthDate,
        birthTime
      },
      formula: `Güneş Burcu: ${sunSign}, Yükselen Burç: ${ascendingSignData.name}`,
      note: 'Bu hesaplama astronomik verilere dayalı basitleştirilmiş bir yöntem kullanmaktadır. En kesin sonuç için doğum saatinizin dakika bazında doğru olması önemlidir.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};

// VAT Calculator
exports.vatCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { amount, vatRate, operation } = req.body;
  const amt = parseFloat(amount);
  const rate = parseFloat(vatRate);

  let result;
  let vatAmount;
  let baseAmount;
  let totalAmount;
  let formula;

  try {
    if (operation === 'remove') {
      // "KDV dahil tutardan KDV hariç fiyat hesaplama" - Removing VAT from total
      // User gives: Total amount WITH VAT
      // Calculate: Base amount WITHOUT VAT
      baseAmount = amt / (1 + rate / 100);
      vatAmount = amt - baseAmount;
      totalAmount = amt;
      result = baseAmount;
      formula = `${amt} TL (KDV Dahil) → ${baseAmount.toFixed(2)} TL (KDV Hariç) + ${vatAmount.toFixed(2)} TL (KDV)`;
    } else if (operation === 'add') {
      // "KDV hariç tutardan KDV dahil tutar hesaplama" - Adding VAT to base
      // User gives: Base amount WITHOUT VAT
      // Calculate: Total amount WITH VAT
      baseAmount = amt;
      vatAmount = (amt * rate) / 100;
      totalAmount = amt + vatAmount;
      result = totalAmount;
      formula = `${amt} TL (KDV Hariç) + ${vatAmount.toFixed(2)} TL (KDV) → ${totalAmount.toFixed(2)} TL (KDV Dahil)`;
    }

    res.json({
      status: 'success',
      result: parseFloat(result.toFixed(2)),
      vatAmount: parseFloat(vatAmount.toFixed(2)),
      baseAmount: parseFloat(baseAmount.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      vatRate: rate,
      formula,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};

// Pregnancy Calculator
exports.pregnancyCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { lastPeriodDate } = req.body;

  try {
    const lastPeriod = new Date(lastPeriodDate);
    const today = new Date();

    // Calculate due date (280 days from last period)
    const dueDate = new Date(lastPeriod);
    dueDate.setDate(dueDate.getDate() + 280);

    // Calculate current week
    const daysPassed = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    const weeksPassed = Math.floor(daysPassed / 7);
    const daysInCurrentWeek = daysPassed % 7;

    // Calculate remaining time
    const daysRemaining = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.floor(daysRemaining / 7);

    // Calculate trimester
    let trimester;
    if (weeksPassed <= 13) trimester = 1;
    else if (weeksPassed <= 27) trimester = 2;
    else trimester = 3;

    res.json({
      status: 'success',
      result: {
        currentWeek: weeksPassed,
        currentDay: daysInCurrentWeek,
        trimester,
        dueDate: dueDate.toISOString().split('T')[0],
        daysRemaining,
        weeksRemaining,
        percentComplete: Math.min(100, Math.round((daysPassed / 280) * 100))
      },
      formula: `${weeksPassed} hafta ${daysInCurrentWeek} gün`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};


// LGS Score Calculator
exports.lgsCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { turkceNet, matNet, fenNet, sosyalNet, dinNet, ingilizceNet, examYear = '2025' } = req.body;

  try {
    // Parse inputs - ENSURE THEY ARE NUMBERS
    const turkce = parseFloat(turkceNet) || 0;
    const matematik = parseFloat(matNet) || 0;
    const fen = parseFloat(fenNet) || 0;
    const sosyal = parseFloat(sosyalNet) || 0;
    const din = parseFloat(dinNet) || 0;
    const ingilizce = parseFloat(ingilizceNet) || 0;

    // LGS 2025 Question Counts
    const questionCounts = {
      turkce: 20,
      matematik: 20,
      fen: 20,
      sosyal: 10,
      din: 10,
      ingilizce: 10,
      total: 90
    };

    // Validate net values don't exceed question counts
    if (turkce > questionCounts.turkce || 
        matematik > questionCounts.matematik || 
        fen > questionCounts.fen || 
        sosyal > questionCounts.sosyal || 
        din > questionCounts.din || 
        ingilizce > questionCounts.ingilizce) {
      return res.status(400).json({
        status: 'error',
        message: 'Net sayısı soru sayısından fazla olamaz',
        timestamp: new Date().toISOString()
      });
    }

    // Validate all nets are non-negative
    if (turkce < 0 || matematik < 0 || fen < 0 || sosyal < 0 || din < 0 || ingilizce < 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Net sayısı negatif olamaz',
        timestamp: new Date().toISOString()
      });
    }

    // Calculate percentages for each subject
    const turkcePercentage = questionCounts.turkce > 0 ? (turkce / questionCounts.turkce) * 100 : 0;
    const matematikPercentage = questionCounts.matematik > 0 ? (matematik / questionCounts.matematik) * 100 : 0;
    const fenPercentage = questionCounts.fen > 0 ? (fen / questionCounts.fen) * 100 : 0;
    const sosyalPercentage = questionCounts.sosyal > 0 ? (sosyal / questionCounts.sosyal) * 100 : 0;
    const dinPercentage = questionCounts.din > 0 ? (din / questionCounts.din) * 100 : 0;
    const ingilizcePercentage = questionCounts.ingilizce > 0 ? (ingilizce / questionCounts.ingilizce) * 100 : 0;

    // Total net and percentage
    const totalNet = turkce + matematik + fen + sosyal + din + ingilizce;
    const totalPercentage = questionCounts.total > 0 ? (totalNet / questionCounts.total) * 100 : 0;

    // LGS Score Calculation (MSP - Merkezi Sınav Puanı)
    // Formula: (Total Net / Total Questions) * 500
    const lgsScore = (totalNet / questionCounts.total) * 500;

    // Approximate percentile calculation (based on score distribution)
    let approximatePercentile;
    if (lgsScore >= 490) approximatePercentile = 0.1;
    else if (lgsScore >= 480) approximatePercentile = 0.5;
    else if (lgsScore >= 470) approximatePercentile = 1.0;
    else if (lgsScore >= 460) approximatePercentile = 1.5;
    else if (lgsScore >= 450) approximatePercentile = 2.5;
    else if (lgsScore >= 440) approximatePercentile = 3.5;
    else if (lgsScore >= 430) approximatePercentile = 5.0;
    else if (lgsScore >= 420) approximatePercentile = 7.0;
    else if (lgsScore >= 410) approximatePercentile = 10.0;
    else if (lgsScore >= 400) approximatePercentile = 13.0;
    else if (lgsScore >= 390) approximatePercentile = 17.0;
    else if (lgsScore >= 380) approximatePercentile = 22.0;
    else if (lgsScore >= 370) approximatePercentile = 28.0;
    else if (lgsScore >= 360) approximatePercentile = 35.0;
    else if (lgsScore >= 350) approximatePercentile = 42.0;
    else if (lgsScore >= 340) approximatePercentile = 48.0;
    else if (lgsScore >= 330) approximatePercentile = 54.0;
    else if (lgsScore >= 320) approximatePercentile = 60.0;
    else if (lgsScore >= 310) approximatePercentile = 65.0;
    else if (lgsScore >= 300) approximatePercentile = 70.0;
    else if (lgsScore >= 290) approximatePercentile = 74.0;
    else if (lgsScore >= 280) approximatePercentile = 78.0;
    else if (lgsScore >= 270) approximatePercentile = 82.0;
    else if (lgsScore >= 260) approximatePercentile = 85.0;
    else if (lgsScore >= 250) approximatePercentile = 88.0;
    else if (lgsScore >= 240) approximatePercentile = 90.5;
    else if (lgsScore >= 230) approximatePercentile = 92.5;
    else if (lgsScore >= 220) approximatePercentile = 94.0;
    else if (lgsScore >= 210) approximatePercentile = 95.5;
    else if (lgsScore >= 200) approximatePercentile = 96.5;
    else if (lgsScore >= 190) approximatePercentile = 97.5;
    else if (lgsScore >= 180) approximatePercentile = 98.0;
    else if (lgsScore >= 170) approximatePercentile = 98.5;
    else if (lgsScore >= 160) approximatePercentile = 99.0;
    else approximatePercentile = 99.5;

    // Calculate approximate rank (based on ~963,142 students for 2025)
    const totalStudents = 963142;
    const approximateRank = Math.round((approximatePercentile / 100) * totalStudents);

    res.json({
      status: 'success',
      result: {
        examYear,
        lgsScore: parseFloat(lgsScore.toFixed(2)),
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
      },
      formula: `(${totalNet.toFixed(2)} net / ${questionCounts.total} soru) × 500 = ${lgsScore.toFixed(2)} puan`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('LGS Calculation Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
};







// Midterm Final Calculator
exports.midtermFinalCalculator = (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return;

  const { midtermScore, midtermWeight, finalScore, finalWeight } = req.body;

  try {
    const vize = parseFloat(midtermScore);
    const vizeWeight = parseFloat(midtermWeight);

    if (finalScore && finalWeight) {
      // Calculate final average
      const final = parseFloat(finalScore);
      const finalW = parseFloat(finalWeight);

      const average = (vize * vizeWeight / 100) + (final * finalW / 100);

      let letterGrade;
      if (average >= 90) letterGrade = 'AA';
      else if (average >= 85) letterGrade = 'BA';
      else if (average >= 80) letterGrade = 'BB';
      else if (average >= 75) letterGrade = 'CB';
      else if (average >= 70) letterGrade = 'CC';
      else if (average >= 65) letterGrade = 'DC';
      else if (average >= 60) letterGrade = 'DD';
      else if (average >= 50) letterGrade = 'FD';
      else letterGrade = 'FF';

      res.json({
        status: 'success',
        result: {
          average: parseFloat(average.toFixed(2)),
          letterGrade,
          passed: average >= 60,
          midtermScore: vize,
          finalScore: final
        },
        formula: `(${vize} × ${vizeWeight}%) + (${final} × ${finalW}%) = ${average.toFixed(2)}`,
        timestamp: new Date().toISOString()
      });
    } else {
      // Calculate required final score
      const targetGrade = 60; // Minimum passing grade
      const finalW = 100 - vizeWeight;
      const requiredFinal = (targetGrade - (vize * vizeWeight / 100)) / (finalW / 100);

      res.json({
        status: 'success',
        result: {
          requiredFinalScore: parseFloat(Math.max(0, requiredFinal).toFixed(2)),
          midtermScore: vize,
          targetGrade
        },
        formula: `Dersten geçmek için finalden ${Math.max(0, requiredFinal).toFixed(2)} puan almanız gerekir`,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Hesaplama hatası',
      timestamp: new Date().toISOString()
    });
  }
};

module.exports = exports;