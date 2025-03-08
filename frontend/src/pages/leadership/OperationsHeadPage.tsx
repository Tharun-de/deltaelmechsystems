import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Users } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimatedSection from '../../components/AnimatedSection';
import PageTransition from '../../components/PageTransition';

const OperationsHeadPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <Link to="/about" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition duration-300">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to About
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Navya</h1>
              <p className="text-xl text-blue-100">Head of Operations</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                <AnimatedSection>
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80" 
                    alt="Navya" 
                    className="w-full rounded-lg shadow-xl"
                  />
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center">
                      <Target className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Strategic Planning</h3>
                        <p className="text-gray-600">Operational Excellence</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Efficiency Focus</h3>
                        <p className="text-gray-600">Process Optimization</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Team Leadership</h3>
                        <p className="text-gray-600">People Management</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:w-2/3">
                <AnimatedSection delay={0.2}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Professional Profile</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      As Head of Operations at Delta Elmech Systems, Navya brings exceptional organizational skills and strategic thinking to ensure smooth operational execution across all projects and services. Her leadership style emphasizes efficiency, quality, and client satisfaction.
                    </p>
                    <p className="mb-6">
                      With a keen eye for detail and a strong background in operations management, she has been instrumental in streamlining processes and implementing systems that have significantly improved the company's operational efficiency.
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Key Responsibilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Operations Management</h3>
                      <p className="text-gray-600">
                        Oversees daily operations, ensuring efficient resource allocation and project execution across all service areas.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Team Coordination</h3>
                      <p className="text-gray-600">
                        Leads and coordinates multiple teams, fostering collaboration and maintaining high performance standards.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Process Optimization</h3>
                      <p className="text-gray-600">
                        Develops and implements operational strategies to enhance efficiency and service delivery.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Assurance</h3>
                      <p className="text-gray-600">
                        Ensures consistent service quality and maintains high standards across all operations.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Operational Approach</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Navya's operational approach focuses on creating scalable and efficient systems that enable the company to deliver consistent, high-quality services. She emphasizes the importance of clear communication, proactive problem-solving, and continuous improvement.
                    </p>
                    <p>
                      Through her leadership, Delta Elmech Systems has achieved significant improvements in operational efficiency, client satisfaction, and team productivity. Her vision continues to drive operational excellence and innovation in service delivery.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default OperationsHeadPage;