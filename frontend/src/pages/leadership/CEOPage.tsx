import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Briefcase, Users } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AnimatedSection from '../../components/AnimatedSection';
import PageTransition from '../../components/PageTransition';

const CEOPage = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Pilli Rajaiah</h1>
              <p className="text-xl text-blue-100">CEO & Founder</p>
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
                    src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80" 
                    alt="Pilli Rajaiah" 
                    className="w-full rounded-lg shadow-xl"
                  />
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">25+ Years Experience</h3>
                        <p className="text-gray-600">In Industrial Automation</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">Founded in 2014</h3>
                        <p className="text-gray-600">Delta Elmech Systems</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-6 h-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-bold text-gray-800">100+ Team Members</h3>
                        <p className="text-gray-600">Growing Organization</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              <div className="lg:w-2/3">
                <AnimatedSection delay={0.2}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Professional Journey</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      With over 25 years of experience in industrial automation and engineering, Pilli Rajaiah has established himself as a visionary leader in the facility management industry. His journey began with a strong foundation in electrical engineering and a passion for innovative solutions.
                    </p>
                    <p className="mb-6">
                      In 2014, he founded Delta Elmech Systems with a clear vision: to revolutionize facility management through cutting-edge technology and exceptional service. Under his leadership, the company has grown from a small team of five engineers to a comprehensive organization with over 100 skilled professionals.
                    </p>
                    <p className="mb-6">
                      His expertise spans across various domains including industrial automation, electrical systems, and mechanical engineering. This multidisciplinary knowledge has been instrumental in developing integrated solutions that address complex facility management challenges.
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Key Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Industry Innovation</h3>
                      <p className="text-gray-600">
                        Pioneered the implementation of IoT-based facility management solutions, resulting in 30% improved operational efficiency for clients.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Business Growth</h3>
                      <p className="text-gray-600">
                        Led the company's expansion across multiple sectors, achieving consistent year-over-year growth of 40%.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Client Success</h3>
                      <p className="text-gray-600">
                        Established partnerships with leading organizations, maintaining a 95% client retention rate through excellence in service delivery.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Team Development</h3>
                      <p className="text-gray-600">
                        Built a high-performing team of engineers and technicians, fostering a culture of innovation and continuous learning.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">Vision for the Future</h2>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-6">
                      Pilli Rajaiah's vision for Delta Elmech Systems extends beyond traditional facility management. He aims to leverage emerging technologies like AI and machine learning to create smarter, more efficient facility management solutions.
                    </p>
                    <p>
                      Under his guidance, the company continues to invest in research and development, focusing on sustainable practices and innovative solutions that will shape the future of facility management in India and beyond.
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

export default CEOPage;