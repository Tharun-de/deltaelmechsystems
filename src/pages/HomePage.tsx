import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Cpu, Shield, Zap, ArrowRight, CheckCircle, ChevronRight, Building, Wrench, Paintbrush, Leaf, Users, ShieldCheck, Phone, Headphones, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import ClientLogos from '../components/ClientLogos';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const HomePage = () => {
  const services = [
    {
      id: 'mechanical-services',
      icon: <Wrench className="w-10 h-10 text-blue-600" />,
      title: "Mechanical Services",
      description: "Comprehensive HVAC maintenance, elevator maintenance, and mechanical system optimization.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22731ce444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'civil-works',
      icon: <Building className="w-10 h-10 text-blue-600" />,
      title: "Civil Works",
      description: "Structural maintenance, repairs, renovations, and infrastructure development.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'electrical-services',
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: "Electrical Services",
      description: "Complete electrical system maintenance and installations.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'facility-management',
      icon: <Building className="w-10 h-10 text-blue-600" />,
      title: "Facility Management",
      description: "Comprehensive facility management for commercial and industrial properties.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const strengths = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Industry Expertise",
      description: "Over 10 years of experience in facility management and industrial solutions."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Dedicated Team",
      description: "Skilled professionals committed to delivering excellence in every project."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensuring top-tier service delivery."
    },
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "Innovation Focus",
      description: "Leveraging cutting-edge technology for optimal solutions."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tata Consultancy Services",
      content: "Delta Elmech's facility management solutions have significantly improved our operational efficiency. Their team's expertise and dedication are truly commendable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Priya Sharma",
      company: "Infosys",
      content: "Working with Delta Elmech has been a game-changer for our facility operations. Their innovative solutions and responsive support have exceeded our expectations.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Arun Patel",
      company: "Wipro Technologies",
      content: "The level of professionalism and technical expertise Delta Elmech brings to the table is outstanding. They've helped us achieve significant cost savings.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Modern building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-gray-900/10"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl font-bold mb-6 leading-tight">Innovative Solutions for <span className="text-blue-300">Facility Management</span></h1>
                <p className="text-xl mb-8">Delta Elmech Systems provides comprehensive facility management and contracting services for modern industrial and commercial needs.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link to="/services" className="bg-blue-800/20 hover:bg-blue-800/40 text-white font-semibold py-3 px-6 rounded-md transition duration-300 backdrop-blur-sm">
                    Explore Services
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <p className="text-blue-600 font-semibold mb-2">OUR SERVICES</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Facility Management Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a comprehensive range of facility management services designed to optimize your operations and increase productivity.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <Link to={`/services/${service.id}`} className="group">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="relative h-64">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
                            {service.icon}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-gray-200">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300">
                View All Services <ChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <p className="text-blue-600 font-semibold mb-2">WHY CHOOSE US</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Strengths</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We bring together expertise, innovation, and dedication to deliver exceptional facility management solutions.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {strengths.map((strength, index) => (
                <AnimatedSection key={index} delay={index * 0.1} className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
                  <div className="bg-blue-50 p-4 rounded-full inline-block mb-4">
                    {strength.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{strength.title}</h3>
                  <p className="text-gray-600">{strength.description}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <p className="text-blue-600 font-semibold mb-2">TESTIMONIALS</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from our satisfied clients about their experience working with Delta Elmech Systems.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <TestimonialCard {...testimonial} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <ClientLogos />

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-10 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Facility Management?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Contact us today to discuss how our facility management solutions can help optimize your processes and increase productivity.
                </p>
                <Link to="/contact" className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition duration-300 inline-block">
                  Get in Touch
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

export default HomePage;