const express = require('express');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.routes();
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'UP' });
        });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;