import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const OtherJobsPage = () => {
  const additionalJobs = [
    {
      id: 'project-coordinator',
      title: 'Project Coordinator',
      department: 'Project Management',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Coordinate and manage industrial automation projects.',
      requirements: [
        'Bachelor\'s degree in Engineering or related field',
        'Experience in project coordination',
        'Strong communication skills',
        'Knowledge of project management tools'
      ]
    },
    {
      id: 'quality-inspector',
      title: 'Quality Inspector',
      department: 'Quality Assurance',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Ensure quality standards in industrial installations.',
      requirements: [
        'Technical diploma or degree',
        'Quality control experience',
        'Knowledge of quality standards',
        'Attention to detail'
      ]
    },
    {
      id: 'technical-writer',
      title: 'Technical Writer',
      department: 'Documentation',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create technical documentation for industrial systems.',
      requirements: [
        'Bachelor\'s degree in Technical Writing or Engineering',
        'Experience in technical documentation',
        'Strong writing skills',
        'Knowledge of documentation tools'
      ]
    },
    {
      id: 'procurement-specialist',
      title: 'Procurement Specialist',
      department: 'Supply Chain',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Manage procurement of industrial equipment and materials.',
      requirements: [
        'Bachelor\'s degree in Supply Chain or related field',
        'Procurement experience',
        'Negotiation skills',
        'Vendor management experience'
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-blue-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Additional Career Opportunities</h1>
              <p className="text-xl text-blue-100">
                Explore more exciting career opportunities at Delta Elmech Systems.
              </p>
            </div>
          </div>
        </section>

        {/* Jobs Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {additionalJobs.map((job, index) => (
                <AnimatedSection key={job.id} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2" />
                        {job.experience}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="w-5 h-5 mr-2" />
                        {job.type}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{job.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <Link 
                      to={`/careers/apply/${job.id}`} 
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                      Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Don't See the Right Fit?</h2>
                <p className="text-gray-600 mb-8">
                  Send us your resume and we'll contact you when relevant opportunities arise.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                >
                  Contact Us <ArrowRight className="ml-2 w-5 h-5" />
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

export default OtherJobsPage; 