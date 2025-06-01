const controller = require('./thread.controller');

module.exports = (router) => {
    router.post('/threads', controller.createThread);
    router.get('/threads', controller.getThreads);
    router.get('/threads/:id', controller.getThreadById);
    router.put('/threads/:id', controller.updateThread);
    router.delete('/threads/:id', controller.deleteThread);
};