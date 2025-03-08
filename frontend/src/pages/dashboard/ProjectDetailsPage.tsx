import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Calendar, MapPin, ChevronLeft, AlertCircle } from 'lucide-react';
import PaymentTracker from '../../components/PaymentTracker';
import ProjectTimeline from '../../components/ProjectTimeline';
import ProjectProgress from '../../components/ProjectProgress';
import ProjectChat from '../../components/ProjectChat';
import ProjectAnalytics from '../../components/ProjectAnalytics';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  current_phase: string;
  site_address: string;
  site_city: string;
  site_state: string;
  site_postal_code: string;
  plot_area: number;
  built_up_area: number;
  number_of_floors: number;
  estimated_cost: number;
  start_date: string;
  estimated_duration: number;
  project_type: string;
  project_manager?: {
    id: string;
    name: string;
    email: string;
  };
  site_supervisor?: {
    id: string;
    name: string;
    email: string;
  };
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch project details');
      const data = await response.json();
      setProject(data);
    } catch (err) {
      setError('Failed to load project details');
      console.error('Error fetching project details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center text-gray-500 py-8">
        Project not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
        <div className="mt-2 flex items-center space-x-4">
          <span className={`px-2 py-1 text-sm font-medium rounded-full ${
            project.status === 'active'
              ? 'bg-green-100 text-green-800'
              : project.status === 'on_hold'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            Phase: {project.current_phase}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['details', 'timeline', 'progress', 'payments', 'chat', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Details */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
              <div className="space-y-4">
                <p className="text-gray-600">{project.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Project Type</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.project_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Phase</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.current_phase}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Site Information */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Site Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {project.site_address}
                      <br />
                      {project.site_city}, {project.site_state} {project.site_postal_code}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Plot Area</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.plot_area} sq ft</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Built-up Area</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.built_up_area} sq ft</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Number of Floors</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.number_of_floors}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Timeline */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Project Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(project.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estimated Duration</h3>
                  <p className="mt-1 text-sm text-gray-900">{project.estimated_duration} months</p>
                </div>
              </div>
            </div>

            {/* Team Information */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Team Information</h2>
              <div className="space-y-4">
                {project.project_manager && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Project Manager</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.project_manager.name}</p>
                    <p className="text-sm text-gray-500">{project.project_manager.email}</p>
                  </div>
                )}
                {project.site_supervisor && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Site Supervisor</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.site_supervisor.name}</p>
                    <p className="text-sm text-gray-500">{project.site_supervisor.email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && <ProjectTimeline projectId={project.id} />}
        {activeTab === 'progress' && <ProjectProgress projectId={project.id} />}
        {activeTab === 'payments' && (
          <PaymentTracker
            projectId={project.id}
            totalBudget={project.estimated_cost}
          />
        )}
        {activeTab === 'chat' && <ProjectChat projectId={project.id} />}
        {activeTab === 'analytics' && <ProjectAnalytics projectId={project.id} />}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mt-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage; 