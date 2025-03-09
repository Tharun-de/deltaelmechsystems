import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpCircleProps {
  endValue: number;
  duration: number;
  label: string;
}

const CountUpCircle: React.FC<CountUpCircleProps> = ({ endValue, duration, label }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * endValue));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, endValue, duration]);

  return (
    <div 
      ref={ref}
      className="relative w-64 h-64 mx-auto"
    >
      <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
      <div className="absolute inset-2 bg-white rounded-full shadow-lg flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105">
        <span className="text-4xl font-bold text-blue-600">
          {count.toLocaleString()}+
        </span>
        <span className="text-gray-600 text-lg mt-2 px-4 text-center">
          {label}
        </span>
      </div>
    </div>
  );
};

export default CountUpCircle; 