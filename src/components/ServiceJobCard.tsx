import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Zap, 
  Settings, 
  Building2, 
  Cpu, 
  PenTool,
  Droplet,
  Coffee,
  Flower2,
  Wind,
  Shield,
  Users,
  ClipboardList,
  Building
} from 'lucide-react';

interface ServiceJobCardProps {
  id: string;
  title: string;
  jobCount: number;
  description: string;
}

const getIconForService = (id: string) => {
  switch (id) {
    case 'electrical-services':
      return <Zap className="w-8 h-8 text-blue-600" />;
    case 'mechanical-services':
      return <Settings className="w-8 h-8 text-blue-600" />;
    case 'civil-works':
      return <Building2 className="w-8 h-8 text-blue-600" />;
    case 'automation-services':
      return <Cpu className="w-8 h-8 text-blue-600" />;
    case 'architecture-interior-design':
      return <PenTool className="w-8 h-8 text-blue-600" />;
    case 'plumbing-services':
      return <Droplet className="w-8 h-8 text-blue-600" />;
    case 'facility-pantry':
      return <Coffee className="w-8 h-8 text-blue-600" />;
    case 'horticulture':
      return <Flower2 className="w-8 h-8 text-blue-600" />;
    case 'facade-cleaning':
      return <Wind className="w-8 h-8 text-blue-600" />;
    case 'security-services':
      return <Shield className="w-8 h-8 text-blue-600" />;
    case 'vendor-management':
      return <Users className="w-8 h-8 text-blue-600" />;
    case 'staffing-payroll':
      return <ClipboardList className="w-8 h-8 text-blue-600" />;
    case 'facility-management':
      return <Building className="w-8 h-8 text-blue-600" />;
    default:
      return <Briefcase className="w-8 h-8 text-blue-600" />;
  }
};

const ServiceJobCard: React.FC<ServiceJobCardProps> = ({ id, title, jobCount, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
      <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
        {getIconForService(id)}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link 
        to={`/careers/service/${id}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        {jobCount} {jobCount === 1 ? 'Position' : 'Positions'} Available
      </Link>
    </div>
  );
};

export default ServiceJobCard; 