import React from 'react';
import { Home, Store, ShoppingBag, BarChart2, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface BottomNavProps {
  currentLanguage: 'en' | 'hi';
}

const BottomNav: React.FC<BottomNavProps> = ({ currentLanguage }) => {
  const isHindi = currentLanguage === 'hi';
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-around px-2 py-1">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-purple-700' : 'text-gray-500'}`
        }
        end
      >
        <Home size={20} />
        <span className="text-xs mt-1">{isHindi ? 'होम' : 'Home'}</span>
      </NavLink>
      
      <NavLink 
        to="/shops" 
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-purple-700' : 'text-gray-500'}`
        }
      >
        <Store size={20} />
        <span className="text-xs mt-1">{isHindi ? 'दुकानें' : 'Shops'}</span>
      </NavLink>

      <NavLink 
        to="/orders" 
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-purple-700' : 'text-gray-500'}`
        }
      >
        <ShoppingBag size={20} />
        <span className="text-xs mt-1">{isHindi ? 'ऑर्डर' : 'Orders'}</span>
      </NavLink>

      <NavLink 
        to="/performance" 
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-purple-700' : 'text-gray-500'}`
        }
      >
        <BarChart2 size={20} />
        <span className="text-xs mt-1">{isHindi ? 'प्रदर्शन' : 'Sales'}</span>
      </NavLink>

      <NavLink 
        to="/more" 
        className={({ isActive }) => 
          `flex flex-col items-center py-2 px-3 ${isActive ? 'text-purple-700' : 'text-gray-500'}`
        }
      >
        <Menu size={20} />
        <span className="text-xs mt-1">{isHindi ? 'अधिक' : 'More'}</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;