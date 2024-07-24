const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRegisterSchema = new Schema({
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
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const UserRegister = mongoose.model('UserRegister', userRegisterSchema);

module.exports = UserRegister;
