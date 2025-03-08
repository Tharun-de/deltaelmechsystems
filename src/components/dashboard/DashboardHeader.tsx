import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const userName = user?.user_metadata?.name || 'User';
  const userRole = user?.user_metadata?.role || 'user';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {userName}
          </h1>
          <p className="text-gray-600">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {initials}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;