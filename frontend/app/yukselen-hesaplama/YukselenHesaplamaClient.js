'use client';

import { useState } from 'react';

// API utility function
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = {
  async calculate(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Hesaplama hatası');
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};

export default function YukselenHesaplama() {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: '',
    longitude: '',
    outsideTurkey: false
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate time options (15-minute intervals)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const time24 = `${hourStr}:${minuteStr}`;
        
        // Convert to 12-hour format for display
        let displayHour = hour % 12;
        if (displayHour === 0) displayHour = 12;
        const period = hour < 12 ? 'AM' : 'PM';
        const time12 = `${displayHour}:${minuteStr} ${period}`;
        
        times.push({ value: time24, label: time12 });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const zodiacSigns = {
    aries: { name: 'Koç', dates: '21 Mart - 20 Nisan', element: 'Ateş', ruler: 'Mars' },
    taurus: { name: 'Boğa', dates: '21 Nisan - 21 Mayıs', element: 'Toprak', ruler: 'Venüs' },
    gemini: { name: 'İkizler', dates: '22 Mayıs - 21 Haziran', element: 'Hava', ruler: 'Merkür' },
    cancer: { name: 'Yengeç', dates: '22 Haziran - 22 Temmuz', element: 'Su', ruler: 'Ay' },
    leo: { name: 'Aslan', dates: '23 Temmuz - 23 Ağustos', element: 'Ateş', ruler: 'Güneş' },
    virgo: { name: 'Başak', dates: '24 Ağustos - 23 Eylül', element: 'Toprak', ruler: 'Merkür' },
    libra: { name: 'Terazi', dates: '24 Eylül - 23 Ekim', element: 'Hava', ruler: 'Venüs' },
    scorpio: { name: 'Akrep', dates: '24 Ekim - 22 Kasım', element: 'Su', ruler: 'Plüton' },
    sagittarius: { name: 'Yay', dates: '23 Kasım - 21 Aralık', element: 'Ateş', ruler: 'Jüpiter' },
    capricorn: { name: 'Oğlak', dates: '22 Aralık - 20 Ocak', element: 'Toprak', ruler: 'Satürn' },
    aquarius: { name: 'Kova', dates: '21 Ocak - 19 Şubat', element: 'Hava', ruler: 'Uranüs' },
    pisces: { name: 'Balık', dates: '20 Şubat - 20 Mart', element: 'Su', ruler: 'Neptün' }
  };

  const turkishCities = [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
    'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
    'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
    'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
    'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale',
    'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
    'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
    'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak',
    'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('Submitting form data:', formData); // Debug log
      const response = await api.calculate('yukselen-hesaplama', formData);
      console.log('API Response:', response); // Debug log
      
      // Check if response has nested data structure
      if (response.data) {
        setResult(response.data);
      } else if (response.result) {
        // Handle alternative response structure
        setResult(response.result);
      } else {
        // Use response directly if it's already the data object
        setResult(response);
      }
    } catch (err) {
      console.error('Submit error:', err); // Debug log
      setError(err.message || 'Hesaplama sırasında bir hata oluştu. Lütfen tüm alanları doğru doldurduğunuzdan emin olun.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-purple-600 rounded-xl mb-6">
            <svg className="w-12 h-12 text-white" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
              <path d="M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z" fill="currentColor" fillOpacity="0.9" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Yükselen Burç Hesaplama
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Doğum tarihiniz, saatiniz ve yerinize göre yükselen burcunuzu öğrenin. Astrolojik haritanızın en önemli parçası olan yükselen burç, kişiliğinizin dış yansımasını ve hayata bakış açınızı belirler.
          </p>
        </header>

        {/* Info Alert */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Yükselen burç hesaplaması için doğum saatinizin kesin olması çok önemlidir. Doğum saatinizdeki birkaç dakikalık fark bile yükselen burcunuzu değiştirebilir. En doğru sonuç için nüfus cüzdanınızdaki doğum saatini kullanınız.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Calculator Card */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Yükselen Burç Hesaplama Aracı
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Birth Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Doğum Tarihi *
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Birth Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Birth Time *
                    </label>
                    <div className="relative">
                      <select
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer"
                      >
                        <option value="">Select time</option>
                        {timeOptions.map((time) => (
                          <option key={time.value} value={time.value}>
                            {time.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      24-hour format (example: 14:30)
                    </p>
                  </div>

                  {/* Birth Place */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Doğum Yeri *
                    </label>
                    <select
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleInputChange}
                      required
                      disabled={formData.outsideTurkey}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Şehir Seçiniz</option>
                      {turkishCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      If you were born in Turkey, choose a province instead of a district
                    </p>
                  </div>

                  {/* Outside Turkey Checkbox */}
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="outsideTurkey"
                        name="outsideTurkey"
                        checked={formData.outsideTurkey}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="outsideTurkey" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Türkiye Dışında mı Doğdunuz?</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          If you were born in a country other than Turkey, you can manually enter your latitude and longitude coordinates by marking.
                        </p>
                      </label>
                    </div>

                    {formData.outsideTurkey && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Enlem (Latitude)
                          </label>
                          <input
                            type="text"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                            placeholder="41.0082"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Boylam (Longitude)
                          </label>
                          <input
                            type="text"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                            placeholder="28.9784"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Hesaplanıyor...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>Yükselen Burcu Hesapla</span>
                      </>
                    )}
                  </button>

                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ birthDate: '', birthTime: '', birthPlace: '', latitude: '', longitude: '', outsideTurkey: false });
                      setResult(null);
                      setError('');
                    }}
                    className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Sıfırla
                  </button>
                </form>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex">
                      <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                )}

                {/* Result Display */}
                {result && (
                  <div className="mt-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      Hesaplama Sonuçları
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Sun Sign */}
                      {result.sunSign && (
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Burcunuz (Güneş Burcu):
                          </span>
                          <span className="text-base text-gray-900 dark:text-white">
                            {result.sunSign}
                          </span>
                        </div>
                      )}

                      {/* Birth Info */}
                      {result.birthDate && (
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Güneşin Konumu:
                          </span>
                          <span className="text-base text-gray-900 dark:text-white">
                            {new Date(result.birthDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} ({result.birthTime || ''})
                          </span>
                        </div>
                      )}

                      {/* Ascending Sign */}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Yükselen Burcunuz:
                        </span>
                        <span className="text-base text-gray-900 dark:text-white font-semibold">
                          {result.ascendingSign || result.ascending_sign || 'Hesaplanamadı'}
                        </span>
                      </div>

                      {/* Note */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-bold">NOT:</span> Parantez içerisinde verilen konum bilgisi 2° veya altında olduğunda önceki burç veya önceki ev ile de yorumlama yapılabilir. Aynı şekilde konum bilgisi 28° ve üzerinde olduğunda ise bir sonraki burç veya bir sonraki ev ile de yorumlama yapılabilmektedir.
                          </p>
                        </div>
                      </div>

                      {/* Additional Details */}
                      {(result.element || result.ruler || result.description) && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Detaylı Bilgi
                          </h4>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            {result.element && (
                              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Element</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">{result.element}</p>
                              </div>
                            )}
                            {result.ruler && (
                              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Yönetici Gezegen</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white">{result.ruler}</p>
                              </div>
                            )}
                          </div>

                          {result.description && (
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Kişilik Özellikleri</h5>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {result.description}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Share Buttons */}
                    <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                        <span>Paylaş</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                        </svg>
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            {/* What is Ascending Sign */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Yükselen Burç Nedir?
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p className="leading-relaxed">
                  Yükselen burç, astrolojide kişinin doğduğu anda doğu ufkunda yükselen burç işaretidir. Kişinin dış dünyaya sunduğu yüzü, fiziksel görünümünü ve hayata ilk bakış açısını temsil eder. Güneş burcunuz içsel benliğinizi gösterirken, yükselen burcunuz dış kişiliğinizi ve başkalarının sizi nasıl algıladığını belirler.
                </p>
                <p className="leading-relaxed">
                  Yükselen burç hesaplaması yaparken doğum tarihi, doğum saati ve doğum yeri olmak üzere üç temel bilgiye ihtiyaç vardır. Bu bilgiler arasında en kritik olanı doğum saatidir çünkü yükselen burç yaklaşık her iki saatte bir değişir. Doğum saatinizdeki birkaç dakikalık fark bile tamamen farklı bir yükselen burç sonucu verebilir.
                </p>
              </div>
            </section>

            {/* How to Calculate */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Yükselen Burç Nasıl Hesaplanır?
              </h2>
              <div className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Yükselen burç hesaplama işlemi astronomik hesaplamalara dayanır ve manuel olarak yapılması oldukça karmaşıktır. Hesaplama aracımız, girdiğiniz bilgileri kullanarak otomatik olarak yükselen burcunuzu belirler. İşte hesaplama sürecinde kullanılan temel adımlar:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white text-lg font-bold">
                          1
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Doğum Bilgilerinin Girilmesi</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Doğum tarihi, tam doğum saati ve doğum yeri bilgilerinizi eksiksiz ve doğru şekilde girmeniz gerekmektedir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white text-lg font-bold">
                          2
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Coğrafi Koordinatların Belirlenmesi</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Seçtiğiniz şehrin enlem ve boylam koordinatları otomatik olarak belirlenir ve hesaplamada kullanılır.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white text-lg font-bold">
                          3
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sideral Zaman Hesabı</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Doğum anındaki yerel sideral zaman hesaplanarak, o andaki gök cisimlerinin konumu belirlenir.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-600 text-white text-lg font-bold">
                          4
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Yükselen Burç Belirlenmesi</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Doğu ufkunda yükselen burç işareti tespit edilerek size detaylı bilgi sunulur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Importance */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Hesaplama Aracı Ne Kadar Doğru Sonuç Veriyor?
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p className="leading-relaxed">
                  Yükselen burç hesaplama aracımız, profesyonel astrologların kullandığı astronomik algoritmaları kullanarak son derece hassas sonuçlar üretmektedir. Ancak sonuçların doğruluğu tamamen sizin girdiğiniz bilgilerin doğruluğuna bağlıdır.
                </p>
                <p className="leading-relaxed">
                  Doğum saatinizin kesin olması kritik önem taşır. Nüfus cüzdanınızda yazan doğum saati genellikle yuvarlanmış bir saat olabilir. Mümkünse hastanenizden doğum belgesi alarak tam doğum saatinizi öğrenmeniz en doğru sonucu almanızı sağlar. İki burç arasındaki geçiş zamanında doğduysanız, birkaç dakikalık fark bile yükselen burcunuzu değiştirebilir.
                </p>
              </div>
            </section>

            {/* Why Ascending Sign Changes */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Yükselen Burç Kaç Saatte Bir Değişmektedir?
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p className="leading-relaxed">
                  Dünya kendi ekseni etrafında 24 saatte tam bir tur attığı için, 12 burç işareti bu süre zarfında doğu ufkunda yükselir. Bu basit matematik hesabıyla, her burç yaklaşık 2 saat boyunca yükselen burç konumunda kalır. Ancak bu süre burçlara göre değişiklik gösterebilir.
                </p>
                <p className="leading-relaxed">
                  Örneğin, ekliptik düzlemiyle ekvatör arasındaki açı farkı nedeniyle bazı burçlar daha hızlı yükselirken (yaklaşık 1 saat 20 dakika), bazıları daha yavaş yükselir (yaklaşık 2 saat 40 dakika). İşte bu yüzden doğum saatinizdeki her dakika önemlidir ve hassas bir hesaplama gerektirir.
                </p>
              </div>
            </section>

            {/* Zodiac Signs and Characteristics */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Yükselen Burç Cinsiyete Göre Değişir Mi?
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4 mb-6">
                <p className="leading-relaxed">
                  Hayır, yükselen burç cinsiyete göre değişmez. Doğum tarihinde, saatinde ve yerinde doğan tüm bireyler için yükselen burç aynıdır. Ancak yükselen burcun etkileri ve bu özelliklerin dışa yansıması kişinin cinsiyetine göre farklı şekillerde yorumlanabilir.
                </p>
                <p className="leading-relaxed">
                  Astrolojide kadın ve erkek enerjileri farklı şekillerde açığa çıkabilir, bu nedenle aynı yükselen burca sahip iki farklı cinsiyetteki birey bu özellikleri farklı şekillerde yaşayabilir ve gösterebilir. Ancak hesaplama matematiksel bir işlem olduğundan cinsiyet değişkeni kullanılmaz.
                </p>
              </div>
            </section>

            {/* All Zodiac Signs Details */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Tüm Yükselen Burçlar ve Özellikleri
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(zodiacSigns).map(([key, sign]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {sign.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{sign.dates}</p>
                      </div>
                      <div className="text-3xl">
                        {key === 'aries' && '♈'}
                        {key === 'taurus' && '♉'}
                        {key === 'gemini' && '♊'}
                        {key === 'cancer' && '♋'}
                        {key === 'leo' && '♌'}
                        {key === 'virgo' && '♍'}
                        {key === 'libra' && '♎'}
                        {key === 'scorpio' && '♏'}
                        {key === 'sagittarius' && '♐'}
                        {key === 'capricorn' && '♑'}
                        {key === 'aquarius' && '♒'}
                        {key === 'pisces' && '♓'}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-32">Element:</span>
                        <span className="text-gray-600 dark:text-gray-400">{sign.element}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-32">Yönetici:</span>
                        <span className="text-gray-600 dark:text-gray-400">{sign.ruler}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Sıkça Sorulan Sorular
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Doğum saatimi bilmiyorsam ne yapmalıyım?',
                    a: 'Doğum saatinizi bilmiyorsanız, öncelikle nüfus cüzdanınızı kontrol edin. Orada bulunan saat genellikle yuvarlanmış bir saat olabilir. Daha kesin sonuç için doğduğunuz hastanenin arşivinden doğum belgesi talep edebilirsiniz. Eğer hiçbir şekilde doğum saatinizi öğrenemiyorsanız, rektifikasyon adı verilen bir yöntemle profesyonel bir astrolog tarafından tahmini doğum saatiniz belirlenebilir.'
                  },
                  {
                    q: 'Yükselen burç ile güneş burcu arasındaki fark nedir?',
                    a: 'Güneş burcunuz, doğduğunuz tarihte Güneşin hangi burçta olduğunu gösterir ve içsel benliğinizi, ego yapınızı ve temel kişiliğinizi temsil eder. Yükselen burcunuz ise doğduğunuz anda doğu ufkunda yükselen burçtur ve dış kişiliğinizi, fiziksel görünümünüzü ve başkalarının sizi nasıl algıladığını belirler. Güneş burcu kim olduğunuzu, yükselen burç ise nasıl göründüğünüzü anlatır.'
                  },
                  {
                    q: 'Yükselen burç özellikleri ne zaman ortaya çıkar?',
                    a: 'Yükselen burç özellikleri doğumla birlikte var olmaya başlar ancak en belirgin şekilde yetişkinlik döneminde kendini gösterir. Çocukluk ve ergenlik döneminde daha çok Güneş ve Ay burcu özellikleri ön plandayken, yaşla birlikte yükselen burcun etkileri güçlenir. Özellikle toplumsal hayatta, iş yaşamında ve yeni tanıştığınız insanlarla etkileşimde yükselen burç özellikleri daha belirgin hale gelir.'
                  },
                  {
                    q: 'Türkiye dışında doğdum, nasıl hesaplayabilirim?',
                    a: 'Hesaplama aracımızda "Türkiye dışında mı doğdunuz?" seçeneğini işaretleyerek doğum yerinizin enlem ve boylam koordinatlarını manuel olarak girebilirsiniz. Bu koordinatları Google Maps üzerinden veya doğum yerinizin coğrafi bilgilerini sorgulayarak öğrenebilirsiniz. Doğru koordinatları girmek, hesaplamanın doğruluğu açısından son derece önemlidir.'
                  },
                  {
                    q: 'İki burç arasında yükselen olabilir miyim?',
                    a: 'Astrolojide kesin olarak iki yükselen burç arasında olmak mümkün değildir. Ancak doğum saatiniz tam olarak bir burcun bitip diğerinin başladığı geçiş anına denk geliyorsa, her iki burcun özelliklerini de taşıyabilirsiniz. Bu durumda "burç sınırında" olduğunuz söylenir ve doğum saatinizdeki birkaç dakikalık bir belirsizlik farklı yükselen burç sonucu verebilir. Bu yüzden doğum saatinizin dakika bazında kesin olması çok önemlidir.'
                  },
                  {
                    q: 'Yükselen burç zaman içinde değişir mi?',
                    a: 'Hayır, yükselen burcunuz doğumunuzdan itibaren sabittir ve yaşamınız boyunca değişmez. Yükselen burç, doğduğunuz andaki astronomik duruma göre belirlenir ve bu bir kez oluştuğunda artık değişmez. Ancak ilerleyen dönemlerde transit (geçiş) hareketleri ve progresyonlar nedeniyle yükselen burcunuzun özellikleri farklı şekillerde deneyimlenebilir.'
                  }
                ].map((faq, index) => (
                  <details key={index} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden group">
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between">
                      <span>{faq.q}</span>
                      <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 py-4 bg-white dark:bg-gray-800">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Astrolojik Yolculuğunuz Burada Başlıyor
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Yükselen burcunuzu öğrenerek kendinizi daha iyi tanıyın ve yaşam yolculuğunuzda bilinçli adımlar atın. Ücretsiz hesaplama aracımızla hemen şimdi keşfedin!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Hemen Hesapla
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}