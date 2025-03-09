import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Zap, Settings, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';
import ServiceJobCard from '../components/ServiceJobCard';

const CareersPage = () => {
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
          description: 'Design and implement automation solutions for industrial processes.'
        },
        {
          id: 'plc-programmer',
          title: 'PLC Programmer',
          department: 'Automation Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'Develop and maintain PLC programs for industrial automation systems.'
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
          description: 'Design functional and aesthetic spaces for industrial and commercial facilities.'
        },
        {
          id: 'interior-designer',
          title: 'Interior Designer',
          department: 'Architecture & Interior Design',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'Create innovative interior designs for commercial and industrial spaces.'
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
          description: 'Lead plumbing maintenance and installation projects for commercial and industrial facilities.'
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
          description: 'Oversee pantry operations and maintain high standards of service and cleanliness.'
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
          description: 'Manage landscaping projects and maintain green spaces across facilities.'
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
          description: 'Lead facade cleaning operations and ensure safety compliance for high-rise buildings.'
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
          description: 'Oversee security operations and maintain safety protocols across facilities.'
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
          description: 'Manage vendor relationships and ensure quality service delivery.'
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
          description: 'Coordinate staffing requirements and manage payroll processing.'
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
            'Degree in Facility Management or related field',
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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-blue-100">
                Be part of a dynamic team working on innovative solutions for industrial and commercial facilities.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Delta Elmech Systems?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a dynamic work environment where innovation is encouraged, professional growth is supported, and your contributions make a real impact.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <AnimatedSection delay={0.1}>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Innovative Projects</h3>
                  <p className="text-gray-600">
                    Work on cutting-edge projects that challenge your skills and push the boundaries of industrial engineering.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <Settings className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Growth</h3>
                  <p className="text-gray-600">
                    Benefit from continuous learning opportunities, mentorship programs, and a clear career progression path.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Culture</h3>
                  <p className="text-gray-600">
                    Join a team of passionate professionals who work together to solve complex engineering challenges.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Job Openings</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our current opportunities and find a role that matches your skills and career aspirations.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {jobCategories.map((category, index) => (
                <AnimatedSection key={category.id} delay={index * 0.1}>
                  <ServiceJobCard
                    id={category.id}
                    title={category.title}
                    jobCount={category.jobs.length}
                    description={category.description}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Internship Program</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start your career with hands-on experience in your field of interest.
              </p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto">
              <AnimatedSection className="bg-blue-50 rounded-xl p-8 border border-blue-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Engineering Internship Program</h3>
                    <p className="text-gray-600 mb-4">
                      Join our 6-month internship program to gain practical experience in mechanical, electrical, or civil engineering.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" /> Hyderabad, India
                      </span>
                      <span className="text-sm text-gray-600">6 months duration</span>
                    </div>
                  </div>
                  <Link 
                    to="/careers/internship"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 whitespace-nowrap"
                  >
                    Apply Now <ChevronRight className="ml-1 w-5 h-5" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default CareersPage;