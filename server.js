'use strict'

const cors = require('cors');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');
DB(); // Inicializar MongoDB

// Importar rutas
const categoryRoutes = require('./categories/category.routes');
const gameRoutes = require('./games/game.routes');
const authRoutes = require('./auth/auth.routes');
const threadRoutes = require('./threads/thread.routes');
const commentRoutes = require('./comments/comment.routes');
const forwardedthreads = require('./forwardedthreads/forwardedthreads.routes');


const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const bodyParserUrlencoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJson);
app.use(bodyParserUrlencoded);

app.use(cors());
app.use('/api', router);

// Registrar las rutas
authRoutes(router);
categoryRoutes(router);
gameRoutes(router);
threadRoutes(router);
commentRoutes(router);
forwardedthreads(router);


router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use(router);

app.listen(properties.PORT, () => {
  console.log(`Server is running on port ${properties.PORT}`);
});