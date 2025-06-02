const Thread = require('./thread.model');
const ForwardedThread = require('../forwardedthreads/forwardedthreads.model');
const Comment = require('../comments/comment.model');

// Crear un nuevo thread
exports.createThread = async (req, res) => {
  try {
    const thread = new Thread({
      userId: req.user._id, // Asegúrate que el middleware ponga userId en req.user
      username: req.user.username, // Asegúrate que el middleware ponga username en req.user
      titulo: req.body.titulo,
      texto: req.body.texto,
      imagenUrl: req.body.imagenUrl, 
      juego: req.body.juego,
      category: req.body.category // O req.body.categoriaId si así lo envías
    });
    await thread.save();
    res.status(201).json(thread);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los threads
exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un thread por ID
exports.getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate('userId', 'username _id');
    if (!thread) return res.status(404).json({ message: 'Hilo no encontrado.' });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el hilo.' });
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
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Hilo no encontrado.' });

    await thread.deleteOne();
    await ForwardedThread.deleteMany({ threadId: thread._id });
    await Comment.deleteMany({ threadId: thread._id });

    res.json({ message: 'Hilo, registros relacionados y comentarios eliminados.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al borrar el hilo.' });
  }
};

exports.getMyThreads = async (req, res) => {
  try {
    const threads = await Thread.find({ username: req.user.username });
    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};