import React from 'react';
import { ExternalLink } from 'lucide-react';
import { VOTING_URL } from '../constants';

const StickyCTA: React.FC = () => {
  return (
    <a
      href={VOTING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 bg-cyber-accent text-white rounded-full font-bold shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all hover:-translate-y-1 group animate-float"
      onClick={() => {
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({ event: 'go_to_vote', label: 'sticky_cta' });
        }
      }}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <span>VOTA AHORA</span>
      <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
    </a>
  );
};

export default StickyCTA;