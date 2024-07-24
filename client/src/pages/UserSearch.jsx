import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {apiStart} from "../const"

const UserSearch = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(null);

  const onSubmit = async (searchData) => {
    setIsSubmitting(true);
    setData(null); // Reset data before new search

    try {
      // console.log("API START",`${apiStart}/api/v1/patient/getData`)
      const response = await axios.post(`${apiStart}/api/v1/patient/getData`, {
        search: searchData.search,
      });

      setData(response.data.data);
      toast.success('Data fetched successfully!');
    } catch (error) {
      toast.error('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Search Your Data</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="search">
              Enter Email ID or Unique ID
            </label>
            <input
              {...register('search', { required: 'This field is required' })}
              id="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {errors.search && <p className="text-red-500 text-sm mt-1">{errors.search.message}</p>}
          </div>

          <motion.button
            type="submit"
            className={`w-full px-4 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-yellow-500'} text-white rounded-md hover:${!isSubmitting && 'bg-indigo-600'} focus:outline-none focus:bg-indigo-600`}
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Searching...' : 'Search'}
          </motion.button>
        </form>
        {data && (
          <motion.div
            className="mt-6 p-4 bg-gray-100 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Search Results:</h3>
            {data.map((item) => (
              <div key={item._id} className="mb-4 p-4 bg-white shadow-md rounded-md">
                <h4 className="text-lg font-semibold mb-2">{item.formCategory} Data</h4>
                <p><strong>Full Name:</strong> {item.formData.fullName}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Phone:</strong> {item.formData.phone}</p>
                <p><strong>Unique ID:</strong> {item.uniqueId}</p>
                <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                {item.prescriptionHistory.length > 0 && (
                  <div className="mt-2">
                    <h5 className="font-semibold">Prescription History:</h5>
                    {item.prescriptionHistory.map((prescription, index) => (
                      <p key={index}><strong>{new Date(prescription.date).toLocaleDateString()}:</strong> {prescription.prescription}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UserSearch;
