import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const NavBar = ({ role }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 py-4 overflow-x-auto"
    >
      <div className="container mx-auto flex justify-evenly gap-2 items-center flex-wrap">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-lg font-bold"
        >
          <Link to="/" className="border-b-2 py-3 pl-3 border-transparent hover:border-white transition-colors duration-300">
            MRIIRS REGISTRATION PORTAL
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            to="/"
            className="text-white text-lg pr-3 font-bold border-b-2 border-transparent hover:border-white hover:text-richblack-300 transition-colors duration-300"
          >
            Home
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
