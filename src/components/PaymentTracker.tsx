import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DollarSign, Download, Plus, AlertCircle, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
  invoice_url?: string;
  payment_method: 'credit_card' | 'bank_transfer' | 'check';
  transaction_id?: string;
}

interface PaymentTrackerProps {
  projectId: string;
  totalBudget: number;
}

interface NewPaymentForm {
  amount: string;
  description: string;
  payment_method: Payment['payment_method'];
}

const PaymentTracker: React.FC<PaymentTrackerProps> = ({ projectId, totalBudget }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState<NewPaymentForm>({
    amount: '',
    description: '',
    payment_method: 'credit_card',
  });

  const fetchPayments = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/projects/${projectId}/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch payments');
      }

      const data = await response.json();
      setPayments(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load payment history';
      setError(errorMessage);
      console.error('Error fetching payments:', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, getAccessTokenSilently]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPayment.amount || parseFloat(newPayment.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/projects/${projectId}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newPayment,
          amount: parseFloat(newPayment.amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to process payment');
      }
      
      const payment = await response.json();
      setPayments([...payments, payment]);
      setShowPaymentForm(false);
      setNewPayment({ amount: '', description: '', payment_method: 'credit_card' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process payment';
      setError(errorMessage);
      console.error('Error processing payment:', err);
    }
  };

  const calculateTotalPaid = useCallback(() => {
    return payments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }, [payments]);

  const calculateRemainingBalance = useCallback(() => {
    return totalBudget - calculateTotalPaid();
  }, [totalBudget, calculateTotalPaid]);

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">${totalBudget.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-green-600">
            ${calculateTotalPaid().toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Remaining Balance</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-blue-600">
            ${calculateRemainingBalance().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Payment Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
        <button
          onClick={() => setShowPaymentForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Payment
        </button>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">New Payment</h3>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  value={newPayment.payment_method}
                  onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value as Payment['payment_method'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment History Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {payment.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.invoice_url && (
                    <a
                      href={payment.invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Download className="h-4 w-4 inline-block" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTracker; 