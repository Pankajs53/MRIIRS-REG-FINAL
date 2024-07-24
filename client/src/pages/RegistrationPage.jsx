import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RegistrationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [uniqueId, setUniqueId] = useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://mriirs-reg-v4-1.onrender.com/api/v1/user/saveForm', {
                fullName: data.fullName,
                email: data.email,
                dob: data.dateOfBirth,
                phoneNumber: data.phoneNumber,
            });
            console.log(response.data.data.uniqueId); // Debugging line
            setUniqueId(response.data.data.uniqueId);
            toast.success('Registration successful!');
        } catch (error) {
            toast.error(`Registration failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                {!uniqueId ? (
                    <>
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Student Registration</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    {...register('fullName', { required: 'Full Name is required' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    {...register('phoneNumber', { required: 'Phone Number is required' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    {...register('dateOfBirth', { required: 'Date of Birth is required' })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Register
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6 text-green-600">Registration Successful!</h2>
                        <p className="text-lg mb-4">Your unique ID is:</p>
                        <div className="text-2xl font-mono bg-gray-200 p-4 rounded-md shadow-md inline-block">{uniqueId}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationPage;
