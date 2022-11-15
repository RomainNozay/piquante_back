const express = require("express");
const helmet = require("helmet")
const morgan = require("morgan");

const mongoose = require("./db/db");

const path = require('path');

const bodyParser = require("body-parser");

const userRoads = require("./routes/userRoads");
const saucesRoads = require("./routes/saucesRoads")

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoads);

app.use("/api/sauces", saucesRoads);

app.use(helmet());

module.exports = app;
