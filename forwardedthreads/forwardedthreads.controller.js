const ForwardedThread = require('./forwardedthreads.model');

// Crear suscripción
exports.subscribe = async (req, res) => {
  try {
    const userId = req.user._id; // Asegúrate de usar el middleware de autenticación
    const { threadId } = req.body;

    // Evitar duplicados
    const exists = await ForwardedThread.findOne({ userId, threadId });
    if (exists) {
      return res.status(400).json({ message: 'Ya estás suscrito a este hilo.' });
    }

    const sub = new ForwardedThread({ userId, threadId });
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Error al suscribirse al hilo.' });
  }
};

// Eliminar suscripción
exports.unsubscribe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { threadId } = req.body;

    const result = await ForwardedThread.findOneAndDelete({ userId, threadId });
    if (!result) {
      return res.status(404).json({ message: 'Suscripción no encontrada.' });
    }
    res.json({ message: 'Suscripción eliminada.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la suscripción.' });
  }
};

exports.checkSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { threadId } = req.params;
    const exists = await ForwardedThread.findOne({ userId, threadId });
    res.json({ subscribed: !!exists });
  } catch (err) {
    res.status(500).json({ message: 'Error al verificar la suscripción.' });
  }
};

exports.getUserForwardedThreads = async (req, res) => {
  try {
    const userId = req.user._id;
    const forwarded = await ForwardedThread.find({ userId }).populate('threadId');
    res.json(forwarded);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los hilos reenviados.' });
  }
};