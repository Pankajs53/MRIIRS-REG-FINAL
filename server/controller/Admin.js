const Patient = require("../models/Patient");

// Get patients by doctor category
exports.getPatientsByCategory = async (req, res) => {
    try {
        const { doctorCategory } = req.params;
        

        console.log("catgeory is",doctorCategory)
        // Query patients based on doctorCategory
        const patients = await Patient.find({ formCategory: doctorCategory });

        console.log(patients)

        // Filtered data to include only necessary fields
        const filteredData = patients.map(patient => ({
            fullName:patient.fullName,
            uniqueId: patient.uniqueId,
            formData: patient.formData,
            createdAt: patient.createdAt
        }));



        console.log("Filtered data is->", filteredData);

        // Respond with patient data
        res.status(200).json({
            success: true,
            message: `Patients under category '${doctorCategory}'`,
            data: filteredData
        });
    } catch (error) {
        console.error("Error in retrieving patients by category:", error);
        res.status(500).json({
            success: false,
            message: "Error in retrieving patients by category",
            error: error.message
        });
    }
};


// Get count of patients by doctor category
exports.getPatientCountsByCategory = async (req, res) => {
    try {
        // Aggregation to group patients by doctorCategory and count them
        const patientCounts = await Patient.aggregate([
            {
                $group: {
                    _id: "$doctorCategory",
                    count: { $sum: 1 }
                }
            }
        ]);

        console.log("Patient counts by category:", patientCounts);

        // Respond with patient counts
        res.status(200).json({
            success: true,
            message: "Patient counts by category",
            data: patientCounts
        });
    } catch (error) {
        console.error("Error in retrieving patient counts by category:", error);
        res.status(500).json({
            success: false,
            message: "Error in retrieving patient counts by category",
            error: error.message
        });
    }
};


exports.getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await Patient.countDocuments();
        console.log("total user->",totalUsers);
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ error: 'Error fetching total users' });
    }
}

exports.getdailyUsers = async (req, res) => {
    try {
        // Adjust this query to fit your actual daily users data structure
        const dailyUsers = await Patient.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date ascending
        ]);

        console.log("Daily user",dailyUsers)

        res.status(200).json({ dailyUsers });
    } catch (error) {
        console.error('Error fetching daily users:', error);
        res.status(500).json({ error: 'Error fetching daily users' });
    }
}

