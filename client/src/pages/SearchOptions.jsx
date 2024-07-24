import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion for animations
import CategoryUsers from '../components/common/CategoryUsers';
import SearchPatient from '../components/common/SearchPatient';

const SearchOptions = () => {
  const [option, setOption] = useState('search'); // Default option set to 'search'

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Choose Search Option</h1>
      <div className="flex justify-center space-x-4 mb-4">
        <motion.button
          onClick={() => handleOptionClick('search')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-md shadow-md focus:outline-none 
            ${option === 'search' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-richblack-400 hover:bg-blue-700 hover:text-white focus:ring-2 focus:ring-blue-400'}`}
        >
          Search by Name or ID
        </motion.button>
        <motion.button
          onClick={() => handleOptionClick('list')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-md shadow-md focus:outline-none 
            ${option === 'list' ? 'bg-gray-600 text-white' : 'bg-gray-500 text-white bg-blue-500  hover:bg-blue-700 hover:text-white focus:ring-2 focus:ring-blue-400'}`}
        >
          Get List of All Users by Department
        </motion.button>
      </div>
      <div>
        {option === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SearchPatient />
          </motion.div>
        )}
        {option === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CategoryUsers />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchOptions;
