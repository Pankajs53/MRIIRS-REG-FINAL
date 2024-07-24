import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiStart } from '../../../const';

const PhysiotherapyForm = () => {
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
          category: "Physiotherapy"
        });

        console.log("here response->", response);

        // Set form values using the response data
        const data = response?.data?.data;
        setValue('fullName', data.fullName || '');
        setValue('email', data.email || '');
        setValue('phone', data.phoneNumber || '');
        setValue('handGripStrength', data?.formData?.handGripStrength || '');
        setValue('sitUp', data?.formData?.sitUp || '');
        setValue('tenFiveShuttleRun', data?.formData?.tenFiveShuttleRun || '');
        setValue('twentyMeterEnduranceTest', data?.formData?.twentyMeterEnduranceTest || '');
        setValue('sitAndReach', data?.formData?.sitAndReach || '');
        setValue('trunkLift', data?.formData?.trunkLift || '');
        setValue('bmi', data?.formData?.bmi || '');
        setValue('run', data?.formData?.run || '');
        setValue('hop', data?.formData?.hop || '');
        setValue('jump', data?.formData?.jump || '');
        setValue('staticBalance', data?.formData?.staticBalance || '');
        setValue('dynamicBalance', data?.formData?.dynamicBalance || '');
        setValue('throw', data?.formData?.throw || '');
        setValue('kick', data?.formData?.kick || '');
        setValue('steps', data?.formData?.steps || '');
        setValue('kick', data?.formData?.kick || '');
        setValue('exerciseTime', data?.formData?.exerciseTime || '');
        setValue('screenTime', data?.formData?.screenTime || '');
        setValue('sleepTime', data?.formData?.sleepTime || '');
        setValue('preference', data?.formData?.preference || '');
        setValue('enjoyment', data?.formData?.enjoyment || '');

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
          handGripStrength: data.handGripStrength,
          sitUp: data.sitUp,
          tenFiveShuttleRun: data.tenFiveShuttleRun,
          twentyMeterEnduranceTest: data.twentyMeterEnduranceTest,
          sitAndReach: data.sitAndReach,
          trunkLift: data.trunkLift,
          bmi: data.bmi,
          run: data.run,
          hop: data.hop,
          jump: data.jump,
          staticBalance: data.staticBalance,
          dynamicBalance: data.dynamicBalance,
          throw: data.throw,
          kick: data.kick,
          steps: data.steps,
          exerciseTime: data.exerciseTime,
          screenTime: data.screenTime,
          sleepTime: data.sleepTime,
          preference: data.preference,
          enjoyment: data.enjoyment
        },
        category: "Physiotherapy",
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        uniqueId: `MRIIRS/H/${id}`,
        dob: data.dob,
        prescription: data.prescription || '',
      });

      toast.success('Form submitted successfully!');
      setSubmitted(true);

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Error submitting form. Please try again.');
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-richblack-400">Physiotherapy Appointment Form</h2>

          <div className="mb-4 ">
            
              <label className="block text-sm font-medium text-richblack-400 mb-1" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                {...register('fullName', { required: 'Full Name is required' })}
                className="w-full px-3 py-2 border border-richblack-400 rounded-md"
                placeholder="First Name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
           
            
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-richblack-400 mb-1" htmlFor="date">Date</label>
            <input
              id="date"
              type="date" // Use type="date" for a date input
              {...register('date', { required: 'Date is required' })}
              className="w-full px-3 py-2 border border-richblack-400 rounded-md"
              placeholder="MM-DD-YYYY"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-richblack-400 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 border border-richblack-400 rounded-md"
              placeholder="example@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-richblack-400 mb-1" htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' } })}
              className="w-full px-3 py-2 border border-richblack-400 rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Strength */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">1. Strength</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="handGripStrength">Hand Grip Strength (kg)</label>
            <input
              {...register('handGripStrength', { required: 'Hand Grip Strength is required' })}
              id="handGripStrength"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.handGripStrength && <p className="text-red-500 text-sm mt-1">{errors.handGripStrength.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="sitUp">Sit Up (Count)</label>
            <input
              {...register('sitUp', { required: 'Sit Up is required' })}
              id="sitUp"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.sitUp && <p className="text-red-500 text-sm mt-1">{errors.sitUp.message}</p>}
          </div>

          {/* Endurance */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">2. Endurance</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="tenFiveShuttleRun">10 x 5 meter Shuttle Run (min)</label>
            <input
              {...register('tenFiveShuttleRun', { required: '10 x 5 meter Shuttle Run is required' })}
              id="tenFiveShuttleRun"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.tenFiveShuttleRun && <p className="text-red-500 text-sm mt-1">{errors.tenFiveShuttleRun.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="twentyMeterEnduranceTest">20m endurance shuttle test (min)</label>
            <input
              {...register('twentyMeterEnduranceTest', { required: '20m endurance shuttle test is required' })}
              id="twentyMeterEnduranceTest"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.twentyMeterEnduranceTest && <p className="text-red-500 text-sm mt-1">{errors.twentyMeterEnduranceTest.message}</p>}
          </div>

          {/* Flexibility */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">3. Flexibility</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="sitAndReach">Sit and reach (count)</label>
            <input
              {...register('sitAndReach', { required: 'Sit and reach is required' })}
              id="sitAndReach"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.sitAndReach && <p className="text-red-500 text-sm mt-1">{errors.sitAndReach.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="trunkLift">Trunk lift (count)</label>
            <input
              {...register('trunkLift', { required: 'Trunk lift is required' })}
              id="trunkLift"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.trunkLift && <p className="text-red-500 text-sm mt-1">{errors.trunkLift.message}</p>}
          </div>

          {/* Body composition */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">4. Body composition</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="bmi">BMI (kg/m2)</label>
            <input
              {...register('bmi', { required: 'BMI is required' })}
              id="bmi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.bmi && <p className="text-red-500 text-sm mt-1">{errors.bmi.message}</p>}
          </div>

          {/* Mobility */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">5. Mobility</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="run">Run (min)</label>
            <input
              {...register('run', { required: 'Run is required' })}
              id="run"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.run && <p className="text-red-500 text-sm mt-1">{errors.run.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="hop">Hop (count)</label>
            <input
              {...register('hop', { required: 'Hop is required' })}
              id="hop"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.hop && <p className="text-red-500 text-sm mt-1">{errors.hop.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="jump">Jump (count)</label>
            <input
              {...register('jump', { required: 'Jump is required' })}
              id="jump"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.jump && <p className="text-red-500 text-sm mt-1">{errors.jump.message}</p>}
          </div>

          {/* Fundamental movement skills */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">6. Fundamental movement skills</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="staticBalance">Static balance (min)</label>
            <input
              {...register('staticBalance', { required: 'Static balance is required' })}
              id="staticBalance"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.staticBalance && <p className="text-red-500 text-sm mt-1">{errors.staticBalance.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="dynamicBalance">Dynamic balance (min)</label>
            <input
              {...register('dynamicBalance', { required: 'Dynamic balance is required' })}
              id="dynamicBalance"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.dynamicBalance && <p className="text-red-500 text-sm mt-1">{errors.dynamicBalance.message}</p>}
          </div>

          {/* Control */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">7. Control</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="throw">Throw (count)</label>
            <input
              {...register('throw', { required: 'Throw is required' })}
              id="throw"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.throw && <p className="text-red-500 text-sm mt-1">{errors.throw.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="kick">Kick (count)</label>
            <input
              {...register('kick', { required: 'Kick is required' })}
              id="kick"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.kick && <p className="text-red-500 text-sm mt-1">{errors.kick.message}</p>}
          </div>

          {/* Physical activity habits */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">8. Physical activity habits</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="steps">Steps (count)</label>
            <input
              {...register('steps', { required: 'Steps are required' })}
              id="steps"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="exerciseTime">Exercise time (min)</label>
            <input
              {...register('exerciseTime', { required: 'Exercise time is required' })}
              id="exerciseTime"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.exerciseTime && <p className="text-red-500 text-sm mt-1">{errors.exerciseTime.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="screenTime">Screen time (min)</label>
            <input
              {...register('screenTime', { required: 'Screen time is required' })}
              id="screenTime"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.screenTime && <p className="text-red-500 text-sm mt-1">{errors.screenTime.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="sleepTime">Sleep time (min)</label>
            <input
              {...register('sleepTime', { required: 'Sleep time is required' })}
              id="sleepTime"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.sleepTime && <p className="text-red-500 text-sm mt-1">{errors.sleepTime.message}</p>}
          </div>

          {/* Physical activity attitude */}
          <h3 className="text-xl font-bold mb-4 text-gray-800">9. Physical activity attitude</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="preference">Preference (count)</label>
            <input
              {...register('preference', { required: 'Preference is required' })}
              id="preference"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.preference && <p className="text-red-500 text-sm mt-1">{errors.preference.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="enjoyment">Enjoyment (count)</label>
            <input
              {...register('enjoyment', { required: 'Enjoyment is required' })}
              id="enjoyment"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.enjoyment && <p className="text-red-500 text-sm mt-1">{errors.enjoyment.message}</p>}
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
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </form>
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

export default PhysiotherapyForm;

