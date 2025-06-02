const User = require('./auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123'

exports.createUser = async (req, res, next) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        imageUrl: req.body.imageUrl || 'https://example.com/default-avatar.png' // URL por defecto si no se proporciona
    };

    try {
        const user = await User.create(newUser);
        const expiresIn = 86400;
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn });

        // Elimina la contraseña antes de enviar el usuario
        const userObj = user.toObject();
        delete userObj.password;
    res.send({ user: userObj, token });
    } catch (err) {
        if (err.code === 11000) {
            // Error de duplicado
            return res.status(400).send({ message: 'Ese email o ese nombre de usuario ya estan registrados' });
        }
        return res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            return res.status(409).send({ message: 'Credenciales invalidas' });
        }
        const passwordIsValid = bcrypt.compareSync(userData.password, user.password);
        if (passwordIsValid) {
            const expiresIn = 86400;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn });

            // Elimina la contraseña antes de enviar el usuario
            const userObj = user.toObject();
            delete userObj.password;
            res.send({ user: userObj, accessToken });
        } else {
            return res.status(401).send({ auth: false, token: null, message: 'Credenciales invalidas' });
        }
    } catch (err) {
        return res.status(500).send('Server error');
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        res.send({
            id: user.id,
            username: user.username,
            email: user.email,
            imageUrl: user.imageUrl,
            role: user.role
        });
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener el usuario' });
    }
};

exports.updateCurrentUser = async (req, res) => {
    try {
        const updates = {
            username: req.body.username,
            imageUrl: req.body.imageUrl
        };
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        res.send({
            id: user.id,
            username: user.username,
            email: user.email,
            imageUrl: user.imageUrl
        });
    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar el usuario' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Verifica la contraseña actual
        const passwordIsValid = bcrypt.compareSync(req.body.currentPassword, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ message: 'La contraseña actual es incorrecta' });
        }

        // Cambia la contraseña
        user.password = bcrypt.hashSync(req.body.newPassword, 8);
        await user.save();

        res.send({ message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al cambiar la contraseña' });
    }
};