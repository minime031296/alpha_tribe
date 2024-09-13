const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    }
});


const User = model('User', userSchema);

module.exports = User;
