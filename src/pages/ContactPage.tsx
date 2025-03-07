import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
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

  const locations = [
    { city: 'Hyderabad', type: 'HQ', coords: { x: 48, y: 58 } },
    { city: 'Bangalore', type: 'Branch', coords: { x: 45, y: 68 } },
    { city: 'Mumbai', type: 'Branch', coords: { x: 35, y: 55 } },
    { city: 'Delhi', type: 'Branch', coords: { x: 45, y: 35 } },
    { city: 'Vizag', type: 'Branch', coords: { x: 55, y: 55 } },
    { city: 'Goa', type: 'Branch', coords: { x: 35, y: 65 } }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-blue-900 text-white pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-blue-100">
                Have questions or need a consultation? Reach out to our team and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach out to us through any of the following channels or visit our office.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <AnimatedSection delay={0.1} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+919346390000" className="hover:text-blue-600 transition duration-300">
                    +91 934639000
                  </a>
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@deltaelmech.com" className="hover:text-blue-600 transition duration-300">
                    info@deltaelmech.com
                  </a>
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                <p className="text-gray-600">
                  Hyderabad, India
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Locations Map */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Locations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                With offices across India, we're well-positioned to serve your needs
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg p-8">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Decorative Background Elements */}
                    <defs>
                      <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                        <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />

                    {/* India Map Outline - More detailed and modern */}
                    <path
                      d="M35,25 C38,22 42,20 45,20 C48,20 52,22 55,25 C58,28 59,32 60,35 C61,38 63,42 65,45 C67,48 65,52 60,55 C58,58 56,62 55,65 C52,68 48,72 45,75 C42,77 38,75 35,70 C32,67 31,63 30,60 C29,57 27,53 25,50 C23,47 25,43 30,40 C32,37 33,33 35,25 Z"
                      className="fill-blue-200/50 stroke-blue-400"
                      strokeWidth="0.5"
                    />

                    {/* Glowing Effect */}
                    <path
                      d="M35,25 C38,22 42,20 45,20 C48,20 52,22 55,25 C58,28 59,32 60,35 C61,38 63,42 65,45 C67,48 65,52 60,55 C58,58 56,62 55,65 C52,68 48,72 45,75 C42,77 38,75 35,70 C32,67 31,63 30,60 C29,57 27,53 25,50 C23,47 25,43 30,40 C32,37 33,33 35,25 Z"
                      className="fill-none stroke-blue-300"
                      strokeWidth="1"
                      filter="url(#glow)"
                    />
                    
                    {/* Connection Lines with Animation */}
                    {locations.map((loc, i) => 
                      locations.slice(i + 1).map((nextLoc, j) => (
                        <g key={`${i}-${j}`}>
                          <line
                            x1={loc.coords.x}
                            y1={loc.coords.y}
                            x2={nextLoc.coords.x}
                            y2={nextLoc.coords.y}
                            className="stroke-blue-400/30"
                            strokeWidth="0.3"
                            strokeDasharray="1,1"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="2"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </line>
                        </g>
                      ))
                    )}
                    
                    {/* Location Markers */}
                    {locations.map((location, index) => (
                      <g key={location.city}>
                        {/* Pulse Animation */}
                        <circle
                          cx={location.coords.x}
                          cy={location.coords.y}
                          r={location.type === 'HQ' ? "3" : "2"}
                          className={`${location.type === 'HQ' ? 'fill-blue-400/20' : 'fill-blue-300/20'}`}
                        >
                          <animate
                            attributeName="r"
                            values={location.type === 'HQ' ? "2;3;2" : "1;2;1"}
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.3;0.1;0.3"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        
                        {/* Main Marker */}
                        <circle
                          cx={location.coords.x}
                          cy={location.coords.y}
                          r={location.type === 'HQ' ? "1.8" : "1.3"}
                          className={`${location.type === 'HQ' ? 'fill-blue-600' : 'fill-blue-400'} stroke-white`}
                          strokeWidth="0.3"
                        />
                        
                        {/* City Label */}
                        <g transform={`translate(${location.coords.x}, ${location.coords.y + 3})`}>
                          <text
                            className="fill-gray-700 text-[2.5px] font-bold"
                            textAnchor="middle"
                          >
                            {location.city}
                          </text>
                          {location.type === 'HQ' && (
                            <text
                              className="fill-blue-600 text-[2px]"
                              textAnchor="middle"
                              y="2.5"
                            >
                              (HQ)
                            </text>
                          )}
                        </g>
                      </g>
                    ))}
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Presence</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {locations.map(location => (
                      <div key={location.city} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${location.type === 'HQ' ? 'bg-blue-600' : 'bg-blue-400'} shadow-sm`} />
                        <div>
                          <span className="text-gray-800 font-medium">{location.city}</span>
                          {location.type === 'HQ' && (
                            <span className="text-blue-600 text-sm ml-1">(HQ)</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
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
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
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
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6} 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center justify-center ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          Send Message <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
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

export default ContactPage;