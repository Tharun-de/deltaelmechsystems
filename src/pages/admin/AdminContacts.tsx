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
import type { ContactSubmission } from '../../lib/types';

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  admin_notes?: string;
}

const AdminContacts = () => {
  const { contacts, loading, updateContact, deleteContact } = useAdminDashboard();
  const { toast } = useToast();
  const [isViewContactOpen, setIsViewContactOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    status: 'new',
    admin_notes: ''
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const handleUpdateContact = async () => {
    if (!selectedContact) return;
    
    try {
      await updateContact.mutateAsync({
        contactId: selectedContact.id,
        updates: formData
      });
      
      toast({
        title: "Success",
        description: "Contact submission updated successfully",
      });
      setIsViewContactOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update contact submission",
        variant: "destructive"
      });
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;
    
    try {
      await deleteContact.mutateAsync(contactId);
      toast({
        title: "Success",
        description: "Contact submission deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete contact submission",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
      </div>

      <div className="grid gap-4">
        {contacts?.map((contact) => (
          <Card key={contact.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{contact.first_name} {contact.last_name}</h3>
                <p className="text-sm text-gray-500">{contact.email}</p>
                {contact.phone && (
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                )}
                {contact.company && (
                  <p className="text-sm text-gray-500">{contact.company}</p>
                )}
                <div className="mt-2">
                  <p className="text-sm font-medium">Subject: {contact.subject}</p>
                  <p className="text-sm text-gray-700 mt-1">{contact.message}</p>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Submitted: {new Date(contact.created_at).toLocaleString()}
                </p>
                {contact.admin_notes && (
                  <p className="text-sm text-gray-500 mt-2">
                    Notes: {contact.admin_notes}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedContact(contact);
                    setFormData({
                      first_name: contact.first_name,
                      last_name: contact.last_name,
                      email: contact.email,
                      phone: contact.phone,
                      company: contact.company,
                      subject: contact.subject,
                      message: contact.message,
                      status: contact.status,
                      admin_notes: contact.admin_notes
                    });
                    setIsViewContactOpen(true);
                  }}
                >
                  View & Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View/Edit Contact Dialog */}
      <Dialog open={isViewContactOpen} onOpenChange={setIsViewContactOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>View/Edit Contact Submission</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'new' | 'in-progress' | 'resolved') => 
                  setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-notes">Internal Notes</Label>
              <Textarea
                id="admin-notes"
                value={formData.admin_notes}
                onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                placeholder="Add internal notes about this contact submission..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewContactOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateContact}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContacts; 