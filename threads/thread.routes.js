const controller = require('./thread.controller');
const auth = require('../middlewares/auth.middleware');

module.exports = (router) => {
    router.post('/threads', auth ,controller.createThread);
    router.get('/threads', controller.getThreads);
    router.get('/threads/:id', controller.getThreadById);
    router.put('/threads/:id', controller.updateThread);
    router.delete('/threads/:id', controller.deleteThread);
    router.get('/mythreads', auth, controller.getMyThreads);
};