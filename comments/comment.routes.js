const controller = require('./comment.controller');
const auth = require('../middlewares/auth.middleware');

module.exports = (router) => {
  router.post('/comments', auth, controller.createComment);
  router.get('/comments/thread/:threadId', controller.getCommentsByThread);
  router.delete('/comments/:id', auth, controller.deleteComment);
};