import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, MapPin } from 'lucide-react';

interface AddShopPageProps {
  currentLanguage: 'en' | 'hi';
}

const AddShopPage: React.FC<AddShopPageProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const isHindi = currentLanguage === 'hi';

  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<{latitude: number | null, longitude: number | null}>({
    latitude: null,
    longitude: null
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState('');

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      setError(isHindi ? 'जियोलोकेशन आपके ब्राउज़र द्वारा समर्थित नहीं है' : 'Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setIsGettingLocation(false);
      },
      () => {
        setError(isHindi ? 'स्थान प्राप्त करने में असमर्थ' : 'Unable to retrieve your location');
        setIsGettingLocation(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopName) {
      setError(isHindi ? 'कृपया दुकान का नाम दर्ज करें' : 'Please enter shop name');
      return;
    }
    
    if (!location.latitude || !location.longitude) {
      setError(isHindi ? 'कृपया स्थान प्राप्त करें' : 'Please get the location');
      return;
    }
    
    // In a real app, save the shop details to the database
    
    // Redirect to shop list
    navigate('/shops');
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-purple-700 text-white p-4 flex items-center">
        <button 
          onClick={() => navigate('/shops')}
          className="mr-2"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">
          {isHindi ? 'नई दुकान जोड़ें' : 'Add New Shop'}
        </h1>
      </div>
      
      <div className="p-4">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                {isHindi ? 'दुकान का नाम' : 'Shop Name'} *
              </label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="input-field"
                placeholder={isHindi ? 'दुकान का नाम दर्ज करें' : 'Enter shop name'}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                {isHindi ? 'मालिक का नाम' : 'Owner Name'} <span className="text-gray-500 text-sm font-normal">{isHindi ? '(वैकल्पिक)' : '(Optional)'}</span>
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="input-field"
                placeholder={isHindi ? 'मालिक का नाम दर्ज करें' : 'Enter owner name'}
              />
            </div>
            
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                {isHindi ? 'फ़ोन नंबर' : 'Phone Number'} <span className="text-gray-500 text-sm font-normal">{isHindi ? '(वैकल्पिक)' : '(Optional)'}</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                placeholder={isHindi ? 'फ़ोन नंबर दर्ज करें' : 'Enter phone number'}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium text-gray-700 mb-3">
              {isHindi ? 'स्थान' : 'Location'} *
            </h2>
            
            {location.latitude && location.longitude ? (
              <div className="mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-2">
                  <div className="flex items-center mb-2 text-gray-700">
                    <MapPin size={16} className="mr-2" />
                    <span className="font-medium">{isHindi ? 'वर्तमान स्थान' : 'Current Location'}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>
                      {isHindi ? 'अक्षांश' : 'Latitude'}: {location.latitude.toFixed(6)}
                    </div>
                    <div>
                      {isHindi ? 'देशांतर' : 'Longitude'}: {location.longitude.toFixed(6)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="text-purple-700 text-sm font-medium"
                >
                  {isHindi ? 'स्थान अपडेट करें' : 'Update Location'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={getCurrentLocation}
                className={`btn ${isGettingLocation ? 'bg-gray-400' : 'btn-secondary'} w-full mb-3`}
                disabled={isGettingLocation}
              >
                <MapPin size={18} />
                {isGettingLocation 
                  ? (isHindi ? 'स्थान प्राप्त कर रहा है...' : 'Getting location...')
                  : (isHindi ? 'वर्तमान स्थान प्राप्त करें' : 'Get Current Location')}
              </button>
            )}
            
            <div className="text-xs text-gray-500">
              {isHindi 
                ? 'दुकान की सटीक स्थिति प्राप्त करने के लिए दुकान के अंदर खड़े होकर अपना स्थान प्राप्त करें।'
                : 'Stand inside the shop when getting your location for accurate shop positioning.'}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="font-medium text-gray-700 mb-3">
              {isHindi ? 'दुकान की तस्वीर' : 'Shop Photo'} <span className="text-gray-500 text-sm font-normal">{isHindi ? '(वैकल्पिक)' : '(Optional)'}</span>
            </h2>
            
            <button
              type="button"
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col items-center justify-center text-gray-500"
            >
              <Camera size={32} className="mb-2" />
              <span>{isHindi ? 'तस्वीर लेने के लिए टैप करें' : 'Tap to take photo'}</span>
            </button>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg"
          >
            {isHindi ? 'दुकान सहेजें' : 'Save Shop'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShopPage;