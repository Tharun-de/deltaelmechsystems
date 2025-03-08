import React, { useState, useEffect } from 'react';
import { Image, FileText, Upload, BarChart, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface SiteContent {
  mainImage: string;
  headline: string;
  subheadline: string;
  lastUpdated: string;
}

interface Project {
  _id: string;
  title: string;
  status: string;
  progress: number;
  lastUpdate: string;
}

const DeveloperDashboard = () => {
  const { user } = useAuth();
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [contentRes, projectsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/developer/site', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/projects', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setSiteContent(contentRes.data);
        setProjects(projectsRes.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const QuickActionCard = ({ icon: Icon, title, description, onClick }: { icon: any; title: string; description: string; onClick: () => void }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition duration-200" onClick={onClick}>
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Developer Dashboard</h1>
            <p className="text-gray-600">Manage website content and track project progress</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QuickActionCard
              icon={Image}
              title="Update Homepage"
              description="Modify homepage content and images"
              onClick={() => {}}
            />
            <QuickActionCard
              icon={FileText}
              title="Edit Services"
              description="Update service descriptions and features"
              onClick={() => {}}
            />
            <QuickActionCard
              icon={Upload}
              title="Upload Content"
              description="Add new images and project updates"
              onClick={() => {}}
            />
            <QuickActionCard
              icon={BarChart}
              title="View Analytics"
              description="Check website performance metrics"
              onClick={() => {}}
            />
          </div>

          {/* Current Site Content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Current Site Content</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Edit Content <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            {siteContent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Main Headline</h3>
                  <p className="text-gray-800">{siteContent.headline}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Subheadline</h3>
                  <p className="text-gray-800">{siteContent.subheadline}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Main Image</h3>
                  <img src={siteContent.mainImage} alt="Main" className="w-full h-32 object-cover rounded-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Last Updated</h3>
                  <p className="text-gray-800">{new Date(siteContent.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* Project Progress */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Project Progress</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{project.progress}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(project.lastUpdate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;