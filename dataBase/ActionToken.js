const { Schema, model } = require('mongoose');

const ActionTokenTypeEnum = require('../configs/action-token-tyne.enum');

const ActionToken = new Schema({
    token: {
        type: String,
        required: true,
        trim: true,
    },

    token_type: {
        type: String,
        required: true,
        enum: Object.values(ActionTokenTypeEnum),
        trim: true,
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'user'
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('action_token', ActionToken);
