import React, { useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent, confirmPayment } from '../lib/stripe';
import { createOrder, verifyPayment } from '../lib/razorpay';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentFormProps {
  amount: number;
  projectId: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, projectId, onSuccess, onError }) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'razorpay'>('stripe');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);
      const clientSecret = await createPaymentIntent({ amount, projectId });
      
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) throw error;
      if (!paymentIntent) throw new Error('Payment failed');

      toast({
        title: 'Payment Successful',
        description: `Payment of ₹${amount.toFixed(2)} completed successfully.`,
      });

      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Payment processing failed',
        variant: 'destructive',
      });
      onError(error instanceof Error ? error : new Error('Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);
      const { orderId, keyId } = await createOrder({ amount, projectId });

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'Delta Elmech Systems',
        description: 'Project Payment',
        order_id: orderId,
        handler: async function (response: any) {
          const verified = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            projectId,
            amount
          });

          if (verified) {
            toast({
              title: 'Payment Successful',
              description: `Payment of ₹${amount.toFixed(2)} completed successfully.`,
            });
            onSuccess();
          } else {
            throw new Error('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '+91XXXXXXXXXX',
        },
        theme: {
          color: '#2563EB',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment failed:', error);
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Payment processing failed',
        variant: 'destructive',
      });
      onError(error instanceof Error ? error : new Error('Payment failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={paymentMethod === 'stripe' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('stripe')}
              className="w-full"
            >
              Pay with Card
            </Button>
            <Button
              type="button"
              variant={paymentMethod === 'razorpay' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('razorpay')}
              className="w-full"
            >
              Pay with Razorpay
            </Button>
          </div>

          {paymentMethod === 'stripe' ? (
            <form onSubmit={handleStripePayment}>
              <div className="mb-6">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !stripe}
                className="w-full"
              >
                {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
              </Button>
            </form>
          ) : (
            <Button
              onClick={handleRazorpayPayment}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;