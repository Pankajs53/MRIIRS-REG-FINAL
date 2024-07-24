import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiStart } from '../../../const';

const GeneralPhysicianForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { doctorCategory } = useSelector((state) => state.formSlice);

  const [submitted, setSubmitted] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oldPrescriptions, setOldPrescriptions] = useState([]); // State for old prescriptions


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiStart}/api/v1/form/getFormData`, {
          uniqueId: `MRIIRS/H/${id}`,
          category: "GeneralPhysician"
        });

        // Set form values using the response data
        const data = response?.data?.data;
        setValue('fullName', data.fullName || '');
        setValue('email', data.email || '');
        setValue('phone', data.phoneNumber || '');
        setValue('bloodGroup', data?.formData?.bloodGroup || '');
        setValue('hemoglobin', data?.formData?.hemoglobin || '');
        setValue('bloodSugar', data?.formData?.bloodSugar || '');
        setValue('bloodPressure', data?.formData?.bloodPressure || '');
        setValue('generalRemarks', data?.formData?.generalRemarks || '');


        // Set old prescriptions
        setOldPrescriptions(data.prescriptionHistory || []);

      } catch (error) {
        console.error('Error fetching form data:', error);
        toast.error('Error fetching form data');
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${apiStart}/api/v1/form/editFormData`, {
        formData: {
          bloodGroup: data.bloodGroup,
          hemoglobin: data.hemoglobin,
          bloodSugar: data.bloodSugar,
          bloodPressure: data.bloodPressure,
          generalRemarks: data.generalRemarks
        },
        category: "GeneralPhysician",
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        uniqueId: `MRIIRS/H/${id}`,
        dob: data.dob, // If needed
        prescription: data.prescription || '',
      });

      setUniqueId(response.data.uniqueId); // Assuming the API response has a uniqueId field
      setSubmitted(true);
      toast.success('Form submitted successfully!');

    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error submitting form:', error);
        toast.error(`${error.response.data.message}`);
      } else if (error.request) {
        console.error('Error submitting form:', error.request);
        toast.error('Error submitting form. Please try again.');
      } else {
        console.error('Error submitting form:', error.message);
        toast.error('Error submitting form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setUniqueId(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-blue">
      {!submitted ? (
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">General Physician Form</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="fullName">Full Name</label>
            <input
              {...register('fullName', { required: 'Full Name is required' })}
              id="fullName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="phone">Phone Number</label>
            <input
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number'
                }
              })}
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="bloodGroup">Blood Group</label>
            <select
              {...register('bloodGroup', { required: 'Blood Group is required' })}
              id="bloodGroup"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="hemoglobin">Hemoglobin</label>
            <input
              {...register('hemoglobin', { required: 'Hemoglobin is required' })}
              id="hemoglobin"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.hemoglobin && <p className="text-red-500 text-sm mt-1">{errors.hemoglobin.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="bloodSugar">Blood Sugar</label>
            <input
              {...register('bloodSugar', { required: 'Blood Sugar is required' })}
              id="bloodSugar"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.bloodSugar && <p className="text-red-500 text-sm mt-1">{errors.bloodSugar.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="bloodPressure">Blood Pressure</label>
            <input
              {...register('bloodPressure', { required: 'Blood Pressure is required' })}
              id="bloodPressure"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.bloodPressure && <p className="text-red-500 text-sm mt-1">{errors.bloodPressure.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="generalRemarks">General Remarks</label>
            <textarea
              {...register('generalRemarks')}
              id="generalRemarks"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
            {errors.generalRemarks && <p className="text-red-500 text-sm mt-1">{errors.generalRemarks.message}</p>}
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Previous Prescriptions</h3>
            <div className="space-y-2">
              {oldPrescriptions.map((prescription, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-md">
                  <p className="text-sm text-gray-700">{prescription.prescription}</p>
                  <p className="text-xs text-gray-500">Date: {new Date(prescription.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="prescription">Prescription</label>
            <textarea
              {...register('prescription')}
              id="prescription"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </motion.form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Submitted Successfully!</h2>
          <p className="text-center text-gray-700 mb-4">Your form has been submitted successfully.</p>
          <button
            onClick={() => navigate('/mainpage')}
            className="block mx-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Another Response
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneralPhysicianForm;
