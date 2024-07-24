import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserPromptComponent = () => {
  const navigate = useNavigate();

  const handleCheckData = () => {
    navigate('/user/search'); // Adjust the path according to your routing setup
  };

  const handleFillForm = () => {
    navigate('/user'); // Adjust the path according to your routing setup
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome!</h2>
        <p className="text-lg mb-6 text-gray-700">What would you like to do today?</p>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCheckData}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Check Data
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFillForm}
            className="px-4 py-2 bg-richblue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Fill Form
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPromptComponent;
