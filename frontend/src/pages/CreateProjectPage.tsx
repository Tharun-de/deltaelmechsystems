import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectForm from '../components/ProjectForm';
import PageTransition from '../components/PageTransition';

interface ProjectFormData {
  title: string;
  description: string;
  project_type: 'it_building' | 'house' | 'school' | 'commercial' | 'other';
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
}

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...data,
          client_id: user?.sub,
          status: 'planning',
          current_phase: 'planning',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const project = await response.json();
      navigate(`/dashboard/projects/${project.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow">
              <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-b-lg">
                  {error}
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default CreateProjectPage; 