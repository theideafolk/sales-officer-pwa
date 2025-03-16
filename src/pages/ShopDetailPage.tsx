import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, Clock, ChevronLeft, ShoppingBag, AlertCircle } from 'lucide-react';
import { shops, visits, orders } from '../data/dummy';

interface ShopDetailPageProps {
  currentLanguage: 'en' | 'hi';
}

const ShopDetailPage: React.FC<ShopDetailPageProps> = ({ currentLanguage }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isHindi = currentLanguage === 'hi';
  
  const shop = shops.find(s => s.id === id);
  
  // Get shop visits
  const shopVisits = visits.filter(visit => visit.shopId === id)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  
  // Get shop orders
  const shopOrders = orders.filter(order => order.shopId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<'info' | 'visits' | 'orders'>('info');
  
  if (!shop) {
    return (
      <div className="p-4 text-center">
        <AlertCircle className="mx-auto mb-2 text-amber-500" size={32} />
        <p>{isHindi ? 'दुकान नहीं मिली' : 'Shop not found'}</p>
        <button
          onClick={() => navigate('/shops')}
          className="btn btn-primary mt-4"
        >
          {isHindi ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>
    );
  }
  
  const startVisit = () => {
    // In a real app, this would:
    // 1. Save the visit start time
    // 2. Record the GPS location
    // 3. Navigate to order creation
    
    // For demo, just navigate to order creation
    navigate(`/shops/${id}/order`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-purple-700 text-white p-4">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/shops')}
            className="mr-2"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">{shop.name}</h1>
        </div>
        
        {shop.address && (
          <div className="flex items-center text-white/90 text-sm mb-2">
            <MapPin size={16} className="mr-2" />
            <span>{shop.address}</span>
          </div>
        )}
        
        {shop.owner && (
          <div className="flex items-center text-white/90 text-sm mb-2">
            <User size={16} className="mr-2" />
            <span>{shop.owner}</span>
          </div>
        )}
        
        {shop.phone && (
          <div className="flex items-center text-white/90 text-sm mb-2">
            <Phone size={16} className="mr-2" />
            <span>{shop.phone}</span>
          </div>
        )}
        
        <button 
          onClick={startVisit}
          className="btn btn-secondary w-full mt-4"
        >
          <ShoppingBag size={18} />
          <span>{isHindi ? 'दौरा शुरू करें और ऑर्डर बनाएँ' : 'Start Visit & Create Order'}</span>
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'info' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-600'}`}
          onClick={() => setActiveTab('info')}
        >
          {isHindi ? 'जानकारी' : 'Info'}
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'visits' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-600'}`}
          onClick={() => setActiveTab('visits')}
        >
          {isHindi ? 'दौरे' : 'Visits'}
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'orders' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-600'}`}
          onClick={() => setActiveTab('orders')}
        >
          {isHindi ? 'ऑर्डर' : 'Orders'}
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div>
            {shop.image && (
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-semibold mb-2">
                {isHindi ? 'दुकान की जानकारी' : 'Shop Information'}
              </h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isHindi ? 'शामिल किया गया' : 'Added On'}:
                  </span>
                  <span>{new Date(shop.addedOn).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isHindi ? 'द्वारा जोड़ा गया' : 'Added By'}:
                  </span>
                  <span>Sales Officer #{shop.addedBy}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isHindi ? 'आखिरी दौरा' : 'Last Visit'}:
                  </span>
                  <span>
                    {shop.lastVisit 
                      ? new Date(shop.lastVisit.date).toLocaleDateString() 
                      : (isHindi ? 'कोई दौरा नहीं' : 'No visits')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold mb-2">
                {isHindi ? 'स्थान' : 'Location'}
              </h2>
              
              <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center mb-2">
                <MapPin size={32} className="text-gray-500" />
              </div>
              
              <div className="text-xs text-gray-600">
                {isHindi ? 'अक्षांश' : 'Latitude'}: {shop.location.latitude}, 
                {isHindi ? 'देशांतर' : 'Longitude'}: {shop.location.longitude}
              </div>
            </div>
          </div>
        )}
        
        {/* Visits Tab */}
        {activeTab === 'visits' && (
          <div>
            <h2 className="font-semibold mb-3">
              {isHindi ? 'पिछले दौरे' : 'Past Visits'}
            </h2>
            
            {shopVisits.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-4 text-center text-gray-500">
                {isHindi ? 'कोई दौरा नहीं मिला' : 'No visits found'}
              </div>
            ) : (
              <div className="space-y-3">
                {shopVisits.map(visit => (
                  <div key={visit.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center mb-2">
                      <Clock size={18} className="text-purple-700 mr-2" />
                      <h3 className="font-medium">
                        {formatDate(visit.startTime)}
                      </h3>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isHindi ? 'अवधि' : 'Duration'}:
                        </span>
                        <span>
                          {visit.endTime
                            ? Math.round((new Date(visit.endTime).getTime() - new Date(visit.startTime).getTime()) / 60000) + ' min'
                            : (isHindi ? 'जारी है' : 'Ongoing')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {isHindi ? 'ऑर्डर' : 'Order'}:
                        </span>
                        <span className={visit.hasOrder ? 'text-green-600' : 'text-gray-500'}>
                          {visit.hasOrder 
                            ? (isHindi ? 'हाँ' : 'Yes') 
                            : (isHindi ? 'नहीं' : 'No')}
                        </span>
                      </div>
                      
                      {visit.hasOrder && visit.orderId && (
                        <button
                          onClick={() => navigate(`/orders/${visit.orderId}`)}
                          className="text-purple-700 text-xs font-medium"
                        >
                          {isHindi ? 'ऑर्डर विवरण देखें' : 'View Order Details'} →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="font-semibold mb-3">
              {isHindi ? 'पिछले ऑर्डर' : 'Past Orders'}
            </h2>
            
            {shopOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-4 text-center text-gray-500">
                {isHindi ? 'कोई ऑर्डर नहीं मिला' : 'No orders found'}
              </div>
            ) : (
              <div className="space-y-3">
                {shopOrders.map(order => (
                  <div 
                    key={order.id} 
                    className="bg-white rounded-lg shadow-sm p-4"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        {formatDate(order.date)}
                      </h3>
                      <span className="text-sm bg-emerald-100 text-emerald-800 py-1 px-2 rounded-full">
                        ₹{order.total.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {order.items.length} {isHindi ? 'उत्पाद' : 'products'}
                    </div>
                    
                    {order.totalDiscount > 0 && (
                      <div className="text-xs text-emerald-700 mb-2">
                        {isHindi ? 'बचत' : 'Savings'}: ₹{order.totalDiscount.toLocaleString()}
                      </div>
                    )}
                    
                    <button
                      className="text-purple-700 text-xs font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orders/${order.id}`);
                      }}
                    >
                      {isHindi ? 'ऑर्डर विवरण देखें' : 'View Order Details'} →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetailPage;