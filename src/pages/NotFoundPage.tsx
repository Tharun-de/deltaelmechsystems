import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const NotFoundPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-red-100 p-6 rounded-full inline-flex items-center justify-center mb-8">
                <AlertTriangle className="w-16 h-16 text-red-600" />
              </div>
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
              <p className="text-xl text-gray-600 mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              <Link 
                to="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 inline-flex items-center"
              >
                <Home className="mr-2 w-5 h-5" /> Back to Home
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;