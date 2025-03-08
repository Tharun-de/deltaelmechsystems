import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Mail,
  CreditCard,
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    href: '/admin',
    pattern: /^\/admin$/
  },
  {
    title: 'Users',
    icon: Users,
    href: '/admin/users',
    pattern: /^\/admin\/users/
  },
  {
    title: 'Projects',
    icon: Briefcase,
    href: '/admin/projects',
    pattern: /^\/admin\/projects/
  },
  {
    title: 'Applications',
    icon: FileText,
    href: '/admin/applications',
    pattern: /^\/admin\/applications/
  },
  {
    title: 'Contact Forms',
    icon: Mail,
    href: '/admin/contacts',
    pattern: /^\/admin\/contacts/
  },
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/admin/payments',
    pattern: /^\/admin\/payments/
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    pattern: /^\/admin\/settings/
  }
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'user';

  // Only show menu items relevant to the user's role
  const filteredMenuItems = menuItems.filter(item => {
    if (userRole === 'admin') return true;
    if (userRole === 'manager' && !item.href.includes('/admin/users')) return true;
    return false;
  });

  return (
    <nav className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.pattern.test(location.pathname);

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default DashboardSidebar;