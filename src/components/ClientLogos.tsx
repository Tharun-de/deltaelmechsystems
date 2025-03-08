import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { type AutoplayOptions } from 'swiper/types';

const ClientLogos = () => {
  const clients = [
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
    },
    {
      name: 'Infosys',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg'
    },
    {
      name: 'TCS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg'
    },
    {
      name: 'Wipro',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg'
    },
    {
      name: 'Tech Mahindra',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Tech_Mahindra_New_Logo.svg'
    },
    {
      name: 'Cognizant',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Cognizant_logo.svg'
    },
    {
      name: 'Accenture',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg'
    },
    {
      name: 'Capgemini',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Capgemini_logo.svg'
    },
    {
      name: 'HCL',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/HCL_Technologies_logo.svg'
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    }
  ];

  const autoplayOptions: AutoplayOptions = {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900/5 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations in Hyderabad and across India
          </p>
        </motion.div>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={autoplayOptions}
          speed={5000}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="client-logos-swiper"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-24 px-4">
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  className="max-h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientLogos;