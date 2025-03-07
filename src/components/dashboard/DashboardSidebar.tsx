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

const menuItems = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    href: '/dashboard/admin',
    pattern: /^\/dashboard\/admin$/
  },
  {
    title: 'Users',
    icon: Users,
    href: '/dashboard/admin/users',
    pattern: /^\/dashboard\/admin\/users/
  },
  {
    title: 'Projects',
    icon: Briefcase,
    href: '/dashboard/admin/projects',
    pattern: /^\/dashboard\/admin\/projects/
  },
  {
    title: 'Applications',
    icon: FileText,
    href: '/dashboard/admin/applications',
    pattern: /^\/dashboard\/admin\/applications/
  },
  {
    title: 'Contact Forms',
    icon: Mail,
    href: '/dashboard/admin/contacts',
    pattern: /^\/dashboard\/admin\/contacts/
  },
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/dashboard/admin/payments',
    pattern: /^\/dashboard\/admin\/payments/
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/admin/settings',
    pattern: /^\/dashboard\/admin\/settings/
  }
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                {
                  'bg-blue-50 text-blue-700': item.pattern.test(location.pathname),
                  'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !item.pattern.test(location.pathname)
                }
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.title}</span>
              <ChevronRight className={cn(
                'ml-auto h-4 w-4 transition-transform',
                item.pattern.test(location.pathname) ? 'transform rotate-90' : ''
              )} />
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;