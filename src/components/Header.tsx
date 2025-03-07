import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Store scroll position before navigation
  const handleLinkClick = () => {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
  };

  // Restore scroll position after navigation
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem('scrollPosition');
    }
  }, [location]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Zap className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">Delta Elmech Systems</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium text-gray-700 hover:text-blue-600 transition duration-300 ${location.pathname === '/' ? 'text-blue-600' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`font-medium text-gray-700 hover:text-blue-600 transition duration-300 ${location.pathname === '/about' ? 'text-blue-600' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={`font-medium text-gray-700 hover:text-blue-600 transition duration-300 ${location.pathname.includes('/services') ? 'text-blue-600' : ''}`}
            >
              Services
            </Link>
            <Link 
              to="/careers" 
              className={`font-medium text-gray-700 hover:text-blue-600 transition duration-300 ${location.pathname.includes('/careers') ? 'text-blue-600' : ''}`}
            >
              Careers
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium text-gray-700 hover:text-blue-600 transition duration-300 ${location.pathname === '/contact' ? 'text-blue-600' : ''}`}
            >
              Contact
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center font-medium text-gray-700 hover:text-blue-600 transition duration-300">
                  {user?.name} <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="font-medium text-gray-700 hover:text-blue-600 transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? 
              <X className="w-6 h-6 text-gray-800" /> : 
              <Menu className="w-6 h-6 text-gray-800" />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2">
                  Home
                </Link>
                <Link to="/about" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2">
                  About
                </Link>
                <Link to="/services" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2">
                  Services
                </Link>
                <Link to="/careers" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2">
                  Careers
                </Link>
                <Link to="/contact" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2">
                  Contact
                </Link>
                
                <div className="pt-2 border-t border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link to="/dashboard" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2 block">
                        Dashboard
                      </Link>
                      <button 
                        onClick={logout} 
                        className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2 block w-full text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link to="/login" className="font-medium text-gray-700 hover:text-blue-600 transition duration-300 py-2">
                        Login
                      </Link>
                      <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 text-center">
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;