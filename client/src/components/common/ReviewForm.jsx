import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetFormData } from "../../slices/formSlice"; // Adjust import path if necessary
import axios from 'axios';
import SuccessCard from './SuccessCard'; // Adjust path as necessary
import { apiStart } from '../../const';

const ReviewForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = useSelector(state => state.formSlice.formData); // Adjust slice name if necessary

    const [uniqueId, setUniqueId] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false); // State to handle form submission

    const handleEdit = () => {
        navigate('/'); // Navigate back to the form page
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true); // Set submitting state to true
            const response = await axios.post(`${apiStart}/api/v1/patient/saveForm`, formData);
            const { data } = response.data; 
            console.log(data)
            setUniqueId(data); 
            setShowSuccess(true);
            dispatch(resetFormData());
        } catch (error) {
            console.error('Error submitting form data:', error);
            
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            {!showSuccess && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>
                    <div className="mb-4">
                        <strong>Doctor Category:</strong> {formData.doctorCategory}
                    </div>
                    <div className="mb-4">
                        <strong>Name:</strong> {formData.name}
                    </div>
                    <div className="mb-4">
                        <strong>Email:</strong> {formData.email}
                    </div>
                    <div className="mb-4">
                        <strong>Phone Number:</strong> {formData.phone}
                    </div>
                    <div className="mb-4">
                        <strong>Message:</strong> {formData.message}
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleEdit}
                            className="bg-gray-500 text-black py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={`bg-indigo-500 text-black py-2 px-4 rounded-md border border-indigo-500 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 ${submitting && 'opacity-50 cursor-not-allowed'}`}
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </>
            )}
            {showSuccess && <SuccessCard uniqueId={uniqueId} />}
        </div>
    );
};

export default ReviewForm;
