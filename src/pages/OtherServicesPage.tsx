import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Briefcase, Truck, Coffee, Palette, Camera, Headphones, Wifi } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';

const OtherServicesPage = () => {
  const additionalServices = [
    {
      id: 'equipment-rental',
      icon: <Wrench className="w-12 h-12 text-blue-500" />,
      title: "Equipment Rental",
      description: "High-quality industrial equipment available for short and long-term rental.",
    },
    {
      id: 'logistics-support',
      icon: <Truck className="w-12 h-12 text-blue-500" />,
      title: "Logistics Support",
      description: "Efficient transportation and logistics solutions for industrial equipment.",
    },
    {
      id: 'event-management',
      icon: <Briefcase className="w-12 h-12 text-blue-500" />,
      title: "Industrial Event Management",
      description: "Professional organization of industrial exhibitions and trade shows.",
    },
    {
      id: 'cafeteria-services',
      icon: <Coffee className="w-12 h-12 text-blue-500" />,
      title: "Industrial Cafeteria Services",
      description: "High-quality food services for industrial facilities and offices.",
    },
    {
      id: 'interior-design',
      icon: <Palette className="w-12 h-12 text-blue-500" />,
      title: "Industrial Interior Design",
      description: "Specialized interior design services for industrial spaces.",
    },
    {
      id: 'documentation',
      icon: <Camera className="w-12 h-12 text-blue-500" />,
      title: "Technical Documentation",
      description: "Professional documentation and photography services for industrial projects.",
    },
    {
      id: 'training',
      icon: <Headphones className="w-12 h-12 text-blue-500" />,
      title: "Technical Training",
      description: "Comprehensive training programs for industrial equipment and systems.",
    },
    {
      id: 'network-solutions',
      icon: <Wifi className="w-12 h-12 text-blue-500" />,
      title: "Industrial Network Solutions",
      description: "Specialized networking solutions for industrial environments.",
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Additional Services</h1>
              <p className="text-xl text-blue-100">
                Discover our comprehensive range of complementary services designed to support your industrial operations.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {additionalServices.map((service, index) => (
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Link 
                      to={`/contact`} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      Learn More <ArrowRight className="ml-2 w-5 h-5" />
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
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Need a Custom Solution?</h2>
                <p className="text-gray-600 mb-8">
                  Contact us to discuss how our additional services can complement your existing operations.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
                >
                  Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
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

export default OtherServicesPage; 