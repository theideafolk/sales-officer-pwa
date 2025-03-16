import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowDown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { orders } from '../data/dummy';

interface OrdersPageProps {
  currentLanguage: 'en' | 'hi';
}

const OrdersPage: React.FC<OrdersPageProps> = ({ currentLanguage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc'); // 'desc' = newest first
  const isHindi = currentLanguage === 'hi';

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort orders based on date
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="pb-20 pt-2 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {isHindi ? 'ऑर्डर' : 'Orders'}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
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

      {/* Sort Control */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSortOrder}
          className="flex items-center text-sm text-gray-600 bg-white px-3 py-1.5 rounded-md shadow-sm"
        >
          <span className="mr-1">
            {sortOrder === 'desc' 
              ? (isHindi ? 'नवीनतम पहले' : 'Newest First') 
              : (isHindi ? 'पुराना पहले' : 'Oldest First')}
          </span>
          {sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
        </button>
      </div>

      {/* Orders List */}
      {sortedOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-4 text-center text-gray-500">
          {isHindi ? 'कोई ऑर्डर नहीं मिला' : 'No orders found'}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map(order => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="font-medium">{order.shopName}</h2>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  ₹{order.total.toLocaleString()}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-600">
                  <ShoppingBag size={16} className="mr-1" />
                  <span>{order.items.length} {isHindi ? 'उत्पाद' : 'Products'}</span>
                </div>
                
                {order.totalDiscount > 0 && (
                  <div className="text-emerald-600">
                    {isHindi ? 'बचत' : 'Savings'}: ₹{order.totalDiscount.toLocaleString()}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;