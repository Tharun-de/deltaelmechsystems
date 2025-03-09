import React, { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';
import { useContactForm } from '../hooks/useContactForm';

const OurWorksPage = () => {
  const { submitContactForm, loading: isSubmitting } = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    try {
      await submitContactForm(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    }
  };

  // Sample portfolio items - replace with actual data
  const portfolioItems = [
    {
      id: 1,
      title: 'Industrial Automation Project',
      description: 'Complete automation solution for manufacturing facility',
      imageUrl: '/images/portfolio/project1.jpg',
      category: 'Automation'
    },
    {
      id: 2,
      title: 'Electrical Infrastructure',
      description: 'Power distribution system for commercial complex',
      imageUrl: '/images/portfolio/project2.jpg',
      category: 'Electrical'
    },
    {
      id: 3,
      title: 'HVAC Installation',
      description: 'Modern HVAC system for office building',
      imageUrl: '/images/portfolio/project3.jpg',
      category: 'Mechanical'
    },
    // Add more portfolio items as needed
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-blue-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Works</h1>
              <p className="text-xl text-blue-100">
                Explore our portfolio of successful projects and innovative solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Projects</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through our collection of completed projects across various industries.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {portfolioItems.map((item) => (
                <AnimatedSection key={item.id} delay={item.id * 0.1}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm font-medium text-blue-600">{item.category}</span>
                      <h3 className="text-xl font-bold text-gray-800 mt-2 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Interested in Our Services?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get in touch with us to discuss your project requirements.
              </p>
            </AnimatedSection>
            
            <div className="max-w-2xl mx-auto">
              <AnimatedSection delay={0.1}>
                {submitSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg mb-8 text-center">
                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
                    {submitError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {submitError}
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your Phone Number"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default OurWorksPage; 