import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { currentUser } from '../data/dummy';

interface HeaderProps {
  currentLanguage: 'en' | 'hi';
  onToggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onToggleLanguage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear authentication state
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-purple-700">
          {currentLanguage === 'en' ? 'Pharma Sales' : 'फार्मा सेल्स'}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle currentLanguage={currentLanguage} onToggle={onToggleLanguage} />
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={18} />
          <span>{currentUser.name}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;