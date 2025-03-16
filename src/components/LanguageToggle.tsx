import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'hi';
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className="flex items-center justify-center gap-1 text-sm bg-white rounded-full py-1 px-3 shadow-sm border border-gray-200"
    >
      <Globe size={16} />
      <span>{currentLanguage === 'en' ? 'English' : 'हिंदी'}</span>
    </button>
  );
};

export default LanguageToggle;