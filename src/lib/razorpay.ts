import { supabase } from './supabase';

interface CreateOrderParams {
  amount: number;
  projectId: string;
  currency?: string;
}

interface RazorpayResponse {
  orderId: string;
  keyId: string;
}

export const createOrder = async ({ amount, projectId, currency = 'INR' }: CreateOrderParams): Promise<RazorpayResponse> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch('/api/payments/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ amount, currency, projectId })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    const { orderId } = await response.json();
    return {
      orderId,
      keyId: import.meta.env.VITE_RAZORPAY_KEY_ID
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  projectId: string;
  amount: number;
}): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch('/api/payments/verify-razorpay-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment verification failed');
    }

    const { verified } = await response.json();

    if (verified) {
      // Save payment record to database
      const { error: dbError } = await supabase
        .from('payments')
        .insert({
          project_id: paymentData.projectId,
          amount: paymentData.amount,
          status: 'completed',
          payment_method: 'razorpay',
          transaction_id: paymentData.razorpay_payment_id
        });

      if (dbError) throw dbError;
    }

    return verified;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};