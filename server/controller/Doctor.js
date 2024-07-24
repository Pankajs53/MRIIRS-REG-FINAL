const Patient = require("../models/Patient");

// Search for a patient by firstName or uniqueId, considering variations in field names
exports.searchPatient = async (req, res) => {
    try {
        const { search } = req.body;
        console.log("From backend search:", search);

        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search term is required",
            });
        }

        const query = {
            $or: [
                { uniqueId: search },
                { email: search }
            ]
        };

        console.log("Query:", query); // Log the query

        const patients = await Patient.find(query);
        console.log("Patients found:", patients);

        if (patients.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No patients found matching the search criteria",
            });
        }

        // Respond with patient data
        res.status(200).json({
            success: true,
            message: "Patients found",
            data: patients,
        });
    } catch (error) {
        console.error("Error in searching patients:", error);
        res.status(500).json({
            success: false,
            message: "Error in searching patients",
            error: error.message,
        });
    }
};


exports.editPrescription = async (req, res) => {
    const { uniqueId, category, prescription } = req.body;

    try {
        // Find the patient by uniqueId and category
        const patient = await Patient.findOne({ uniqueId: uniqueId, formCategory: category });

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Create a new prescription entry
        const newPrescription = {
            prescription: prescription,
            date: new Date(),
        };

        // Add the new prescription to the history
        if (!patient.formData.prescriptionHistory) {
            patient.formData.prescriptionHistory = [];
        }
        patient.formData.prescriptionHistory.push(newPrescription);

        // Save the updated patient document
        await patient.save();

        // Prepare response data with updated prescription history
        const updatedPatient = await Patient.findById(patient._id);

        console.log(updatedPatient);
        res.status(200).json({ success: true, data: updatedPatient, message: 'Prescription saved successfully' });
    } catch (error) {
        console.error('Error editing prescription:', error);
        res.status(500).json({ success: false, message: 'Error editing prescription. Please try again.' });
    }
};

  
