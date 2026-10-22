import { Product, Order } from '../types/store';
import { PRODUCTS } from '../data/products';

// Default Django local backend endpoint
const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Checks if the Django backend is currently reachable
 */
export async function isBackendOnline(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE_URL}/products/`, { signal: controller.signal });
    clearTimeout(id);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch products from Django backend, with fallback to local products
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/`);
    if (!res.ok) throw new Error('Backend response error');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return PRODUCTS;
  } catch {
    // Return fallback local products
    try {
      const saved = localStorage.getItem('zk_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  }
}

/**
 * Create a new order in Django backend (Cash on Delivery)
 */
export async function submitOrderToBackend(order: Order): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_number: order.orderNumber,
        customer_name: order.customer.fullName,
        customer_phone: order.customer.phone,
        customer_email: order.customer.email,
        city: order.customer.city,
        address: order.customer.address,
        notes: order.customer.notes,
        payment_method: order.paymentMethod,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        total: order.total,
        status: order.status,
        estimated_delivery: order.estimatedDelivery,
        items: order.items,
      }),
    });
    return res.ok;
  } catch {
    // If backend is not running, localStorage already saved it
    return false;
  }
}
