import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const ClientLogos = () => {
  const clients = [
    {
      name: 'Siemens',
      logo: 'https://companieslogo.com/img/orig/SIEGY-ea68686c.png?t=1648063903'
    },
    {
      name: 'Schneider Electric',
      logo: 'https://companieslogo.com/img/orig/SU.PA-f21ccc48.png?t=1648063884'
    },
    {
      name: 'ABB',
      logo: 'https://companieslogo.com/img/orig/ABBN.SW-a4b1e6bc.png?t=1648063763'
    },
    {
      name: 'Honeywell',
      logo: 'https://companieslogo.com/img/orig/HON-5331f36d.png?t=1648063714'
    },
    {
      name: 'Johnson Controls',
      logo: 'https://companieslogo.com/img/orig/JCI-6d2c9459.png?t=1648063729'
    },
    {
      name: 'Toshiba',
      logo: 'https://companieslogo.com/img/orig/TOSYY-f60d19b7.png?t=1648063903'
    },
    {
      name: 'Mitsubishi Electric',
      logo: 'https://companieslogo.com/img/orig/8058.T-c7d9cc0e.png?t=1648063775'
    },
    {
      name: 'Carrier',
      logo: 'https://companieslogo.com/img/orig/CARR-5fb21dd2.png?t=1648063846'
    }
  ];

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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Working with leading industrial and engineering companies
          </p>
        </motion.div>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
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