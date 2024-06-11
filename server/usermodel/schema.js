const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default:false,
    }
});
userSchema.methods.generateToken = function () {
    try {
        const token = jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10d',
            }
        );
        console.log('Generated Token:', token); // Log the generated token
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null; // Return null or handle the error as needed
    }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
