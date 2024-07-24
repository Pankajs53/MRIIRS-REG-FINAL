const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    formCategory: {
        type: String,
        required: true
    },
    formData: {
        type: Schema.Types.Mixed, // Store flexible data as JSON
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    prescription: {
        type: String // Assuming prescription is stored as a string
    },
    prescriptionHistory: {
        type: [{
            prescription: String,
            date: Date
        }]
    },
    prescriptionDate: {
        type: Date,
        default: Date.now
    }
});

patientSchema.index({ uniqueId: 1, formCategory: 1 }, { unique: true });

// Create a model based on the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
