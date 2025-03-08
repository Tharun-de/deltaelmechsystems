import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-blue-100 group">
      <div className="mb-5 bg-blue-50 p-4 rounded-full inline-block group-hover:bg-blue-100 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;