
import React, { useState, useEffect } from 'react';
import type { FlashcardData } from '../types';

interface FlashcardProps {
  card: FlashcardData;
}

const FlipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <div className="w-full max-w-2xl h-96 [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
      <div 
        className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-cyan-900/10 dark:shadow-cyan-500/10 flex flex-col justify-center items-center p-8 cursor-pointer">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-600 dark:text-cyan-400">{card.concept}</h2>
          <div className="absolute bottom-4 right-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <FlipIcon />
            <span>Haz clic para voltear</span>
          </div>
        </div>
        
        {/* Back of the card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-purple-900/10 dark:shadow-purple-500/10 flex flex-col justify-center items-center p-8 cursor-pointer">
          <div className="overflow-y-auto h-full w-full scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
            <p className="text-lg text-slate-700 dark:text-slate-300 text-left">{card.definition}</p>
          </div>
           <div className="absolute bottom-4 right-4 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <FlipIcon />
            <span>Haz clic para voltear</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
