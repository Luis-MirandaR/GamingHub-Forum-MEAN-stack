const controller = require('./category.controller');

module.exports = (router) => {
    router.post('/categories', controller.createCategory);
    router.get('/categories', controller.getCategories);
    router.get('/categories/:id', controller.getCategoryById);
    router.put('/categories/:id', controller.updateCategory);
    router.delete('/categories/:id', controller.deleteCategory);
};