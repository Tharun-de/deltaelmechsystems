import React from 'react';
import { Clipboard, Users, Settings, Bell, LogOut, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  const recentProjects = [
    {
      id: 1,
      name: 'Automotive Plant Automation',
      status: 'In Progress',
      progress: 65,
      dueDate: 'Aug 15, 2025'
    },
    {
      id: 2,
      name: 'Electrical System Upgrade',
      status: 'Completed',
      progress: 100,
      dueDate: 'Jul 30, 2025'
    },
    {
      id: 3,
      name: 'SCADA Implementation',
      status: 'Planning',
      progress: 25,
      dueDate: 'Sep 10, 2025'
    }
  ];
  
  const notifications = [
    {
      id: 1,
      message: 'New project proposal has been approved',
      time: '2 hours ago'
    },
    {
      id: 2,
      message: 'Meeting scheduled with client for project review',
      time: '1 day ago'
    },
    {
      id: 3,
      message: 'System maintenance scheduled for next weekend',
      time: '3 days ago'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}</h1>
              <p className="text-gray-600">Here's an overview of your projects and activities</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Projects Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Projects</h2>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                  
                  <div className="space-y-4">
                    {recentProjects.map(project => (
                      <div key={project.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800">{project.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                project.status === 'Completed' ? 'bg-green-500' :
                                project.status === 'In Progress' ? 'bg-blue-500' :
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Due: {project.dueDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Activity Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <Clipboard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-800">Project proposal for Client XYZ submitted</p>
                        <p className="text-sm text-gray-500">Today, 9:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-4">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-800">Team meeting for Automation Project scheduled</p>
                        <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <Settings className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-800">System maintenance completed</p>
                        <p className="text-sm text-gray-500">Jul 28, 2025, 11:45 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* User Profile */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-blue-600">{user?.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{user?.name}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">
                      Edit Profile
                    </a>
                    <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 transition duration-300">
                      Account Settings
                    </a>
                    <button 
                      onClick={logout} 
                      className="w-full mt-2 flex items-center justify-center py-2 text-red-600 hover:text-red-800 transition duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                </div>
                
                {/* Notifications */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {notifications.length}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                          <Bell className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-800 text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All Notifications
                    </a>
                  </div>
                </div>
                
                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
                        <ChevronRight className="w-4 h-4 mr-2" /> Create New Project
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
                        <ChevronRight className="w-4 h-4 mr-2" /> View Reports
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
                        <ChevronRight className="w-4 h-4 mr-2" /> Team Calendar
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
                        <ChevronRight className="w-4 h-4 mr-2" /> Support Center
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Dashboard;