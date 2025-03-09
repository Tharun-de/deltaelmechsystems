import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Briefcase, MapPin, ChevronRight, ArrowLeft, Clock, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

interface JobRequirement {
  title: string;
  items: string[];
}

interface JobApplication {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
}

const ServiceJobsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [application, setApplication] = useState<JobApplication>({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: ''
  });

  const jobCategories = [
    {
      id: 'electrical-services',
      title: 'Electrical Services',
      description: 'Join our electrical engineering team to design and implement innovative power systems.',
      jobs: [
        {
          id: 'senior-electrical-engineer',
          title: 'Senior Electrical Engineer',
          department: 'Electrical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-8 years',
          description: 'Lead electrical system design and implementation for industrial facilities.',
          requirements: [
            'B.Tech/M.Tech in Electrical Engineering',
            'Experience with industrial power systems',
            'Knowledge of electrical safety standards',
            'Project management skills'
          ]
        },
        {
          id: 'electrical-maintenance-supervisor',
          title: 'Electrical Maintenance Supervisor',
          department: 'Electrical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years',
          description: 'Supervise electrical maintenance operations and team.',
          requirements: [
            'Diploma/B.Tech in Electrical Engineering',
            'Industrial maintenance experience',
            'Team management skills',
            'Safety compliance knowledge'
          ]
        }
      ]
    },
    {
      id: 'mechanical-services',
      title: 'Mechanical Services',
      description: 'Design and maintain advanced mechanical systems for industrial facilities.',
      jobs: [
        {
          id: 'hvac-engineer',
          title: 'HVAC Engineer',
          department: 'Mechanical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-7 years',
          description: 'Design and optimize HVAC systems for industrial facilities.',
          requirements: [
            'B.Tech in Mechanical Engineering',
            'HVAC system design experience',
            'Energy efficiency expertise',
            'AutoCAD proficiency'
          ]
        },
        {
          id: 'mechanical-project-engineer',
          title: 'Mechanical Project Engineer',
          department: 'Mechanical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Manage mechanical engineering projects from concept to completion.',
          requirements: [
            'B.Tech in Mechanical Engineering',
            'Project management experience',
            'Industrial system knowledge',
            'Team coordination skills'
          ]
        }
      ]
    },
    {
      id: 'civil-works',
      title: 'Civil Works',
      description: 'Build and maintain infrastructure for industrial and commercial projects.',
      jobs: [
        {
          id: 'senior-civil-engineer',
          title: 'Senior Civil Engineer',
          department: 'Civil Works',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '6-8 years',
          description: 'Lead structural design and construction projects.',
          requirements: [
            'B.Tech/M.Tech in Civil Engineering',
            'Structural design experience',
            'Project management expertise',
            'AutoCAD and structural analysis software proficiency'
          ]
        },
        {
          id: 'construction-manager',
          title: 'Construction Manager',
          department: 'Civil Works',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years',
          description: 'Oversee construction projects and ensure quality standards.',
          requirements: [
            'Civil Engineering degree',
            'Construction management experience',
            'Safety compliance knowledge',
            'Team leadership skills'
          ]
        }
      ]
    },
    {
      id: 'automation-services',
      title: 'Automation Services',
      description: 'Develop and implement cutting-edge automation solutions for industrial applications.',
      jobs: [
        {
          id: 'automation-engineer',
          title: 'Automation Engineer',
          department: 'Automation Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Design and implement automation solutions for industrial processes.',
          requirements: [
            'B.Tech in Electronics/Instrumentation',
            'PLC programming experience',
            'SCADA system knowledge',
            'Industrial automation expertise'
          ]
        },
        {
          id: 'plc-programmer',
          title: 'PLC Programmer',
          department: 'Automation Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'Develop and maintain PLC programs for industrial automation systems.',
          requirements: [
            'Diploma/B.Tech in relevant field',
            'PLC programming skills',
            'Industrial control systems experience',
            'Troubleshooting abilities'
          ]
        }
      ]
    },
    {
      id: 'architecture-interior-design',
      title: 'Architecture & Interior Design',
      description: 'Create innovative and sustainable designs for industrial and commercial spaces.',
      jobs: [
        {
          id: 'architect',
          title: 'Architect',
          department: 'Architecture & Interior Design',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Design functional and aesthetic spaces for industrial and commercial facilities.',
          requirements: [
            'B.Arch degree',
            'Commercial project experience',
            'AutoCAD and 3D modeling skills',
            'Knowledge of building codes'
          ]
        },
        {
          id: 'interior-designer',
          title: 'Interior Designer',
          department: 'Architecture & Interior Design',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'Create innovative interior designs for commercial and industrial spaces.',
          requirements: [
            'Degree in Interior Design',
            'Commercial design experience',
            '3D visualization skills',
            'Material and finish knowledge'
          ]
        }
      ]
    },
    {
      id: 'plumbing-services',
      title: 'Plumbing Services',
      description: 'Join our plumbing team to maintain and optimize building water systems and infrastructure.',
      jobs: [
        {
          id: 'plumbing-supervisor',
          title: 'Plumbing Supervisor',
          department: 'Plumbing Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years',
          description: 'Lead plumbing maintenance and installation projects for commercial and industrial facilities.',
          requirements: [
            'Diploma in relevant field',
            'Commercial plumbing experience',
            'Team management skills',
            'Knowledge of plumbing codes'
          ]
        }
      ]
    },
    {
      id: 'facility-pantry',
      title: 'Facility Pantry',
      description: 'Manage and operate facility pantry services to ensure a comfortable workplace environment.',
      jobs: [
        {
          id: 'pantry-supervisor',
          title: 'Pantry Supervisor',
          department: 'Facility Pantry',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Oversee pantry operations and maintain high standards of service and cleanliness.',
          requirements: [
            'Hospitality management degree',
            'Food service experience',
            'Team management skills',
            'Food safety certification'
          ]
        }
      ]
    },
    {
      id: 'horticulture',
      title: 'Horticulture',
      description: 'Create and maintain beautiful green spaces that enhance the workplace environment.',
      jobs: [
        {
          id: 'horticulture-supervisor',
          title: 'Horticulture Supervisor',
          department: 'Horticulture',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Manage landscaping projects and maintain green spaces across facilities.',
          requirements: [
            'Degree in Horticulture',
            'Landscaping experience',
            'Plant maintenance knowledge',
            'Team management skills'
          ]
        }
      ]
    },
    {
      id: 'facade-cleaning',
      title: 'Facade Cleaning',
      description: 'Maintain the pristine appearance of building exteriors through professional cleaning services.',
      jobs: [
        {
          id: 'facade-cleaning-supervisor',
          title: 'Facade Cleaning Supervisor',
          department: 'Facade Cleaning',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years',
          description: 'Lead facade cleaning operations and ensure safety compliance for high-rise buildings.',
          requirements: [
            'Technical certification',
            'High-rise cleaning experience',
            'Safety management skills',
            'Equipment handling expertise'
          ]
        }
      ]
    },
    {
      id: 'security-services',
      title: 'Security Services',
      description: 'Ensure the safety and security of facilities through professional security management.',
      jobs: [
        {
          id: 'security-supervisor',
          title: 'Security Supervisor',
          department: 'Security Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years',
          description: 'Oversee security operations and maintain safety protocols across facilities.',
          requirements: [
            'Security management degree',
            'Industrial security experience',
            'Emergency response training',
            'Team leadership skills'
          ]
        }
      ]
    },
    {
      id: 'vendor-management',
      title: 'Vendor Management',
      description: 'Coordinate with vendors and suppliers to ensure smooth facility operations.',
      jobs: [
        {
          id: 'vendor-manager',
          title: 'Vendor Manager',
          department: 'Vendor Management',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years',
          description: 'Manage vendor relationships and ensure quality service delivery.',
          requirements: [
            'Business management degree',
            'Vendor management experience',
            'Contract negotiation skills',
            'Performance monitoring expertise'
          ]
        }
      ]
    },
    {
      id: 'staffing-payroll',
      title: 'Staffing & Payroll',
      description: 'Manage workforce planning and payroll operations for facility staff.',
      jobs: [
        {
          id: 'staffing-coordinator',
          title: 'Staffing Coordinator',
          department: 'Staffing & Payroll',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Coordinate staffing requirements and manage payroll processing.',
          requirements: [
            'HR management degree',
            'Payroll processing experience',
            'Labor law knowledge',
            'HRIS software proficiency'
          ]
        }
      ]
    },
    {
      id: 'facility-management',
      title: 'Facility Management',
      description: 'Ensure smooth operation and maintenance of commercial and industrial facilities.',
      jobs: [
        {
          id: 'senior-facility-manager',
          title: 'Senior Facility Manager',
          department: 'Facility Management',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '8-10 years',
          description: 'Lead facility operations and maintenance strategies.',
          requirements: [
            'Degree in Facility Management',
            'Extensive facility management experience',
            'Team leadership expertise',
            'Budget management skills'
          ]
        },
        {
          id: 'maintenance-coordinator',
          title: 'Maintenance Coordinator',
          department: 'Facility Management',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Coordinate maintenance activities and vendor relationships.',
          requirements: [
            'Technical diploma or degree',
            'Maintenance planning experience',
            'Vendor management skills',
            'CMMS software knowledge'
          ]
        }
      ]
    }
  ];

  // Find the service and its jobs from CareersPage data
  const service = jobCategories.find(category => category.id === serviceId);
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <Link to="/careers" className="text-blue-600 hover:text-blue-700">
            Return to Careers Page
          </Link>
        </div>
      </div>
    );
  }

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application data to your backend
    console.log('Application submitted:', application);
    // Show success message and reset form
    alert('Application submitted successfully!');
    setShowApplicationForm(false);
    setApplication({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: ''
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <Link 
              to="/careers"
              className="inline-flex items-center text-blue-100 hover:text-white mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to All Openings
            </Link>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-blue-100">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {service.jobs.map((job) => (
                <AnimatedSection key={job.id} className="mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                        <div className="flex flex-wrap gap-4">
                          <span className="inline-flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" /> {job.location}
                          </span>
                          <span className="inline-flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" /> {job.type}
                          </span>
                          <span className="text-sm text-gray-600">
                            {job.experience} experience
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedJob(job.id);
                          setShowApplicationForm(true);
                        }}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                      >
                        Apply Now <ChevronRight className="ml-1 w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                      <p className="text-gray-600 mb-6">{job.description}</p>
                      
                      {job.requirements && (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
                          <ul className="list-disc list-inside text-gray-600 mb-6">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="mb-2">{req}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowApplicationForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for Position</h2>
                <p className="text-gray-600">Fill out the form below to submit your application</p>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={application.name}
                      onChange={(e) => setApplication({...application, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={application.email}
                      onChange={(e) => setApplication({...application, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={application.phone}
                    onChange={(e) => setApplication({...application, phone: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                            onChange={(e) => setApplication({...application, resume: e.target.files?.[0] || null})}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us why you're interested in this position"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={application.coverLetter}
                    onChange={(e) => setApplication({...application, coverLetter: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ServiceJobsPage; 