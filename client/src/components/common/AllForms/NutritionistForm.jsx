import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiStart } from '../../../const';

const NutritionForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


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
          category: "Nutritionist"
        });

        console.log("here response->", response);

        // Set form values using the response data
        const data = response?.data?.data;
        setValue('fullName', data.fullName || '');
        setValue('email', data.email || '');
        setValue('phone', data.phoneNumber || '');
        setValue('height', data?.formData?.height || '');
        setValue('weight', data?.formData?.weight || '');
        setValue('bmr', data?.formData?.bmr || '');
        setValue('muscleMass', data?.formData?.muscleMass || '');
        setValue('waterPercentage', data?.formData?.waterPercentage || '');
        setValue('fatPercentage', data?.formData?.fatPercentage || '');
       
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
          height: data.height,
          weight: data.weight,
          bmr: data.bmr,
          muscleMass: data.muscleMass,
          waterPercentage: data.waterPercentage,
          fatPercentage: data.fatPercentage,
          cerealRootsTuber: data.cerealRootsTuber,
          vitaminARich: data.vitaminARich,
          darkGreenLeafy: data.darkGreenLeafy,
          otherVegetablesFruits: data.otherVegetablesFruits,
          organMeats: data.organMeats,
          fleshMeatsFish: data.fleshMeatsFish,
          egg: data.egg,
          legumesNutsSeeds: data.legumesNutsSeeds,
          milkProducts: data.milkProducts,
          dietaryDiversity:data.dietaryDiversity

        },
        category: "Nutritionist",
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
    <div className="max-w-screen-md mx-auto mt-8 p-6 bg-gray-100 shadow-lg rounded-lg">
      {!submitted ? (
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Nutrition Consultation Form
          </h2>
          {/* Basic Info */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="FullName"
              {...register('fullName', { required: true })}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Phone Number"
              {...register('phone', { required: true })}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Health Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="height">
                Height (cm)
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="height"
                type="number"
                placeholder="Height"
                {...register('height', { required: true })}
              />
              {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="weight"
                type="number"
                placeholder="Weight"
                {...register('weight', { required: true })}
              />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="bmr">
                BMR
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bmr"
                type="number"
                placeholder="BMR"
                {...register('bmr', { required: true })}
              />
              {errors.bmr && <p className="text-red-500 text-sm mt-1">{errors.bmr.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="muscleMass">
                Muscle Mass (kg)
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="muscleMass"
                type="number"
                placeholder="Muscle Mass"
                {...register('muscleMass', { required: true })}
              />
              {errors.muscleMass && <p className="text-red-500 text-sm mt-1">{errors.muscleMass.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="waterPercentage">
                % Water
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="waterPercentage"
                type="number"
                placeholder="% Water"
                {...register('waterPercentage', { required: true })}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.waterPercentage.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="fatPercentage">
                % Fat
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fatPercentage"
                type="number"
                placeholder="% Fat"
                {...register('fatPercentage', { required: true })}
              />
              {errors.fatPercentage && <p className="text-red-500 text-sm mt-1">{errors.fatPercentage.message}</p>}
            </div>
          </div>

          {/* Diet Diversity */}
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Diet Diversity</h3>
            <p className="text-gray-700 mb-2">Select 'Yes' or 'No' for each category:</p>
            <div className="grid grid-cols-2  gap-4">
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('cerealRootsTuber')} value="yes" />
                  <span className="ml-2">Cereal/White roots and tuber</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('cerealRootsTuber')} value="no" />
                  <span className="ml-4">No</span>
                </label>
              </div>
              {/* Repeat similar structure for other diet diversity items */}
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('vitaminARich')} value="yes" />
                  <span className="ml-2">Vitamin A rich vegetables/fruits</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('vitaminARich')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('darkGreenLeafy')} value="yes" />
                  <span className="ml-2">Dark green leafy vegetables</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('darkGreenLeafy')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('otherVegetablesFruits')} value="yes" />
                  <span className="ml-2">Other vegetables/other fruits</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('otherVegetablesFruits')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('organMeats')} value="yes" />
                  <span className="ml-2">Organ meats</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('organMeats')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('fleshMeatsFish')} value="yes" />
                  <span className="ml-2">Flesh meats, fish, and seafood</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('fleshMeatsFish')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('egg')} value="yes" />
                  <span className="ml-2">Egg</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('egg')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('legumesNutsSeeds')} value="yes" />
                  <span className="ml-2">Legumes, nuts, and seeds</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('legumesNutsSeeds')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('milkProducts')} value="yes" />
                  <span className="ml-2">Milk and milk products</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="radio" {...register('milkProducts')} value="no" />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div className="mb-4 mt-4">
              <label className="block text-gray-700 font-bold mb-2">Dietary Diversity Category:</label>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio" {...register('dietaryDiversity')} value="low" />
                  <span className="ml-2">Low Dietary Diversity (1-3 items)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio" {...register('dietaryDiversity')} value="medium" />
                  <span className="ml-2">Medium Dietary Diversity (4-6 items)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio" {...register('dietaryDiversity')} value="high" />
                  <span className="ml-2">High Dietary Diversity (7-9 items)</span>
                </label>
              </div>
            </div>
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

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md hover:${!isSubmitting && 'bg-blue-600'} focus:outline-none focus:bg-blue-600 mt-4`}
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

export default NutritionForm;
