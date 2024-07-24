import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'; // Import motion from Framer Motion for animations
import { apiStart } from '../../const';

const SearchPatient = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // Track if search has been performed

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiStart}/api/v1/doctor/searchPatient`, {
        search: searchTerm
      });
      setResults(response.data.data);
      console.log(response?.data?.data)
      setSearched(true); // Update searched state
      toast.success('User found successfully');
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = async () => {
    if (searchTerm.trim() === '') {
      toast.error('Please enter a search term');
      return;
    }

    handleSearch();
  };

  const renderFormData = (formData) => {
    return Object.keys(formData).map((key) => (
      <p key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {formData[key]}
      </p>
    ));
  };

  const renderPrescriptionHistory = (prescriptionHistory) => {
    return (
      <div className="mt-4">
        <p className="font-medium">Prescription History:</p>
        {prescriptionHistory.map((prescription, index) => (
          <div key={index} className="mt-2">
            <p>{prescription.prescription}</p>
            <small className="text-gray-500">Updated on {new Date(prescription.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-white">
      <Toaster position="top-right" />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold mb-4"
      >
        Search User
      </motion.h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 bg-richblack-800 border border-richblack-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-richblack-400"
          placeholder="Search by Email or Unique ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <motion.button
        onClick={handleSearchButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {loading ? 'Loading...' : 'Search'}
      </motion.button>
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((result) => (
            <motion.div
              key={result._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-4 mb-4 bg-richblack-800 border border-richblack-600 rounded-md"
            >
              <p><strong>ID:</strong> {result._id}</p>
              <p><strong>Full Name:</strong> {result.fullName}</p> {/* Display full name */}
              <p><strong>Category:</strong> {result.formCategory}</p>
              {renderFormData(result.formData)}
              <p><strong>Unique ID:</strong> {result.uniqueId}</p>
              <p><strong>Email:</strong> {result.email}</p>
              <p><strong>Created At:</strong> {new Date(result.createdAt).toLocaleString()}</p>

              {/* Display prescription history */}
              {result.prescriptionHistory && renderPrescriptionHistory(result.prescriptionHistory)}
            </motion.div>
          ))
        ) : (
          !loading && searched && <p className="mt-4">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPatient;
