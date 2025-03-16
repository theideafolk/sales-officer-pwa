import { User, Shop, Product, Scheme, Order, Visit, DailyTarget, Performance } from '../types';

// Current user
export const currentUser: User = {
  id: 'SO001',
  name: 'Rahul Sharma',
  role: 'sales_officer',
  territory: 'Mumbai North'
};

// Shops
export const shops: Shop[] = [
  {
    id: 'SH001',
    name: 'Agarwal Medical Store',
    owner: 'Vijay Agarwal',
    phone: '9876543210',
    address: 'Shop No. 4, Main Market, Andheri West',
    location: {
      latitude: 19.1368,
      longitude: 72.8493
    },
    lastVisit: {
      date: '2023-04-10T09:30:00',
      officerId: 'SO001',
      officerName: 'Rahul Sharma'
    },
    addedBy: 'SO001',
    addedOn: '2023-01-15T12:00:00',
    image: 'https://images.unsplash.com/photo-1612837017391-4b6b7b0f0b4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljYWwlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'SH002',
    name: 'City Pharmacy',
    owner: 'Rohit Gupta',
    phone: '9876543211',
    address: 'Near Railway Station, Borivali East',
    location: {
      latitude: 19.2307,
      longitude: 72.8567
    },
    lastVisit: {
      date: '2023-04-05T10:15:00',
      officerId: 'SO002',
      officerName: 'Amit Patel'
    },
    addedBy: 'SO002',
    addedOn: '2023-01-20T14:30:00',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'SH003',
    name: 'Health Plus Medical',
    owner: 'Sanjay Mehta',
    phone: '9876543212',
    address: 'Plot 23, Sector 4, Vashi',
    location: {
      latitude: 19.0765,
      longitude: 72.9982
    },
    lastVisit: {
      date: '2023-04-08T14:20:00',
      officerId: 'SO001',
      officerName: 'Rahul Sharma'
    },
    addedBy: 'SO001',
    addedOn: '2023-02-05T09:45:00',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'SH004',
    name: 'Lifeline Chemists',
    owner: 'Priya Singh',
    phone: '9876543213',
    address: 'Shop 7, Green Plaza, Powai',
    location: {
      latitude: 19.1207,
      longitude: 72.9077
    },
    addedBy: 'SO001',
    addedOn: '2023-02-10T11:15:00',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'SH005',
    name: 'Wellness Pharmacy',
    owner: 'Rajesh Kumar',
    phone: '9876543214',
    address: 'Plot 12, Sector 5, Kharghar',
    location: {
      latitude: 19.0396,
      longitude: 73.0623
    },
    lastVisit: {
      date: '2023-04-02T11:00:00',
      officerId: 'SO003',
      officerName: 'Vikram Singh'
    },
    addedBy: 'SO003',
    addedOn: '2023-02-15T16:30:00',
    image: 'https://images.unsplash.com/photo-1584515969055-22796ea9e7db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBoYXJtYWN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  }
];

// Product Categories
export const productCategories = [
  { id: 'CAT001', name: 'Antibiotics', icon: 'pill' },
  { id: 'CAT002', name: 'Pain Relief', icon: 'thermometer' },
  { id: 'CAT003', name: 'Vitamins', icon: 'pill' },
  { id: 'CAT004', name: 'Cardiac', icon: 'heart-pulse' },
  { id: 'CAT005', name: 'Diabetes', icon: 'dropper' },
  { id: 'CAT006', name: 'Respiratory', icon: 'lungs' }
];

// Products
export const products: Product[] = [
  {
    id: 'PR001',
    name: 'Amoxicillin 500mg',
    code: 'AMX500',
    category: 'CAT001',
    price: 156.50,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1550572427-7c5f1a8240f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Broad-spectrum antibiotic for bacterial infections'
  },
  {
    id: 'PR002',
    name: 'Paracetamol 650mg',
    code: 'PCM650',
    category: 'CAT002',
    price: 25.75,
    stock: 1000,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Fever reducer and pain reliever'
  },
  {
    id: 'PR003',
    name: 'Vitamin D3 60K',
    code: 'VTD60K',
    category: 'CAT003',
    price: 120.00,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Weekly vitamin D supplement'
  },
  {
    id: 'PR004',
    name: 'Atorvastatin 10mg',
    code: 'ATR10',
    category: 'CAT004',
    price: 85.50,
    stock: 450,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Cholesterol-lowering statin medication'
  },
  {
    id: 'PR005',
    name: 'Metformin 500mg',
    code: 'MET500',
    category: 'CAT005',
    price: 45.25,
    stock: 600,
    image: 'https://images.unsplash.com/photo-1603398738508-de9536743548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Oral diabetes medicine'
  },
  {
    id: 'PR006',
    name: 'Montelukast 10mg',
    code: 'MON10',
    category: 'CAT006',
    price: 130.00,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGlsbHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Leukotriene receptor antagonist for asthma'
  },
  {
    id: 'PR007',
    name: 'Azithromycin 500mg',
    code: 'AZT500',
    category: 'CAT001',
    price: 180.00,
    stock: 350,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a84a4f1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Macrolide antibiotic'
  },
  {
    id: 'PR008',
    name: 'Ibuprofen 400mg',
    code: 'IBU400',
    category: 'CAT002',
    price: 35.50,
    stock: 800,
    image: 'https://images.unsplash.com/photo-1550572427-7c5f1a8240f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljaW5lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Non-steroidal anti-inflammatory drug'
  }
];

// Schemes
export const schemes: Scheme[] = [
  {
    id: 'SCH001',
    name: 'Buy 10 Get 1 Free',
    description: 'Purchase 10 units of Amoxicillin and get 1 unit free',
    applicableProducts: ['PR001'],
    discountPercentage: 9.09, // Equivalent to 1 free on 11
    minQuantity: 10,
    startDate: '2023-04-01T00:00:00',
    endDate: '2023-06-30T23:59:59'
  },
  {
    id: 'SCH002',
    name: '15% Off on Vitamins',
    description: '15% discount on all vitamin products',
    applicableProducts: ['PR003'],
    discountPercentage: 15,
    minQuantity: 5,
    startDate: '2023-04-01T00:00:00',
    endDate: '2023-05-31T23:59:59'
  },
  {
    id: 'SCH003',
    name: '10% Bulk Purchase',
    description: '10% off on purchase of 20 or more units',
    applicableProducts: ['PR002', 'PR004', 'PR005', 'PR006', 'PR007', 'PR008'],
    discountPercentage: 10,
    minQuantity: 20,
    startDate: '2023-03-15T00:00:00',
    endDate: '2023-06-15T23:59:59'
  }
];

// Orders
export const orders: Order[] = [
  {
    id: 'ORD001',
    shopId: 'SH001',
    shopName: 'Agarwal Medical Store',
    date: '2023-04-10T09:45:00',
    items: [
      {
        productId: 'PR001',
        quantity: 20,
        price: 156.50,
        discount: 284.55, // 9.09% discount for 20 units
        total: 2845.45,
        appliedScheme: 'SCH001'
      },
      {
        productId: 'PR003',
        quantity: 10,
        price: 120.00,
        discount: 180.00, // 15% discount
        total: 1020.00,
        appliedScheme: 'SCH002'
      }
    ],
    subtotal: 4330.00,
    totalDiscount: 464.55,
    total: 3865.45,
    status: 'completed',
    officerId: 'SO001'
  },
  {
    id: 'ORD002',
    shopId: 'SH003',
    shopName: 'Health Plus Medical',
    date: '2023-04-08T14:30:00',
    items: [
      {
        productId: 'PR002',
        quantity: 30,
        price: 25.75,
        discount: 77.25, // 10% discount for bulk
        total: 695.25,
        appliedScheme: 'SCH003'
      },
      {
        productId: 'PR005',
        quantity: 15,
        price: 45.25,
        discount: 0, // No scheme applied
        total: 678.75,
        appliedScheme: undefined
      }
    ],
    subtotal: 1451.25,
    totalDiscount: 77.25,
    total: 1374.00,
    status: 'completed',
    officerId: 'SO001'
  }
];

// Visits
export const visits: Visit[] = [
  {
    id: 'VIS001',
    shopId: 'SH001',
    shopName: 'Agarwal Medical Store',
    officerId: 'SO001',
    startTime: '2023-04-10T09:30:00',
    endTime: '2023-04-10T10:15:00',
    location: {
      latitude: 19.1368,
      longitude: 72.8493
    },
    hasOrder: true,
    orderId: 'ORD001'
  },
  {
    id: 'VIS002',
    shopId: 'SH003',
    shopName: 'Health Plus Medical',
    officerId: 'SO001',
    startTime: '2023-04-08T14:20:00',
    endTime: '2023-04-08T15:00:00',
    location: {
      latitude: 19.0765,
      longitude: 72.9982
    },
    hasOrder: true,
    orderId: 'ORD002'
  },
  {
    id: 'VIS003',
    shopId: 'SH004',
    shopName: 'Lifeline Chemists',
    officerId: 'SO001',
    startTime: '2023-04-09T11:45:00',
    endTime: '2023-04-09T12:15:00',
    location: {
      latitude: 19.1207,
      longitude: 72.9077
    },
    hasOrder: false
  }
];

// Daily Target
export const dailyTarget: DailyTarget = {
  targetAmount: 5000,
  currentAmount: 3000,
  percentage: 60,
  status: 'warning' // <60% danger, 60-90% warning, >90% success
};

// Performance Data
export const performance: Performance = {
  shops: {
    visited: 3,
    target: 5,
    percentage: 60
  },
  orders: {
    count: 2,
    amount: 5239.45,
    target: 8000,
    percentage: 65.49
  }
};