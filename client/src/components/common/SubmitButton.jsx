import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const SubmitButton = ({ formData }) => {
    const dispatch = useDispatch();
    const doctorCategory = useSelector(state => state.formSlice.doctorCategory);

    const handleSubmit = async () => {
        try {
            const combinedData = {
                doctorCategory,
                ...formData
            };

            console.log("final form data->",combinedData)

        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-500 text-black py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mt-4"
        >
            Submit
        </button>
    );
};

export default SubmitButton;
