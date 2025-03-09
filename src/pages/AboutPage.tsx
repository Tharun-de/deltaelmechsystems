import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Clock, Zap, CheckCircle, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';
import CountUpCircle from '../components/CountUpCircle';

const AboutPage = () => {
  const values = [
    {
      icon: <Award className="w-10 h-10 text-blue-600" />,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality solutions that exceed client expectations.'
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: 'Collaboration',
      description: 'We work closely with our clients and partners to achieve shared goals and success.'
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: 'Innovation',
      description: 'We continuously explore new technologies and approaches to solve complex challenges.'
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: 'Reliability',
      description: 'We deliver on our promises and stand behind the quality of our work.'
    }
  ];

  const milestones = [
    {
      year: '2014',
      title: 'Company Founded',
      description: 'Delta Elmech Systems was established in Hyderabad with a small team of 5 engineers.'
    },
    {
      year: '2016',
      title: 'First Major Project',
      description: 'Completed automation of a large automotive manufacturing plant, increasing production efficiency by 35%.'
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Expanded operations to serve multiple industrial sectors across India.'
    },
    {
      year: '2020',
      title: 'Innovation Award',
      description: 'Received the Industry Innovation Award for our work in energy-efficient automation solutions.'
    },
    {
      year: '2022',
      title: 'Team Growth',
      description: 'Expanded to a team of 100+ engineers and specialists across multiple disciplines.'
    },
    {
      year: '2024',
      title: 'Digital Transformation',
      description: 'Launched our Industrial IoT division to help clients leverage data and connectivity in their operations.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white pt-32 pb-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Modern office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-gray-900/10"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Delta Elmech Systems</h1>
              <p className="text-xl">
                We are a team of passionate engineers dedicated to solving complex industrial challenges through innovative automation and engineering solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    Founded in 2014, Delta Elmech Systems began with a simple mission: to help industrial clients optimize their operations through innovative engineering solutions. What started as a small team of five passionate engineers has grown into a leading organization with offices across India.
                  </p>
                  <p className="mb-4">
                    Over the years, we've had the privilege of working with leading companies across various industries, from automotive and manufacturing to pharmaceuticals and energy. Our commitment to excellence and client satisfaction has been the driving force behind our growth and success.
                  </p>
                  <p>
                    Today, Delta Elmech Systems is recognized as a leader in industrial automation, electrical engineering, and mechanical systems. We continue to push the boundaries of what's possible, leveraging the latest technologies to deliver solutions that drive efficiency, productivity, and sustainability for our clients.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Projects Counter */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <CountUpCircle
                  endValue={10000}
                  duration={2000}
                  label="Projects Successfully Completed"
                />
                <CountUpCircle
                  endValue={5000}
                  duration={2000}
                  label="Happy Clients Served"
                />
                <CountUpCircle
                  endValue={15}
                  duration={2000}
                  label="Years of Excellence"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide our work and define our culture.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={index * 0.1} className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
                  <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Key milestones that have shaped our company's growth and evolution.
              </p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} delay={index * 0.1} className="relative pl-10 pb-10 border-l-2 border-blue-200 last:border-0 last:pb-0 ml-6">
                  <div className="absolute left-[-8px] top-0 bg-blue-600 w-4 h-4 rounded-full"></div>
                  <div className="absolute left-[-40px] top-[-5px] bg-blue-100 text-blue-600 font-bold py-1 px-3 rounded-full">
                    {milestone.year}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Delta Elmech Systems</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                What sets us apart from other engineering firms.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection delay={0.1} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive Expertise</h3>
                    <p className="text-gray-600">
                      Our team brings together expertise in automation, electrical, and mechanical engineering, allowing us to deliver integrated solutions that address all aspects of your industrial systems.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Experience</h3>
                    <p className="text-gray-600">
                      With over 15 years in the industry, we've worked across diverse sectors and applications, giving us the insights and knowledge to tackle even the most complex challenges.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Client-Centered Approach</h3>
                    <p className="text-gray-600">
                      We prioritize understanding your unique needs and challenges, working collaboratively to develop solutions that align with your goals and deliver measurable results.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Commitment to Innovation</h3>
                    <p className="text-gray-600">
                      We continuously explore and adopt new technologies and methodologies to ensure our clients benefit from the most advanced and efficient solutions available.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-10 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Contact our team today to discuss how we can help you optimize your industrial operations.
                </p>
                <Link to="/contact" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition duration-300 inline-block">
                  Get in Touch
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore Our Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our portfolio of successful projects and innovative solutions.
              </p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto">
              <AnimatedSection delay={0.1}>
                <Link 
                  to="/our-works"
                  className="group block bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src="/images/portfolio/showcase.jpg" 
                        alt="Project Showcase"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-2">View Our Portfolio</h3>
                        <p className="text-gray-200 mb-4">Explore our collection of successful projects across various industries.</p>
                        <span className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                          Learn More <ChevronRight className="ml-1 w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AboutPage;