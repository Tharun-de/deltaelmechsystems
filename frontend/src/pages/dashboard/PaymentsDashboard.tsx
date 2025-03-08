import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import PaymentStats from '../../components/dashboard/PaymentStats';
import PaymentsList from '../../components/dashboard/PaymentsList';

const PaymentsDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Manage and monitor payment transactions
          </p>
        </div>

        <PaymentStats />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>
          <PaymentsList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsDashboard;