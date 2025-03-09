import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import ApplicationStats from '../../components/dashboard/ApplicationStats';
import JobApplicationsList from '../../components/dashboard/JobApplicationsList';

const ApplicationsDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Job Applications</h2>
          <p className="text-muted-foreground">
            Manage and review job applications
          </p>
        </div>

        <ApplicationStats />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Applications</h3>
          <JobApplicationsList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsDashboard;