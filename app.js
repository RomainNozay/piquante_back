const express = require("express");
const helmet = require("helmet")
const morgan = require("morgan");

const mongoose = require("./db/db");

const path = require('path');

const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const saucesRoutes = require("./routes/saucesRoutes")

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

app.use('/api/auth', userRoutes);

app.use("/api/sauces", saucesRoutes);

app.use(helmet());

module.exports = app;
