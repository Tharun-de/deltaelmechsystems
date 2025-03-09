import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Delta Elmech</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Providing innovative engineering solutions for industrial automation, electrical systems, and mechanical applications since 2014.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1" /> Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1" /> Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1" /> Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400">Plot-921, Ayyappa Society<br />Madhapur, Hyderabad</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">+91 9346397285</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">+91 9059990772</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">deltaelmech2014@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates on our services and industry insights.
            </p>
            <form className="mb-4">
              <div className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-md focus:outline-none text-gray-900"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Delta Elmech Systems. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;