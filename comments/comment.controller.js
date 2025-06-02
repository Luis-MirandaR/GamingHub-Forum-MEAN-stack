const Comment = require('./comment.model');

// Crear un comentario
exports.createComment = async (req, res) => {
  try {
    const { text, threadId } = req.body;
    const userId = req.user._id; // Asegúrate de usar el middleware de autenticación

    if (!text || !threadId) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const comment = new Comment({
      userId,
      threadId,
      text
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el comentario.' });
  }
};

// Obtener todos los comentarios de un hilo
exports.getCommentsByThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const comments = await Comment.find({ threadId })
      .populate('userId', 'username')
      .sort({ fechaCreacion: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los comentarios.' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = req.user._id; // del token
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comentario no encontrado.' });
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'No autorizado para borrar este comentario.' });
    }
    await comment.deleteOne();
    res.json({ message: 'Comentario eliminado.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al borrar el comentario.' });
  }
};