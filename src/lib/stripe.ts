import { loadStripe } from '@stripe/stripe-js';
import type { PaymentIntent } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CreatePaymentIntentParams {
  amount: number;
  projectId: string;
  currency?: string;
}

export const createPaymentIntent = async ({ amount, projectId, currency = 'INR' }: CreatePaymentIntentParams): Promise<PaymentIntent> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ amount, currency, projectId })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create payment intent');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (clientSecret: string, paymentMethod: any): Promise<PaymentIntent> => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod
    });

    if (error) throw error;
    if (!paymentIntent) throw new Error('Payment failed');

    // Save payment record to database
    const { error: dbError } = await supabase
      .from('payments')
      .insert({
        project_id: paymentIntent.metadata.projectId,
        amount: paymentIntent.amount / 100,
        status: paymentIntent.status,
        payment_method: 'stripe',
        transaction_id: paymentIntent.id
      });

    if (dbError) throw dbError;

    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};