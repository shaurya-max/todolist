const express = require('express');
const cors = require('cors');
const connectdb = require('./Connectdb/db');
const constroler = require('./Controler/auth_controler');
const router = require('./Router/auth_router');
const PORT = 8000;
const server = express();

// Middleware
server.use(cors());
server.use(express.json());

// Use the controller
server.use('/', router);

connectdb().then(() => {
    try {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}).catch((error) => {
    console.error('Error connecting to database:', error);
});
  

