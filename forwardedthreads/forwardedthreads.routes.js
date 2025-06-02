const controller = require('./forwardedthreads.controller');
const auth = require('../middlewares/auth.middleware');

module.exports = (router) => {
  router.post('/forwardedthreads', auth, controller.subscribe);
  router.delete('/forwardedthreads', auth, controller.unsubscribe);
  router.get('/forwardedthreads/check/:threadId', auth, controller.checkSubscription);
  router.get('/forwardedthreads/user', auth, controller.getUserForwardedThreads);
};