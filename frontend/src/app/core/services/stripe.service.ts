import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private stripePromise = loadStripe(environment.stripePublicKey);

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }

  /**
   * Confirma un pago usando un client_secret de Stripe y un CardElement montado.
   * Devuelve el PaymentIntent si el pago es exitoso, o lanza error si falla.
   */
  async confirmPayment(
    clientSecret: string,
    cardElement: StripeCardElement,
    billingDetails: { name: string; email?: string }
  ): Promise<{ paymentIntentId: string }> {
    const stripe = await this.getStripe();
    if (!stripe) throw new Error('Stripe no está disponible.');

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: billingDetails,
      },
    });

    if (error) {
      throw new Error(error.message ?? 'Error al procesar el pago.');
    }

    if (paymentIntent?.status !== 'succeeded') {
      throw new Error(`El pago no pudo completarse. Estado: ${paymentIntent?.status}`);
    }

    return { paymentIntentId: paymentIntent.id };
  }
}
