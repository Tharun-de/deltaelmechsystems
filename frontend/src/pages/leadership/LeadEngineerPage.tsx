import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, PenTool as Tool, Cpu } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimatedSection from '../../components/AnimatedSection';
import PageTransition from '../../components/PageTransition';

const LeadEngineerPage = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Ravi Kumar</h1>
              <p className="text-xl text-blue-100">Lead Automation Engineer</p>
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
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80" 
                    alt="Ravi Kumar" 
                    className="w-full rounded-lg shadow-xl"
                  />
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center">
                      <Settings className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Automation Expert</h3>
                        <p className="text-gray-600">10+ Years Experience</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Tool className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Technical Skills</h3>
                        <p className="text-gray-600">Advanced Control Systems</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Cpu className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">System Design</h3>
                        <p className="text-gray-600">Industrial Solutions</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:w-2/3">
                <AnimatedSection delay={0.2}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Technical Expertise</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Ravi Kumar brings over 10 years of experience in industrial automation and control systems to his role as Lead Automation Engineer at Delta Elmech Systems. His expertise spans across PLC programming, SCADA systems, and advanced control system design.
                    </p>
                    <p className="mb-6">
                      Throughout his career, he has successfully implemented cutting-edge automation solutions for various industrial applications, consistently delivering projects that improve operational efficiency and system reliability.
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Technical Specializations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">PLC Systems</h3>
                      <p className="text-gray-600">
                        Expert in programming and implementing various PLC platforms for industrial control applications.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">SCADA Development</h3>
                      <p className="text-gray-600">
                        Specializes in designing and implementing SCADA systems for process monitoring and control.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Industrial IoT</h3>
                      <p className="text-gray-600">
                        Implements IoT solutions for industrial applications, enabling smart monitoring and control.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">System Integration</h3>
                      <p className="text-gray-600">
                        Expertise in integrating various control systems and industrial equipment.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Project Achievements</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Under Ravi's technical leadership, Delta Elmech Systems has successfully implemented numerous automation projects that have significantly improved client operations. His focus on quality and innovation has been key to delivering reliable and efficient solutions.
                    </p>
                    <p>
                      He continues to drive technical excellence in automation projects, staying at the forefront of technological advancements and ensuring the highest standards of system performance and reliability.
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

export default LeadEngineerPage;