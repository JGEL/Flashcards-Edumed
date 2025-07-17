
import React, { useState } from 'react';

interface AddCardFormProps {
  onAddCard: (concept: string, definition: string) => void;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


const AddCardForm: React.FC<AddCardFormProps> = ({ onAddCard, onClose }) => {
  const [concept, setConcept] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (concept.trim() && definition.trim()) {
      onAddCard(concept.trim(), definition.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-black/70 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 relative mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">Añadir Nueva Tarjeta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="concept" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Concepto</label>
            <input
              id="concept"
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej: Fibrilación Auricular"
              className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition text-slate-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="definition" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Definición</label>
            <textarea
              id="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Describe el concepto médico..."
              rows={6}
              className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition resize-none text-slate-900 dark:text-white"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 mt-4">
             <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-white font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-cyan-500"
            >
              Guardar Tarjeta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;
