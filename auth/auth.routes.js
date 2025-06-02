const Users = require('./auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.get('/me', authMiddleware, Users.getCurrentUser);
    router.put('/me', authMiddleware, Users.updateCurrentUser);
    router.post('/change-password', authMiddleware, Users.changePassword);
}