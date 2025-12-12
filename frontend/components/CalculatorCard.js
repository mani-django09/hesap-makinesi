import Link from 'next/link'

export default function CalculatorCard({ calculator }) {
  const categoryColors = {
    'Matematik': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'Finans': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'Sağlık': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    'Eğitim': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    'Genel': 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300',
    'Astroloji': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    'Dini': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  };

  const iconColors = {
    'Matematik': 'text-blue-600 dark:text-blue-400',
    'Finans': 'text-green-600 dark:text-green-400',
    'Sağlık': 'text-red-600 dark:text-red-400',
    'Eğitim': 'text-purple-600 dark:text-purple-400',
    'Genel': 'text-gray-600 dark:text-gray-400',
    'Astroloji': 'text-indigo-600 dark:text-indigo-400',
    'Dini': 'text-amber-600 dark:text-amber-400',
  };

  return (
    <Link href={`/${calculator.id}`}>
      <div className="calculator-card group cursor-pointer border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
        <div className={`w-16 h-16 mb-4 bg-gradient-to-br ${categoryColors[calculator.category]?.replace('text-', 'from-').replace('dark:text-', 'to-')} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shadow-md`}>
          <div 
            className={`w-10 h-10 ${iconColors[calculator.category]}`}
            dangerouslySetInnerHTML={{ __html: calculator.icon }}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {calculator.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
          {calculator.description}
        </p>
        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${categoryColors[calculator.category] || categoryColors['Genel']}`}>
          {calculator.category}
        </span>
      </div>
    </Link>
  )
}