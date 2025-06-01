const Thread = require('./thread.model');

// Crear un thread
exports.createThread = async (req, res) => {
    try {
        const thread = await Thread.create(req.body);
        res.status(201).json(thread);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obtener todos los threads
exports.getThreads = async (req, res) => {
    try {
        const threads = await Thread.find().populate('userId', 'username email');
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un thread por ID
exports.getThreadById = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id).populate('userId', 'username email');
        if (!thread) return res.status(404).json({ message: 'Thread no encontrado' });
        res.json(thread);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar un thread
exports.updateThread = async (req, res) => {
    try {
        const thread = await Thread.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thread) return res.status(404).json({ message: 'Thread no encontrado' });
        res.json(thread);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un thread
exports.deleteThread = async (req, res) => {
    try {
        const thread = await Thread.findByIdAndDelete(req.params.id);
        if (!thread) return res.status(404).json({ message: 'Thread no encontrado' });
        res.json({ message: 'Thread eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};