const { Schema, model } = require('mongoose');
const { USER, ADMIN } = require('../configs/user-roles.enum');
const { passwordService } = require('../service');

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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.statics = {
    async createUserWithHashPassword( userObject ) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({ ...userObject, password: hashedPassword });
    }
};

userSchema.virtual('fullName')
    .get(function() {
        return `${this.name} ${this.role}`;
    });

module.exports = model('user', userSchema);
