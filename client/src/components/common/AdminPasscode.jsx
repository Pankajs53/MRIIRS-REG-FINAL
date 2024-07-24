import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPasscode = () => {
    const navigate = useNavigate();
    const [passcode, setPasscode] = useState('');
    const correctPasscode = '1234'; // Replace with your actual admin passcode

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passcode === correctPasscode) {
            // Navigate to admin panel or protected route
            navigate('/admin/data'); // Example route for admin access
        } else {
            // Navigate back to home or show error message
            navigate('/');
        }
    };

    const handleChange = (e) => {
        setPasscode(e.target.value);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Admin Passcode Required</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="passcode" className="block text-sm font-medium text-gray-700">
                        Enter Passcode:
                    </label>
                    <input
                        type="password"
                        id="passcode"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={passcode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-black py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPasscode;
