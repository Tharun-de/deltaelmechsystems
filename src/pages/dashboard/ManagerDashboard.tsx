import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome, {user?.user_metadata.name}
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Manager Dashboard
          </h2>
          <p className="text-gray-600">
            This is the manager dashboard. You can manage projects, teams, and resources here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard; 