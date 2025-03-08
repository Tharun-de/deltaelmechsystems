import React, { useState } from 'react';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../components/ui/use-toast';
import type { JobApplication } from '../../lib/types';

interface ApplicationFormData {
  applicant_name: string;
  email: string;
  position: string;
  experience: number;
  skills: string[];
  resume_url: string;
  status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
  notes: string;
}

const AdminApplications = () => {
  const { applications, loading, updateApplication, deleteApplication } = useAdminDashboard();
  const { toast } = useToast();
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);
  const [isEditApplicationOpen, setIsEditApplicationOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    applicant_name: '',
    email: '',
    position: '',
    experience: 0,
    skills: [],
    resume_url: '',
    status: 'pending',
    notes: ''
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const handleAddApplication = async () => {
    try {
      // In a real app, you would call an API to create the application
      toast({
        title: "Success",
        description: "Application added successfully",
      });
      setIsAddApplicationOpen(false);
      setFormData({
        applicant_name: '',
        email: '',
        position: '',
        experience: 0,
        skills: [],
        resume_url: '',
        status: 'pending',
        notes: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add application",
        variant: "destructive"
      });
    }
  };

  const handleEditApplication = async () => {
    if (!selectedApplication) return;
    
    try {
      await updateApplication.mutateAsync({
        applicationId: selectedApplication.id,
        updates: formData
      });
      
      toast({
        title: "Success",
        description: "Application updated successfully",
      });
      setIsEditApplicationOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update application",
        variant: "destructive"
      });
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    try {
      await deleteApplication.mutateAsync(applicationId);
      toast({
        title: "Success",
        description: "Application deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete application",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        <Button onClick={() => setIsAddApplicationOpen(true)}>Add Application</Button>
      </div>

      <div className="grid gap-4">
        {applications?.map((application) => (
          <Card key={application.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{application.applicant_name}</h3>
                <p className="text-sm text-gray-500">{application.email}</p>
                <div className="mt-2 flex gap-4">
                  <p className="text-sm text-gray-500">
                    Position: {application.position}
                  </p>
                  <p className="text-sm text-gray-500">
                    Experience: {application.experience} years
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {application.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    application.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : application.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : application.status === 'interviewed'
                      ? 'bg-purple-100 text-purple-800'
                      : application.status === 'reviewing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedApplication(application);
                    setFormData({
                      applicant_name: application.applicant_name,
                      email: application.email,
                      position: application.position,
                      experience: application.experience,
                      skills: application.skills,
                      resume_url: application.resume_url,
                      status: application.status,
                      notes: application.notes || ''
                    });
                    setIsEditApplicationOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteApplication(application.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Application Dialog */}
      <Dialog open={isAddApplicationOpen} onOpenChange={setIsAddApplicationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicant-name">Applicant Name</Label>
                <Input
                  id="applicant-name"
                  value={formData.applicant_name}
                  onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume URL</Label>
              <Input
                id="resume"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected') => 
                  setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddApplicationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddApplication}>Add Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Application Dialog */}
      <Dialog open={isEditApplicationOpen} onOpenChange={setIsEditApplicationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-applicant-name">Applicant Name</Label>
                <Input
                  id="edit-applicant-name"
                  value={formData.applicant_name}
                  onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-position">Position</Label>
                <Input
                  id="edit-position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-experience">Experience (years)</Label>
                <Input
                  id="edit-experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-resume">Resume URL</Label>
              <Input
                id="edit-resume"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected') => 
                  setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditApplicationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditApplication}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications; 