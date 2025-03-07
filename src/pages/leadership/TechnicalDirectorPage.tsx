import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Cpu, Zap } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimatedSection from '../../components/AnimatedSection';
import PageTransition from '../../components/PageTransition';

const TechnicalDirectorPage = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sai Tharun Pilli</h1>
              <p className="text-xl text-blue-100">Technical Director</p>
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
                    src="https://images.unsplash.com/photo-1600878459138-e1123d37bb6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80" 
                    alt="Sai Tharun Pilli" 
                    className="w-full rounded-lg shadow-xl"
                  />
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center">
                      <Code className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Technical Expertise</h3>
                        <p className="text-gray-600">Automation & Digital Systems</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Cpu className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Innovation Focus</h3>
                        <p className="text-gray-600">Smart Technology Integration</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Project Leadership</h3>
                        <p className="text-gray-600">Technical Excellence</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:w-2/3">
                <AnimatedSection delay={0.2}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Professional Background</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      As Technical Director at Delta Elmech Systems, Sai Tharun Pilli brings a fresh perspective and innovative approach to industrial automation and facility management. His expertise in modern technologies and digital transformation has been instrumental in advancing the company's technical capabilities.
                    </p>
                    <p className="mb-6">
                      With a strong background in automation engineering and digital systems, Sai Tharun leads the technical team in developing and implementing cutting-edge solutions that enhance operational efficiency and system performance for our clients.
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Areas of Expertise</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Automation Systems</h3>
                      <p className="text-gray-600">
                        Specializes in designing and implementing advanced automation systems for industrial applications, focusing on efficiency and reliability.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Digital Integration</h3>
                      <p className="text-gray-600">
                        Leads the integration of digital technologies and IoT solutions in facility management systems.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Technical Innovation</h3>
                      <p className="text-gray-600">
                        Drives innovation in system design and implementation, incorporating the latest technological advancements.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Project Management</h3>
                      <p className="text-gray-600">
                        Oversees technical aspects of projects, ensuring quality, efficiency, and successful implementation.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Technical Vision</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Sai Tharun's technical vision for Delta Elmech Systems focuses on leveraging advanced technologies to create more intelligent and efficient facility management solutions. He believes in the power of data-driven decision-making and automated systems to transform traditional facility management practices.
                    </p>
                    <p>
                      Under his technical leadership, the company is exploring new frontiers in automation and digital transformation, working to develop solutions that will set new standards in the industry.
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

export default TechnicalDirectorPage;