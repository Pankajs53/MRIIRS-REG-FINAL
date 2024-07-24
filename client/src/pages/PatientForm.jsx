import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NutritionistForm from '../components/common/AllForms/NutritionistForm';
import PhysiotherapyForm from '../components/common/AllForms/PhysiotherapyForm';
import GeneralPhysicianForm from '../components/common/AllForms/GeneralPhysicianForm';
import { resetFormData } from "../slices/formSlice"
import axios from 'axios'; 
import DentalForm from '../components/common/AllForms/DentalForm';
import { useNavigate } from 'react-router-dom';

const PatientForm = () => {
    const formType = useSelector(state => state.formSlice.doctorCategory);
    const formData = useSelector(state => state.formSlice.formData);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/');
    };

    const renderForm = () => {
        switch (formType) {
            case "Nutritionist":
                return <NutritionistForm />;
            case "Physiotherapy":
                return <PhysiotherapyForm/>;
            case "Dental":
                return <DentalForm />;
            case "GeneralPhysician":
                return <GeneralPhysicianForm/>    
            default:
                return (
                    <div className="text-center">
                      <p className="mb-4 text-lg text-gray-800">
                        Please select a doctor category to fill out the form.
                      </p>
                      <button
                        onClick={handleNavigateHome}
                        className="px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
                      >
                        Go to Home
                      </button>
                    </div>
                  );
        }
    };

    const handleSubmit = async () => {
        try {
            // Combine all the data
            const combinedData = {
                doctorCategory: formType,
                ...formData
            };

            // Make API call to backend
            const response = await axios.post('/api/saveData', combinedData);
            console.log(response.data);

            // Reset form data in Redux state
            dispatch(resetFormData());
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Fill out the form below</h2>
            {/* Form Rendering */}
            {renderForm()}
            <button
                onClick={handleSubmit}
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mt-4"
            >
                Submit All Data
            </button>
        </div>
    );
};

export default PatientForm;
