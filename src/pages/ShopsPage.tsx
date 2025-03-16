import React, { useState } from 'react';
import { Search, Plus, MapPin, Phone, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shops } from '../data/dummy';

interface ShopsPageProps {
  currentLanguage: 'en' | 'hi';
}

const ShopsPage: React.FC<ShopsPageProps> = ({ currentLanguage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isHindi = currentLanguage === 'hi';

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get recent shops (last 5 visited)
  const recentShops = [...shops]
    .filter(shop => shop.lastVisit)
    .sort((a, b) => {
      if (a.lastVisit && b.lastVisit) {
        return new Date(b.lastVisit.date).getTime() - new Date(a.lastVisit.date).getTime();
      }
      return 0;
    })
    .slice(0, 5);

  return (
    <div className="pb-20 pt-2 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {isHindi ? 'दुकानें' : 'Shops'}
        </h1>
        <Link 
          to="/shops/new" 
          className="btn btn-primary py-2"
        >
          <Plus size={18} />
          <span>{isHindi ? 'नई दुकान' : 'New Shop'}</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="input-field pl-10"
          placeholder={isHindi ? 'दुकान का नाम खोजें...' : 'Search shop name...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Recent Shops Section */}
      {recentShops.length > 0 && searchTerm === '' && (
        <div className="mb-6">
          <h2 className="font-medium text-gray-700 mb-2">
            {isHindi ? 'हाल ही में देखी गई दुकानें' : 'Recently Visited Shops'}
          </h2>
          <div className="space-y-3">
            {recentShops.map(shop => (
              <Link
                key={shop.id}
                to={`/shops/${shop.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm p-3 flex items-center">
                  {shop.image ? (
                    <img 
                      src={shop.image} 
                      alt={shop.name} 
                      className="w-12 h-12 rounded-lg object-cover mr-3" 
                    />
                  ) : (
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Store size={24} className="text-purple-700" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{shop.name}</h3>
                    <p className="text-xs text-gray-500">
                      {isHindi ? 'आखिरी दौरा:' : 'Last Visit:'} {new Date(shop.lastVisit?.date || '').toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Shops List */}
      <div>
        <h2 className="font-medium text-gray-700 mb-2">
          {searchTerm 
            ? (isHindi ? 'खोज परिणाम' : 'Search Results') 
            : (isHindi ? 'सभी दुकानें' : 'All Shops')}
        </h2>

        {filteredShops.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-4 text-center text-gray-500">
            {isHindi ? 'कोई दुकान नहीं मिली' : 'No shops found'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredShops.map(shop => (
              <Link
                key={shop.id}
                to={`/shops/${shop.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center mb-2">
                    {shop.image ? (
                      <img 
                        src={shop.image} 
                        alt={shop.name} 
                        className="w-14 h-14 rounded-lg object-cover mr-3" 
                      />
                    ) : (
                      <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Store size={28} className="text-purple-700" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{shop.name}</h3>
                      {shop.address && (
                        <div className="flex items-center text-gray-500 text-xs mt-1">
                          <MapPin size={12} className="mr-1" />
                          {shop.address}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    {shop.owner && (
                      <div className="flex items-center text-gray-600">
                        <User size={14} className="mr-1" />
                        {shop.owner}
                      </div>
                    )}
                    {shop.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone size={14} className="mr-1" />
                        {shop.phone}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;