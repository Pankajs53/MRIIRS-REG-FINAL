import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDoctorCategory } from '../slices/formSlice';
import img1 from '../assets/patientPage1.jpg';
import img2 from '../assets/patientPage2.jpg';
import img3 from '../assets/patientPage3.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Patient = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [docCategory] = useState([
        'Dental', 'Nutritionist', 'Physiotherapy', 'GeneralPhysician'
    ]);
    const images = [img1, img2, img3];

    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.formSlice.doctorCategory);

    const navigate = useNavigate();

    // Preload images for smoother transitions
    useEffect(() => {
        images.forEach(image => {
            new Image().src = image;
        });
    }, [images]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds (3000 ms)

        return () => clearInterval(interval);
    }, [images]);

    const handleCategoryClick = (category) => {
        dispatch(setDoctorCategory(category));
        navigate('/patient/form');
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-12 p-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
            <motion.p
                className="text-center text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Choose a Department
            </motion.p>

            {/* Doctor Category Buttons */}
            <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {docCategory.map((category, index) => (
                    <motion.button
                        key={index}
                        className={`p-3 rounded-lg transition-all duration-300 text-lg font-medium ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-richblack-200 hover:bg-richblack-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </motion.button>
                ))}
            </motion.div>

            {/* Image Carousel */}
            <div className="relative w-full h-64 max-w-md overflow-hidden rounded-lg shadow-lg mt-6">
                {images.map((image, idx) => (
                    <img
                        key={idx}
                        src={image}
                        alt="Patient Page"
                        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ zIndex: idx === currentIndex ? 10 : 1 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Patient;
