const jwt = require('jsonwebtoken');
const User = require('../auth/auth.model'); // Ajusta la ruta si es necesario
const SECRET_KEY = 'secretkey123';

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded._id || decoded.id);
    if (!user) return res.status(401).send({ message: 'Usuario no encontrado' });
    req.user = user; // Así tendrás username, email, etc.
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido' });
  }
};