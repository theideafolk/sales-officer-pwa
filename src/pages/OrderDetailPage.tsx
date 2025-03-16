import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, MapPin, Clock, Check } from 'lucide-react';
import { orders, products, shops } from '../data/dummy';

interface OrderDetailPageProps {
  currentLanguage: 'en' | 'hi';
}

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ currentLanguage }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isHindi = currentLanguage === 'hi';
  
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    return (
      <div className="p-4 text-center">
        <p>{isHindi ? 'ऑर्डर नहीं मिला' : 'Order not found'}</p>
        <button
          onClick={() => navigate('/orders')}
          className="btn btn-primary mt-4"
        >
          {isHindi ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>
    );
  }
  
  const shop = shops.find(s => s.id === order.shopId);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get product details
  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-purple-700 text-white p-4">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/orders')}
            className="mr-2"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">{isHindi ? 'ऑर्डर विवरण' : 'Order Details'}</h1>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag size={20} />
          <span className="font-medium">{order.id}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-white/90">
            {formatDate(order.date)}
          </div>
          <div className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            ₹{order.total.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Shop Info */}
      {shop && (
        <div className="p-4 border-b">
          <h2 className="font-medium mb-2">
            {isHindi ? 'दुकान की जानकारी' : 'Shop Information'}
          </h2>
          
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2">
              <MapPin size={20} className="text-purple-700" />
            </div>
            <div>
              <div className="font-medium">{shop.name}</div>
              {shop.address && <div className="text-sm text-gray-600">{shop.address}</div>}
            </div>
          </div>
        </div>
      )}
      
      {/* Order Items */}
      <div className="p-4 border-b">
        <h2 className="font-medium mb-3">
          {isHindi ? 'ऑर्डर आइटम' : 'Order Items'}
        </h2>
        
        <div className="space-y-4">
          {order.items.map((item, index) => {
            const product = getProduct(item.productId);
            
            if (!product) return null;
            
            return (
              <div key={index} className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.name}</h3>
                    <span className="font-medium">₹{item.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <div>
                      {item.quantity} x ₹{item.price.toFixed(2)}
                    </div>
                    
                    {item.discount > 0 && (
                      <div className="text-emerald-600">
                        - ₹{item.discount.toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  {item.appliedScheme && (
                    <div className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded inline-block mt-1">
                      {isHindi ? 'ऑफर लागू' : 'Offer Applied'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="p-4">
        <h2 className="font-medium mb-3">
          {isHindi ? 'ऑर्डर सारांश' : 'Order Summary'}
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>{isHindi ? 'उप-कुल' : 'Subtotal'}</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-emerald-600">
              <span>{isHindi ? 'छूट' : 'Discount'}</span>
              <span>- ₹{order.totalDiscount.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
              <span>{isHindi ? 'कुल' : 'Total'}</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Status */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 text-emerald-600">
          <div className="rounded-full bg-emerald-100 p-1">
            <Check size={16} />
          </div>
          <div className="text-sm font-medium">
            {isHindi ? 'ऑर्डर पूरा हो गया' : 'Order Completed'}
          </div>
          <div className="text-sm text-gray-500">
            <Clock size={14} className="inline mr-1" />
            {formatDate(order.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;