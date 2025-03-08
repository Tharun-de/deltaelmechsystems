import React from 'react';
import { CreditCard, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../lib/utils';
import { supabase } from "@/config/supabase";

interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  successRate: number;
  pendingAmount: number;
}

const PaymentStats = () => {
  const [stats, setStats] = React.useState<PaymentStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    successRate: 0,
    pendingAmount: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total revenue (completed payments)
        const { data: totalRevenue } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'completed');

        // Get monthly revenue
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: monthlyRevenue } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'completed')
          .gte('created_at', startOfMonth.toISOString());

        // Get all payments for success rate
        const { data: allPayments } = await supabase
          .from('payments')
          .select('status');

        // Get pending payments
        const { data: pendingPayments } = await supabase
          .from('payments')
          .select('amount')
          .eq('status', 'pending');

        const total = totalRevenue?.reduce((sum, p) => sum + p.amount, 0) || 0;
        const monthly = monthlyRevenue?.reduce((sum, p) => sum + p.amount, 0) || 0;
        const pending = pendingPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;

        const completed = allPayments?.filter(p => p.status === 'completed').length || 0;
        const total_payments = allPayments?.length || 0;
        const success_rate = total_payments > 0 ? (completed / total_payments) * 100 : 0;

        setStats({
          totalRevenue: total,
          monthlyRevenue: monthly,
          successRate: success_rate,
          pendingAmount: pending,
        });
      } catch (error) {
        console.error('Error fetching payment stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-2/3"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            Current month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Payment success rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.pendingAmount)}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting payment
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStats;