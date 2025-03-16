import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

interface LoginPageProps {
  currentLanguage: 'en' | 'hi';
  onToggleLanguage: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ currentLanguage, onToggleLanguage }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const isHindi = currentLanguage === 'hi';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!userId || !password) {
      setError(isHindi ? 'कृपया अपना यूजर आईडी और पासवर्ड दर्ज करें' : 'Please enter your user ID and password');
      return;
    }
    
    // In a real app, authenticate with backend
    // For demo, allow any login
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Language Toggle at Top Right */}
      <div className="absolute top-4 right-4">
        <LanguageToggle currentLanguage={currentLanguage} onToggle={onToggleLanguage} />
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <LogIn className="text-purple-700" size={36} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isHindi ? 'फार्मा सेल्स' : 'Pharma Sales'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isHindi ? 'सेल्स ऑफिसर ऐप' : 'Sales Officer App'}
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isHindi ? 'यूजर आईडी' : 'User ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="input-field pl-10"
                  placeholder={isHindi ? 'अपना यूजर आईडी दर्ज करें' : 'Enter your user ID'}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                {isHindi ? 'पासवर्ड' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder={isHindi ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
                />
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700">
                {isHindi ? 'मुझे याद रखें' : 'Remember me'}
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-lg py-3"
            >
              {isHindi ? 'लॉगिन करें' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-600">
        &copy; 2025 Pharma Distribution Co.
      </footer>
    </div>
  );
};

export default LoginPage;