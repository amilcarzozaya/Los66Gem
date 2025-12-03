import React from 'react';
import { Person } from '../types';
import { Linkedin, Globe } from 'lucide-react';

interface Props {
  person: Person;
  onClick: (person: Person) => void;
}

// Generate a deterministic color based on name for the placeholder
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const PersonCard: React.FC<Props> = ({ person, onClick }) => {
  const bgColor = stringToColor(person.name);
  
  // Normalize LinkedIn URL to ensure it has protocol
  const getSafeLink = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://${url}`;
  };

  return (
    <div 
      className="group relative bg-cyber-light/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-cyber-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] cursor-pointer"
      onClick={() => onClick(person)}
    >
      <div className="aspect-square w-full relative overflow-hidden bg-gray-800">
        {person.image ? (
          <img 
            src={person.image} 
            alt={person.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/90"
            style={{ 
              background: `linear-gradient(135deg, ${bgColor}40 0%, ${bgColor} 100%)` 
            }}
          >
            {getInitials(person.name)}
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
            Ver Perfil
          </span>
        </div>

        {/* Country Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white border border-white/10">
          {person.country}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-cyber-text truncate">{person.name}</h3>
        <p className="text-sm text-cyber-glow/80 mb-2 truncate">{person.company}</p>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <span className="text-xs text-gray-400">Lightspeed #66</span>
          <a 
            href={getSafeLink(person.linkedin)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyber-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`LinkedIn de ${person.name}`}
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
