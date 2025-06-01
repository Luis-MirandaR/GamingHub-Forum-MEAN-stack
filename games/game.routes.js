const express = require('express');
const controller = require('./game.controller');

module.exports = (router) => {
    router.post('/create-game', controller.createGame);
    router.get('/games', controller.getGames);
    router.get('/games/:id', controller.getGameById);
    router.put('/games/:id', controller.updateGame);
    router.delete('/games/:id', controller.deleteGame);
};