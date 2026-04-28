export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_sku: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  user_id: number;
  status: OrderStatus;
  status_label: string;
  subtotal: number;
  tax: number;
  total: number;
  stripe_payment_intent_id: string;
  stripe_status: string;
  shipping_address: string | null;
  notes: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  payment_intent_id: string;
  shipping_address?: string;
  notes?: string;
}

export interface CreatePaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
  amount: number;
  amount_cents: number;
}
