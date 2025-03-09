import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Filter, MoreVertical, Edit, Trash, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import ProjectModal from '@/components/modals/ProjectModal';
import ConfirmationDialog from '@/components/modals/ConfirmationDialog';

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  dueDate: string;
  team: string[];
  priority: string;
  description: string;
}

const AdminProjects = () => {
  // States
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Industrial Automation System',
      client: 'ABC Manufacturing',
      status: 'In Progress',
      progress: 65,
      dueDate: '2024-04-15',
      team: ['John D.', 'Sarah K.', 'Mike R.'],
      priority: 'High',
      description: 'Implementation of automated manufacturing processes'
    },
    {
      id: 2,
      name: 'Electrical Infrastructure Upgrade',
      client: 'XYZ Industries',
      status: 'Planning',
      progress: 25,
      dueDate: '2024-05-01',
      team: ['Robert M.', 'Emily S.'],
      priority: 'Medium',
      description: 'Upgrading electrical systems for improved efficiency'
    },
    {
      id: 3,
      name: 'HVAC System Maintenance',
      client: 'Tech Solutions Inc',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-03-30',
      team: ['David L.', 'Anna P.', 'Chris B.'],
      priority: 'Normal',
      description: 'Regular maintenance and optimization of HVAC systems'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddProject = (projectData: Omit<Project, 'id' | 'progress'>) => {
    const newProject: Project = {
      id: projects.length + 1,
      progress: 0,
      ...projectData
    };
    setProjects([...projects, newProject]);
    setIsModalOpen(false);
  };

  const handleEditProject = (projectData: Partial<Project>) => {
    if (!selectedProject) return;
    
    setProjects(projects.map(project => 
      project.id === selectedProject.id 
        ? { ...project, ...projectData }
        : project
    ));
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    setShowDeleteConfirm(false);
    setProjectToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Normal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <button 
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="ml-3 font-semibold text-gray-800">{project.name}</h3>
                </div>
                <button 
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium text-gray-800">{project.client}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Due: {project.dueDate}
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Team</p>
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                        title={member}
                      >
                        <span className="text-xs font-medium">{member.charAt(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                <button 
                  onClick={() => {
                    setProjectToDelete(project);
                    setShowDeleteConfirm(true);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        onSubmit={selectedProject ? handleEditProject : handleAddProject}
        initialData={selectedProject}
        mode={selectedProject ? 'edit' : 'add'}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => handleDeleteProject(projectToDelete?.id || 0)}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setProjectToDelete(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default AdminProjects; 