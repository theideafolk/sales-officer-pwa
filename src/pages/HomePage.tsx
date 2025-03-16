import React from 'react';
import { Calendar, Store, ShoppingBag, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { dailyTarget } from '../data/dummy';

interface HomePageProps {
  currentLanguage: 'en' | 'hi';
}

const HomePage: React.FC<HomePageProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const isHindi = currentLanguage === 'hi';
  
  // Main action buttons
  const actions = [
    { 
      icon: <Calendar size={28} />, 
      title: isHindi ? 'दिन शुरू करें' : 'Start Day', 
      onClick: () => console.log('Start day clicked'),
      color: 'bg-green-600'
    },
    { 
      icon: <Store size={28} />, 
      title: isHindi ? 'दुकान पर जाएं' : 'Visit Shop', 
      onClick: () => navigate('/shops'),
      color: 'bg-purple-700'
    },
    { 
      icon: <ShoppingBag size={28} />, 
      title: isHindi ? 'ऑर्डर देखें' : 'View Orders', 
      onClick: () => navigate('/orders'),
      color: 'bg-amber-500'
    },
    { 
      icon: <BarChart2 size={28} />, 
      title: isHindi ? 'मेरी बिक्री' : 'My Sales', 
      onClick: () => navigate('/performance'),
      color: 'bg-blue-600'
    }
  ];
  
  return (
    <div className="pb-20 pt-4 px-4">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          {isHindi 
            ? 'शुभ प्रभात, राहुल!' 
            : 'Good Morning, Rahul!'}
        </h1>
        <p className="text-gray-600">
          {isHindi 
            ? 'आज का दिन उत्पादक बनाने के लिए तैयार रहें।' 
            : 'Get ready for a productive day.'}
        </p>
      </div>
      
      {/* Daily Target Card */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">
            {isHindi ? 'दैनिक लक्ष्य' : 'Daily Target'}
          </h2>
          <span className="text-sm bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
            {dailyTarget.percentage}%
          </span>
        </div>
        
        <ProgressBar percentage={dailyTarget.percentage} status={dailyTarget.status} />
        
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-600">
            {isHindi ? 'बिक्री' : 'Sales'}: ₹{dailyTarget.currentAmount.toLocaleString()}
          </span>
          <span className="font-medium">
            {isHindi ? 'लक्ष्य' : 'Target'}: ₹{dailyTarget.targetAmount.toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.color} text-white rounded-lg p-4 flex flex-col items-center justify-center h-32 shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="mb-2 bg-white/20 p-2 rounded-full">
              {action.icon}
            </div>
            <span className="text-center font-medium">{action.title}</span>
          </button>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="font-semibold mb-3">
          {isHindi ? 'हाल की गतिविधि' : 'Recent Activity'}
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full mr-3">
              <Store size={20} />
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {isHindi ? 'अगरवाल मेडिकल स्टोर पर दौरा किया' : 'Visited Agarwal Medical Store'}
              </h3>
              <p className="text-xs text-gray-500">
                {isHindi ? 'आज, 09:45 AM' : 'Today, 09:45 AM'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-100 text-green-700 p-2 rounded-full mr-3">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="font-medium text-sm">
                {isHindi ? 'नया ऑर्डर बनाया - ₹3,865' : 'New Order Created - ₹3,865'}
              </h3>
              <p className="text-xs text-gray-500">
                {isHindi ? 'आज, 10:15 AM' : 'Today, 10:15 AM'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;