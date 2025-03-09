import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Calendar, CheckCircle2, Clock, AlertCircle, Plus, Edit2, Trash2 } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  completion_date?: string;
  dependencies?: string[];
}

interface NewMilestoneForm {
  title: string;
  description: string;
  due_date: string;
  status: Milestone['status'];
}

interface ProjectTimelineProps {
  projectId: string;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projectId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [newMilestone, setNewMilestone] = useState<NewMilestoneForm>({
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
  });

  const fetchMilestones = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/projects/${projectId}/milestones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch milestones');
      }

      const data = await response.json();
      setMilestones(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load milestones';
      setError(errorMessage);
      console.error('Error fetching milestones:', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, getAccessTokenSilently]);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  const handleMilestoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      const url = editingMilestone
        ? `/api/projects/${projectId}/milestones/${editingMilestone.id}`
        : `/api/projects/${projectId}/milestones`;
      
      const method = editingMilestone ? 'PUT' : 'POST';
      const milestoneData = editingMilestone || newMilestone;

      // Validate dates
      const dueDate = new Date(milestoneData.due_date);
      if (isNaN(dueDate.getTime())) {
        setError('Please enter a valid due date');
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(milestoneData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save milestone');
      }
      
      const milestone = await response.json();
      
      if (editingMilestone) {
        setMilestones(milestones.map(m => m.id === milestone.id ? milestone : m));
      } else {
        setMilestones([...milestones, milestone]);
      }

      // Reset form
      setShowMilestoneForm(false);
      setEditingMilestone(null);
      setNewMilestone({
        title: '',
        description: '',
        due_date: '',
        status: 'pending'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save milestone';
      setError(errorMessage);
      console.error('Error saving milestone:', err);
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (!window.confirm('Are you sure you want to delete this milestone?')) return;

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/projects/${projectId}/milestones/${milestoneId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete milestone');
      }
      
      setMilestones(milestones.filter(m => m.id !== milestoneId));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete milestone';
      setError(errorMessage);
      console.error('Error deleting milestone:', err);
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const resetForm = () => {
    setShowMilestoneForm(false);
    setEditingMilestone(null);
    setNewMilestone({
      title: '',
      description: '',
      due_date: '',
      status: 'pending'
    });
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Project Timeline</h2>
        <button
          onClick={() => setShowMilestoneForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </button>
      </div>

      {/* Milestone Form Modal */}
      {showMilestoneForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingMilestone ? 'Edit Milestone' : 'New Milestone'}
            </h3>
            <form onSubmit={handleMilestoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingMilestone?.title || newMilestone.title}
                  onChange={(e) => {
                    if (editingMilestone) {
                      setEditingMilestone({ ...editingMilestone, title: e.target.value });
                    } else {
                      setNewMilestone({ ...newMilestone, title: e.target.value });
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  minLength={3}
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingMilestone?.description || newMilestone.description}
                  onChange={(e) => {
                    if (editingMilestone) {
                      setEditingMilestone({ ...editingMilestone, description: e.target.value });
                    } else {
                      setNewMilestone({ ...newMilestone, description: e.target.value });
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                  minLength={10}
                  maxLength={500}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={editingMilestone?.due_date || newMilestone.due_date}
                  onChange={(e) => {
                    if (editingMilestone) {
                      setEditingMilestone({ ...editingMilestone, due_date: e.target.value });
                    } else {
                      setNewMilestone({ ...newMilestone, due_date: e.target.value });
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editingMilestone?.status || newMilestone.status}
                  onChange={(e) => {
                    const status = e.target.value as Milestone['status'];
                    if (editingMilestone) {
                      setEditingMilestone({ ...editingMilestone, status });
                    } else {
                      setNewMilestone({ ...newMilestone, status });
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {editingMilestone ? 'Update Milestone' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        {milestones.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No milestones added yet. Click "Add Milestone" to create your first milestone.
          </div>
        ) : (
          milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getStatusColor(milestone.status)}`}>
                    {getStatusIcon(milestone.status)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {new Date(milestone.due_date).toLocaleDateString()}
                      </div>
                      {milestone.completion_date && (
                        <div className="flex items-center text-sm text-gray-500">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Completed: {new Date(milestone.completion_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingMilestone(milestone);
                      setShowMilestoneForm(true);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMilestone(milestone.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
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

export default ProjectTimeline; 