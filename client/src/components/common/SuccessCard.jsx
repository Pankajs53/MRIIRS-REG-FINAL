import React from 'react';

const SuccessCard = ({ uniqueId }) => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h2>
            <div className="mb-4">
                <p className="text-gray-800">Your unique ID:</p>
                <p className="text-lg font-semibold text-indigo-600">{uniqueId}</p>
            </div>
            <div className="mt-4">
                <p className="text-gray-800">Please save this ID for future reference.</p>
            </div>
        </div>
    );
};

export default SuccessCard;
