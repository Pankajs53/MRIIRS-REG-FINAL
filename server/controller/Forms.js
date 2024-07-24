const Patient = require("../models/Patient")
const User = require("../models/User");


// get all user
exports.getAllUsers = async(req,res) =>{
    try{
        const users = await User.find({}).sort();

        console.log("All users are",users);

        if(users.length<=0){
            return res.status(201).json({
                success:true,
                message:"There are no registered Users."
            })
        }

        const data = users.map((user)=>({
            uniqueId: user.uniqueId,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber
        }))

        console.log("All users are",data);

        return res.status(200).json({
            success:true,
            data:data,
            message:"Users Fetched Successfully"
        })
    }catch(error){
        console.log("Error in getAllUser Api",error)
        return res.status(400).json({
            success:false,
            message:"Error in Get All User"
        })
    }
}


exports.getUser = async (req, res) => {
    try {
        const { id } = req.body; // Read the id parameter

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide an ID (email or unique ID)."
            });
        }

        // Construct the query based on whether the ID contains '@'
        const query = id.includes('@') ? { email: id } : { uniqueId: id };

        const user = await User.findOne(query);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Prepare the response data
        const data = {
            uniqueId: user.uniqueId,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            // Add any other fields you want to include in the response
        };

        return res.status(200).json({
            success: true,
            data,
            message: "User fetched successfully."
        });

    } catch (error) {
        console.error("Error in getUser API", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user."
        });
    }
};




// get form specific data
exports.getFormData = async (req, res) => {
    try {
        const { category, uniqueId } = req.body;

        console.log("Category is", category);
        console.log("unique id is", uniqueId);

        // First search in Patient if data is available
        const data = await Patient.findOne({
            $and: [
                { uniqueId: uniqueId },
                { formCategory: category }
            ]
        });

        console.log(data)

        if (!data) {
            // If not found in Patient, look into the User model
            const user = await User.findOne({ uniqueId: uniqueId });
            if (user) {
                console.log("User found from registration", user);
                return res.status(200).json({
                    success: true,
                    message: "User found",
                    data: user
                });
            } else {
                // If user is also not found
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
        }

        // Data found in Patient
        return res.status(200).json({
            success: true,
            message: "User found",
            data: data
        });

    } catch (error) {
        console.log("Error in getFormData API:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching form specific data"
        });
    }
};




exports.editFormData = async (req, res) => {
    try {
        // Extract formdata and category from the request body
        const { formData, category, fullName, email, phoneNumber, uniqueId, dob, prescription } = req.body;

        console.log("FormData is", formData);

        if (!email || !category) {
            return res.status(400).json({
                success: false,
                message: "Email and category cannot be null"
            });
        }

        // Prepare the update object
        const update = {
            formData: formData,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            uniqueId: uniqueId,
            dob: dob,
            prescription: prescription
        };

        // Prepare the prescription history entry
        const newPrescriptionEntry = {
            prescription: prescription,
            date: new Date()
        };

        console.log("Here");

        // Find the document by email and category and update it, or create a new one if it doesn't exist
        let user = await Patient.findOneAndUpdate(
            { email: email, formCategory: category },
            { 
                $set: update,
                $push: { prescriptionHistory: newPrescriptionEntry } 
            },
            { new: true, upsert: true } // Return the updated document and create a new one if it doesn't exist
        );

        console.log("data to be saved->",user)
        return res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: user
        });
    } catch (error) {
        console.log("Error in editFormData API", error);
        return res.status(500).json({
            success: false,
            message: "Error in Editing Data"
        });
    }
};





