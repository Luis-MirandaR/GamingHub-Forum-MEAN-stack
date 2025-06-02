const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String , required: true }, 
    titulo: { type: String, required: true },
    texto: { type: String, required: true },
    imagenUrl: { type: String }, // Opcional
    juego: { type: String, required: true },
    category: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thread', threadSchema);