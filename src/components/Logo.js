import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div className="relative">
        <motion.div 
          className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center`}
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white font-bold text-xs md:text-sm">MP</span>
        </motion.div>
        <motion.div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        />
      </motion.div>
      
      {showText && (
        <motion.span 
          className="ml-2 text-blue-600 dark:text-blue-400 logo-text text-lg md:text-xl"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          MiniPro
        </motion.span>
      )}
    </motion.div>
  );
};

export default Logo;