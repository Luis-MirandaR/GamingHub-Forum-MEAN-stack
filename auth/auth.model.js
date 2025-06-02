const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true, trim: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 8, trim: true },
    imageUrl: { type: String, default: 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png' },
    role:     { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// Evita redefinir el modelo si ya existe
module.exports = mongoose.models.User || mongoose.model('User', userSchema);