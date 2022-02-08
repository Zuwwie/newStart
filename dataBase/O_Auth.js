const { Schema, model } = require('mongoose');

const OauthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true,
    },

    refresh_token: {
        type: String,
        required: true,
        trim: true,
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'user'
    }
}, { timestamps: true });

module.exports = model('o_auth', OauthSchema);
