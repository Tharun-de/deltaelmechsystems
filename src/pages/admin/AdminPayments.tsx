import React, { useState } from 'react';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../components/ui/use-toast';
import type { Payment } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';

interface PaymentFormData {
  project_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: 'stripe' | 'razorpay';
  transaction_id: string;
}

const AdminPayments = () => {
  const { payments, loading, updatePayment, deletePayment } = useAdminDashboard();
  const { toast } = useToast();
  const [isViewPaymentOpen, setIsViewPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    project_id: '',
    amount: 0,
    status: 'pending',
    payment_method: 'stripe',
    transaction_id: ''
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const handleUpdatePayment = async () => {
    if (!selectedPayment) return;
    
    try {
      await updatePayment.mutateAsync({
        paymentId: selectedPayment.id,
        updates: formData
      });
      
      toast({
        title: "Success",
        description: "Payment record updated successfully",
      });
      setIsViewPaymentOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update payment record",
        variant: "destructive"
      });
    }
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (!window.confirm('Are you sure you want to delete this payment record?')) return;
    
    try {
      await deletePayment.mutateAsync(paymentId);
      toast({
        title: "Success",
        description: "Payment record deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete payment record",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Records</h2>
      </div>

      <div className="grid gap-4">
        {payments?.map((payment) => (
          <Card key={payment.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">Project ID: {payment.project_id}</h3>
                <p className="text-sm text-gray-500">
                  Amount: {formatCurrency(payment.amount)}
                </p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Method: {payment.payment_method}
                  </p>
                  <p className="text-sm text-gray-500">
                    Transaction ID: {payment.transaction_id}
                  </p>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(payment.created_at).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Updated: {new Date(payment.updated_at).toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedPayment(payment);
                    setFormData({
                      project_id: payment.project_id,
                      amount: payment.amount,
                      status: payment.status,
                      payment_method: payment.payment_method,
                      transaction_id: payment.transaction_id
                    });
                    setIsViewPaymentOpen(true);
                  }}
                >
                  View & Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePayment(payment.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View/Edit Payment Dialog */}
      <Dialog open={isViewPaymentOpen} onOpenChange={setIsViewPaymentOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View/Edit Payment Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-id">Project ID</Label>
              <Input
                id="project-id"
                value={formData.project_id}
                onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'pending' | 'completed' | 'failed' | 'refunded') => 
                  setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value: 'stripe' | 'razorpay') => 
                  setFormData({ ...formData, payment_method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transaction-id">Transaction ID</Label>
              <Input
                id="transaction-id"
                value={formData.transaction_id}
                onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewPaymentOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePayment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments; 