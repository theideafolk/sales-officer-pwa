import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Components
import Header from './components/Header';
import BottomNav from './components/BottomNav';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ShopsPage from './pages/ShopsPage';
import ShopDetailPage from './pages/ShopDetailPage';
import AddShopPage from './pages/AddShopPage';
import OrderCreationPage from './pages/OrderCreationPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PerformancePage from './pages/PerformancePage';
import MorePage from './pages/MorePage';

function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const location = useLocation();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };
  
  // Check if current route is login
  const isLoginPage = location.pathname === '/login';
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {!isLoginPage && <Header currentLanguage={language} onToggleLanguage={toggleLanguage} />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage currentLanguage={language} onToggleLanguage={toggleLanguage} />} />
          <Route path="/" element={<HomePage currentLanguage={language} />} />
          <Route path="/shops" element={<ShopsPage currentLanguage={language} />} />
          <Route path="/shops/new" element={<AddShopPage currentLanguage={language} />} />
          <Route path="/shops/:id" element={<ShopDetailPage currentLanguage={language} />} />
          <Route path="/shops/:id/order" element={<OrderCreationPage currentLanguage={language} />} />
          <Route path="/orders" element={<OrdersPage currentLanguage={language} />} />
          <Route path="/orders/:id" element={<OrderDetailPage currentLanguage={language} />} />
          <Route path="/performance" element={<PerformancePage currentLanguage={language} />} />
          <Route path="/more" element={<MorePage currentLanguage={language} />} />
        </Routes>
      </main>
      
      {!isLoginPage && <BottomNav currentLanguage={language} />}
    </div>
  );
}

export default App;