import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const CareersPage = () => {
  // This would typically come from an API or database
  const jobCategories = [
    {
      id: 'mechanical-services',
      title: 'Mechanical Services',
      jobs: [
        {
          id: 'hvac-technician',
          title: 'HVAC Technician',
          department: 'Mechanical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'We are looking for an experienced HVAC Technician to design, program, and implement automated control systems for industrial applications.'
        },
        {
          id: 'mechanical-engineer',
          title: 'Mechanical Engineer',
          department: 'Mechanical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'Join our team as a Mechanical Engineer to design and implement mechanical systems for industrial and commercial facilities.'
        },
        {
          id: 'maintenance-supervisor',
          title: 'Maintenance Supervisor',
          department: 'Mechanical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years',
          description: 'We are seeking a skilled Maintenance Supervisor to oversee maintenance operations and ensure efficient facility management.'
        }
      ]
    },
    {
      id: 'civil-works',
      title: 'Civil Works',
      jobs: [
        {
          id: 'civil-engineer',
          title: 'Civil Engineer',
          department: 'Civil Works',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'We are seeking a qualified Civil Engineer to design, plan, and oversee construction and maintenance projects for our clients.'
        },
        {
          id: 'construction-supervisor',
          title: 'Construction Supervisor',
          department: 'Civil Works',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years',
          description: 'We are looking for an experienced Construction Supervisor to oversee construction projects and ensure quality and timely completion.'
        },
        {
          id: 'project-coordinator',
          title: 'Project Coordinator',
          department: 'Civil Works',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'We are seeking a detail-oriented Project Coordinator to assist in the planning, execution, and monitoring of construction and maintenance projects.'
        }
      ]
    },
    {
      id: 'plumbing-services',
      title: 'Plumbing Services',
      jobs: [
        {
          id: 'plumbing-technician',
          title: 'Plumbing Technician',
          department: 'Plumbing Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'We are looking for a skilled Plumbing Technician to install, maintain, and repair plumbing systems in commercial and industrial facilities.'
        }
      ]
    },
    {
      id: 'electrical-services',
      title: 'Electrical Services',
      jobs: [
        {
          id: 'electrical-engineer',
          title: 'Electrical Engineer',
          department: 'Electrical Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'Join our team as an Electrical Engineer to design and implement electrical systems for industrial and commercial facilities.'
        }
      ]
    },
    {
      id: 'architecture-interior-design',
      title: 'Architecture & Interior Design',
      jobs: [
        {
          id: 'architect',
          title: 'Architect',
          department: 'Architecture & Interior Design',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years',
          description: 'We are seeking a creative and technically skilled Architect to design functional and aesthetic spaces for our clients.'
        }
      ]
    },
    {
      id: 'facility-management',
      title: 'Facility Management Services',
      jobs: [
        {
          id: 'facility-manager',
          title: 'Facility Manager',
          department: 'Facility Management Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years',
          description: 'We are looking for an experienced Facility Manager to oversee the operations and maintenance of commercial and corporate facilities.'
        },
        {
          id: 'property-manager',
          title: 'Property Manager',
          department: 'Facility Management Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years',
          description: 'We are seeking a detail-oriented Property Manager to oversee the operations and maintenance of residential and commercial properties.'
        },
        {
          id: 'operations-coordinator',
          title: 'Operations Coordinator',
          department: 'Facility Management Services',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years',
          description: 'We are looking for an Operations Coordinator to support facility management operations and ensure smooth day-to-day functioning of managed properties.'
        }
      ]
    }
  ];

  const internships = [
    {
      id: 'automation-intern',
      title: 'Automation Engineering Intern',
      department: 'Engineering',
      location: 'Hyderabad, India',
      duration: '6 months',
      description: 'Gain hands-on experience in industrial automation, working alongside experienced engineers on real-world projects.'
    },
    {
      id: 'electrical-intern',
      title: 'Electrical Engineering Intern',
      department: 'Engineering',
      location: 'Hyderabad, India',
      duration: '3 months',
      description: 'Learn about electrical system design and implementation for industrial applications in a practical setting.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white pt-32 pb-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/75"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-blue-100">
                Discover exciting career opportunities at Delta Elmech Systems and be part of our mission to deliver innovative engineering solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Join Delta Elmech Systems?</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We offer a dynamic work environment where innovation is encouraged, professional growth is supported, and your contributions make a real impact.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection delay={0.1} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Innovative Projects</h3>
                <p className="text-gray-600">
                  Work on cutting-edge projects that challenge your skills and push the boundaries of industrial engineering.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Professional Growth</h3>
                <p className="text-gray-600">
                  Benefit from continuous learning opportunities, mentorship programs, and a clear career progression path.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Collaborative Culture</h3>
                <p className="text-gray-600">
                  Join a team of passionate professionals who work together to solve complex engineering challenges.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Job Openings Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Current Job Openings</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our current opportunities and find a role that matches your skills and career aspirations.
              </p>
            </AnimatedSection>
            
            <div className="space-y-12">
              {jobCategories.map((category, categoryIndex) => (
                <AnimatedSection key={category.id} delay={categoryIndex * 0.1}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">{category.title}</h3>
                  <div className="space-y-6">
                    {category.jobs.map((job, jobIndex) => (
                      <div 
                        key={job.id} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 hover:shadow-xl"
                      >
                        <div className="p-6 flex flex-col md:flex-row justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                            <div className="flex flex-wrap gap-4 mb-4">
                              <span className="inline-flex items-center text-sm text-gray-600">
                                <Briefcase className="w-4 h-4 mr-1" /> {job.department}
                              </span>
                              <span className="inline-flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" /> {job.location}
                              </span>
                              <span className="text-sm text-gray-600">{job.type}</span>
                              <span className="text-sm text-gray-600">{job.experience} experience</span>
                            </div>
                            <p className="text-gray-600 mb-4">{job.description}</p>
                          </div>
                          <Link 
                            to={`/careers/${job.id}`} 
                            className="mt-4 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                          >
                            View Details <ChevronRight className="ml-1 w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Internships Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Internship Opportunities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kickstart your career with an internship at Delta Elmech Systems and gain valuable industry experience.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internships.map((internship, index) => (
                <AnimatedSection 
                  key={internship.id} 
                  delay={index * 0.1}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{internship.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-1" /> {internship.department}
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" /> {internship.location}
                      </span>
                      <span className="text-sm text-gray-600">{internship.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{internship.description}</p>
                    <Link 
                      to={`/careers/${internship.id}`} 
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                    >
                      View Details <ChevronRight className="ml-1 w-5 h-5" />
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="bg-blue-600 rounded-2xl p-10 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Match?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <Link to="/contact" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition duration-300 inline-block">
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default CareersPage;