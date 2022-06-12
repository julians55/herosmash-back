const express = require('express');
require('dotenv').config();

const configExpress = require('./config/express')
const connectDB = require('./config/database');
const routes = require('./routes.js');

const app = express();

configExpress(app);
connectDB();
routes(app);

const port = process.env.PORT || 8081;

app.get('/', (req, res) =>{
    res.send("HEROSMASH SERVER");
})

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})