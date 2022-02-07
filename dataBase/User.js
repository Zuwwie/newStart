const { Schema, model } = require('mongoose');
const { USER, ADMIN } = require('../configs/user-roles.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    role: {
        type: String,
        default: USER,
        enum: [
            USER,
            ADMIN
        ]
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
