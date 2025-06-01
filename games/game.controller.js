const Game = require('./game.model');

// Crear un juego
exports.createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener todos los juegos
exports.getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un juego por ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un juego
exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
        res.json(game);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un juego
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).json({ message: 'Juego no encontrado' });
        res.json({ message: 'Juego eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};