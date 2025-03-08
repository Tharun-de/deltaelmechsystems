import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronRight, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';
import ClientLogos from '../components/ClientLogos';

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would typically come from an API or database
  const serviceDetails = {
    'mechanical-services': {
      title: 'Mechanical Services',
      description: 'Our mechanical services help businesses maintain and optimize their HVAC systems, elevators, and other mechanical equipment for optimal performance and longevity.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Comprehensive HVAC system maintenance and repair',
        'Elevator and escalator maintenance services',
        'Mechanical equipment installation and commissioning',
        'Preventive maintenance programs for all mechanical systems',
        'Emergency repair services with rapid response times',
        'Energy efficiency optimization for mechanical systems'
      ],
      uniquePoints: [
        'Certified technicians with extensive experience',
        'Customized maintenance schedules based on equipment needs',
        'Advanced diagnostic tools for accurate problem identification',
        'Detailed documentation and reporting',
        'Energy-saving recommendations',
        'Compliance with all safety standards and regulations'
      ],
      jobOpenings: [
        {
          id: 'hvac-technician',
          title: 'HVAC Technician',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'mechanical-engineer',
          title: 'Mechanical Engineer',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'maintenance-supervisor',
          title: 'Maintenance Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years'
        }
      ]
    },
    'civil-works': {
      title: 'Civil Works',
      description: 'Our civil works services provide comprehensive solutions for structural maintenance, repairs, renovations, and infrastructure development for commercial and industrial facilities.',
      image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Building repairs and maintenance services',
        'Renovation and remodeling of commercial spaces',
        'Waterproofing solutions for buildings',
        'Structural assessments and integrity evaluations',
        'Infrastructure development and improvements',
        'Flooring installation and repair services'
      ],
      uniquePoints: [
        'Experienced civil engineers and construction professionals',
        'Minimal disruption to ongoing operations',
        'Quality materials and workmanship',
        'Adherence to building codes and standards',
        'Detailed project planning and execution',
        'Comprehensive documentation and warranties'
      ],
      jobOpenings: [
        {
          id: 'civil-engineer',
          title: 'Civil Engineer',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'construction-supervisor',
          title: 'Construction Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        },
        {
          id: 'project-coordinator',
          title: 'Project Coordinator',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        }
      ]
    },
    'plumbing-services': {
      title: 'Plumbing Services',
      description: 'Our plumbing services cover the maintenance, repair, and installation of plumbing systems, ensuring efficient water management and preventing costly water damage.',
      image: 'https://images.unsplash.com/photo-1581093458791-9d15482aec9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Comprehensive plumbing system maintenance',
        'Leak detection and repair services',
        'Drainage system maintenance and cleaning',
        'Water conservation solutions implementation',
        'Fixture installation and repair',
        'Emergency plumbing services with 24/7 availability'
      ],
      uniquePoints: [
        'Licensed and experienced plumbing professionals',
        'Advanced leak detection technology',
        'Water-saving recommendations and implementations',
        'Preventive maintenance programs',
        'Detailed documentation of all work performed',
        'Compliance with plumbing codes and regulations'
      ],
      jobOpenings: [
        {
          id: 'plumbing-technician',
          title: 'Plumbing Technician',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'plumbing-supervisor',
          title: 'Plumbing Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        },
        {
          id: 'water-management-specialist',
          title: 'Water Management Specialist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        }
      ]
    },
    'facility-pantry': {
      title: 'Facility Pantry',
      description: 'Our facility pantry services provide complete management of workplace pantries, ensuring your employees have access to refreshments and meals throughout the workday.',
      image: 'https://images.unsplash.com/photo-1565951707508-6937a61a0c0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Pantry setup and management services',
        'Catering services for daily meals and special events',
        'Vending machine management and restocking',
        'Inventory management of pantry supplies',
        'Hygiene and sanitation maintenance',
        'Special event catering coordination'
      ],
      uniquePoints: [
        'Customized pantry solutions based on workplace needs',
        'Quality food and beverage options',
        'Strict hygiene and food safety standards',
        'Efficient inventory management to prevent shortages',
        'Responsive service and regular quality checks',
        'Flexible options for different workplace requirements'
      ],
      jobOpenings: [
        {
          id: 'pantry-manager',
          title: 'Pantry Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'catering-coordinator',
          title: 'Catering Coordinator',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '1-3 years'
        },
        {
          id: 'food-service-supervisor',
          title: 'Food Service Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        }
      ]
    },
    'horticulture': {
      title: 'Horticulture',
      description: 'Our horticulture services provide professional landscaping and green space maintenance to enhance the aesthetic appeal and environmental quality of your facility.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Landscape design and implementation',
        'Regular plant maintenance and care',
        'Indoor plant services for office environments',
        'Irrigation system management and maintenance',
        'Seasonal planting and landscape refreshes',
        'Green wall installation and maintenance'
      ],
      uniquePoints: [
        'Experienced horticulturists and landscape professionals',
        'Sustainable landscaping practices',
        'Plant selection suitable for local climate',
        'Water-efficient irrigation solutions',
        'Integrated pest management approaches',
        'Seasonal planning for year-round appeal'
      ],
      jobOpenings: [
        {
          id: 'horticulturist',
          title: 'Horticulturist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'landscape-designer',
          title: 'Landscape Designer',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'gardening-supervisor',
          title: 'Gardening Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        }
      ]
    },
    'facade-cleaning': {
      title: 'Façade Cleaning',
      description: 'Our façade cleaning services ensure that your building exterior maintains its appearance and structural integrity through specialized cleaning techniques.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'High-rise window cleaning services',
        'Exterior wall cleaning and maintenance',
        'Pressure washing services for various surfaces',
        'Glass façade maintenance and restoration',
        'Graffiti removal and prevention',
        'Scheduled maintenance programs for building exteriors'
      ],
      uniquePoints: [
        'Trained professionals with safety certifications',
        'Specialized equipment for high-rise cleaning',
        'Environmentally friendly cleaning solutions',
        'Minimal disruption to building occupants',
        'Comprehensive insurance coverage',
        'Customized cleaning schedules based on building needs'
      ],
      jobOpenings: [
        {
          id: 'facade-cleaning-specialist',
          title: 'Façade Cleaning Specialist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'high-rise-cleaner',
          title: 'High-Rise Cleaner',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'cleaning-supervisor',
          title: 'Cleaning Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        }
      ]
    },
    'security-services': {
      title: 'Security Services',
      description: 'Our security services provide comprehensive protection for your facility through trained personnel and advanced surveillance systems.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Security guard services with trained personnel',
        'CCTV installation, monitoring, and maintenance',
        'Access control system implementation',
        'Security risk assessment and planning',
        'Emergency response planning and coordination',
        'Security staff training and development'
      ],
      uniquePoints: [
        'Professionally trained security personnel',
        'Advanced surveillance technology',
        'Customized security plans based on facility needs',
        'Regular security audits and improvements',
        '24/7 monitoring and response capabilities',
        'Integration with other facility systems'
      ],
      jobOpenings: [
        {
          id: 'security-manager',
          title: 'Security Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years'
        },
        {
          id: 'security-supervisor',
          title: 'Security Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'security-systems-specialist',
          title: 'Security Systems Specialist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        }
      ]
    },
    'vendor-management': {
      title: 'Vendor Management',
      description: 'Our vendor management services streamline the coordination and oversight of third-party service providers, ensuring quality and cost-effectiveness.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Vendor selection and onboarding processes',
        'Performance monitoring and evaluation',
        'Contract management and compliance',
        'Quality assurance and service level monitoring',
        'Cost optimization strategies',
        'Vendor relationship management'
      ],
      uniquePoints: [
        'Centralized vendor management system',
        'Transparent performance metrics',
        'Regular vendor reviews and feedback',
        'Strategic sourcing approaches',
        'Risk management strategies',
        'Continuous improvement processes'
      ],
      jobOpenings: [
        {
          id: 'vendor-manager',
          title: 'Vendor Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        },
        {
          id: 'procurement-specialist',
          title: 'Procurement Specialist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'contract-administrator',
          title: 'Contract Administrator',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        }
      ]
    },
    'staffing-payroll': {
      title: 'Staffing & Payroll',
      description: 'Our staffing and payroll services provide comprehensive human resource solutions, from recruitment to payroll processing and benefits administration.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Recruitment and staffing services',
        'Payroll processing and management',
        'Employee benefits administration',
        'Time and attendance tracking systems',
        'Compliance management for labor regulations',
        'HR support services and consulting'
      ],
      uniquePoints: [
        'Experienced HR professionals',
        'Customized staffing solutions',
        'Accurate and timely payroll processing',
        'Comprehensive benefits management',
        'Regulatory compliance expertise',
        'Scalable solutions for growing businesses'
      ],
      jobOpenings: [
        {
          id: 'hr-manager',
          title: 'HR Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years'
        },
        {
          id: 'payroll-specialist',
          title: 'Payroll Specialist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'recruitment-coordinator',
          title: 'Recruitment Coordinator',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        }
      ]
    },
    'helpdesk-services': {
      title: 'Helpdesk Services',
      description: 'Our helpdesk services provide responsive support for facility-related issues, ensuring quick resolution and minimal disruption to operations.',
      image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        '24/7 helpdesk support availability',
        'Ticket management system for issue tracking',
        'Efficient issue resolution processes',
        'Service level agreement management',
        'Customer satisfaction monitoring and improvement',
        'Reporting and analytics on service performance'
      ],
      uniquePoints: [
        'Trained support specialists',
        'Multi-channel support options',
        'Escalation procedures for complex issues',
        'Knowledge base development',
        'Continuous service improvement',
        'Integration with other facility management systems'
      ],
      jobOpenings: [
        {
          id: 'helpdesk-manager',
          title: 'Helpdesk Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        },
        {
          id: 'support-specialist',
          title: 'Support Specialist',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'customer-service-representative',
          title: 'Customer Service Representative',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '1-3 years'
        }
      ]
    },
    'electrical-services': {
      title: 'Electrical Services',
      description: 'Our electrical services provide comprehensive solutions for the maintenance, repair, and installation of electrical systems in commercial and industrial facilities.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Electrical system maintenance and troubleshooting',
        'Lighting solutions and upgrades',
        'Power distribution system management',
        'Energy audits and efficiency improvements',
        'Emergency power systems installation and maintenance',
        'Electrical safety inspections and compliance'
      ],
      uniquePoints: [
        'Licensed electrical professionals',
        'Compliance with electrical codes and standards',
        'Energy-efficient solutions',
        'Preventive maintenance programs',
        'Emergency response capabilities',
        'Comprehensive documentation and reporting'
      ],
      jobOpenings: [
        {
          id: 'electrical-engineer',
          title: 'Electrical Engineer',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'electrician',
          title: 'Electrician',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'electrical-supervisor',
          title: 'Electrical Supervisor',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        }
      ]
    },
    'architecture-interior-design': {
      title: 'Architecture & Interior Design',
      description: 'Our architecture and interior design services create functional, aesthetic, and sustainable spaces that enhance productivity and well-being.',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Space planning and design services',
        'Interior fit-out and renovation',
        'Furniture selection and procurement',
        'Lighting design for optimal environments',
        'Acoustical planning and solutions',
        'Sustainable design approaches'
      ],
      uniquePoints: [
        'Experienced architects and interior designers',
        'Focus on functionality and aesthetics',
        'Sustainable and eco-friendly design options',
        'Attention to brand identity in design',
        'Compliance with building codes and regulations',
        'Project management from concept to completion'
      ],
      jobOpenings: [
        {
          id: 'architect',
          title: 'Architect',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '3-5 years'
        },
        {
          id: 'interior-designer',
          title: 'Interior Designer',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        },
        {
          id: 'design-project-manager',
          title: 'Design Project Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        }
      ]
    },
    'facility-management': {
      title: 'Facility Management Services',
      description: 'Our comprehensive facility management services provide end-to-end solutions for IT buildings, schools, and gated communities, ensuring optimal operation and maintenance of all property aspects.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      helpPoints: [
        'Complete property management and maintenance',
        'Building operations and systems monitoring',
        'Space management and optimization',
        'Asset management and lifecycle planning',
        'Energy management and sustainability initiatives',
        'Emergency preparedness and response planning'
      ],
      uniquePoints: [
        'Tailored solutions for different facility types',
        'Integrated management approach',
        'Advanced technology and reporting systems',
        'Dedicated facility managers for each property',
        'Preventive maintenance programs',
        'Continuous improvement methodologies'
      ],
      jobOpenings: [
        {
          id: 'facility-manager',
          title: 'Facility Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '5-7 years'
        },
        {
          id: 'property-manager',
          title: 'Property Manager',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '4-6 years'
        },
        {
          id: 'operations-coordinator',
          title: 'Operations Coordinator',
          location: 'Hyderabad, India',
          type: 'Full-time',
          experience: '2-4 years'
        }
      ],
      specializedSectors: [
        {
          name: 'IT Buildings',
          description: 'Specialized facility management for IT parks and corporate buildings with focus on 24/7 operations, advanced security, and technology infrastructure management.',
          image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
          name: 'Schools',
          description: 'Comprehensive facility management for educational institutions focusing on safety, cleanliness, and creating optimal learning environments.',
          image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        },
        {
          name: 'Gated Communities',
          description: 'End-to-end property management for residential communities with focus on amenities maintenance, security, and resident satisfaction.',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
      ]
    }
  };
  
  const service = serviceDetails[id as keyof typeof serviceDetails];
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/services" className="text-blue-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-blue-600 text-white">
          <div className="container mx-auto px-6">
            <Link to="/services" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition duration-300">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-blue-100">{service.description}</p>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              <AnimatedSection className="lg:w-1/2">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </AnimatedSection>
              
              <div className="lg:w-1/2">
                <AnimatedSection delay={0.1}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">How We Can Help</h2>
                  <div className="space-y-4 mb-12">
                    {service.helpPoints.map((point, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.2}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Why We're Unique</h2>
                  <div className="space-y-4">
                    {service.uniquePoints.map((point, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{point}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
        
        {/* Specialized Sectors for Facility Management */}
        {id === 'facility-management' && service.specializedSectors && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Specialized Sectors</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We provide tailored facility management solutions for various sectors
                </p>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.specializedSectors.map((sector, index) => (
                  <AnimatedSection key={index} delay={index * 0.1} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                      src={sector.image} 
                      alt={sector.name} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{sector.name}</h3>
                      <p className="text-gray-600">{sector.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Job Openings Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Career Opportunities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our team of professionals in {service.title.toLowerCase()}
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.jobOpenings.map((job, index) => (
                <AnimatedSection key={job.id} delay={index * 0.1} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-1"><span className="font-medium">Location:</span> {job.location}</p>
                      <p className="text-gray-600 mb-1"><span className="font-medium">Type:</span> {job.type}</p>
                      <p className="text-gray-600"><span className="font-medium">Experience:</span> {job.experience}</p>
                    </div>
                    <Link 
                      to={`/careers/${job.id}`} 
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 w-full justify-center"
                    >
                      View Details <ChevronRight className="ml-1 w-5 h-5" />
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        {/* Client Logos Section */}
        <ClientLogos />
        
        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Related Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our other services that complement {service.title}
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(serviceDetails)
                .filter(([key]) => key !== id)
                .slice(0, 3)
                .map(([key, relatedService]) => (
                  <AnimatedSection key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                      src={relatedService.image} 
                      alt={relatedService.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{relatedService.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{relatedService.description}</p>
                      <Link 
                        to={`/services/${key}`} 
                        className="text-blue-600 font-semibold flex items-center hover:text-blue-800 transition duration-300"
                      >
                        Learn More <ChevronRight className="ml-1 w-5 h-5" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <div className="bg-blue-600 rounded-2xl p-10 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Contact us today to discuss how our {service.title.toLowerCase()} can benefit your business.
                </p>
                <Link to="/contact" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-md transition duration-300 inline-block">
                  Contact Us
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

export default ServiceDetailPage;