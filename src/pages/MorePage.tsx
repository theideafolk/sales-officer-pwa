import React from 'react';
import { User, HelpCircle, FileText, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '../data/dummy';

interface MorePageProps {
  currentLanguage: 'en' | 'hi';
}

const MorePage: React.FC<MorePageProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const isHindi = currentLanguage === 'hi';

  const menuItems = [
    {
      icon: <User size={20} />,
      title: isHindi ? 'प्रोफाइल' : 'Profile',
      onClick: () => console.log('Profile clicked')
    },
    {
      icon: <FileText size={20} />,
      title: isHindi ? 'रिपोर्ट्स' : 'Reports',
      onClick: () => console.log('Reports clicked')
    },
    {
      icon: <HelpCircle size={20} />,
      title: isHindi ? 'सहायता और समर्थन' : 'Help & Support',
      onClick: () => console.log('Help clicked')
    },
    {
      icon: <Settings size={20} />,
      title: isHindi ? 'सेटिंग्स' : 'Settings',
      onClick: () => console.log('Settings clicked')
    }
  ];

  const handleLogout = () => {
    // In a real app, clear authentication state
    navigate('/login');
  };

  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        {isHindi ? 'अधिक विकल्प' : 'More Options'}
      </h1>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center">
          <div className="bg-purple-100 rounded-full p-3 mr-4">
            <User size={28} className="text-purple-700" />
          </div>
          
          <div>
            <h2 className="font-medium">{currentUser.name}</h2>
            <p className="text-sm text-gray-600">
              {isHindi ? 'सेल्स ऑफिसर' : 'Sales Officer'} • ID: {currentUser.id}
            </p>
            <p className="text-sm text-gray-600">
              {isHindi ? 'क्षेत्र' : 'Territory'}: {currentUser.territory}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={item.onClick}
              className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="text-purple-700 mr-4">
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </button>
            {index < menuItems.length - 1 && <div className="border-b border-gray-100" />}
          </React.Fragment>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors"
      >
        <LogOut size={18} className="mr-2" />
        <span className="font-medium">
          {isHindi ? 'लॉगआउट' : 'Logout'}
        </span>
      </button>
      
      {/* App Version */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          {isHindi ? 'ऐप वर्शन' : 'App Version'}: 1.0.0
        </p>
        <p className="mt-1">
          &copy; 2025 Pharma Distribution Co.
        </p>
      </div>
    </div>
  );
};

export default MorePage;