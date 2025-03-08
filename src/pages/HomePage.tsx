import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Cpu, Shield, Zap, ArrowRight, CheckCircle, ChevronRight, Building, Wrench, Paintbrush, Leaf, Users, ShieldCheck, Phone, Headphones, Briefcase, BarChart } from 'lucide-react';
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

const HomePage = () => {
  const services = [
    {
      id: 'mechanical-services',
      icon: <Wrench className="w-10 h-10 text-blue-600" />,
      title: "Mechanical Services",
      description: "Comprehensive HVAC maintenance, elevator maintenance, and mechanical system optimization.",
      image: "/images/services/mechanical.jpg"
    },
    {
      id: 'civil-works',
      icon: <Building className="w-10 h-10 text-blue-600" />,
      title: "Civil Works",
      description: "Structural maintenance, repairs, renovations, and infrastructure development.",
      image: "/images/services/civil.jpg"
    },
    {
      id: 'electrical-services',
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: "Electrical Services",
      description: "Complete electrical system maintenance and installations.",
      image: "/images/services/electrical.jpg"
    },
    {
      id: 'facility-management',
      icon: <Building className="w-10 h-10 text-blue-600" />,
      title: "Facility Management",
      description: "Comprehensive facility management for commercial and industrial properties.",
      image: "/images/services/facility.jpg"
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
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-background.mp4" type="video/mp4" />
            </video>
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
                  Engineering Excellence for the <span className="text-blue-400">Future</span>
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  Delta Elmech Systems delivers innovative engineering solutions that transform industries and drive sustainable growth.
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <p className="text-blue-600 font-semibold mb-2">OUR SERVICES</p>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Comprehensive Engineering Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer end-to-end engineering services designed to optimize your operations and drive innovation.
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <Link to={`/services/${service.id}`} className="group">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-72">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                          <div className="bg-blue-600/20 backdrop-blur-sm p-3 rounded-full inline-block mb-4">
                            {service.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-gray-200">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                to="/services" 
                className="inline-flex items-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition duration-300"
              >
                View All Services <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
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
                <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Engineering Operations?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
                  Let's discuss how our engineering solutions can optimize your processes and drive innovation.
                </p>
                <Link 
                  to="/contact" 
                  className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 px-10 rounded-full transition duration-300 inline-flex items-center group"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
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