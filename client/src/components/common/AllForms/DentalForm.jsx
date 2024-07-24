import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiStart } from '../../../const';

const DentalForm = () => {
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
          category: "Dental"
        });

        console.log("here response->", response);

        // Set form values using the response data
        const data = response?.data?.data;
        setValue('fullName', data.fullName || '');
        setValue('email', data.email || '');
        setValue('phone', data.phoneNumber || '');
        setValue('gum', data?.formData?.gum || '');
        setValue('dmf', data?.formData?.dmf || '');
        setValue('teeth', data?.formData?.teeth || '');
        setValue('bloodGroup', data?.formData?.bloodGroup || '');
        setValue('medicalHistory', data?.formData?.medicalHistory || '');
        setValue('allergy', data?.formData?.allergy || '');
        

        // Set old prescriptions
        setOldPrescriptions(data.prescriptionHistory || []);

      } catch (error) {
        console.error('Error fetching form data:', error);
        toast.error('Error fetching form data');
      }
    };

    fetchData();
  }, [id, setValue]); // Add `id` and `setValue` to the dependency array

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${apiStart}/api/v1/form/editFormData`, {
        formData: {
          gum: data.gum,
          dmf: data.dmf,
          teeth: data.teeth,
          bloodGroup: data.bloodGroup,
          medicalHistory: data.medicalHistory,
          allergy: data.allergy,
        },
        category: "Dental",
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        uniqueId: `MRIIRS/H/${id}`, // Ensure the unique ID is correctly set
        dob: data.dob, // If needed
        prescription: data.prescription || '', // Include prescription if it's in the form
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!submitted ? (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dental Appointment Form</h2>

          {/* Render form fields */}
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
                  message: 'Phone number should be of 10 digit'
                }
              })}
              type="tel"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="gum">Gum</label>
            <input
              {...register('gum', { required: 'Gum is required' })}
              id="gum"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.gum && <p className="text-red-500 text-sm mt-1">{errors.gum.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="dmf">DMF</label>
            <input
              {...register('dmf', { required: 'DMF is required' })}
              id="dmf"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.dmf && <p className="text-red-500 text-sm mt-1">{errors.dmf.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="teeth">Teeth</label>
            <input
              {...register('teeth', { required: 'Teeth is required' })}
              id="teeth"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.teeth && <p className="text-red-500 text-sm mt-1">{errors.teeth.message}</p>}
          </div>

          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="bloodGroup">Blood Group</label>
          <select
            {...register('bloodGroup')}
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
        </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="medicalHistory">Medical History</label>
            <input
              {...register('medicalHistory')}
              id="medicalHistory"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="allergy">Allergy</label>
            <input
              {...register('allergy')}
              id="allergy"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
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
            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            disabled={isSubmitting}
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

export default DentalForm;
