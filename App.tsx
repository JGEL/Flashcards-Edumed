
import React, { useState, useEffect } from 'react';
import type { FlashcardData } from './types';
import { INITIAL_CARDS } from './constants';
import Flashcard from './components/Flashcard';

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const ShuffleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);


const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [cards, setCards] = useState<FlashcardData[]>(() => shuffleArray(INITIAL_CARDS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, cards.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleShuffle = () => {
    setCards(shuffleArray(cards));
    setCurrentIndex(0);
  };
  
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= cards.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 z-20">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                aria-label="Cambiar tema"
            >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-300/[0.2] dark:bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        
        <div className="flex justify-center mb-6 z-10">
            <img 
                src="https://sedem.org/wp-content/uploads/2025/07/sedem2-trasparente.png" 
                alt="SEDEM - Sociedad Española de Educación Médica y de las Ciencias de la Salud" 
                className="h-16 sm:h-20 object-contain"
            />
        </div>
        <header className="text-center z-10 mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                Flashcards de Educación Médica
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Estudia conceptos de educación médica de forma interactiva.</p>
        </header>

        {cards.length > 0 ? (
            <main className="w-full flex flex-col items-center gap-8 z-10">
                <Flashcard card={cards[currentIndex]} />
                
                <div className="flex items-center justify-between w-full max-w-2xl">
                    <button
                        onClick={handlePrev}
                        disabled={isPrevDisabled}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-all duration-300 ease-in-out enabled:hover:bg-slate-300 dark:enabled:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Tarjeta anterior"
                    >
                        <ChevronLeftIcon /> Anterior
                    </button>

                    <p className="text-slate-500 dark:text-slate-400 font-mono text-lg" aria-live="polite">
                        {currentIndex + 1} / {cards.length}
                    </p>

                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-all duration-300 ease-in-out enabled:hover:bg-slate-300 dark:enabled:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Siguiente tarjeta"
                    >
                        Siguiente <ChevronRightIcon />
                    </button>
                </div>
            </main>
        ) : (
            <div className="text-center text-slate-500 dark:text-slate-400 z-10">
                <p>No hay tarjetas en el mazo.</p>
            </div>
        )}
        
        <div className="mt-12 z-10 flex flex-wrap justify-center gap-4">
             <button
                onClick={handleShuffle}
                disabled={cards.length < 2}
                className="flex items-center justify-center px-6 py-3 rounded-full bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20 hover:bg-purple-500 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                aria-label="Barajar las tarjetas"
            >
                <ShuffleIcon />
                Barajar
            </button>
        </div>

        <footer className="w-full max-w-4xl text-center text-xs text-slate-600 dark:text-slate-500 mt-8 z-10 px-4">
            <p className="font-semibold mb-1">Fuente de las definiciones:</p>
            <cite className="break-words not-italic">
                La mayoría de los conceptos y definiciones se han tomado de Wojtczak, Andrzej. Glosario de términos de educación médica. Educ. méd., v. 6, supl. 2, p. 21-56, sept. 2003. Disponible en: <a href="http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S1575-18132003000400004&lng=es&nrm=iso" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">SciELO</a>. Accedido en 09 jul. 2025.
            </cite>
        </footer>
    </div>
  );
}

export default App;