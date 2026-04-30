import {
  environment
} from "./chunk-NW4XVQFF.js";
import {
  HttpClient,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-L3TQ2LIC.js";

// src/app/core/services/cart.service.ts
var CartService = class _CartService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/cart`;
    this.itemCount = signal(0);
    this.cartTotal = signal(0);
  }
  // GET /api/cart
  getCart() {
    return this.http.get(this.apiUrl).pipe(tap((res) => {
      this.itemCount.set(res.data.item_count);
      this.cartTotal.set(res.data.total);
    }));
  }
  // POST /api/cart/items
  addItem(request) {
    return this.http.post(`${this.apiUrl}/items`, request).pipe(tap((res) => {
      this.itemCount.set(res.cart?.item_count ?? this.itemCount());
      this.cartTotal.set(res.cart?.total ?? this.cartTotal());
    }));
  }
  // PUT /api/cart/items/{id}
  updateItem(itemId, request) {
    return this.http.put(`${this.apiUrl}/items/${itemId}`, request).pipe(tap((res) => {
      if (res.cart) {
        this.itemCount.set(res.cart.item_count);
        this.cartTotal.set(res.cart.total);
      }
    }));
  }
  // DELETE /api/cart/items/{id}
  removeItem(itemId) {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`).pipe(tap((res) => {
      if (res.cart) {
        this.itemCount.set(res.cart.item_count);
        this.cartTotal.set(res.cart.total);
      }
    }));
  }
  // DELETE /api/cart
  clearCart() {
    return this.http.delete(this.apiUrl).pipe(tap(() => {
      this.itemCount.set(0);
      this.cartTotal.set(0);
    }));
  }
  // POST /api/payments/create-intent
  createPaymentIntent() {
    return this.http.post(`${environment.apiUrl}/payments/create-intent`, {});
  }
  // POST /api/orders
  createOrder(paymentIntentId, shippingAddress) {
    return this.http.post(`${environment.apiUrl}/orders`, {
      payment_intent_id: paymentIntentId,
      shipping_address: shippingAddress
    }).pipe(tap(() => {
      this.itemCount.set(0);
      this.cartTotal.set(0);
    }));
  }
  // GET /api/orders
  getOrders() {
    return this.http.get(`${environment.apiUrl}/orders`);
  }
  // GET /api/orders/{id}
  getOrder(id) {
    return this.http.get(`${environment.apiUrl}/orders/${id}`);
  }
  static {
    this.\u0275fac = function CartService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CartService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartService, factory: _CartService.\u0275fac, providedIn: "root" });
  }
};

export {
  CartService
};
//# sourceMappingURL=chunk-GH4YJHLY.js.map
