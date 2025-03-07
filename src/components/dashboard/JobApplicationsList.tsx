import React from 'react';
import { format } from 'date-fns';
import { Briefcase, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { supabase } from '../../lib/supabase';

interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  experience: string;
  linkedin?: string;
  resume_url: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  admin_notes?: string;
  created_at: string;
}

const JobApplicationsList = () => {
  const [applications, setApplications] = React.useState<JobApplication[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Application status updated',
      });

      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: JobApplication['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Briefcase className="w-12 h-12 mb-4" />
        <p>No applications found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  {format(new Date(application.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>{application.job_title}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{application.full_name}</p>
                    <p className="text-sm text-gray-500">{application.email}</p>
                  </div>
                </TableCell>
                <TableCell>{application.experience}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell>
                  <a 
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {application.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                        >
                          Review
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {application.status === 'reviewed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateApplicationStatus(application.id, 'shortlisted')}
                        className="text-green-600 hover:text-green-800"
                      >
                        Shortlist
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobApplicationsList;