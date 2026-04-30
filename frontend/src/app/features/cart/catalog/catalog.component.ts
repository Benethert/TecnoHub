import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;
  addingProductId: number | null = null;
  successMessage: string | null = null;

  get cartCount(): number {
    return this.cartService.itemCount();
  }

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el catálogo. Inténtalo de nuevo.';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product): void {
    if (product.stock === 0) return;
    this.addingProductId = product.id;
    this.cartService.addItem({ product_id: product.id, quantity: 1 }).subscribe({
      next: () => {
        this.addingProductId = null;
        this.successMessage = `"${product.name}" añadido al carrito.`;
        setTimeout(() => (this.successMessage = null), 3000);
      },
      error: (err) => {
        this.addingProductId = null;
        this.error = err.error?.message ?? 'Error al añadir al carrito.';
        setTimeout(() => (this.error = null), 4000);
      },
    });
  }

  goToCart(): void {
    this.router.navigate(['/recambios/carrito']);
  }

  formatPrice(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  stockLabel(stock: number): string {
    if (stock === 0) return 'Sin stock';
    if (stock < 5) return 'Pocas unidades';
    return 'Disponible';
  }

  stockClass(stock: number): string {
    if (stock === 0) return 'out';
    if (stock < 5) return 'low';
    return '';
  }
}
