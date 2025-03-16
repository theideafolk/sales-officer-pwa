export interface User {
  id: string;
  name: string;
  role: 'sales_officer';
  territory: string;
}

export interface Shop {
  id: string;
  name: string;
  owner?: string;
  phone?: string;
  address?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  lastVisit?: {
    date: string;
    officerId: string;
    officerName: string;
  };
  addedBy: string;
  addedOn: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  stock: number;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  applicableProducts: string[];
  discountPercentage: number;
  minQuantity: number;
  startDate: string;
  endDate: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  appliedScheme?: string;
}

export interface Order {
  id: string;
  shopId: string;
  shopName: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  officerId: string;
}

export interface Visit {
  id: string;
  shopId: string;
  shopName: string;
  officerId: string;
  startTime: string;
  endTime?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  hasOrder: boolean;
  orderId?: string;
}

export interface DailyTarget {
  targetAmount: number;
  currentAmount: number;
  percentage: number;
  status: 'danger' | 'warning' | 'success';
}

export interface Performance {
  shops: {
    visited: number;
    target: number;
    percentage: number;
  };
  orders: {
    count: number;
    amount: number;
    target: number;
    percentage: number;
  };
}