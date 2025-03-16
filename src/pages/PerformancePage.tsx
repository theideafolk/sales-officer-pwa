import React from 'react';
import { ArrowUpRight, Store, ShoppingBag, BarChart2, TrendingUp } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { dailyTarget, performance, visits, orders } from '../data/dummy';

interface PerformancePageProps {
  currentLanguage: 'en' | 'hi';
}

const PerformancePage: React.FC<PerformancePageProps> = ({ currentLanguage }) => {
  const isHindi = currentLanguage === 'hi';

  // Get today's visits and orders
  const today = new Date().toISOString().split('T')[0];
  
  const todayVisits = visits.filter(visit => 
    visit.startTime.startsWith(today)
  );
  
  const todayOrders = orders.filter(order => 
    order.date.startsWith(today)
  );
  
  const todayOrdersAmount = todayOrders.reduce((sum, order) => sum + order.total, 0);
  
  return (
    <div className="pb-20 pt-2 px-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        {isHindi ? 'मेरा प्रदर्शन' : 'My Performance'}
      </h1>
      
      {/* Daily Performance Overview */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">
            {isHindi ? 'आज का प्रदर्शन' : 'Today\'s Performance'}
          </h2>
          <span className="text-sm bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
            {dailyTarget.percentage}%
          </span>
        </div>
        
        <ProgressBar percentage={dailyTarget.percentage} status={dailyTarget.status} />
        
        <div className="flex justify-between mt-3 text-sm">
          <span className="text-gray-600">
            {isHindi ? 'वर्तमान बिक्री' : 'Current Sales'}: ₹{dailyTarget.currentAmount.toLocaleString()}
          </span>
          <span className="font-medium">
            {isHindi ? 'लक्ष्य' : 'Target'}: ₹{dailyTarget.targetAmount.toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Visits Stats */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-gray-600 text-sm">
                {isHindi ? 'आज के दौरे' : 'Today\'s Visits'}
              </h3>
              <p className="text-2xl font-bold">{todayVisits.length}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <Store size={20} className="text-purple-700" />
            </div>
          </div>
          
          <div className="flex items-center text-xs">
            <span className="text-gray-600">
              {isHindi ? 'लक्ष्य' : 'Target'}: {performance.shops.target}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className={performance.shops.percentage >= 100 ? "text-emerald-600" : "text-amber-600"}>
              {performance.shops.percentage}%
              <ArrowUpRight size={12} className="inline ml-1" />
            </span>
          </div>
        </div>
        
        {/* Orders Stats */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-gray-600 text-sm">
                {isHindi ? 'आज के ऑर्डर' : 'Today\'s Orders'}
              </h3>
              <p className="text-2xl font-bold">{todayOrders.length}</p>
            </div>
            <div className="bg-amber-100 p-2 rounded-full">
              <ShoppingBag size={20} className="text-amber-700" />
            </div>
          </div>
          
          <div className="flex items-center text-xs">
            <span className="text-gray-600">
              {isHindi ? 'लक्ष्य' : 'Target'}: {Math.round(performance.shops.target * 0.8)}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className={todayOrders.length / (performance.shops.target * 0.8) >= 0.8 ? "text-emerald-600" : "text-amber-600"}>
              {Math.round(todayOrders.length / (performance.shops.target * 0.8) * 100)}%
              <ArrowUpRight size={12} className="inline ml-1" />
            </span>
          </div>
        </div>
      </div>
      
      {/* Sales Amount */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-gray-600 text-sm">
              {isHindi ? 'आज की बिक्री राशि' : 'Today\'s Sales Amount'}
            </h3>
            <p className="text-2xl font-bold">₹{todayOrdersAmount.toLocaleString()}</p>
          </div>
          <div className="bg-emerald-100 p-2 rounded-full">
            <BarChart2 size={20} className="text-emerald-700" />
          </div>
        </div>
        
        <div className="flex items-center text-xs">
          <span className="text-gray-600">
            {isHindi ? 'लक्ष्य' : 'Target'}: ₹{performance.orders.target.toLocaleString()}
          </span>
          <span className="mx-2 text-gray-300">|</span>
          <span className={todayOrdersAmount / performance.orders.target >= 0.8 ? "text-emerald-600" : "text-amber-600"}>
            {Math.round(todayOrdersAmount / performance.orders.target * 100)}%
            <ArrowUpRight size={12} className="inline ml-1" />
          </span>
        </div>
        
        <div className="mt-3">
          <ProgressBar 
            percentage={Math.min(Math.round(todayOrdersAmount / performance.orders.target * 100), 100)} 
            status={todayOrdersAmount / performance.orders.target >= 0.9 ? 'success' : todayOrdersAmount / performance.orders.target >= 0.6 ? 'warning' : 'danger'} 
          />
        </div>
      </div>
      
      {/* Monthly Overview */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="font-semibold mb-4">
          {isHindi ? 'मासिक अवलोकन' : 'Monthly Overview'}
        </h2>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-600 text-sm">
              {isHindi ? 'कुल बिक्री' : 'Total Sales'}
            </h3>
            <p className="text-xl font-bold">₹{(performance.orders.amount).toLocaleString()}</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <TrendingUp size={20} className="text-blue-700" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">
                {isHindi ? 'दुकानों पर दौरा किया' : 'Shops Visited'}
              </span>
              <span>
                {performance.shops.visited}/{performance.shops.target} ({performance.shops.percentage}%)
              </span>
            </div>
            <ProgressBar percentage={performance.shops.percentage} status={performance.shops.percentage >= 90 ? 'success' : performance.shops.percentage >= 60 ? 'warning' : 'danger'} />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">
                {isHindi ? 'ऑर्डर की संख्या' : 'Number of Orders'}
              </span>
              <span>
                {performance.orders.count} ({Math.round(performance.orders.count / performance.shops.visited * 100)}% {isHindi ? 'रूपांतरण' : 'conversion'})
              </span>
            </div>
            <ProgressBar percentage={Math.round(performance.orders.count / performance.shops.visited * 100)} status="success" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">
                {isHindi ? 'बिक्री लक्ष्य' : 'Sales Target'}
              </span>
              <span>
                {performance.orders.percentage}%
              </span>
            </div>
            <ProgressBar percentage={performance.orders.percentage} status={performance.orders.percentage >= 90 ? 'success' : performance.orders.percentage >= 60 ? 'warning' : 'danger'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;