import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { people } from './data/people';
import { Person, FilterState } from './types';
import { VOTING_URL, PRIVACY_URL } from './constants';
import PersonCard from './components/PersonCard';
import Modal from './components/Modal';
import Countdown from './components/Countdown';
import StickyCTA from './components/StickyCTA';
import { Search, Filter, X, ChevronDown, Check, Menu } from 'lucide-react';

// Custom CountUp hook for the hero animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
};

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    countries: [],
    companies: [],
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derived data for filters
  const uniqueCountries = useMemo(() => Array.from(new Set(people.map(p => p.country))).sort(), []);
  const uniqueCompanies = useMemo(() => Array.from(new Set(people.map(p => p.company))).sort(), []);

  // Filtering logic
  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                            person.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCountry = filters.countries.length === 0 || filters.countries.includes(person.country);
      const matchesCompany = filters.companies.length === 0 || filters.companies.includes(person.company);
      
      return matchesSearch && matchesCountry && matchesCompany;
    });
  }, [filters]);

  const count66 = useCountUp(66);

  const toggleFilter = (type: 'countries' | 'companies', value: string) => {
    setFilters(prev => {
      const current = prev[type];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const handleTrackVote = (label: string) => {
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'go_to_vote', label });
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0f0520] text-gray-100 overflow-x-hidden selection:bg-cyber-accent selection:text-white">
        
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-[#0f0520]/80 backdrop-blur-lg border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex-shrink-0 font-bold text-xl tracking-tighter">
                LIGHTSPEED <span className="text-cyber-accent">AWARDS</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#about" className="hover:text-cyber-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Premios</a>
                  <a href="#directory" className="hover:text-cyber-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">Nominados</a>
                  <a href="#faq" className="hover:text-cyber-accent transition-colors px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
                  <a 
                    href={VOTING_URL} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackVote('nav_button')}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  >
                    Votar Ahora
                  </a>
                </div>
              </div>
              <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-300">
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#0f0520] border-b border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5">Premios</a>
                <a href="#directory" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5">Nominados</a>
                <a href={VOTING_URL} target="_blank" rel="noreferrer" className="block px-3 py-2 text-cyber-accent font-bold">Ir a Votar</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-accent/10 to-[#0f0520] z-0"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400">
                LOS {count66}
              </span>
              <span className="block text-4xl md:text-6xl mt-2 text-white">DE LA IA</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
              Lightspeed Awards 2025: Las personas que están definiendo el futuro de la Inteligencia Artificial en Latinoamérica.
            </p>
            
            <Countdown />
            
            <div className="mt-12 flex justify-center">
              <a
                href={VOTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleTrackVote('hero_cta')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyber-accent hover:bg-violet-600 text-white rounded-full text-lg font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                IR A VOTACIÓN
                <span className="block group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Votaciones abiertas hasta el 20 de diciembre.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">¿Qué son los Premios Lightspeed?</h2>
            <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
              <p className="text-lg text-gray-300 mb-6">
                Los Premios Lightspeed 2025 nacen para reconocer a las 66 personas que están transformando el panorama de la inteligencia artificial en Latinoamérica. Educadores, innovadores, emprendedores y visionarios que están acelerando la adopción y el entendimiento de la IA en nuestra región.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
                <div className="p-4 rounded-lg bg-black/20">
                  <h3 className="font-bold text-cyber-accent mb-2">Visibilidad</h3>
                  <p className="text-sm text-gray-400">Destacando el talento que a menudo opera detrás de escena en grandes avances tecnológicos.</p>
                </div>
                <div className="p-4 rounded-lg bg-black/20">
                  <h3 className="font-bold text-cyber-accent mb-2">Impacto Regional</h3>
                  <p className="text-sm text-gray-400">Celebrando soluciones y educación creadas por y para Latinoamérica.</p>
                </div>
                <div className="p-4 rounded-lg bg-black/20">
                  <h3 className="font-bold text-cyber-accent mb-2">Comunidad</h3>
                  <p className="text-sm text-gray-400">Fomentando conexiones entre los líderes que están moldeando el futuro.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory" className="py-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Los Nominados</h2>
                <p className="text-gray-400">Explora la lista y vota por tus favoritos.</p>
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-cyber-accent transition-colors"
                  placeholder="Buscar nombre o empresa..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="mb-10 flex flex-wrap gap-4">
              {/* Country Filter */}
              <div className="relative group z-30">
                <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-colors">
                  <Filter size={16} />
                  <span>País</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a0b2e] border border-white/10 rounded-lg shadow-xl hidden group-hover:block p-2 max-h-60 overflow-y-auto">
                  {uniqueCountries.map(country => (
                    <label key={country} className="flex items-center space-x-2 p-2 hover:bg-white/5 rounded cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={filters.countries.includes(country)}
                        onChange={() => toggleFilter('countries', country)}
                        className="rounded border-gray-600 bg-gray-800 text-cyber-accent focus:ring-cyber-accent"
                      />
                      <span className="text-sm text-gray-300 truncate">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.countries.length > 0 || filters.companies.length > 0) && (
                <button 
                  onClick={() => setFilters({ ...filters, countries: [], companies: [] })}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <X size={14} /> Limpiar filtros
                </button>
              )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPeople.map((person) => (
                <PersonCard 
                  key={person.id} 
                  person={person} 
                  onClick={setSelectedPerson} 
                />
              ))}
            </div>

            {filteredPeople.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No se encontraron resultados para tu búsqueda.</p>
                <button 
                  onClick={() => setFilters({ search: '', countries: [], companies: [] })}
                  className="mt-4 text-cyber-accent hover:underline"
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              {[
                { q: '¿Cómo puedo votar?', a: 'Haz clic en el botón "Ir a Votar" en cualquier parte de esta página o dentro de la tarjeta de un nominado. Serás redirigido a una plataforma segura de votación.' },
                { q: '¿Hasta cuándo puedo votar?', a: 'Las votaciones cierran el 20 de diciembre de 2024 a las 23:59.' },
                { q: '¿Cómo fueron seleccionados los nominados?', a: 'Los nominados fueron seleccionados basándose en su impacto, visibilidad y contribución al ecosistema de IA en la región durante el último año.' },
              ].map((faq, i) => (
                <div key={i} className="bg-black/20 rounded-lg p-6 border border-white/5">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Newsletter */}
        <section className="py-20">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Mantente Informado</h2>
            <p className="text-gray-400 mb-8">Suscríbete para recibir los resultados finales y noticias sobre el futuro de la IA en LATAM.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyber-accent text-white"
              />
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                <input type="checkbox" id="privacy" className="rounded bg-white/10 border-white/20" />
                <label htmlFor="privacy">Acepto la <a href={PRIVACY_URL} className="underline hover:text-gray-300">política de privacidad</a></label>
              </div>
              <button className="px-8 py-3 bg-white text-cyber-dark font-bold rounded-lg hover:bg-gray-200 transition-colors">
                Suscribirme
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              © 2025 Lightspeed Awards. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-sm">
              <a href={PRIVACY_URL} className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </footer>

        {/* Floating Elements */}
        <StickyCTA />
        <Modal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
        
      </div>
    </HashRouter>
  );
};

export default App;