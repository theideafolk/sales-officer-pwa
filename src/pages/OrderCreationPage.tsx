import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Plus, Minus, Check, X, Info } from 'lucide-react';
import { shops, products, schemes } from '../data/dummy';
import { OrderItem, Product } from '../types';

interface OrderCreationPageProps {
  currentLanguage: 'en' | 'hi';
}

const OrderCreationPage: React.FC<OrderCreationPageProps> = ({ currentLanguage }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isHindi = currentLanguage === 'hi';
  
  const shop = shops.find(s => s.id === id);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Calculate order summary
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = orderItems.reduce((sum, item) => sum + item.discount, 0);
  const total = subtotal - totalDiscount;
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === null || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle quantity change
  const updateQuantity = (productId: string, newQuantity: number) => {
    // Don't allow negative quantities
    if (newQuantity < 0) return;
    
    // If the product is already in the order, update the quantity
    const existingItem = orderItems.find(item => item.productId === productId);
    
    if (existingItem) {
      if (newQuantity === 0) {
        // Remove the item if quantity is 0
        setOrderItems(orderItems.filter(item => item.productId !== productId));
      } else {
        // Update the quantity
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        // Calculate discount based on applicable schemes
        const appliedScheme = getApplicableScheme(product, newQuantity);
        const discountPercentage = appliedScheme ? appliedScheme.discountPercentage : 0;
        const discount = (product.price * newQuantity) * (discountPercentage / 100);
        
        setOrderItems(orderItems.map(item => 
          item.productId === productId 
            ? { 
                ...item, 
                quantity: newQuantity,
                discount,
                total: (product.price * newQuantity) - discount,
                appliedScheme: appliedScheme ? appliedScheme.id : undefined
              }
            : item
        ));
      }
    } else if (newQuantity > 0) {
      // Add a new item
      const product = products.find(p => p.id === productId);
      if (!product) return;
      
      // Calculate discount based on applicable schemes
      const appliedScheme = getApplicableScheme(product, newQuantity);
      const discountPercentage = appliedScheme ? appliedScheme.discountPercentage : 0;
      const discount = (product.price * newQuantity) * (discountPercentage / 100);
      
      setOrderItems([
        ...orderItems,
        {
          productId,
          quantity: newQuantity,
          price: product.price,
          discount,
          total: (product.price * newQuantity) - discount,
          appliedScheme: appliedScheme ? appliedScheme.id : undefined
        }
      ]);
    }
  };
  
  // Get the quantity of a product in the order
  const getQuantity = (productId: string) => {
    const item = orderItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };
  
  // Get applicable scheme for a product and quantity
  const getApplicableScheme = (product: Product, quantity: number) => {
    // Find schemes that apply to this product and where quantity meets minimum requirements
    const applicableSchemes = schemes.filter(scheme => 
      scheme.applicableProducts.includes(product.id) && 
      quantity >= scheme.minQuantity &&
      new Date() >= new Date(scheme.startDate) &&
      new Date() <= new Date(scheme.endDate)
    );
    
    // If multiple schemes apply, choose the one with the highest discount
    if (applicableSchemes.length > 0) {
      return applicableSchemes.reduce((best, current) => 
        current.discountPercentage > best.discountPercentage ? current : best
      );
    }
    
    return null;
  };
  
  // Check if a product has an applicable scheme
  const hasApplicableScheme = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return false;
    
    return schemes.some(scheme => 
      scheme.applicableProducts.includes(product.id) &&
      new Date() >= new Date(scheme.startDate) &&
      new Date() <= new Date(scheme.endDate)
    );
  };
  
  // Handle order submission
  const submitOrder = () => {
    if (orderItems.length === 0) {
      // Show error or alert that order is empty
      return;
    }
    
    // In a real app, save the order to the database
    
    // Navigate to order confirmation
    navigate('/orders');
  };
  
  // Unique product categories from the products
  const categories = [...new Set(products.map(product => product.category))];
  
  // Get product by ID
  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };
  
  // Create a list of products with their quantities in the cart
  const cartProducts = orderItems.map(item => ({
    ...getProduct(item.productId)!,
    quantity: item.quantity,
    discount: item.discount,
    total: item.total,
    appliedScheme: item.appliedScheme
  }));
  
  if (!shop) {
    return (
      <div className="p-4 text-center">
        <Info className="mx-auto mb-2 text-amber-500" size={32} />
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
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-purple-700 text-white p-4">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => navigate(`/shops/${id}`)}
            className="mr-2"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">{isHindi ? 'नया ऑर्डर' : 'New Order'}</h1>
        </div>
        <div className="text-white/80">
          {shop.name}
        </div>
      </div>
      
      {/* Order Summary - Sticky at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">
            {isHindi ? 'उत्पाद' : 'Products'}: {orderItems.length}
          </span>
          <span className="font-medium">
            {isHindi ? 'कुल' : 'Total'}: ₹{total.toFixed(2)}
          </span>
        </div>
        
        {totalDiscount > 0 && (
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-600">
              {isHindi ? 'छूट' : 'Discount'}:
            </span>
            <span className="text-emerald-600">
              - ₹{totalDiscount.toFixed(2)}
            </span>
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={() => setOrderItems([])}
            className="btn btn-danger flex-1"
            disabled={orderItems.length === 0}
          >
            <X size={18} />
            <span>{isHindi ? 'साफ़ करें' : 'Clear'}</span>
          </button>
          <button
            onClick={submitOrder}
            className="btn btn-success flex-1"
            disabled={orderItems.length === 0}
          >
            <Check size={18} />
            <span>{isHindi ? 'ऑर्डर भेजें' : 'Place Order'}</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4 pt-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder={isHindi ? 'उत्पाद खोजें...' : 'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Order Items (Cart) */}
        {orderItems.length > 0 && (
          <div className="mb-6">
            <h2 className="font-medium text-gray-700 mb-2">
              {isHindi ? 'ऑर्डर आइटम' : 'Order Items'}
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
              {cartProducts.map(product => (
                <div key={product.id} className="flex items-center">
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-sm">
                        <span className="font-medium">₹{product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <span className="text-emerald-600 ml-2">
                            -{(product.discount / (product.price * product.quantity) * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium">
                        ₹{product.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center ml-4">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 w-8 text-center font-medium">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Category Filter (Horizontal Scroll) */}
        <div className="mb-4 overflow-x-auto whitespace-nowrap pb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`mr-2 px-3 py-1.5 rounded-full text-sm font-medium ${
              activeCategory === null 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {isHindi ? 'सभी' : 'All'}
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`mr-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeCategory === category 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 mb-24">
          {filteredProducts.map(product => {
            const quantity = getQuantity(product.id);
            const hasScheme = hasApplicableScheme(product.id);
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-32">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                  />
                  {hasScheme && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {isHindi ? 'ऑफर' : 'Offer'}
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10">
                    {product.name}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">₹{product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{product.code}</span>
                  </div>
                  
                  {quantity === 0 ? (
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="btn btn-primary w-full py-1.5 text-sm"
                    >
                      <Plus size={16} />
                      <span>{isHindi ? 'जोड़ें' : 'Add'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-2 text-center py-8 text-gray-500">
              {isHindi ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCreationPage;