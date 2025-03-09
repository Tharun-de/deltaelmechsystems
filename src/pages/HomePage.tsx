import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Shield, Zap, ArrowRight, CheckCircle, ChevronRight, Building, Wrench, Paintbrush, Leaf, Users, ShieldCheck, Phone, Headphones, Briefcase, BarChart } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import ClientLogos from '../components/ClientLogos';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

interface Stat {
  number: string;
  label: string;
  icon: React.ReactNode;
}

interface Strength {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

// Error Fallback Component
const ErrorFallback: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
    <p className="text-gray-600 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
    >
      Try again
    </button>
  </div>
);

const HomePage: React.FC = () => {
  const services = [
    {
      id: 'electrical-services',
      icon: <Zap className="w-12 h-12 text-blue-500" />,
      title: "Electrical Services",
      description: "Complete electrical system maintenance and installations.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 'mechanical-services',
      icon: <Wrench className="w-12 h-12 text-blue-500" />,
      title: "Mechanical Services",
      description: "Comprehensive HVAC maintenance, elevator maintenance, and mechanical system optimization.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 'civil-works',
      icon: <Building className="w-12 h-12 text-blue-500" />,
      title: "Civil Works",
      description: "Structural maintenance, repairs, renovations, and infrastructure development.",
      image: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 'architecture-interior-design',
      icon: <Paintbrush className="w-12 h-12 text-blue-500" />,
      title: "Architecture & Interior Design",
      description: "Modern architectural solutions and interior design services.",
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 'facility-management',
      icon: <Building className="w-12 h-12 text-blue-500" />,
      title: "Facility Management",
      description: "Comprehensive facility management for commercial and industrial properties.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 'security-services',
      icon: <ShieldCheck className="w-12 h-12 text-blue-500" />,
      title: "Security Services",
      description: "Advanced security systems and monitoring solutions for complete protection.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Briefcase className="w-8 h-8 text-blue-600" />
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Phone className="w-8 h-8 text-blue-600" />
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <BarChart className="w-8 h-8 text-blue-600" />
    }
  ];

  const strengths = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Industry Expertise",
      description: "Over 15 years of experience in facility management and industrial solutions."
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
      position: "Facility Manager",
      company: "Tata Consultancy Services",
      content: "Delta Elmech's facility management solutions have significantly improved our operational efficiency. Their team's expertise and dedication are truly commendable.",
      image: "/images/testimonials/rajesh.jpg",
      rating: 5
    },
    {
      name: "Priya Sharma",
      position: "Operations Director",
      company: "Infosys",
      content: "Working with Delta Elmech has been a game-changer for our facility operations. Their innovative solutions and responsive support have exceeded our expectations.",
      image: "/images/testimonials/priya.jpg",
      rating: 5
    },
    {
      name: "Arun Patel",
      position: "Chief Engineer",
      company: "Wipro Technologies",
      content: "The level of professionalism and technical expertise Delta Elmech brings to the table is outstanding. They've helped us achieve significant cost savings.",
      image: "/images/testimonials/arun.jpg",
      rating: 5
    }
  ];

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PageTransition>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          {/* Hero Section */}
          <AnimatePresence>
            <section className="relative min-h-[90vh] flex items-center">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 animate-gradient-x">
                  <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
              </div>

              <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <motion.div 
                    className="md:w-1/2 text-white"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-6xl font-bold mb-6 leading-tight">
                      Engineering Excellence for the <span className="text-blue-400">Future</span> - Updated
                    </h1>
                    <p className="text-xl mb-8 text-gray-200">
                      Delta Elmech Systems delivers innovative engineering solutions that transform industries and drive sustainable growth. Experience the difference with our cutting-edge technology and expert team.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to="/contact" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition duration-300 flex items-center group"
                      >
                        Start Your Project 
                        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link 
                        to="/services" 
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full transition duration-300 backdrop-blur-sm"
                      >
                        Explore Services
                      </Link>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="md:w-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img 
                      src="/images/hero-3d-model.png" 
                      alt="3D Engineering Model" 
                      className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </section>
          </AnimatePresence>

          {/* Stats Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <AnimatedSection 
                    key={index} 
                    delay={index * 0.1} 
                    className="text-center p-6 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <p className="text-blue-600 font-semibold mb-2">OUR SERVICES</p>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Comprehensive Engineering Solutions</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We offer a wide range of engineering and facility management services to meet your needs.
                </p>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <AnimatedSection key={service.id} delay={index * 0.1}>
                    <Link to={`/services/${service.id}`} className="block">
                      <div className="group relative overflow-hidden rounded-2xl h-[280px]">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent">
                          <div className="absolute bottom-0 p-6">
                            <div className="bg-blue-500/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                              {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-gray-200 text-sm">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <p className="text-blue-600 font-semibold mb-2">WHY CHOOSE US</p>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Strengths</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We combine expertise, innovation, and dedication to deliver exceptional engineering solutions.
                </p>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {strengths.map((strength, index) => (
                  <AnimatedSection 
                    key={index} 
                    delay={index * 0.1} 
                    className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
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
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Client Success Stories</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover how we've helped leading organizations achieve their engineering goals.
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
          <section className="py-20">
            <div className="container mx-auto px-6">
              <AnimatedSection>
                <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-12 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
                  <h2 className="text-4xl font-bold mb-4 relative z-10">Ready to Transform Your Engineering Operations?</h2>
                  <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200 relative z-10">
                    Let's discuss how our engineering solutions can optimize your processes and drive innovation.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 px-10 rounded-full transition duration-300 relative z-10 group"
                  >
                    Schedule a Consultation
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Our Works Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Works</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore our portfolio of successful projects and innovative solutions.
                </p>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <AnimatedSection delay={0.1}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src="/images/portfolio/automation.jpg" 
                        alt="Industrial Automation"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Industrial Automation</h3>
                      <p className="text-gray-600 mb-4">Advanced automation solutions for manufacturing facilities.</p>
                      <Link 
                        to="/our-works" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                      >
                        View Project <ChevronRight className="ml-1 w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src="/images/portfolio/electrical.jpg" 
                        alt="Electrical Infrastructure"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Electrical Infrastructure</h3>
                      <p className="text-gray-600 mb-4">Power distribution systems for commercial complexes.</p>
                      <Link 
                        to="/our-works" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                      >
                        View Project <ChevronRight className="ml-1 w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src="/images/portfolio/mechanical.jpg" 
                        alt="HVAC Systems"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">HVAC Systems</h3>
                      <p className="text-gray-600 mb-4">Modern HVAC installations for office buildings.</p>
                      <Link 
                        to="/our-works" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                      >
                        View Project <ChevronRight className="ml-1 w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="text-center mt-12">
                <Link 
                  to="/our-works"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                >
                  View All Projects <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </PageTransition>
    </ErrorBoundary>
  );
};

export default HomePage;