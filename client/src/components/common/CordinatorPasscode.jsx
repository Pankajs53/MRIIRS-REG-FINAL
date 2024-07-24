import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CordinatorPasscode = () => {
  const [passcode, setPasscode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual passcode validation logic
    const correctPasscode = 'manavrachna2024'; // Example correct passcode

    if (passcode === correctPasscode) {
      // Handle correct passcode logic (e.g., navigate to another page)
      toast.success('Passcode is correct');
      navigate("/doctor/search")
    } else {
      // Display toast for incorrect passcode
      toast.error('Passcode is incorrect');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <Toaster position="top-right" />
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Coordinator Passcode</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="passcode" className="text-sm font-medium text-gray-800">Enter Passcode:</label>
            <input
              type="password"
              id="passcode"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CordinatorPasscode;
