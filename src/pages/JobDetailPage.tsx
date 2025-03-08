import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, Calendar, Upload, Linkedin, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    linkedin: '',
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fileError, setFileError] = useState('');
  
  // This would typically come from an API or database
  const jobDetails = {
    // Mechanical Services Jobs
    'hvac-technician': {
      title: 'HVAC Technician',
      department: 'Mechanical Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: 'June 15, 2025',
      description: 'We are looking for an experienced HVAC Technician to maintain, repair, and install HVAC systems for our clients.',
      responsibilities: [
        'Install, maintain, and repair HVAC systems',
        'Diagnose and troubleshoot HVAC issues',
        'Perform preventive maintenance on HVAC equipment',
        'Ensure compliance with safety standards and regulations',
        'Maintain accurate records of work performed',
        'Respond to emergency service calls as needed'
      ],
      requirements: [
        'HVAC certification or equivalent technical training',
        '3-5 years of experience in HVAC maintenance and repair',
        'Knowledge of various HVAC systems and components',
        'Ability to read and interpret technical diagrams and manuals',
        'Strong problem-solving and analytical skills',
        'Valid driver\'s license and clean driving record'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    'mechanical-engineer': {
      title: 'Mechanical Engineer',
      department: 'Mechanical Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2-4 years',
      postedDate: 'June 10, 2025',
      description: 'We are seeking a skilled Mechanical Engineer to design and develop mechanical systems for various facility management applications.',
      responsibilities: [
        'Design mechanical systems for commercial and industrial facilities',
        'Develop detailed drawings and specifications',
        'Perform engineering calculations and analysis',
        'Select appropriate materials and components',
        'Collaborate with cross-functional teams on integrated solutions',
        'Oversee installation and commissioning of mechanical systems'
      ],
      requirements: [
        'Bachelor\'s degree in Mechanical Engineering',
        '2-4 years of experience in mechanical design',
        'Proficiency in CAD software (SolidWorks, AutoCAD, etc.)',
        'Experience with HVAC, plumbing, and other building systems',
        'Knowledge of industry codes and standards',
        'Strong analytical and problem-solving skills'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    'maintenance-supervisor': {
      title: 'Maintenance Supervisor',
      department: 'Mechanical Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '5-7 years',
      postedDate: 'June 5, 2025',
      description: 'We are looking for an experienced Maintenance Supervisor to oversee maintenance operations and ensure efficient facility management.',
      responsibilities: [
        'Supervise maintenance staff and coordinate daily activities',
        'Develop and implement preventive maintenance programs',
        'Manage maintenance budgets and resources',
        'Ensure compliance with safety standards and regulations',
        'Coordinate with vendors and contractors',
        'Respond to emergency situations and implement solutions'
      ],
      requirements: [
        'Bachelor\'s degree in Engineering or related field',
        '5-7 years of experience in facility maintenance',
        'Strong leadership and team management skills',
        'Knowledge of building systems and maintenance practices',
        'Experience with CMMS (Computerized Maintenance Management Systems)',
        'Excellent problem-solving and communication abilities'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    
    // Civil Works Jobs
    'civil-engineer': {
      title: 'Civil Engineer',
      department: 'Civil Works',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: 'June 12, 2025',
      description: 'We are seeking a qualified Civil Engineer to design, plan, and oversee construction and maintenance projects for our clients.',
      responsibilities: [
        'Design and plan construction and maintenance projects',
        'Prepare project specifications and cost estimates',
        'Conduct site inspections and quality control',
        'Ensure compliance with building codes and regulations',
        'Coordinate with contractors and other professionals',
        'Resolve design and construction issues'
      ],
      requirements: [
        'Bachelor\'s degree in Civil Engineering',
        '3-5 years of experience in civil engineering',
        'Knowledge of construction methods and materials',
        'Proficiency in AutoCAD and other design software',
        'Understanding of building codes and regulations',
        'Strong analytical and problem-solving skills'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    'construction-supervisor': {
      title: 'Construction Supervisor',
      department: 'Civil Works',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '4-6 years',
      postedDate: 'June 8, 2025',
      description: 'We are looking for an experienced Construction Supervisor to oversee construction projects and ensure quality and timely completion.',
      responsibilities: [
        'Supervise construction activities and workers',
        'Ensure adherence to project plans and specifications',
        'Coordinate with subcontractors and suppliers',
        'Monitor project progress and report to management',
        'Implement safety protocols and ensure compliance',
        'Resolve construction issues and challenges'
      ],
      requirements: [
        'Bachelor\'s degree in Civil Engineering or related field',
        '4-6 years of experience in construction supervision',
        'Knowledge of construction methods and materials',
        'Understanding of building codes and regulations',
        'Strong leadership and team management skills',
        'Excellent problem-solving and communication abilities'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    'project-coordinator': {
      title: 'Project Coordinator',
      department: 'Civil Works',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2-4 years',
      postedDate: 'June 5, 2025',
      description: 'We are seeking a detail-oriented Project Coordinator to assist in the planning, execution, and monitoring of construction and maintenance projects.',
      responsibilities: [
        'Assist in project planning and scheduling',
        'Coordinate with team members, clients, and vendors',
        'Track project progress and prepare reports',
        'Manage project documentation and communications',
        'Support procurement and resource allocation',
        'Identify and address project issues'
      ],
      requirements: [
        'Bachelor\'s degree in Engineering, Construction Management, or related field',
        '2-4 years of experience in project coordination',
        'Knowledge of project management principles',
        'Proficiency in MS Office and project management software',
        'Strong organizational and multitasking abilities',
        'Excellent communication and interpersonal skills'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    
    // Add more job details for other departments...
    
    // Plumbing Services Jobs
    'plumbing-technician': {
      title: 'Plumbing Technician',
      department: 'Plumbing Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2-4 years',
      postedDate: 'June 14, 2025',
      description: 'We are looking for a skilled Plumbing Technician to install, maintain, and repair plumbing systems in commercial and industrial facilities.',
      responsibilities: [
        'Install, maintain, and repair plumbing systems',
        'Diagnose and troubleshoot plumbing issues',
        'Perform preventive maintenance on plumbing equipment',
        'Ensure compliance with plumbing codes and regulations',
        'Maintain accurate records of work performed',
        'Respond to emergency service calls as needed'
      ],
      requirements: [
        'Plumbing certification or equivalent technical training',
        '2-4 years of experience in commercial plumbing',
        'Knowledge of various plumbing systems and components',
        'Ability to read and interpret technical diagrams and manuals',
        'Strong problem-solving and analytical skills',
        'Valid driver\'s license and clean driving record'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    
    // Electrical Services Jobs
    'electrical-engineer': {
      title: 'Electrical Engineer',
      department: 'Electrical Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: 'June 10, 2025',
      description: 'Join our team as an Electrical Engineer to design and implement electrical systems for industrial and commercial facilities.',
      responsibilities: [
        'Design electrical systems for industrial and commercial applications',
        'Develop electrical schematics and documentation',
        'Perform electrical load calculations and system sizing',
        'Specify electrical equipment and components',
        'Conduct site surveys and assessments',
        'Collaborate with clients and team members on project requirements'
      ],
      requirements: [
        'Bachelor\'s degree in Electrical Engineering',
        '3-5 years of experience in electrical system design',
        'Proficiency in electrical design software (AutoCAD Electrical, etc.)',
        'Knowledge of electrical codes and standards (NEC, IEC, etc.)',
        'Experience with power distribution systems',
        'Strong analytical and problem-solving skills'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    
    // Architecture & Interior Design Jobs
    'architect': {
      title: 'Architect',
      department: 'Architecture & Interior Design',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3-5 years',
      postedDate: 'June 8, 2025',
      description: 'We are seeking a creative and technically skilled Architect to design functional and aesthetic spaces for our clients.',
      responsibilities: [
        'Create architectural designs for commercial and industrial spaces',
        'Develop detailed drawings and specifications',
        'Ensure compliance with building codes and regulations',
        'Coordinate with engineers and other professionals',
        'Present design concepts to clients',
        'Oversee project implementation'
      ],
      requirements: [
        'Bachelor\'s or Master\'s degree in Architecture',
        '3-5 years of experience in architectural design',
        'Proficiency in AutoCAD, Revit, and other design software',
        'Knowledge of building codes and regulations',
        'Strong design and visualization skills',
        'Excellent communication and presentation abilities'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    // Facility Management Jobs
    'facility-manager': {
      title: 'Facility Manager',
      department: 'Facility Management Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '5-7 years',
      postedDate: 'June 5, 2025',
      description: 'We are looking for an experienced Facility Manager to oversee the complete operations and maintenance of commercial properties.',
      responsibilities: [
        'Manage all aspects of facility operations and maintenance',
        'Develop and implement facility management policies and procedures',
        'Oversee vendor relationships and service contracts',
        'Manage facility budgets and resource allocation',
        'Ensure compliance with safety and regulatory requirements',
        'Lead facility management team and coordinate activities'
      ],
      requirements: [
        'Bachelor\'s degree in Facility Management, Engineering, or related field',
        '5-7 years of experience in facility management',
        'Strong knowledge of building systems and maintenance practices',
        'Experience with CAFM/CMMS systems',
        'Excellent leadership and team management skills',
        'Strong problem-solving and communication abilities'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    },
    'property-manager': {
      title: 'Property Manager',
      department: 'Facility Management Services',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '4-6 years',
      postedDate: 'June 7, 2025',
      description: 'We are seeking a skilled Property Manager to oversee the management of residential and commercial properties.',
      responsibilities: [
        'Manage day-to-day operations of assigned properties',
        'Handle tenant relations and address concerns',
        'Oversee maintenance and repair activities',
        'Manage property budgets and financial reporting',
        'Ensure compliance with property regulations and standards',
        'Coordinate with service providers and contractors'
      ],
      requirements: [
        'Bachelor\'s degree in Real Estate, Business, or related field',
        '4-6 years of experience in property management',
        'Knowledge of property management software',
        'Understanding of building maintenance and operations',
        'Strong customer service and communication skills',
        'Financial management and budgeting abilities'
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Comprehensive health insurance',
        'Retirement benefits',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Collaborative and innovative work environment'
      ]
    }
  };
  
  const job = jobDetails[id as keyof typeof jobDetails];
  
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Link to="/careers" className="text-blue-600 hover:underline">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size exceeds 5MB limit. Please upload a smaller file.');
        e.target.value = '';
        return;
      }
      
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setFileError('Invalid file type. Please upload a PDF or Word document.');
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!formData.resume) {
      setFileError('Please upload your resume');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this data to your backend
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        experience: '',
        linkedin: '',
        resume: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <Link to="/careers" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition duration-300">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Careers
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{job.title}</h1>
              <div className="flex flex-wrap gap-6 mb-4">
                <span className="inline-flex items-center text-blue-100">
                  <Briefcase className="w-5 h-5 mr-2" /> {job.department}
                </span>
                <span className="inline-flex items-center text-blue-100">
                  <MapPin className="w-5 h-5 mr-2" /> {job.location}
                </span>
                <span className="inline-flex items-center text-blue-100">
                  <Calendar className="w-5 h-5 mr-2" /> Posted: {job.postedDate}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {job.type}
                </span>
                {job.experience && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {job.experience} experience
                  </span>
                )}
                {job.duration && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {job.duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Job Details */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <AnimatedSection>
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
                    <p className="text-gray-700 mb-6">{job.description}</p>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Key Responsibilities</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Requirements</h3>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                      {job.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Benefits</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:w-1/3">
                <AnimatedSection delay={0.2}>
                  <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for this Position</h2>
                    
                    {submitSuccess ? (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        <p className="font-semibold">Application Submitted!</p>
                        <p>Thank you for your interest. We'll review your application and contact you soon.</p>
                        <p className="mt-2 text-sm">A confirmation email has been sent to your email address.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {submitError && (
                          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {submitError}
                          </div>
                        )}
                        
                        <div className="mb-4">
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Years of Experience *
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select experience</option>
                            <option value="0-1">Less than 1 year</option>
                            <option value="1-2">1-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-7">5-7 years</option>
                            <option value="7-10">7-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                            LinkedIn Profile (Optional)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Linkedin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              id="linkedin"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              placeholder="https://linkedin.com/in/yourprofile"
                              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                            Resume/CV (PDF or Word) *
                          </label>
                          <div className="relative border border-gray-300 rounded-md px-4 py-2 bg-white">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center cursor-pointer">
                                <Upload className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-gray-500 text-sm">
                                  {formData.resume ? formData.resume.name : 'Upload your resume'}
                                </span>
                                <input
                                  type="file"
                                  id="resume"
                                  name="resume"
                                  onChange={handleFileChange}
                                  accept=".pdf,.doc,.docx"
                                  required
                                  className="hidden"
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => document.getElementById('resume')?.click()}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Browse
                              </button>
                            </div>
                          </div>
                          {fileError ? (
                            <p className="text-xs text-red-500 mt-1">{fileError}</p>
                          ) : (
                            <p className="text-xs text-gray-500 mt-1">Max file size: 5MB (PDF or Word document)</p>
                          )}
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </form>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar Jobs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Similar Positions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore other opportunities that might match your skills and interests
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(jobDetails)
                .filter(([key, value]) => key !== id && value.department === job.department)
                .slice(0, 3)
                .map(([key, similarJob]) => (
                  <AnimatedSection key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{similarJob.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" /> {similarJob.location}
                        </span>
                        <span className="text-sm text-gray-600">{similarJob.type}</span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{similarJob.description}</p>
                      <Link 
                        to={`/careers/${key}`} 
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
                      >
                        View Details <ChevronRight className="ml-1 w-5 h-5" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default JobDetailPage;