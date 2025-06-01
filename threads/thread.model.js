const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    titulo: { type: String, required: true },
    texto: { type: String, required: true },
    imagenUrl: { type: String }, // Opcional
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thread', threadSchema);