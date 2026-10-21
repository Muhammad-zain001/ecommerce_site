export type ProductCategory = 
  | 'all'
  | 'shalwar-kameez'
  | 'kurtas'
  | 'shirts'
  | 'pants'
  | 'outerwear'
  | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  sku: string;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-Order';
  fabric: string;
  fit: string;
  care: string;
  modelInfo: string;
  description: string;
  features: string[];
  images: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'bank_transfer';

export interface Order {
  orderNumber: string;
  items: CartItem[];
  customer: OrderCustomer;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
  estimatedDelivery: string;
}
