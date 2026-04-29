import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from '../../../shared/models/cart.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  error: string | null = null;
  updatingItemId: number | null = null;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  // Carga el carrito al iniciar el componente
  ngOnInit(): void {
    this.loadCart();
  }

  // Métodos para manejar el carrito: cargar, actualizar cantidad, eliminar, vaciar y proceder al checkout
  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: res => {
        this.cart = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el carrito. Inténtalo de nuevo.';
        this.loading = false;
      },
    });
  }

  // Actualiza la cantidad de un producto en el carrito, con validación de rango
  updateQuantity(item: CartItem, newQty: number): void {
    if (newQty < 1 || newQty > 99) return;
    this.updatingItemId = item.id;
    this.cartService.updateItem(item.id, { quantity: newQty }).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        this.error = err.error?.message ?? 'Error al actualizar la cantidad.';
        this.updatingItemId = null;
      },
    });
  }

  // Elimina un producto del carrito
  removeItem(item: CartItem): void {
    this.updatingItemId = item.id;
    this.cartService.removeItem(item.id).subscribe({
      next: () => this.loadCart(),
      error: () => {
        this.error = 'Error al eliminar el producto.';
        this.updatingItemId = null;
      },
    });
  }

  // Vacía todo el carrito con confirmación del usuario
  clearCart(): void {
    if (!confirm('¿Vaciar todo el carrito?')) return;
    this.cartService.clearCart().subscribe({
      next: () => this.loadCart(),
    });
  }

  // Navega a la página de checkout
  proceedToCheckout(): void {
    this.router.navigate(['/recambios/checkout']);
  }

  // Formatea un número como precio en euros
  formatPrice(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  // Función de trackBy para optimizar la renderización de la lista de productos en el carrito
  trackByItemId(_: number, item: CartItem): number {
    return item.id;
  }
}
