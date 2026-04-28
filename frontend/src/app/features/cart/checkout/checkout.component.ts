import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { CartService } from '../../../core/services/cart.service';
import { StripeService } from '../../../core/services/stripe.service';
import { Cart } from '../../../shared/models/cart.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('cardElement') cardElementRef!: ElementRef;

  cart: Cart | null = null;
  loading = true;
  paymentLoading = false;
  error: string | null = null;
  successMessage: string | null = null;
  shippingAddress = '';

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;
  private clientSecret: string | null = null;
  private paymentIntentId: string | null = null;

  constructor(
    private cartService: CartService,
    private stripeService: StripeService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCartAndInitStripe();
  }

  ngOnDestroy(): void {
    this.cardElement?.destroy();
  }

  async loadCartAndInitStripe(): Promise<void> {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: async (res) => {
        this.cart = res.data;

        if (this.cart.items.length === 0) {
          this.router.navigate(['/recambios/carrito']);
          return;
        }

        // Crear PaymentIntent en el backend
        this.cartService.createPaymentIntent().subscribe({
          next: async (intentRes) => {
            this.clientSecret = intentRes.client_secret;
            this.paymentIntentId = intentRes.payment_intent_id;

            // Inicializar Stripe Elements
            this.stripe = await this.stripeService.getStripe();
            if (this.stripe) {
              this.elements = this.stripe.elements();
              this.cardElement = this.elements.create('card', {
                style: {
                  base: {
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '16px',
                    color: '#1E293B',
                    '::placeholder': { color: '#94A3B8' },
                  },
                },
              });

              // Montar el elemento de tarjeta en el DOM
              setTimeout(() => {
                if (this.cardElementRef?.nativeElement) {
                  this.cardElement!.mount(this.cardElementRef.nativeElement);
                }
              }, 0);
            }

            this.loading = false;
          },
          error: () => {
            this.error = 'No se pudo inicializar el pago. Inténtalo de nuevo.';
            this.loading = false;
          },
        });
      },
      error: () => {
        this.error = 'No se pudo cargar el carrito.';
        this.loading = false;
      },
    });
  }

  async submitPayment(): Promise<void> {
    if (!this.stripe || !this.cardElement || !this.clientSecret) return;

    this.paymentLoading = true;
    this.error = null;

    try {
      // 1. Confirmar el pago con Stripe
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        this.clientSecret,
        {
          payment_method: {
            card: this.cardElement,
          },
        }
      );

      if (error) throw new Error(error.message ?? 'Error al procesar el pago.');
      if (paymentIntent?.status !== 'succeeded') {
        throw new Error('El pago no pudo completarse.');
      }

      // 2. Crear el pedido en el backend
      this.cartService.createOrder(paymentIntent.id, this.shippingAddress).subscribe({
        next: (res) => {
          this.router.navigate(['/pedidos', res.data.id], {
            queryParams: { success: true },
          });
        },
        error: () => {
          // El pago se realizó pero el pedido no se guardó; mostrar aviso
          this.error =
            'El pago se procesó correctamente pero hubo un error al registrar el pedido. Contacta con soporte.';
          this.paymentLoading = false;
        },
      });
    } catch (err: any) {
      this.error = err.message;
      this.paymentLoading = false;
    }
  }

  formatPrice(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  }

  goBack(): void {
    this.router.navigate(['/recambios/carrito']);
  }
}
