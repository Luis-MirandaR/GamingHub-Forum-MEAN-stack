const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    slug: { 
        type: String,
        required: true 
    },
    imageUrl: { 
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Game', gameSchema);