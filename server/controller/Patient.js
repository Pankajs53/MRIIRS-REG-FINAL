const Patient = require("../models/Patient");
const { v4: uuidv4 } = require('uuid');


// function to calculate bmi or bmr

const calculateBMI = (height,weight) =>{
    let heightInMeters = height / 100;
    let bmi = weight / (heightInMeters ** 2);
    return bmi.toFixed(2);
}


// Save user data
exports.saveForm = async (req, res) => {
    try {
        // Extract form data from request body
        const { formCategory, formData } = req.body;
        const { email } = formData;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Check if a patient with the same email and formCategory already exists
        const alreadyExists = await Patient.findOne({ email, formCategory });

        if (alreadyExists) {
            return res.status(409).json({
                success: false,
                message: `User already exists with email '${email}' for form category '${formCategory}'`
            });
        }

        const uniqueId = uuidv4();

        // if from is of nutrition type take height and weight and calculate BMI and add in param
        const isNutrition = formCategory === "Nutritionist" ? true : false;

        if(isNutrition){
            const height = formData.height;
            const weight = formData.weight;

            const bmi = calculateBMI(height,weight)
            
            console.log("BMI IS",bmi);
            formData.bmi=bmi;
        }


        // Create a new patient record
        const newPatient = new Patient({
            formCategory,
            formData,
            email,
            uniqueId: `MRIIRS/2024/${uniqueId}`
        });

        // Save patient data to the database
        const savedPatient = await newPatient.save();
        console.log("saved data is->", savedPatient)
        // Respond with success message and saved patient data
        res.status(201).json({
            success: true,
            message: "Patient form data saved successfully",
            data: savedPatient.uniqueId
        });
    } catch (error) {
        console.error("Error in saving patient form data:", error);
        res.status(500).json({
            success: false,
            message: "Error in saving patient form data",
            error: error.message
        });
    }
};


exports.getData = async (req, res) => {
    try {

        console.log(req.body)
        const { search } = req.body;
        console.log("backend search data is",search)
        if (!search) {
            return res.status(400).json({
                success: false,
                message: 'Search parameter is required',
            });
        }

        let patients;

        if (search.includes('@')) {
            patients = await Patient.find({ email: search })
        } else {
            patients = await Patient.find({ uniqueId: search })
        }

        if (!patients || patients.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'No patient found with the provided search criteria',
            });
        }

        return res.status(200).json({
            success: true,
            data: patients,
        });



    } catch (error) {
        console.log("Error in user data api");
        return res.status(401).json({
            success: false,
            message: "Error in Finding Data"
        })
    }
}
