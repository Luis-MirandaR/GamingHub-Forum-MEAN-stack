const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    imageUrl: {
        type: String,
        default: 'https://example.com/default-avatar.png' // URL por defecto si no se proporciona
    }
}, {
    timestamps: true
});

module.exports = userSchema;