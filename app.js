const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1/', products);
app.use('/api/v1/', auth);

module.exports = app;