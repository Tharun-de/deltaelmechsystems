import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, X, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import PageTransition from '../components/PageTransition';
import { useContactForm } from '../hooks/useContactForm';

const ContactPage = () => {
  const { submitContactForm, loading: isSubmitting } = useContactForm();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
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
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    }
  };

  const faqs = [
    {
      question: 'What industries do you serve?',
      answer: 'We serve a wide range of industries including manufacturing, automotive, pharmaceuticals, food and beverage, energy, and more. Our solutions are tailored to meet the specific needs of each industry.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on the scope and complexity. Small automation projects may take 2-4 weeks, while larger integrated systems can take several months. We provide detailed timelines during the consultation phase.'
    },
    {
      question: 'Do you provide maintenance services?',
      answer: 'Yes, we offer comprehensive maintenance services including preventive maintenance programs, emergency support, and system upgrades. Our maintenance contracts can be customized to meet your specific needs.'
    },
    {
      question: 'Can you integrate with existing systems?',
      answer: 'Absolutely. We specialize in integrating new technologies with existing systems to maximize your investment. Our team has experience working with a wide range of equipment and control systems.'
    },
    {
      question: 'What is your approach to project management?',
      answer: 'We follow a structured project management methodology that includes detailed planning, regular progress updates, quality control checkpoints, and thorough documentation. Each project is assigned a dedicated project manager who serves as your main point of contact.'
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Information</h1>
              <p className="text-xl text-blue-100">
                Reach out to us through any of the following channels or visit one of our offices.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-20 -mt-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <AnimatedSection delay={0.1}>
                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Phone</h3>
                  <div className="space-y-2">
                    <a href="tel:+919346397285" className="block hover:text-blue-600 transition duration-300">
                      +91 9346397285
                    </a>
                    <a href="tel:+919059990772" className="block hover:text-blue-600 transition duration-300">
                      +91 9059990772
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Email</h3>
                  <div className="space-y-2">
                    <a href="mailto:info@deltaelmech.com" className="block hover:text-blue-600 transition duration-300">
                      info@deltaelmech.com
                    </a>
                    <a href="mailto:support@deltaelmech.com" className="block hover:text-blue-600 transition duration-300">
                      support@deltaelmech.com
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Us</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">Plot No. 921, Ayyappa Society</p>
                    <p className="text-gray-600">Madhapur, Hyderabad</p>
                    <p className="text-gray-600">Telangana 500081</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Send Us a Message Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto">
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input 
                          type="text" 
                          id="first_name" 
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          id="last_name" 
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your Company Name"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="How can we help you?"
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
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Please describe how we can assist you..."
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

        {/* Our Office Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Office</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit us at our office
              </p>
            </AnimatedSection>
            
            <div className="max-w-3xl mx-auto">
              <AnimatedSection delay={0.1}>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Hyderabad Office</h3>
                  <p className="text-gray-600 mb-4">
                    Plot No. 921, Ayyappa Society<br />
                    Madhapur, Hyderabad<br />
                    Telangana 500081<br />
                    India
                  </p>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4397026251487!2d78.38387827486443!3d17.439902583747695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e37b46e83d%3A0x3c5a2144a6d76599!2sAyyappa%20Society%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1709561245678!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Connect With Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Connect With Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow us on social media to stay updated with our latest news and projects.
              </p>
            </AnimatedSection>
            
            <div className="flex justify-center space-x-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Facebook className="w-8 h-8 text-blue-600" />
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-pink-100 p-4 rounded-full">
                  <Instagram className="w-8 h-8 text-pink-600" />
                </div>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-blue-100 p-4 rounded-full">
                  <X className="w-8 h-8 text-blue-600" />
                </div>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Linkedin className="w-8 h-8 text-blue-600" />
                </div>
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform duration-300">
                <div className="bg-green-100 p-4 rounded-full">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our services and processes.
              </p>
            </AnimatedSection>
            
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;