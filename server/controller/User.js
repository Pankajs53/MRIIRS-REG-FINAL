const mongoose = require("mongoose");
const userRegister = require("../models/User");
const UserRegister = require("../models/User");

// Generate unique ID
const generateUniqueId = async () => {
    const count = await userRegister.countDocuments();
    return `MRIIRS/H/${String(count + 1).padStart(3, '0')}`;
};

exports.registerUser = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, dob } = req.body;

        if (!fullName || !email || !phoneNumber || !dob) {
            return res.status(400).json({
                success: false,
                message: "Data Field Not provided correctly"
            });
        }

        const user = await UserRegister.findOne({email:email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"User already registered with this id"
            })
        }

        // Get the unique ID
        const uniqueId = await generateUniqueId();

        const userData = new userRegister({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            uniqueId: uniqueId,
            dob: dob,
            createdAt: Date.now() 
        });

        await userData.save();

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            data: userData
        });
    } catch (error) {
        console.log("Error in Register user", error);
        return res.status(500).json({
            success: false,
            message: "Error in User Register"
        });
    }
}
