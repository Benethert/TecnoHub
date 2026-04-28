export interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  product_sku: string | null;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  item_count: number;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
