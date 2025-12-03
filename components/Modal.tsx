import React from 'react';
import { Person } from '../types';
import { X, Linkedin, ExternalLink } from 'lucide-react';
import { VOTING_URL } from '../constants';

interface Props {
  person: Person | null;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ person, onClose }) => {
  if (!person) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const safeLink = person.linkedin.startsWith('http') ? person.linkedin : `https://${person.linkedin}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-[#1a0b2e] border border-cyber-accent/30 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white bg-black/20 rounded-full backdrop-blur-md transition-colors"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="p-8 pt-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{person.name}</h2>
              <p className="text-xl text-cyber-accent">{person.company}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <span>{person.country}</span>
                <span>•</span>
                <span>{person.role || 'Líder en IA'}</span>
              </div>
            </div>
            {/* Simple colored avatar if no image */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyber-accent to-blue-600 flex items-center justify-center text-xl font-bold shrink-0">
               {person.name.charAt(0)}
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none mb-8">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">Bio / Impacto</h3>
            <p className="text-gray-300 leading-relaxed">
              {person.shortBio || 'Reconocido por su contribución al ecosistema de Inteligencia Artificial en Latinoamérica.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={safeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
            >
              <Linkedin size={20} />
              <span>Ver LinkedIn</span>
            </a>
            <a 
              href={VOTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] flex items-center justify-center gap-2 px-6 py-3 bg-cyber-accent hover:bg-violet-600 rounded-lg text-white font-semibold shadow-lg shadow-violet-900/50 transition-all hover:scale-[1.02]"
              onClick={() => {
                if ((window as any).dataLayer) {
                  (window as any).dataLayer.push({ event: 'go_to_vote', label: 'modal_cta' });
                }
              }}
            >
              <ExternalLink size={20} />
              <span>Ir a Votar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;