import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Cpu, Shield, Zap, ChevronRight, Building, Wrench, Paintbrush, Leaf, Users, ShieldCheck, Phone, Headphones, Briefcase, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const ServicesPage = () => {
  const services = [
    {
      id: 'mechanical-services',
      icon: <Wrench className="w-12 h-12 text-blue-600" />,
      title: "Mechanical Services",
      description: "Comprehensive HVAC maintenance, elevator maintenance, and mechanical system optimization.",
      features: [
        "HVAC system maintenance and repair",
        "Elevator and escalator maintenance",
        "Mechanical equipment installation",
        "Preventive maintenance programs",
        "Emergency repair services",
        "Energy efficiency optimization"
      ]
    },
    {
      id: 'civil-works',
      icon: <Building className="w-12 h-12 text-blue-600" />,
      title: "Civil Works",
      description: "Structural maintenance, repairs, renovations, and infrastructure development.",
      features: [
        "Building repairs and maintenance",
        "Renovation and remodeling",
        "Waterproofing solutions",
        "Structural assessments",
        "Infrastructure development",
        "Flooring installation and repair"
      ]
    },
    {
      id: 'plumbing-services',
      icon: <Activity className="w-12 h-12 text-blue-600" />,
      title: "Plumbing Services",
      description: "Expert plumbing maintenance, repairs, and water management solutions.",
      features: [
        "Plumbing system maintenance",
        "Leak detection and repair",
        "Drainage system maintenance",
        "Water conservation solutions",
        "Fixture installation and repair",
        "Emergency plumbing services"
      ]
    },
    {
      id: 'facility-pantry',
      icon: <Cpu className="w-12 h-12 text-blue-600" />,
      title: "Facility Pantry",
      description: "Complete pantry management and catering for your workplace.",
      features: [
        "Pantry setup and management",
        "Catering services",
        "Vending machine management",
        "Inventory management",
        "Hygiene and sanitation",
        "Special event catering"
      ]
    },
    {
      id: 'horticulture',
      icon: <Leaf className="w-12 h-12 text-blue-600" />,
      title: "Horticulture",
      description: "Professional landscaping and green space maintenance.",
      features: [
        "Landscape design and implementation",
        "Plant maintenance and care",
        "Indoor plant services",
        "Irrigation system management",
        "Seasonal planting",
        "Green wall installation and maintenance"
      ]
    },
    {
      id: 'facade-cleaning',
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: "Façade Cleaning",
      description: "Specialized cleaning services for building exteriors.",
      features: [
        "High-rise window cleaning",
        "Exterior wall cleaning",
        "Pressure washing services",
        "Glass façade maintenance",
        "Graffiti removal",
        "Scheduled maintenance programs"
      ]
    },
    {
      id: 'security-services',
      icon: <ShieldCheck className="w-12 h-12 text-blue-600" />,
      title: "Security Services",
      description: "24/7 security personnel and advanced surveillance systems.",
      features: [
        "Security guard services",
        "CCTV installation and monitoring",
        "Access control systems",
        "Security risk assessment",
        "Emergency response planning",
        "Security staff training"
      ]
    },
    {
      id: 'vendor-management',
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Vendor Management",
      description: "Efficient coordination and management of third-party service providers.",
      features: [
        "Vendor selection and onboarding",
        "Performance monitoring",
        "Contract management",
        "Quality assurance",
        "Cost optimization",
        "Vendor relationship management"
      ]
    },
    {
      id: 'staffing-payroll',
      icon: <Briefcase className="w-12 h-12 text-blue-600" />,
      title: "Staffing & Payroll",
      description: "Comprehensive staffing solutions and payroll management services.",
      features: [
        "Recruitment and staffing",
        "Payroll processing",
        "Employee benefits administration",
        "Time and attendance tracking",
        "Compliance management",
        "HR support services"
      ]
    },
    {
      id: 'helpdesk-services',
      icon: <Headphones className="w-12 h-12 text-blue-600" />,
      title: "Helpdesk Services",
      description: "Responsive customer support and issue resolution system.",
      features: [
        "24/7 helpdesk support",
        "Ticket management system",
        "Issue tracking and resolution",
        "Service level agreement management",
        "Customer satisfaction monitoring",
        "Reporting and analytics"
      ]
    },
    {
      id: 'electrical-services',
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: "Electrical Services",
      description: "Complete electrical system maintenance and installations.",
      features: [
        "Electrical system maintenance",
        "Lighting solutions",
        "Power distribution systems",
        "Energy audits",
        "Emergency power systems",
        "Electrical safety inspections"
      ]
    },
    {
      id: 'architecture-interior-design',
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Architecture & Interior Design",
      description: "Modern architectural solutions and interior design services.",
      features: [
        "Space planning and design",
        "Interior fit-out services",
        "Furniture selection and procurement",
        "Lighting design",
        "Acoustical planning",
        "Sustainable design solutions"
      ]
    },
    {
      id: 'facility-management',
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: "Facility Management Services",
      description: "Comprehensive facility management for IT buildings, schools, and gated communities.",
      features: [
        "Complete property management",
        "Building operations and maintenance",
        "Space management and planning",
        "Integrated workplace management",
        "Asset management and tracking",
        "Sustainability and energy management"
      ]
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
              src="https://images.unsplash.com/photo-1581092160607-ee22731ce444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Industrial automation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/75"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-blue-100">
                Comprehensive facility management solutions tailored to your needs
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-12">
              {services.map((service, index) => (
                <AnimatedSection 
                  key={service.id} 
                  delay={index * 0.1}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col justify-center items-center text-center">
                      <div className="bg-blue-100 p-4 rounded-full mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <ChevronRight className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link 
                        to={`/services/${service.id}`} 
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                      >
                        Learn More <ChevronRight className="ml-1 w-5 h-5" />
                      </Link>
                    </div>
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
                <h2 className="text-3xl font-bold mb-4">Need a Customized Solution?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Contact us to discuss your specific requirements and how we can help you achieve your goals.
                </p>
                <Link to="/contact" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition duration-300 inline-block">
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

export default ServicesPage;